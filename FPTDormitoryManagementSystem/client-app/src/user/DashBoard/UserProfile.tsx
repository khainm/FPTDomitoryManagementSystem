import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Container,
  TextField,
  Typography,
  Avatar,
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Box,
  IconButton
} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios, { AxiosError } from "axios";
import { Profile } from "../../models/Profile";

const UserProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [avatar, setAvatar] = useState<string>(
    "http://ssl.gstatic.com/accounts/ui/avatar_2x.png"
  );
  const [formValues, setFormValues] = useState<Profile>({
    firstName: "",
    lastName: "",
    gender: "",
    dateOfBirth: new Date(),
    address: "",
    picture: "",
    phoneNumber: "",
  });
  const [error, setError] = useState<string>("");
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    // Fetch user data to populate the form
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7777/api/User/${id}`
        );
        const userData = response.data;
        // Convert dateOfBirth string to Date object
        userData.dateOfBirth = new Date(userData.dateOfBirth);
        setFormValues(userData);
        setAvatar(userData.picture || avatar);
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };

    fetchUserData();
  }, [id]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: name === "dateOfBirth" ? new Date(value) : value,
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
            picture: event.target.result as string,
          });
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleProfileCompletion = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        `https://localhost:7777/api/User/${id}/CompleteProfile`,
        formValues
      );
      console.log("Profile completion successful:", response.data);
      navigate("../dashboard");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError<{ Error: string }>;
        if (axiosError.response) {
          console.error("Profile completion failed:", axiosError.response.data);
          setError(
            axiosError.response.data.Error || "Profile completion failed"
          );
        }
      } else {
        console.error("An unexpected error occurred:", err);
        setError("An unexpected error occurred");
      }
    }
  };

  const goBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5, p: 3, boxShadow: 3, borderRadius: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <IconButton onClick={goBack} color="primary">
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" component="h3" gutterBottom>
          Your Profile
        </Typography>
        <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiP5OOYYQ-OhLP2M0tapnypGkRBk9la5AmJg&s" />
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center" mb={4}>
        <Avatar
          src={avatar}
          sx={{ width: 150, height: 150, mb: 2 }}
        />
        <Button variant="contained" component="label">
          Upload a different photo...
          <input type="file" hidden onChange={handleFileChange} />
        </Button>
      </Box>
      <form onSubmit={handleProfileCompletion}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              value={formValues.firstName}
              onChange={handleInputChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              value={formValues.lastName}
              onChange={handleInputChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup
                row
                name="gender"
                value={formValues.gender}
                onChange={handleInputChange}
              >
                <FormControlLabel value="Male" control={<Radio />} label="Male" />
                <FormControlLabel
                  value="Female"
                  control={<Radio />}
                  label="Female"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              type="date"
              label="Date of Birth"
              name="dateOfBirth"
              value={formValues.dateOfBirth.toISOString().split("T")[0]}
              onChange={handleInputChange}
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address"
              name="address"
              value={formValues.address}
              onChange={handleInputChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Phone Number"
              name="phoneNumber"
              value={formValues.phoneNumber}
              onChange={handleInputChange}
              variant="outlined"
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 3 }}
        >
          Save Profile
        </Button>
        {error && <Typography color="error">{error}</Typography>}
      </form>
    </Container>
  );
};

export default UserProfile;
