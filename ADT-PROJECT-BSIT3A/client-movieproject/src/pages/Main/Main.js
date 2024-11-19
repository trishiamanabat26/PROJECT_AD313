import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import './Main.css';

function Main() {
  const accessToken = localStorage.getItem('accessToken');
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    navigate('/');  // Redirect to Login page after logout
  };

  useEffect(() => {
    if (
      accessToken === undefined ||
      accessToken === '' ||
      accessToken === null
    ) {
      navigate('/');  // If no accessToken, redirect to Login page
    }
  }, [accessToken, navigate]);

  return (
    <div className="Main">
      <div className="container">
        <div className="navigation">
          <ul>
            <li>
              <a
                onClick={() => {
                  if (accessToken) {
                    navigate('/main'); // If logged in, go to main
                  } else {
                    navigate('/'); // If not logged in, go to Login page
                  }
                }}
              >
                Movies
              </a>
            </li>
            {accessToken ? (
              <li className="logout">
                <a onClick={handleLogout}>Logout</a>
              </li>
            ) : (
              <li className="login">
                <a onClick={() => navigate('/')}>Login</a>
              </li>
            )}
          </ul>
        </div>
        <div className="outlet">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Main;
