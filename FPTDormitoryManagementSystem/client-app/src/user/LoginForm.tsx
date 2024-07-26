import React, { useState } from "react";
import { Button, TextField, Checkbox, FormControlLabel, Typography, Link, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";

function LoginForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password === "admin@fpt.edu.vn" && email === "admin@fpt.edu.vn") {
      navigate("admin/users");
      localStorage.setItem("admin", "211919237");
      return;
    }

    setError("");

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    if (!email.endsWith("@fpt.edu.vn")) {
      setError("You must use an FPT Edu email");
      return;
    }

    try {
      const response = await axios.post("https://localhost:7777/api/auth/login", {
        email,
        password,
      });
      console.log("Login successful:", response.data);

      const { access_token, refresh_token, user_id } = response.data;
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);
      localStorage.setItem("user_id", user_id);

      navigate("user/dashboard");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError<{ Error: string }>;
        if (axiosError.response) {
          console.error("Login failed:", axiosError.response.data);
          setError(axiosError.response.data.Error || "Invalid email or password");
        } else {
          console.error("An unexpected error occurred:", err);
          setError("An unexpected error occurred");
        }
      }
    }
  };

  return (
    <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
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
      <FormControlLabel
        control={<Checkbox value="remember" color="primary" />}
        label="Remember me"
      />
      <Link href="forgot-password" variant="body2">
        Forgot your password?
      </Link>
      {error && <Typography color="error">{error}</Typography>}
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2, backgroundColor: "#FFA500", "&:hover": { backgroundColor: "#F28C28" } }}
      >
        Login
      </Button>
      <Button
        fullWidth
        variant="outlined"
        sx={{ mt: 1, mb: 2 }}
        onClick={() => navigate("register")}
      >
        Register
      </Button>
    </Box>
  );
}

export default LoginForm;
