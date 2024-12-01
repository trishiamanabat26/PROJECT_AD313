import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Login from './pages/Public/Login/Login';
import Main from './pages/Main/Main';
import Movie from './pages/Main/Movie/Movie';
import Lists from './pages/Main/Movie/Lists/Lists';
import Form from './pages/Main/Movie/Form/Form';
import Register from './pages/Public/Register/Register';
import CastAndCrews from './pages/Main/CastAndCrews/CastAndCrews';
import Dashboard from './pages/Main/Dashboard/Dashboard'; 
import Photo from './pages/Main/Photos/Photo'; 
import Video from './pages/Main/Videos/Videos'; 
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
        path: 'movies',
        element: <Movie />,
        children: [
          {
            path: '',
            element: <Lists />,
          },
          {
            path: 'form/:movieId?',
            element: <Form />,
          },
        ],
      },
      {
        path: 'cast',
        element: <CastAndCrews />,
      },
      {
        path: 'photos',
        element: <Photo />, 
      },
      {
        path: 'videos', 
        element: <Video />,
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
