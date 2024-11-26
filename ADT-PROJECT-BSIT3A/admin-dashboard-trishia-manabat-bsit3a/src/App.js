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
import Dashboard from './pages/Main/Dashboard/Dashboard'; // Import Dashboard component
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
        path: 'dashboard', // Route for the Dashboard
        element: <Dashboard />, // Render the Dashboard component
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
