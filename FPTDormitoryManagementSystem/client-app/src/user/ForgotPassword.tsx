import React, { useState } from 'react';
import { Container, Grid, Card, CardContent, CardMedia, Typography, TextField, Button, Box, Avatar, CircularProgress } from '@mui/material';
import { Email } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await axios.post('https://localhost:7777/api/Auth/forgot-password', { email });
      navigate('/verify', { state: { email } }); // Pass email in state
    } catch (err) {
      setError('Failed to send email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="md">
      <Card sx={{ marginTop: 8, borderRadius: 2 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                <Email />
              </Avatar>
              <Typography component="h1" variant="h5">
                Enter your Email
              </Typography>
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Your Email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={handleEmailChange}
                />
                {error && <Typography color="error">{error}</Typography>}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, backgroundColor: "#FFA500", '&:hover': { backgroundColor: "#F28C28" } }}
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Submit"}
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
    </Container>
  );
};

export default ForgotPassword;
