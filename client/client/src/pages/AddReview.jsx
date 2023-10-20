import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button } from '@material-ui/core';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Import useParams to get parameters from the URL
import Cookies from 'js-cookie';

export default function AddReview() {
  const { id } = useParams(); // Use useParams to get the bookId from the URL

  // Use useFormik to handle the form state and submission
  const formik = useFormik({
    initialValues: {
      description: '',
      userId: Cookies.get('userId'), // You need to retrieve this from your cookies
      bookId: id, // This is coming from the URL
      dateAndTime: new Date().toISOString(),
    },
    validationSchema: Yup.object({
      description: Yup.string().required('Description is required'),
    }),
    onSubmit: (values, { setSubmitting }) => {
      // Make an API request to save the review
      axios.post('http://localhost:8083/reviews', values)
        .then((response) => {
          // Display a success message if the request is successful
          formik.resetForm();
          setSubmitting(false);
          alert('Review saved successfully');
          window.location.href = '/reviews/' + id;
        })
        .catch((error) => {
          // Display an error message if the request fails
          setSubmitting(false);
          alert('Failed to save review');
        });
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit} style={{margin: '15%'}}>
        <p style={{marginBottom: '10px'}}>Add Your Review About the Booking</p>
        <TextField
          id="description"
          name="description"
          label="Review Description"
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.description && Boolean(formik.errors.description)}
          helperText={formik.touched.description && formik.errors.description}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={formik.isSubmitting}
          style={{marginTop: '15px'}}
        >
          Submit
        </Button>
      </form>
    </div>
  );
}
