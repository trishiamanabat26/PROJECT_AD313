import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import './Main.css';

function Main() {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('accessToken');

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    navigate('/'); // Redirect to the login page after logout
  };

  useEffect(() => {
    if (!accessToken) {
      navigate('/'); // Redirect to login if there's no access token
    } else {
      navigate('/main'); // Ensure the main content is accessible if logged in
    }
  }, [accessToken, navigate]);

  return (
    <div className="Main">
      <div className="container">
        <div className="navigation">
          <ul>
            <li>
              <a onClick={() => navigate('/main')}>Movies</a>
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
          <Outlet /> {/* Render child routes here */}
        </div>
      </div>
    </div>
  );
}

export default Main;
