import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { BrowserRouter as Router,Link,Route } from 'react-router-dom';
import Books from './pages/Books'; 
import Login from './pages/Login'; 
import AddBook from './pages/AddBook';
import { Add } from '@mui/icons-material';
import Register from './pages/Register';
import Reviews from './pages/Reviews';
import AddReview from './pages/AddReview';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/addBook",
    element: <AddBook />,
  },
  {
    path: "/all-books",
    element: <Books/>,
  },
  {
    path: "/register",
    element: <Register/>,
  },
  {
    path: "/reviews",
    element: <Reviews/>,
  },
  {
    path: "/reviews/:id",
    element: <Reviews/>,
  },
  {
    path: "/add-review",
    element: <AddReview/>,
  },
  {
    path: "/add-review/:id",
    element: <AddReview/>,
  },
  
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
