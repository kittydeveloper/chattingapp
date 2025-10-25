import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faSearch, faArrowRight, faEnvelope, faMobile, faPlay, faUsers, faVenus, faMars } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faTwitter as faTwitterBrand, faPinterestP, faGooglePlusG } from "@fortawesome/free-brands-svg-icons";
import { Link, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import homepageImage from '../../Assest/homepage.jpg';
import appleStoreImage from '../../Assest/appleStoreImage.jpg';
import googlePlayImage from '../../Assest/googlePlayImage.jpg';
import './Home.css';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export const Home = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [isVisible, setIsVisible] = useState(false);
    
    // Refs for animations
    const containerRef = useRef(null);
    const heroTitleRef = useRef(null);
    const heroDescRef = useRef(null);
    const formRef = useRef(null);
    const illustrationRef = useRef(null);
    const navbarRef = useRef(null);
    const statsRef = useRef(null);
    const buttonsRef = useRef([]);

    useEffect(() => {
        // Check if device is mobile
        const isMobile = window.innerWidth <= 768;
        
        // Disable Lenis smooth scrolling completely for better performance
        // const lenis = new Lenis({
        //     duration: isMobile ? 0.3 : 0.8,
        //     easing: (t) => t,
        //     direction: 'vertical',
        //     gestureDirection: 'vertical',
        //     smooth: !isMobile,
        //     mouseMultiplier: isMobile ? 0.5 : 0.8,
        //     smoothTouch: false,
        //     touchMultiplier: isMobile ? 1 : 1.5,
        //     infinite: false,
        // });

        // Lenis animation frame with performance optimization
        // function raf(time) {
        //     lenis.raf(time);
        //     requestAnimationFrame(raf);
        // }
        // requestAnimationFrame(raf);

        // Update ScrollTrigger on scroll with throttling
        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    ScrollTrigger.update();
                    ticking = false;
                });
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', handleScroll, { passive: true });

        // GSAP Timeline for initial animations with reduced complexity
        const tl = gsap.timeline({ delay: isMobile ? 0.1 : 0.3 }); // Much faster on mobile

        // Navbar animation - simplified
        tl.fromTo(navbarRef.current, 
            { y: isMobile ? -20 : -50, opacity: 0 }, // Less movement on mobile
            { y: 0, opacity: 1, duration: isMobile ? 0.3 : 0.6, ease: "power2.out" } // Faster on mobile
        )
        // Hero title animation - simplified
        .fromTo(heroTitleRef.current,
            { y: isMobile ? 20 : 50, opacity: 0, scale: 0.98 }, // Less movement on mobile
            { y: 0, opacity: 1, scale: 1, duration: isMobile ? 0.4 : 0.8, ease: "power2.out" }, // Faster on mobile
            "-=0.2"
        )
        // Hero description animation - simplified
        .fromTo(heroDescRef.current,
            { y: isMobile ? 15 : 30, opacity: 0 }, // Less movement on mobile
            { y: 0, opacity: 1, duration: isMobile ? 0.3 : 0.6, ease: "power2.out" }, // Faster on mobile
            "-=0.2"
        )
        // Form animation - simplified
        .fromTo(formRef.current,
            { y: isMobile ? 20 : 40, opacity: 0, scale: 0.98 }, // Less movement on mobile
            { y: 0, opacity: 1, scale: 1, duration: isMobile ? 0.4 : 0.7, ease: "power2.out" }, // Faster on mobile
            "-=0.1"
        );

        // Illustration section animation - simplified
        gsap.fromTo(illustrationRef.current,
            { x: isMobile ? 20 : 50, opacity: 0, scale: 0.98 }, // Less movement on mobile
            { x: 0, opacity: 1, scale: 1, duration: isMobile ? 0.5 : 1, ease: "power2.out", delay: isMobile ? 0.2 : 0.5 } // Faster on mobile
        );

        // Stats counter animation - optimized
        ScrollTrigger.create({
            trigger: statsRef.current,
            start: "top 80%",
            onEnter: () => {
                gsap.fromTo(statsRef.current.querySelectorAll('.stat-number'),
                    { innerText: 0 },
                    { 
                        innerText: (i, target) => target.getAttribute('data-target'),
                        duration: isMobile ? 1 : 1.5, // Faster on mobile
                        delay: 0.1,
                        ease: "power2.out",
                        snap: { innerText: 1 },
                        onUpdate: function() {
                            this.targets()[0].innerText = Math.ceil(this.targets()[0].innerText);
                        }
                    }
                );
            }
        });

        // Optimized ScrollTrigger setup - single instance for better performance
        const scrollTrigger = ScrollTrigger.create({
            trigger: "body",
            start: "top top",
            end: "bottom bottom",
            onUpdate: (self) => {
                // Update all animations based on scroll progress
                const progress = self.progress;
                
                // Update stats animation when in view
                if (progress > 0.7 && statsRef.current) {
                    const statNumbers = statsRef.current.querySelectorAll('.stat-number');
                    statNumbers.forEach((stat, index) => {
                        const target = parseInt(stat.getAttribute('data-target'));
                        const current = Math.floor(target * (progress - 0.7) * 3.33); // Scale to 0-100%
                        if (current <= target) {
                            stat.innerText = current;
                        }
                    });
                }
            }
        });

        // Cleanup function
        return () => {
            // lenis.destroy();
            window.removeEventListener('scroll', handleScroll);
            scrollTrigger.kill();
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSignUp = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // Optimize navigation by using replace instead of push for faster transitions
        navigate('/home/MainDashboard/dashboard', { replace: true });
    };

    const handleFindNow = () => {
        console.log('Navigating to dashboard...');
        // Optimize navigation by using replace instead of push for faster transitions
        navigate('/home/MainDashboard/dashboard', { replace: true });
    };

    return (
        <>
            {/* Top Bar */}
            <div className="top-bar">
                <div className="container-fluid">
                    <div className="row align-items-center">
                        <div className="col-md-6">
                            <div className="top-bar-left d-flex align-items-center">
                                {/* <span className="help-text">Help us on</span>
                                <div className="social-icons d-flex gap-2 ms-3">
                                    <a href="#" className="social-icon-small">
                                        <FontAwesomeIcon icon={faFacebookF} />
                                    </a>
                                    <a href="#" className="social-icon-small">
                                        <FontAwesomeIcon icon={faTwitterBrand} />
                                    </a>
                                    <a href="#" className="social-icon-small">
                                        <FontAwesomeIcon icon={faPinterestP} />
                                    </a>
                                    <a href="#" className="social-icon-small">
                                        <FontAwesomeIcon icon={faGooglePlusG} />
                                    </a>
                                </div> */}
                                <span className="email-text ms-3">support@seventhqueen.com</span>
                            </div>
                        </div> 
                        <div className="col-md-6">
                            {/* <div className="top-bar-right d-flex justify-content-end gap-2">
                                <Link to="/LoginForm" className="top-btn login-btn">LOG IN</Link>
                                <Link to="/signup" className="top-btn signup-btn">SIGN UP</Link>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Navigation */}
            <nav className="navbar navbar-expand-lg main-navbar" ref={navbarRef}>
                <div className="nav-container container-fluid">
                    <div className="logo">
                        <FontAwesomeIcon icon={faHeart} className="logo-heart" />
                        <span className="logo-text">Sweet Date 4u</span>
                        <div className="logo-tagline">DATING THEME FOR LOVERS</div>
                    </div>
                    
                    <div className="nav-links">
                        <Link to="/" className="nav-link active">Welcome</Link>
                        {/* <Link to="/discover" className="nav-link">Explore</Link>
                        <Link to="/chat" className="nav-link">Chats</Link> */}
                        <Link to="/about" className="nav-link">AboutUs</Link>
                        <Link to="/dashboard" className="nav-link">Profile</Link>
                        <Link to="/buy-theme" className="nav-link">Buy Theme</Link>
                    </div>
                    
                    <div className="search-icon">
                        <FontAwesomeIcon icon={faSearch} />
                    </div>
                    <div className="top-bar-right d-flex justify-content-end gap-2">
                                <Link to="/LoginForm" className="top-btn login-btn">LOG IN</Link>
                                <Link to="/signup" className="top-btn signup-btn">SIGN UP</Link>
                            </div>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="hero-section" ref={containerRef}>
                <div className="container-fluid">
                    <div className="row align-items-center min-vh-100">
                        {/* Left Content - Registration Form */}
                        <div className="col-lg-6">
                            <div className="registration-container">
                                <div className="registration-form" ref={formRef}>
                                    <h2 className="form-title">Create an Account</h2>
                                    <p className="form-description">
                                        Registering for this site is easy, just fill in the fields below and we will get a new account set up for you in no time.
                                    </p>
                                    
                                    <form onSubmit={handleSignUp}>
                                        <div className="form-group mb-3">
                                            <label className="form-label">Username: Required</label>
                                            <input
                                                type="text"
                                                name="username"
                                                value={formData.username}
                                                onChange={handleInputChange}
                                                className="form-control"
                                                required
                                            />
                                        </div>
                                        
                                        <div className="form-group mb-3">
                                            <label className="form-label">Email Address: Required</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className="form-control"
                                                required
                                            />
                                        </div>
                                        
                                        <div className="form-group mb-4">
                                            <label className="form-label">Password: Required</label>
                                            <div className="password-container">
                                                <input
                                                    type="password"
                                                    name="password"
                                                    value={formData.password}
                                                    onChange={handleInputChange}
                                                    className="form-control"
                                                    required
                                                />
                                                <button type="button" className="confirm-btn">Confirm</button>
                                            </div>
                                        </div>
                                        
                                        <div className="form-buttons">
                                            <button type="submit" className="signup-primary-btn">
                                                <FontAwesomeIcon icon={faArrowRight} className="me-2" />
                                                Sign Up
                                            </button>
                                            <button type="button" className="facebook-btn">
                                                <FontAwesomeIcon icon={faFacebookF} className="me-2" />
                                                Sign Up with Facebook
                                            </button>
                                        </div>
                                    </form>
                                    
                                    <div className="latest-members">
                                        <h4>Latest registered members</h4>
                                        <div className="members-carousel">
                                            <div className="member-avatars">
                                                <div className="member-avatar"></div>
                                                <div className="member-avatar"></div>
                                                <div className="member-avatar"></div>
                                            </div>
                                            <div className="carousel-controls">
                                                <button className="carousel-btn prev-btn">‹</button>
                                                <button className="carousel-btn next-btn">›</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Content - Hero Image */}
                        <div className="col-lg-6">
                            <div className="hero-image-container" ref={illustrationRef}>
                                <img 
                                    src={homepageImage} 
                                    alt="Happy couple" 
                                    className="hero-image"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mid Section */}
            <section className="mid-section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 mx-auto text-center">
                            <h2 className="mid-title">
                                It all starts with a <span className="highlight">Date</span>
                            </h2>
                            <p className="mid-description">
                                You find us, finally, and you are already in love. More than 5.000.000 around the world already shared the same experience and uses our system. <strong>Joining us today just got easier!</strong>
                            </p>
                            <div className="mid-buttons">
                                <button className="join-free-btn" onClick={handleFindNow}>
                                    Join us for FREE
                                </button>
                                <button className="tv-commercial-btn">
                                    <FontAwesomeIcon icon={faPlay} className="me-2" />
                                    Our TV Commercial
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Statistics Section */}
            <section className="stats-section" ref={statsRef}>
                <div className="container">
                    <div className="row text-center">
                        <div className="col-md-3">
                            <div className="stat-item">
                                <div className="stat-icon">
                                    <FontAwesomeIcon icon={faHeart} className="heart-icon" />
                                </div>
                                <div className="stat-number" data-target="1594">0</div>
                                <p className="stat-label">Members in total</p>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="stat-item">
                                <div className="stat-icon">
                                    <FontAwesomeIcon icon={faUsers} className="users-icon" />
                                </div>
                                <div className="stat-number" data-target="0">0</div>
                                <p className="stat-label">Members online</p>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="stat-item">
                                <div className="stat-icon">
                                    <FontAwesomeIcon icon={faVenus} className="venus-icon" />
                                </div>
                                <div className="stat-number" data-target="0">0</div>
                                <p className="stat-label">Women online</p>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="stat-item">
                                <div className="stat-icon">
                                    <FontAwesomeIcon icon={faMars} className="mars-icon" />
                                </div>
                                <div className="stat-number" data-target="0">0</div>
                                <p className="stat-label">Men online</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="bottom-controls">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-md-6">
                                <button className="download-app-btn">
                                    <FontAwesomeIcon icon={faArrowRight} className="me-2" />
                                    Download App
                                </button>
                                <div className="store-buttons mt-3">
                                    <a href="#" className="app-store-link">
                                        <img 
                                            src={appleStoreImage} 
                                            alt="Download on App Store" 
                                            className="app-store-image"
                                        />
                                    </a>
                                    <a href="#" className="app-store-link">
                                        <img 
                                            src={googlePlayImage} 
                                            alt="Get it on Google Play" 
                                            className="app-store-image"
                                        />
                                    </a>
                                </div>
                            </div>
                            <div className="col-md-6 text-end">
                                <div className="control-icons">
                                    <button className="control-icon">
                                        <FontAwesomeIcon icon={faSearch} />
                                    </button>
                                    <button className="control-icon">
                                        <FontAwesomeIcon icon={faArrowRight} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 mb-4">
                            <div className="footer-logo mb-3">
                                <FontAwesomeIcon icon={faHeart} className="text-primary me-2" size="2x" />
                                <span className="h4 fw-bold">Sweet Date 4u</span>
                            </div>
                            <p className="text-light">Connecting hearts worldwide. Find your perfect match with our innovative dating platform designed for meaningful relationships.</p>
                            <div className="social-links-footer d-flex gap-3 mt-3">
                                <a href="#" className="social-footer-icon">
                                    <FontAwesomeIcon icon={faFacebookF} />
                                </a>
                                <a href="#" className="social-footer-icon">
                                    <FontAwesomeIcon icon={faTwitterBrand} />
                                </a>
                                <a href="#" className="social-footer-icon">
                                    <FontAwesomeIcon icon={faPinterestP} />
                                </a>
                                <a href="#" className="social-footer-icon">
                                    <FontAwesomeIcon icon={faGooglePlusG} />
                                </a>
                                <a href="#" className="social-footer-icon">
                                    <FontAwesomeIcon icon={faEnvelope} />
                                </a>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-6 mb-4">
                            <h6 className="fw-bold mb-3 text-white">Company</h6>
                            <ul className="list-unstyled">
                                <li><Link to="/about" className="text-light text-decoration-none">About Us</Link></li>
                                <li><a href="#" className="text-light text-decoration-none">Careers</a></li>
                                <li><a href="#" className="text-light text-decoration-none">Press</a></li>
                                <li><a href="#" className="text-light text-decoration-none">Contact</a></li>
                                <li><a href="#" className="text-light text-decoration-none">Blog</a></li>
                            </ul>
                        </div>
                        <div className="col-lg-2 col-md-6 mb-4">
                            <h6 className="fw-bold mb-3 text-white">Support</h6>
                            <ul className="list-unstyled">
                                <li><a href="#" className="text-light text-decoration-none">Help Center</a></li>
                                <li><Link to="/safety-tips" className="text-light text-decoration-none">Safety Tips</Link></li>
                                <li><a href="#" className="text-light text-decoration-none">Community</a></li>
                                <li><a href="#" className="text-light text-decoration-none">Success Stories</a></li>
                                <li><a href="#" className="text-light text-decoration-none">FAQ</a></li>
                            </ul>
                        </div>
                        <div className="col-lg-2 col-md-6 mb-4">
                            <h6 className="fw-bold mb-3 text-white">Legal</h6>
                            <ul className="list-unstyled">
                                <li><Link to="/privacy-policy" className="text-light text-decoration-none">Privacy Policy</Link></li>
                                <li><Link to="/terms-of-service" className="text-light text-decoration-none">Terms of Service</Link></li>
                                <li><a href="#" className="text-light text-decoration-none">Cookie Policy</a></li>
                                <li><a href="#" className="text-light text-decoration-none">Disclaimer</a></li>
                                <li><a href="#" className="text-light text-decoration-none">GDPR</a></li>
                            </ul>
                        </div>
                        <div className="col-lg-2 col-md-6 mb-4">
                            <h6 className="fw-bold mb-3 text-white">Download</h6>
                            <div className="d-flex flex-column gap-3">
                                <a href="#" className="app-store-link">
                                    <img 
                                        src={appleStoreImage} 
                                        alt="Download on App Store" 
                                        className="app-store-image"
                                    />
                                </a>
                                <a href="#" className="app-store-link">
                                    <img 
                                        src={googlePlayImage} 
                                        alt="Get it on Google Play" 
                                        className="app-store-image"
                                    />
                                </a>
                            </div>
                        </div>
                    </div>
                    <hr className="my-4" />
                    <div className="row align-items-center">
                        <div className="col-md-6">
                            <p className="mb-0 text-light">&copy; 2024 Sweet Date 4u. All rights reserved.</p>
                        </div>
                        <div className="col-md-6 text-md-end">
                            <p className="mb-0 text-light">Made with <FontAwesomeIcon icon={faHeart} className="text-danger" /> for love</p>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};