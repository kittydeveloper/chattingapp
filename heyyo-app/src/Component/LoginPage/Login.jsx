// import React,{useState} from 'react';
// import './Login.css';
// import useLogin from './useLogin';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {faEyeSlash,faEye} from "@fortawesome/free-solid-svg-icons";
// // import InfoIcon from "@mui/icons-material/Info";
// import ClearIcon from "@mui/icons-material/Clear";
// // import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
// import FileDownloadDoneIcon from "@mui/icons-material/FileDownloadDone";
// import { BsInfo } from "@react-icons/all-files/bs/BsInfo";
// import { FcGoogle } from "react-icons/fc";
// const LoginForm = () => {

//      const {  formData, info,
      
//         handleLogin,
//         handleInputChange,hidePopup,successMessage,errorMessage,infoMessage,success,error
//       } = useLogin();
//          const [showPassword, setShowPassword] = useState(false);

//   const togglePassword = () => {
//     setShowPassword(prev => !prev);
//   };
//   console.log(showPassword,"pp")
//   return (
//     <div className="login-container">
//         <form className="login-form" >
//       <h2>Login</h2>

//       <div className="input-group">
//         <span className="icon">📧</span>
//        <input
//                             type="text"
//                             id="username"
//                             name="username"
//                             className='inputLoginpage'
//                             value={formData.username}
//                             onChange={handleInputChange}
                           
//                         />
//       </div>

//       <div className="input-group">
//         <span className="icon">🔒</span>
//          <input
//                               type={showPassword ? 'text' : 'password'}
//                             id="password"
//                             name="userpassword"
//                             className='inputLoginpage'
//                             value={formData.userpassword}
//                             onChange={handleInputChange}
                          
//                         />


//                         <span
//         onClick={togglePassword}
//         className="toggle-password"
//         style={{
//           position: 'absolute',
//           right: '10px',
//           top: '50%',
//           transform: 'translateY(-50%)',
//           cursor: 'pointer',
//         }}
//       >
//  {showPassword ? (
//           <FontAwesomeIcon icon={faEyeSlash} size="lg" />
//         ) : (
//           <FontAwesomeIcon icon={faEye} size="lg" />
//         )}      </span>
//       </div>

//       <div className="options">
       
//         <a>Forget password</a>
//       </div>

//       <button className="login-btn" onClick={(e) => handleLogin(e)}>Log in</button>
//       {/* <p>create new account please ?  <span><a class="nav-link" href="#">Link</a></span></p> */}
//       <p>
          
//   Create new account please? <a href="/signup" class="ms-1 text-primary text-decoration-underline">Signin</a>
// </p>

//       <div className="divider">
//         <span>other</span>
//       </div>

//       <button className="google-btn">
//       <FcGoogle size="32px" />
//         Continue with google
//       </button>
//       </form>

//         <div className="alert-popup-main">
//           {error && (
//             <div className="alert-popup Error">
//               <div className="popup-icon " onClick={hidePopup}>
//                 {" "}
//                 <ClearIcon  color="action"/>{" "}
//               </div>
//               {/* <span className="cancel-btn" onClick={hidePopup}>
//                 <ClearIcon color="action" />{" "}
//               </span> */}
//               <p>{errorMessage}</p>
//             </div>
//           )}

//           {info && (
//             <div className="alert-popup Info">
//               <div className="popup-icon">
//                 <BsInfo />
//               </div>
//               <span className="cancel-btn" onClick={hidePopup}>
//                 <ClearIcon color="action" />
//               </span>
//               <p>{infoMessage}</p>
//             </div>
//           )}
//           {success && (
//             <div className="alert-popup Success">
//               <div className="popup-icon">
//                 <FileDownloadDoneIcon />
//               </div>
//               <span className="cancel-btn" onClick={hidePopup}>
//                 <ClearIcon color="action" />
//               </span>
//               <p>{successMessage}</p>
//             </div>
//           )}
//           {/* {warning &&
//             <div className='alert-popup Warning' >
//               <div className="popup-icon"> <ErrorOutlineIcon /> </div>
//               <span className='cancel-btn' onClick={hidePopup}><ClearIcon color='action' /> </span>
//               <p>{warningMessage}</p>
//             </div>
//           } */}
//         </div>
//     </div>
//   );
// };

// export default LoginForm;

