import React from 'react';
import { Container, Paper, TextField, Button, Typography, Grid, Link } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const validationSchema = Yup.object({
  username: Yup.string().required('Username is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

const Register = () => {
    const handleSubmit = (values, { setSubmitting }) => {
        // Create a JSON object from the form values
        const userData = {
          username: values.username,
          email: values.email,
          password: values.password,
        };
    
        // Use Axios to send the JSON object to the server
        axios
          .post('http://localhost:8081/users', userData)
          .then((response) => {
            if (response.data.status === true) {
              console.log('Registration Successful');
              alert(response.data.message); // Show a success message
            } else {
              console.log('Registration Failed');
              alert(response.data.message); // Show an error message
            }
          })
          .catch((error) => {
            console.error('Error:', error);
            alert('Registration Failed'); // Show a generic error message
          })
          .finally(() => setSubmitting(false));
      };

  return (
    <Container component="main" maxWidth="lg" style={{ marginTop: '5%' }}>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <img
            src="/cover.jpg"
            alt="Your Image"
            style={{ width: '100%', height: '77%', objectFit: 'cover' }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper elevation={3} style={{ padding: '2rem' }}>
            <Typography variant="h5">User Registration</Typography>
            <Formik
              initialValues={{ username: '', email: '', password: '', confirmPassword: '' }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Field as={TextField} name="username" label="Username" variant="outlined" fullWidth />
                    <ErrorMessage name="username" component="div" style={{ color: 'red' }} />
                  </Grid>
                  <Grid item xs={12}>
                    <Field as={TextField} name="email" label="Email" variant="outlined" fullWidth />
                    <ErrorMessage name="email" component="div" style={{ color: 'red' }} />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      name="password"
                      type="password"
                      label="Password"
                      variant="outlined"
                      fullWidth
                    />
                    <ErrorMessage name="password" component="div" style={{ color: 'red' }} />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      name="confirmPassword"
                      type="password"
                      label="Confirm Password"
                      variant="outlined"
                      fullWidth />
                    <ErrorMessage name="confirmPassword" component="div" style={{ color: 'red' }} />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  style={{ marginTop: '1rem' }}
                  fullWidth
                >
                  Register
                </Button>
                <Link href="/login" variant="body2">
                  Already Registered? Login here
                </Link>
              </Form>
            </Formik>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Register;
