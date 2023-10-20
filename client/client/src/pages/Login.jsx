import React from 'react';
import { Button, Container, Paper, TextField, Typography, Link } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Cookies from 'js-cookie';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const Login = () => {
  const handleLogin = (values) => {
    axios.post('http://localhost:8081/users/login', values)
      .then((response) => {
        const { userId, message, status } = response.data;
        if (status) {
          // Save user information in a cookie if login is successful
          Cookies.set('userId', userId);
          Cookies.set('email', values.email);
          Cookies.set('password', values.password);
          alert('Login success! Proceed');
        } else {
          alert('Login failed! Please try again');
        }
      })
      .catch((error) => {
        console.error('Error during login:', error);
      });
  };

  return (
    <Container maxWidth="md" style={{ marginTop: '5%', display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ flex: 1 }}>
        {/* Add your image here */}
        <img src="/cover.jpg" alt="Your Image" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
      <Paper elevation={3} style={{ flex: 1, padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <LockIcon style={{ fontSize: '4rem', marginBottom: '1rem', color: 'primary' }} />
        <Typography variant="h4" component="h2">
          Login
        </Typography>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          <Form style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <Field as={TextField} label="Email" name="email" variant="outlined" margin="normal" />
            <ErrorMessage name="email" component="div" style={{ color: 'red' }} />

            <Field as={TextField} label="Password" name="password" type="password" variant="outlined" margin="normal" />
            <ErrorMessage name="password" component="div" style={{ color: 'red' }} />

            <Button type="submit" variant="contained" color="primary" style={{ marginTop: '1rem' }}>
              Login
            </Button>
            <Link href="/register" variant="body2">
              New user? Register here
            </Link>
          </Form>
        </Formik>
      </Paper>
    </Container>
  );
};

export default Login;
