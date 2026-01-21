import React, { useState } from 'react';
import { TextField, Box, Button } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:3000/auth/login', {
      email: email,
      password: password
    })
   /* .then((res) => {
      alert(res.data.message);
      let token = res.data.token;
      let user = res.data.user;
      
      if (token) {
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(user));


      if (res.data.role === "Admin") {
        navigate('/admin-dashboard');
      } 
      if (res.data.role === "Ceo") {
        navigate('/ceo-dashboard');
      }
      if (res.data.role === "KO-Head") {
        navigate('/kohead-dashboard');
      }
      if (res.data.role === "KO-Lead") {
        navigate('/kolead-dashboard');
      }
      if (res.data.role === "OU-Head") {
        navigate('/ouhead-dashboard');
      }
      if (res.data.role === "Trainer") {
        navigate('/trainer-dashboard');
      }
   }}) */
.then((res) => {
  alert(res.data.message);

  const token = res.data.token;
  const user = res.data.user;

  if (token && user) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    const role = user.role; // ✅ FIX

    if (role === "Admin") {
      navigate('/admin-dashboard');
    } else if (role === "CEO") {
      navigate('/ceo-dashboard');
    } else if (role === "KO Head") {
      navigate('/kohead-dashboard');
    } else if (role === "KO Lead") {
      navigate('/kohead-dashboard');
    } else if (role === "OU Head") {
      navigate('/ouhead-dashboard');
    } else if (role === "Trainer") {
      navigate('/trainer-dashboard');
    } else {
      alert("No dashboard assigned for this role");
    }
  }
})
.catch((err) => {
      alert(err.response?.data?.message || "Error");
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, m: 'auto' }} className='log'>
     <h2>Login</h2>

      <TextField
        label="Email"
        fullWidth
        variant="standard"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <TextField
        label="Password"
        type="password"
        fullWidth
        variant="standard"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

     <Button
  fullWidth
  variant="contained"
  type="submit"
>
  Login
</Button>
    </Box>
  );
};

export default Login;


