import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  const { user, logout, isAdmin, isUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Track scroll position to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-dark-card/70 backdrop-blur-xl shadow-lg border-b border-dark-border/40' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo and App Name */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-8 w-8 text-primary" 
                viewBox="0 0 24 24" 
                fill="currentColor"
              >
                <path d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl font-bold">
                <span className="text-white">Lightning</span>
                <span className="text-primary-light">Time</span>
              </h1>
              <span className="text-[10px] text-gray-400 leading-none mt-1">
                <span className="inline-flex items-center">
                  <svg className="w-2 h-2 mr-1 text-yellow-500" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                  </svg> 
                  Bitcoin Powered
                </span>
              </span>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {user && (
              <>
                {isUser() && (
                  <Link 
                    to="/user" 
                    className={`text-sm transition-colors ${
                      isActive('/user') 
                        ? 'text-primary font-medium' 
                        : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    Dashboard
                  </Link>
                )}
                
                <Link 
                  to="/analytics" 
                  className={`text-sm transition-colors ${
                    isActive('/analytics') 
                      ? 'text-primary font-medium' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  Analytics
                </Link>
                
                {isAdmin() && (
                  <Link 
                    to="/admin" 
                    className={`text-sm transition-colors ${
                      isActive('/admin') 
                        ? 'text-primary font-medium' 
                        : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    Admin Panel
                  </Link>
                )}
                
                <div className="h-6 w-px bg-dark-border/70"></div>
                
                <div className="flex items-center space-x-3">
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-white">{user.username}</span>
                  </div>
                  
                  <button 
                    onClick={handleLogout}
                    className="relative overflow-hidden group btn bg-dark-lighter border border-dark-border hover:bg-dark-border text-sm py-1.5 transition-all duration-300"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 inline text-gray-400 group-hover:text-white transition-colors duration-300" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V7.414a1 1 0 00-.293-.707L11.414 2.414A1 1 0 0010.707 2H4a1 1 0 00-1 1zm9 2.414L14.586 7H12V5.414zM15 9h-3v2h3v3h-3v2h3v1a1 1 0 01-1 1H4a1 1 0 01-1-1V4a1 1 0 011-1h6v2H4v12h10V9z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-300 group-hover:text-white transition-colors duration-300">Logout</span>
                  </button>
                </div>
              </>
            )}
            
            {!user && (
              <Link to="/" className="btn bg-primary text-white transition-all duration-300 shadow-md hover:bg-primary-dark">
                Login
              </Link>
            )}
          </div>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden text-gray-300 hover:text-white focus:outline-none relative"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <div className="absolute -inset-2 bg-dark-lighter/50 rounded-full backdrop-blur-sm -z-10 opacity-0 hover:opacity-100 transition-opacity"></div>
            {mobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-dark-card/95 backdrop-blur-sm border-t border-dark-border/30 py-4 animate-fadeIn">
          <div className="container mx-auto px-4 flex flex-col space-y-3">
            {user ? (
              <>
                <div className="flex items-center justify-between p-3 bg-dark-lighter/70 backdrop-blur-sm rounded-lg border border-dark-border/50">
                  <div>
                    <div className="text-sm font-medium text-white">{user.username}</div>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/20 text-primary-light">
                    Active
                  </span>
                </div>
                
                {isUser() && (
                  <Link 
                    to="/user" 
                    className={`p-3 rounded-lg w-full text-left ${isActive('/user') ? 'bg-primary/10 text-primary-light' : 'text-gray-300 hover:bg-dark-lighter/70'}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 inline" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                    </svg>
                    Dashboard
                  </Link>
                )}
                
                <Link 
                  to="/analytics" 
                  className={`p-3 rounded-lg w-full text-left ${isActive('/analytics') ? 'bg-primary/10 text-primary-light' : 'text-gray-300 hover:bg-dark-lighter/70'}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 inline" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                  </svg>
                  Analytics
                </Link>
                
                {isAdmin() && (
                  <Link 
                    to="/admin" 
                    className={`p-3 rounded-lg w-full text-left ${isActive('/admin') ? 'bg-primary/10 text-primary-light' : 'text-gray-300 hover:bg-dark-lighter/70'}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 inline" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
                    </svg>
                    Admin Panel
                  </Link>
                )}
                
                <button 
                  onClick={handleLogout}
                  className="p-3 rounded-lg w-full text-left bg-red-900/20 border border-red-900/30 text-red-400 hover:bg-red-900/30"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 inline" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V7.414a1 1 0 00-.293-.707L11.414 2.414A1 1 0 0010.707 2H4a1 1 0 00-1 1z" clipRule="evenodd" />
                    <path d="M10 18a1 1 0 001-1v-6h3a1 1 0 00.707-1.707l-7-7a1 1 0 00-1.414 0l-7 7A1 1 0 00.586 11H4v6a1 1 0 001 1h5z" />
                  </svg>
                  Logout
                </button>
              </>
            ) : (
              <Link 
                to="/" 
                className="btn bg-primary text-white w-full text-center shadow-lg hover:bg-primary-dark"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;