import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';
import useRegisterpage from './useRegister';
import ClearIcon from "@mui/icons-material/Clear";
import FileDownloadDoneIcon from "@mui/icons-material/FileDownloadDone";
import './Register.css';

function SignUpForm() {
  const navigate = useNavigate();
  const {
    register, handlechange, handleadd, hidePopup, successMessage, errorMessage, success, error,isLoading,showPassword,setShowPassword
  } = useRegisterpage();

  // const [showPassword, setShowPassword] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);

  const togglePassword = () => {
    setShowPassword(prev => !prev);
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setIsLoading(true);
  //   await handleadd();
  //   setIsLoading(false);
  // };

  const handleClose = () => {
    navigate('/');
  };

  return (
    <div className="signup-container">
      <nav className="navbar">
        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="#service">Service</a></li>
          <li><a href="#contact">Contact</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="/LoginForm" className="login-btn">Login</a></li>
        </ul>
      </nav>

      <div className="signup-background">        
        <div className="signup-card">
          <div className="signup-header">
            <button className="close-btn-header" onClick={handleClose}>×</button>
            <h2>Registration</h2>
          </div>


          <form className="signup-form" onSubmit={handleadd}>
            <div className="input-group">
              <input
                type="text"
                placeholder="Name"
                name="user_name"
                className="form-input"
                value={register?.user_name || ''}
                onChange={handlechange}
                required
              />
              <FontAwesomeIcon icon={faUser} className="input-icon" />
            </div>

            <div className="input-group">
              <input
                type="email"
                placeholder="Email"
                name="Email"
                className="form-input"
                value={register?.Email || ''}
                onChange={handlechange}
                required
              />
              <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
            </div>

            <div className="input-group">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                name="password"
                className="form-input"
                value={register?.password || ''}
                onChange={handlechange}
                required
              />
              <FontAwesomeIcon  onClick={togglePassword}icon={faLock} className="input-icon" />
            </div>

            <div className="options">
              <label className="remember-me">
                <input type="checkbox" />
                <span className="checkmark"></span>
                Agree to the Terms & Conditions
              </label>
            </div>

            <button 
              type="submit" 
              className={`signup-button ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="spinner"></div>
              ) : (
                'Register'
              )}
            </button>

            <div className="login-link">
              <p>
                Already have an account? 
                <button 
                  type="button" 
                  className="login-text" 
                  onClick={() => navigate('/LoginForm')}
                  style={{background: 'none', border: 'none', cursor: 'pointer'}}
                >
                  Login
                </button>
              </p>
            </div>
          </form>
        </div>

        <div className="alert-popup-main">
          {error && (
            <div className="alert-popup error-popup">
              <div className="popup-content">
                <div className="popup-icon error-icon">
                  <ClearIcon />
                </div>
                <p>{errorMessage}</p>
                <button className="close-btn" onClick={hidePopup}>×</button>
              </div>
            </div>
          )}

          {success && (
            <div className="alert-popup success-popup">
              <div className="popup-content">
                <div className="popup-icon success-icon">
                  <FileDownloadDoneIcon />
                </div>
                <p>{successMessage}</p>
                <button className="close-btn" onClick={hidePopup}>×</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SignUpForm;
