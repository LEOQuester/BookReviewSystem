import React, { useEffect, useState } from 'react';
import {
  Container,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
} from '@mui/material';
import Navbar from '../components/NavBar';
import { BrowserRouter as Router,Link,Route } from 'react-router-dom';
import Reviews from './Reviews';

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Fetch books data from http://localhost:8082/books
    fetch('http://localhost:8082/books')
      .then((response) => response.json())
      .then((data) => setBooks(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <Navbar />
      <Container>
        <Grid container spacing={2} justifyContent="center">
          {books.map((book) => (
            <Grid item xs={12} sm={6} md={3} key={book.id}>
              <Card style={{ width: '100%', marginTop: '40%', paddingTop: '20px' }}>
                {/* Display the decoded image data */}
                <CardMedia
                  component="img"
                  style={{ height: '200px', objectFit: 'contain' }}
                  src={`data:image/png;base64,${book.bookImage}`} // Assuming the image format is PNG
                  alt={book.bookName}
                />
                <CardContent>
                  <Typography variant="h6" component="div">
                    {book.bookName}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    Author: {book.bookAuthor}
                  </Typography>
                  <Typography variant="body1" color="textPrimary">
                    Price: ${book.bookPrice}
                  </Typography>
                  <Link to={`/reviews/${book.id}`} style={{ color: 'brown', cursor: 'pointer' }}>
                    See Reviews {book.id}
                  </Link>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default Books;
