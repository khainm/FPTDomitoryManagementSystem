import React, { useState } from 'react';
import { Container, Box, Grid, Avatar, Typography, TextField, RadioGroup, FormControlLabel, Radio, Button, CssBaseline } from '@mui/material';
import axios, { AxiosError } from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Profile } from '../models/Profile';

const CompleteProfilePage: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // Ensure id is correctly typed
    const [avatar, setAvatar] = useState<string>('http://ssl.gstatic.com/accounts/ui/avatar_2x.png');
    const [formValues, setFormValues] = useState<Profile>({
        firstName: '',
        lastName: '',
        gender: '',
        dateOfBirth: new Date(),
        address: '',
        picture: '',
        phoneNumber: ''
    });
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: name === 'dateOfBirth' ? new Date(value) : value
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target) {
                    setAvatar(event.target.result as string);
                    setFormValues({
                        ...formValues,
                        picture: event.target.result as string
                    });
                }
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const handleProfileCompletion = async (e: React.FormEvent) => {
        e.preventDefault();

        setError('');

        try {
            const response = await axios.post(`https://localhost:7777/api/User/${id}/CompleteProfile`, formValues);
            console.log('Profile completion successful:', response.data);
            navigate('/home');
        } catch (err) {
            if (axios.isAxiosError(err)) {
                const axiosError = err as AxiosError<{ Error: string }>;
                if (axiosError.response) {
                    console.error('Profile completion failed:', axiosError.response.data);
                    setError(axiosError.response.data.Error || 'Profile completion failed');
                }
            } else {
                console.error('An unexpected error occurred:', err);
                setError('An unexpected error occurred');
            }
        }
    };

    return (
        <Container component="main" maxWidth="md">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    backgroundColor: '#f5f5f5',
                    padding: 2,
                    borderRadius: 1,
                    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                }}
            >
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={3} display="flex" flexDirection="column" alignItems="center">
                        <Avatar src={avatar} sx={{ width: 100, height: 100, marginBottom: 2 }} />
                        <Typography variant="body1">Upload a different photo...</Typography>
                        <Button variant="contained" component="label">
                            Upload File
                            <input type="file" hidden onChange={handleFileChange} />
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={9}>
                        <Typography component="h1" variant="h5" sx={{ marginBottom: 2 }}>
                            Complete Your Profile
                        </Typography>
                        <Box component="form" onSubmit={handleProfileCompletion} noValidate sx={{ mt: 1 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="First Name"
                                        name="firstName"
                                        autoComplete="fname"
                                        value={formValues.firstName}
                                        onChange={handleInputChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="lastName"
                                        label="Last Name"
                                        name="lastName"
                                        autoComplete="lname"
                                        value={formValues.lastName}
                                        onChange={handleInputChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography component="legend">Gender</Typography>
                                    <RadioGroup
                                        row
                                        aria-label="gender"
                                        name="gender"
                                        value={formValues.gender}
                                        onChange={handleInputChange}
                                    >
                                        <FormControlLabel value="Male" control={<Radio />} label="Male" />
                                        <FormControlLabel value="Female" control={<Radio />} label="Female" />
                                    </RadioGroup>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="dateOfBirth"
                                        label="Date of Birth"
                                        type="date"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        name="dateOfBirth"
                                        value={formValues.dateOfBirth.toISOString().split('T')[0]}
                                        onChange={handleInputChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="address"
                                        label="Address"
                                        name="address"
                                        autoComplete="address"
                                        value={formValues.address}
                                        onChange={handleInputChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="phoneNumber"
                                        label="Phone Number"
                                        name="phoneNumber"
                                        autoComplete="phone"
                                        value={formValues.phoneNumber}
                                        onChange={handleInputChange}
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2, backgroundColor: '#4CAF50', '&:hover': { backgroundColor: '#45A049' } }}
                            >
                                Complete Profile
                            </Button>
                            {error && <Typography color="error">{error}</Typography>}
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default CompleteProfilePage;