import React, { useState, useEffect, useRef } from 'react';
import './Login.css';
import useLogin from './useLogin';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye, faUser, faLock, faHeart } from "@fortawesome/free-solid-svg-icons";
import ClearIcon from "@mui/icons-material/Clear";
import FileDownloadDoneIcon from "@mui/icons-material/FileDownloadDone";
import { BsInfo } from "@react-icons/all-files/bs/BsInfo";
import { FcGoogle } from "react-icons/fc";
import { gsap } from 'gsap';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const navigate = useNavigate();
  const {
    formData,
    info,
    handleLogin,
    handleInputChange,
    hidePopup,
    successMessage,
    errorMessage,
    infoMessage,
    success,
    error,
    setShowPassword,isLoading, showPassword
  } = useLogin();

  // const [showPassword, setShowPassword] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  
  // Refs for animations
  const cardRef = useRef(null);
  const lipsRef = useRef([]);

  const togglePassword = () => {
    setShowPassword(prev => !prev);
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setIsLoading(true);
  //   await handleLogin(e);
  //   setIsLoading(false);
  // };

  const handleClose = () => {
    navigate('/');
  };

  useEffect(() => {
    // Card entrance animation
    gsap.fromTo(cardRef.current,
      { y: 50, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" }
    );

    // Animate flying lips
    lipsRef.current.forEach((lip, index) => {
      if (lip) {
        gsap.set(lip, {
          x: Math.random() * window.innerWidth,
          y: window.innerHeight + 100
        });
        
        gsap.to(lip, {
          y: -100,
          x: `+=${Math.random() * 200 - 100}`,
          rotation: 360,
          duration: 12 + Math.random() * 6,
          ease: "none",
          repeat: -1,
          delay: Math.random() * 10
        });
      }
    });
  }, []);

  return (
    <div className="login-container">
      <nav className="navbar">
        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/discover">Discover</a></li>
          <li><a href="/chat">Chat</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="/signup" className="signup-btn">Sign Up</a></li>
        </ul>
      </nav>

      <div className="login-background">
        {/* Flying Lips Animation */}
        <div className="floating-elements">
          {[...Array(8)].map((_, i) => (
            <div 
              key={i} 
              className="floating-lips" 
              ref={el => lipsRef.current[i] = el}
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 8}s`,
                animationDuration: `${12 + Math.random() * 6}s`
              }}
            >
              💋
            </div>
          ))}
        </div>
        
        <div className="login-card" ref={cardRef}>
          <div className="login-header">
            <button className="close-btn-header" onClick={handleClose}>×</button>
            <h2>Welcome Back</h2>
            <p>Sign in to continue your journey</p>
          </div>

          <form className="login-form" onSubmit={handleLogin}>
            <div className="input-group">
              <input
                type="text"
                id="username"
                name="username"
                className="form-input"
                placeholder="Username or Email"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
              <FontAwesomeIcon icon={faUser} className="input-icon" />
            </div>

            <div className="input-group">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="userpassword"
                className="form-input"
                placeholder="Password"
                value={formData.userpassword}
                onChange={handleInputChange}
                required
              />
              <FontAwesomeIcon icon={faLock} className="input-icon" />
              <span onClick={togglePassword} className="password-toggle">
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </span>
            </div>

            <div className="options">
              <label className="remember-me">
                <input type="checkbox" />
                <span className="checkmark"></span>
                Remember me
              </label>
              <a href="#" className="forgot-password">Forgot password?</a>
            </div>

            <button 
              type="submit" 
              className={`login-button ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="spinner"></div>
              ) : (
                'Sign In'
              )}
            </button>

            <div className="signup-link">
              <p>
                Don't have an account? 
                <button 
                  type="button" 
                  className="signup-text" 
                  onClick={() => navigate('/signup')}
                  style={{background: 'none', border: 'none', cursor: 'pointer'}}
                >
                  Create one
                </button>
              </p>
            </div>

            <div className="divider">
              <span>or continue with</span>
            </div>

            <button type="button" className="google-btn">
              <FcGoogle size="20px" />
              Continue with Google
            </button>
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

          {info && (
            <div className="alert-popup info-popup">
              <div className="popup-content">
                <div className="popup-icon info-icon">
                  <BsInfo />
                </div>
                <p>{infoMessage}</p>
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
};

export default LoginForm;