import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import './Main.css';

function Main() {
  const accessToken = localStorage.getItem('accessToken');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    navigate('/');
  };

  useEffect(() => {
    if (!accessToken) {
      handleLogout();
    }
  }, []);

  return (
    <div className="Main">
      <div className="container">
        {/* Sidebar Navigation */}
        <div className="navigation">
          <ul>
            <li>
              <a href="/main/dashboard">Dashboard</a>
            </li>
            <li>
              <a href="/main/movies">Movies</a>
            </li>
            <li className="logout">
              <a onClick={handleLogout}>Logout</a>
            </li>
          </ul>
        </div>
        {/* Main Content Area */}
        <div className="outlet">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Main;
