import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import './Main.css';

function Main() {
  const accessToken = localStorage.getItem('accessToken');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    navigate('/'); // Redirect to Login page
  };

  useEffect(() => {
    if (!accessToken) {
      navigate('/'); // Redirect to Login if not authenticated
    }
  }, [accessToken, navigate]);

  return (
    <div className="Main">
      <div className="container">
        <div className="navigation">
          <ul>
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/main'); // Navigate to Home
                }}
              >
                Movies
              </a>
            </li>
            {accessToken ? (
              <li className="logout">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLogout(); // Logout action
                  }}
                >
                  Logout
                </a>
              </li>
            ) : (
              <li className="login">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/'); // Navigate to Login
                  }}
                >
                  Login
                </a>
              </li>
            )}
          </ul>
        </div>
        <div className="outlet">
          <Outlet /> {/* Renders child routes */}
        </div>
      </div>
    </div>
  );
}

export default Main;
