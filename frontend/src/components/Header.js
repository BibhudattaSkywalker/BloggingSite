import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = () => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    setIsAuthenticated(!!token);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/login');
  };

  const handleLogin = () => {
    const token =localStorage.getItem('token');
    token ? setIsAuthenticated(true) : setIsAuthenticated(false);
    !token && navigate('/login');
    token && navigate('/')
  };

  const handleNavigation = (path) => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      navigate(path);
    }
  };

  return (
    <header className="p-4 bg-gray-800 text-white flex justify-between items-center">
      <h1 className="text-xl font-bold">Blog Site</h1>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <button 
              onClick={() => handleNavigation('/')}
              className="hover:underline"
            >
              Home
            </button>
          </li>
          <li>
            <button 
              onClick={() => handleNavigation('/create')}
              className="hover:underline"
            >
              Create Blog
            </button>
          </li>
          
            {isAuthenticated ? (
              <>
              <li><button 
                  onClick={() => handleNavigation('/profile')}
                  className="hover:underline"
                >
                  Profile
                </button></li>
                <li><button 
                  onClick={handleLogout} 
                  className="hover:underline"
                >
                  Logout
                </button></li>
                
              </>
            ) : (
              <>
                <button 
                  onClick={handleLogin}
                  className="hover:underline"
                >
                  Login1
                </button>
                <button 
                  onClick={() => navigate('/signup')}
                  className="hover:underline"
                >
                  Signup
                </button>
              </>
            )}
          
        </ul>
      </nav>
    </header>
  );
};

export default Header;
