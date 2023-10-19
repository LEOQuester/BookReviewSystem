import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, TextField, Grid, Paper, Typography, Container, CssBaseline } from '@mui/material';
import Navbar from '../components/NavBar';
import Cookies from 'js-cookie';

const AddBookForm = () => {
  const initialValues = {
    bookName: '',
    bookAuthor: '',
    bookDescription: '',
    bookPrice: '',
    image: null,
  };

  const validationSchema = Yup.object({
    bookName: Yup.string().required('Book Name is required'),
    bookAuthor: Yup.string().required('Book Author is required'),
    bookDescription: Yup.string().required('Book Description is required'),
    bookPrice: Yup.number().required('Book Price is required'),
    image: Yup.mixed().required('Image is required'),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    // Handle form submission here, including the API request to add a book
    // You'll need to use FormData to send the image as multipart form data
    const formData = new FormData();
    formData.append('userId', Cookies.get('userId'));
    formData.append('image', values.image);
    formData.append('bookName', values.bookName);
    formData.append('bookAuthor', values.bookAuthor);
    formData.append('bookDescription', values.bookDescription);
    formData.append('bookPrice', values.bookPrice);

    // Use fetch or axios to send the data to the server
    fetch('http://localhost:8082/books', {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          alert('Book Added Successfully');
        } else {
          return response.text().then((data) => alert(data));
        }
      })
      .catch((error) => console.error('Error:', error))
      .finally(() => setSubmitting(false));
  };

  return (
    <div>
      <Navbar />
      <Container component="main" maxWidth="xs" style={{marginTop: '10%'}}>
        <CssBaseline />
        <Paper elevation={3} style={{ padding: '2rem' }}>
          <Typography variant="h5" gutterBottom>
            Add a New Book
          </Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue }) => (
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      name="bookName"
                      label="Book Name"
                      variant="outlined"
                      fullWidth
                    />
                    <ErrorMessage name="bookName" component="div" />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      name="bookAuthor"
                      label="Book Author"
                      variant="outlined"
                      fullWidth
                    />
                    <ErrorMessage name="bookAuthor" component="div" />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      name="bookDescription"
                      label="Book Description"
                      variant="outlined"
                      fullWidth
                    />
                    <ErrorMessage name="bookDescription" component="div" />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      name="bookPrice"
                      label="Book Price"
                      type="number"
                      variant="outlined"
                      fullWidth
                    />
                    <ErrorMessage name="bookPrice" component="div" />
                  </Grid>
                  <Grid item xs={12}>
                    <input
                      type="file"
                      accept=".jpg, .jpeg, .png"
                      name="image"
                      onChange={(event) => {
                        setFieldValue('image', event.currentTarget.files[0]);
                      }}
                    />
                    <ErrorMessage name="image" component="div" />
                  </Grid>
                </Grid>

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  style={{ marginTop: '1rem' }}
                  fullWidth
                >
                  Add Book
                </Button>
              </Form>
            )}
          </Formik>
        </Paper>
      </Container>
    </div>
  );
};

export default AddBookForm;
