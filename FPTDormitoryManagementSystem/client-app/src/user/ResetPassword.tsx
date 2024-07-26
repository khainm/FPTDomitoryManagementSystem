import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  TextField,
  Button,
  Box,
  Modal,
  Avatar
} from '@mui/material';
import { Email, Lock, Key } from '@mui/icons-material';
import axios, { AxiosError } from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const ResetPassword: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [token, setToken] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [errorDetails, setErrorDetails] = useState<string[]>([]);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const state = location.state as { email: string; token: string };
    if (state) {
      setEmail(state.email);
      setToken(state.token);
    }
  }, [location.state]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setErrorDetails([]);

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('https://localhost:7777/api/Auth/reset-password', {
        email,
        token,
        newPassword
      });
      console.log('Password reset successful:', response.data);
      setShowSuccessModal(true);
      setTimeout(() => {
        navigate('/');
      }, 3000); // Redirect to home page after 3 seconds
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError<{ errors: { [key: string]: string[] } }>;
        if (axiosError.response) {
          console.error('Reset password failed:', axiosError.response.data);
          setError('Failed to reset password');
          if (axiosError.response.data.errors) {
            const detailedErrors = Object.values(axiosError.response.data.errors).flat();
            setErrorDetails(detailedErrors);
          }
        }
      } else {
        console.error('An unexpected error occurred:', err);
        setError('An unexpected error occurred');
      }
    }
  };

  return (
    <Container component="main" maxWidth="md">
      <Card sx={{ marginTop: 8, borderRadius: 2 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography component="h1" variant="h5" sx={{ mt: 4, mb: 4, fontWeight: 'bold' }}>
                Reset Password
              </Typography>
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                  <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                    <Email />
                  </Avatar>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Confirm your Email"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                  <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                    <Lock />
                  </Avatar>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="newPassword"
                    label="Enter your new Password"
                    type="password"
                    id="newPassword"
                    autoComplete="new-password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                  <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                    <Key />
                  </Avatar>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Repeat your password"
                    type="password"
                    id="confirmPassword"
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </Box>
                {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}
                {errorDetails.length > 0 && (
                  <Box sx={{ mt: 2 }}>
                    {errorDetails.map((errDetail, index) => (
                      <Typography key={index} color="error">{errDetail}</Typography>
                    ))}
                  </Box>
                )}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, backgroundColor: "#FFA500", '&:hover': { backgroundColor: "#F28C28" } }}
                >
                  Submit
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CardMedia
                component="img"
                image="https://media.istockphoto.com/id/1306827906/vector/man-forgot-the-password-concept-of-forgotten-password-key-account-access-blocked-access.jpg?s=612x612&w=0&k=20&c=67nYr3ztbOn5uO6-mWBNCSw9mcHD9Z5M-QER-azGQ5w="
                alt="Forgot Password"
                sx={{ width: 1, borderRadius: 2 }}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Modal
        open={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4 }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Password Reset Successful
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Your password has been reset successfully. You will be redirected to the home page shortly.
          </Typography>
          <Button onClick={() => setShowSuccessModal(false)}>Close</Button>
        </Box>
      </Modal>
    </Container>
  );
};

export default ResetPassword;
