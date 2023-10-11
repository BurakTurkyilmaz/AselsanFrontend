// LoginPage.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store/hooks";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { setCurrentUser } from "../store/authSlice";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogin = () => {
    if (username === "admin" && password === "12345") {
      dispatch(setCurrentUser({ username, isAdmin: true }));
      navigate("/admin");
    } else {
      setError("Kullanici adi veya şifre hatali");
    }
  };

  return (
    <div>
      <h2>Login Page</h2>
      <TextField
        label="Kullanici Adi"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        type="password"
        label="Şifre"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleLogin}>
        Giriş Yap
      </Button>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
};

export default LoginPage;
