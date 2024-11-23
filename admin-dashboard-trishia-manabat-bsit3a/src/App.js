import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Login from './pages/Public/Login/Login';
import Main from './pages/Main/Main';
import Movie from './pages/Main/Movie/Movie';
import Lists from './pages/Main/Movie/Lists/Lists';
import Form from './pages/Main/Movie/Form/Form';
import Register from './pages/Public/Register/Register';
import CastAndCrews from './pages/Main/CastAndCrews/CastAndCrews'; // Correct import path

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/Register', // Register route
    element: <Register />,
  },
  {
    path: '/main',
    element: <Main />,
    children: [
      {
        path: 'movies', // Relative path to '/main/movies'
        element: <Movie />,
        children: [
          {
            path: '', // Default path for '/main/movies'
            element: <Lists />,
          },
          {
            path: 'form/:movieId?', // Use relative path for the form
            element: <Form />,
          },
        ],
      },
      {
        path: 'cast', // Relative path to '/main/cast'
        element: <CastAndCrews />, // Render the CastAndCrews component
      },
    ],
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
