import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Login from './pages/Public/Login/Login';
import Main from './pages/Main/Main';
import Movie from './pages/Main/Movie/Movie';
import Lists from './pages/Main/Movie/Lists/Lists';
import Form from './pages/Main/Movie/Form/Form';
import Register from './pages/Public/Register/Register';
import Dashboard from './pages/Main/Dashboard/Dashboard'; 
import netflixxImage from './pages/Public/Login/netflixx.jpg';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/Register',
    element: <Register />,
  },
  {
    path: '/main',
    element: <Main />,
    children: [
      {
        path: 'dashboard', 
        element: <Dashboard />, 
      },
      {
        path: '/main/movies',
        element: <Movie />,
        children: [
          {
            path: '/main/movies',
            element: <Lists />,
          },
          {
            path: '/main/movies/form/:movieId?',
            element: <Form />,
            children: [
              {
                path: '/main/movies/form/:movieId',
                element: (
                  <h1></h1>
                ),
              },
              {
                path: '/main/movies/form/:movieId/cast-and-crews',
                element: (
                  <h1>
                   
                  </h1>
                ),
              },
              {
                path: '/main/movies/form/:movieId/photos',
                element: (
                  <h1></h1>
                ),
              },
              {
                path: '/main/movies/form/:movieId/videos',
                element: (
                  <h1></h1>
                ),
              },
            ],
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <div className='App'>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;