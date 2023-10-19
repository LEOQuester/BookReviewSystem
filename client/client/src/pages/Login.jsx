import React from 'react';
import { Button, Container, Paper, TextField, Typography } from '@mui/material';
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
          alert('Login failed! please try again');
        }
      })
      .catch((error) => {
        console.error('Error during login:', error);
      });
  };

  return (
    <Container maxWidth="xs" style={{marginTop: '5%'}}>
      <Paper elevation={3} style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <LockIcon style={{ fontSize: '4rem', marginBottom: '1rem', color: 'primary' }} />
        <Typography variant="h4" component="h2">
          Login
        </Typography>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          <Form style={{ display: 'flex', flexDirection: 'column', width: '100%', }}>
            <Field as={TextField} label="Email" name="email" variant="outlined" margin="normal" />
            <ErrorMessage name="email" component="div" style={{ color: 'red' }} />

            <Field as={TextField} label="Password" name="password" type="password" variant="outlined" margin="normal" />
            <ErrorMessage name="password" component="div" style={{ color: 'red' }} />

            <Button type="submit" variant="contained" color="primary" style={{ marginTop: '1rem' }}>
              Login
            </Button>
          </Form>
        </Formik>
      </Paper>
    </Container>
  );
};

export default Login;
