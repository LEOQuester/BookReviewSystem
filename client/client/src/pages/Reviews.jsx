import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router,Link,Route } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Button, Container, Paper, Typography, Grid, Card, CardContent, CardMedia } from '@mui/material';
import axios from 'axios';
import Navbar from '../components/NavBar';
import Cookies from 'js-cookie';

export default function Reviews() {
  const { id } = useParams();
  const [bookDetails, setBookDetails] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Fetch book details using the ID from the URL
    axios.get(`http://localhost:8082/books/${id}`)
      .then(response => {
        setBookDetails(response.data);
      })
      .catch(error => {
        console.error('Error fetching book details:', error);
      });

    // Fetch reviews for the book
    axios.get(`http://localhost:8083/reviews/${id}`)
      .then(response => {
        setReviews(response.data);
      })
      .catch(error => {
        console.error('Error fetching reviews:', error);
      });
  }, [id]);

  const decodeBase64Image = (base64) => {
    const binaryString = window.atob(base64);
    const binaryLen = binaryString.length;
    const bytes = new Uint8Array(binaryLen);
    for (let i = 0; i < binaryLen; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    const blob = new Blob([bytes], { type: 'image/jpeg' });
    return URL.createObjectURL(blob);
  };

  const formatDateTime = (dateTimeString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const dateTime = new Date(dateTimeString);
    return dateTime.toLocaleDateString('en-US', options);
  };

  const handleReviewDelete = (id) => {
    // Get the userId and password from cookies
    const userId = Cookies.get('userId');
    const password = Cookies.get('password');
  
    // Create a JSON object with the data to be sent
    const data = {
      id: id,
      userId: userId,
      password: password,
    };
  
    // Make the DELETE request to delete the review
    axios
      .delete(`http://localhost:8083/reviews/`, { data })
      .then((response) => {
        // Display the response message
        alert(response.data);
  
        // Reload the existing page (you can use window.location.reload())
        window.location.reload();
      })
      .catch((error) => {
        // Handle errors here
        console.error('Error deleting review: ', error);
      });
  };

  return (
    <div><Navbar/>
    <Container maxWidth="md" style={{marginTop: '10%'}}>
      {bookDetails ? (
        <Paper elevation={3} style={{ padding: '2rem' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Card>
                <CardMedia
                  component="img"
                  alt={bookDetails.bookName}
                  height="300"
                  style={{ objectFit: 'contain' }}
                  image={decodeBase64Image(bookDetails.bookImage)}
                />
                <CardContent>
                  <Typography variant="h4" component="div">
                    {bookDetails.bookName}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    Author: {bookDetails.bookAuthor}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Description:</strong> {bookDetails.bookDescription}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Price:</strong> ${bookDetails.bookPrice}
                  </Typography>
                  <Typography variant="subtitle2" color="textSecondary">
                    <strong>Uploaded by:</strong> {bookDetails.userName}
                  </Typography>
                  <Typography variant="subtitle2" color="textSecondary">
                    <strong>Contact Email:</strong> {bookDetails.userEmail}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Paper>
      ) : (
        <Typography variant="h6">Loading book details...</Typography>
      )}

      <Paper elevation={3} style={{ padding: '2rem', marginTop: '2rem' }}>
        <Typography variant="h5" component="div">
          Reviews
        </Typography>
        {reviews.length > 0 ? (
          reviews.map(review => (
            <Paper key={review.id} style={{ padding: '1rem', margin: '1rem 0' }}>
              <Typography variant="body1">
                <strong>Review:</strong> {review.description}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                <strong>Date and Time:</strong> {formatDateTime(review.dateAndTime)}
              </Typography>
              <Button onClick={() => handleReviewDelete(review.id)} style={{ background: 'maroon', float: 'right', color: 'white' }}>Delete</Button>
            </Paper>
          ))
        ) : (
          <Typography variant="body2">No reviews available for this book.</Typography>
        )}
        <Link to={`/add-review/${id}`} style={{ color: 'brown', cursor: 'pointer' }}>
                    Add a Review To This Book
        </Link>
      </Paper>
    </Container>
    </div>
  );
}
