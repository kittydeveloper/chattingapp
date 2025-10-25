import React, { useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { gsap } from 'gsap';
import './Navbar.css';
import { useUserchet } from '../ChatPage/chatcontext';

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const navbarRef = useRef(null);
    const buttonsRef = useRef([]);
               const{chatindividual,setChatIndividual}=useUserchet()
    

    useEffect(() => {
        // Navbar animation
        gsap.fromTo(navbarRef.current, 
            { y: -100, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.2 }
        );

        // Button hover animations setup
        buttonsRef.current.forEach(button => {
            if (button) {
                button.addEventListener('mouseenter', () => {
                    gsap.to(button, {
                        scale: 1.05,
                        y: -3,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                });
                
                button.addEventListener('mouseleave', () => {
                    gsap.to(button, {
                        scale: 1,
                        y: 0,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                });
            }
        });
    }, []);

    const isActivePage = (path) => {
        return location.pathname === path;
    };

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <nav className="shared-navbar navbar navbar-expand-lg" ref={navbarRef}>
            <div className="nav-container container-fluid">
                {/* <div className="logo" onClick={() => handleNavigation('/')} style={{cursor: 'pointer'}}>
                    <FontAwesomeIcon icon={faHeart} className="logo-icon" />
                    <span>datingnow</span>
                </div> */}

                <div 
  className="logo1" 
  onClick={() => handleNavigation('/')} 
  style={{ cursor: 'pointer', display: 'flex',flexDirection:"row", gap: '10px' }}
>
  <FontAwesomeIcon icon={faHeart} className="logo-icon" />
  <span style={{fontSize:"20px"}}>datingnow</span>
</div>

                
                <div className="nav-links">
                    
                    <button 
                        className={`nav-link ${isActivePage('/') ? 'active' : ''}`}
                        onClick={() => handleNavigation('/')}
                    >
                        Home
                    </button>
                    <button 
                        className={`nav-link ${isActivePage('/chat') ? 'active' : ''}`}
                        onClick={() => {handleNavigation('/chat')
                          setChatIndividual(true);
                        }}
                    >
                        Chat
                    </button>
                    <button 
                        className={`nav-link ${isActivePage('/discover') ? 'active' : ''}`}
                        onClick={() => handleNavigation('/discover')}
                    >
                        Discover
                    </button>
                    <button 
                        className="nav-link"
                        onClick={() => handleNavigation('#about')}
                    >
                        About
                    </button>
                    <button 
                        className="nav-link"
                        onClick={() => handleNavigation('#contact')}
                    >
                        Contact
                    </button>
                </div>
                
                <div className="auth-buttons">
                    <button 
                        className="login-link"
                        onClick={() => handleNavigation('/LoginForm')}
                        ref={el => buttonsRef.current[0] = el}
                    >
                        LogOut
                    </button>
                    {/* <button 
                        className="signup-btn btn"
                        onClick={() => handleNavigation('/signup')}
                        ref={el => buttonsRef.current[1] = el}
                    >
                        LogOut
                    </button> */}
                    <div className="hamburger-menu">
                        <div className="hamburger-line"></div>
                        <div className="hamburger-line"></div>
                        <div className="hamburger-line"></div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

