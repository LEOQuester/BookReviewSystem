import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

const Navbar = () => {
  return (
    <AppBar position="fixed" style={{background: '#360b0d'}}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Book Review System
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button style={{background: '#f7aa0f', margin: '5px'}} color="inherit" component={Link} to="/all-books">
            All Books
          </Button>
          <Button style={{background: '#f7aa0f', margin: '5px'}} color="inherit" component={Link} to="/addBook">
            Add Book to Review
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
