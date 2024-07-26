import React, { useState } from 'react';
import { Container, Box, Grid, Card, CardContent, CardMedia, TextField, Typography, Button } from '@mui/material';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [repeatPassword, setRepeatPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [errorDetails, setErrorDetails] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    setError('');
    setErrorDetails([]);

    if (password !== repeatPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!email.endsWith('@fpt.edu.vn')) {
      setError('You must use FPT Edu email');
      return;
    }

    try {
      const response = await axios.post('https://localhost:7777/api/Auth/register', {
        email,
        password,
      });
      console.log('Register successful:', response.data);
      // Navigate to the profile completion form
      navigate(`/complete-profile/${response.data.userId}`);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError<{ erros: string[] }>;
        if (axiosError.response) {
          console.error('Register failed:', axiosError.response.data);
          if (axiosError.response.data.erros) {
            setErrorDetails(axiosError.response.data.erros);
          } else {
            setError('Registration failed');
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
      <Card sx={{ mt: 5, borderRadius: 2 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} display="flex" flexDirection="column" alignItems="center">
              <Typography component="h1" variant="h5" sx={{ mb: 4 }}>
                Sign up
              </Typography>
              <Box component="form" onSubmit={handleRegister} sx={{ width: '100%' }}>
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
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="repeatPassword"
                  label="Repeat your password"
                  type="password"
                  id="repeatPassword"
                  autoComplete="current-password"
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                />
                {error && <Typography color="error">{error}</Typography>}
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
                  sx={{ mt: 3, mb: 2 }}
                >
                  Register
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6} display="flex" alignItems="center" justifyContent="center">
              <CardMedia
                component="img"
                sx={{ width: '100%', borderRadius: 2 }}
                image="https://cdn.tuoitre.vn/zoom/700_700/471584752817336320/2023/4/27/fpt1-16825877734451677906524-257-0-1304-2000-crop-16825877941001947209179.jpg"
                alt="FPT Image"
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}

export default RegisterPage;
