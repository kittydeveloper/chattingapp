import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faArrowLeft, faUsers, faShieldAlt, faMobile, faStar } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, Link } from 'react-router-dom';
import './AboutUs.css';

const AboutUs = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/');
    };

    return (
        <div className="about-container">
            {/* Navigation */}
            <nav className="navbar">
                <div className="nav-container">
                    <div className="logo">
                        <FontAwesomeIcon icon={faHeart} className="logo-heart" />
                        <span className="logo-text">Sweet Date 4u</span>
                        <div className="logo-tagline">DATING THEME FOR LOVERS</div>
                    </div>
                    
                    <div className="nav-links">
                        <Link to="/" className="nav-link">Welcome</Link>
                        <Link to="/discover" className="nav-link">Explore</Link>
                        <Link to="/chat" className="nav-link">Chats</Link>
                        <Link to="/about" className="nav-link active">About</Link>
                        <Link to="/signup" className="nav-link signup-btn">Sign Up</Link>
                    </div>
                </div>
            </nav>

            <div className="about-content">
                <div className="container">
                    <div className="back-button" onClick={handleBack}>
                        <FontAwesomeIcon icon={faArrowLeft} />
                        <span>Back to Home</span>
                    </div>

                    <div className="about-header">
                        <h1>About Us</h1>
                        <h2>Welcome to Lovrhub — Where Real Love Begins</h2>
                    </div>

                    <div className="about-section">
                        <p className="about-intro">
                            At Lovrhub, we believe that love is more than just a swipe — it's about real people, real conversations, and real connections. Our mission is to create a safe, fun, and meaningful space for people to meet, connect, and build relationships that truly matter.
                        </p>
                        
                        <p>
                            We know that in today's fast-paced world, finding the right person can feel overwhelming. That's why we've designed Lovrhub with simplicity, trust, and compatibility at its heart. Whether you're looking for friendship, romance, or a deep, lasting relationship, Lovrhub helps you meet people who share your values, interests, and lifestyle.
                        </p>
                    </div>

                    <div className="features-section">
                        <h3>What Makes Us Different</h3>
                        <div className="features-grid">
                            <div className="feature-card">
                                <div className="feature-icon">
                                    <FontAwesomeIcon icon={faUsers} />
                                </div>
                                <h4>Genuine Connections</h4>
                                <p>Every member is here for the same reason: to meet someone who matters.</p>
                            </div>
                            
                            <div className="feature-card">
                                <div className="feature-icon">
                                    <FontAwesomeIcon icon={faStar} />
                                </div>
                                <h4>Smart Matching</h4>
                                <p>Our intelligent algorithms connect you with people who are most compatible with you.</p>
                            </div>
                            
                            <div className="feature-card">
                                <div className="feature-icon">
                                    <FontAwesomeIcon icon={faShieldAlt} />
                                </div>
                                <h4>Safety & Privacy First</h4>
                                <p>We take your security seriously with profile verification and privacy controls.</p>
                            </div>
                            
                            <div className="feature-card">
                                <div className="feature-icon">
                                    <FontAwesomeIcon icon={faMobile} />
                                </div>
                                <h4>User-Friendly Experience</h4>
                                <p>Lovrhub is designed to make your dating journey simple, enjoyable, and stress-free.</p>
                            </div>
                        </div>
                    </div>

                    <div className="vision-section">
                        <h3>Our Vision</h3>
                        <p>To be the most trusted and loved platform for building meaningful relationships, where every connection has the potential to turn into something beautiful.</p>
                    </div>

                    <div className="promise-section">
                        <h3>Our Promise</h3>
                        <p>We are committed to providing a respectful, inclusive, and positive space where you can be yourself and find your perfect match.</p>
                        <p className="tagline">Lovrhub — Where Real Love begins.</p>
                    </div>

                    <div className="contact-section">
                        <h3>Contact Us</h3>
                        <p>We'd love to hear from you! Whether you have a question, feedback, or a business proposal, the Lovrhub team is here to help.</p>
                        
                        <div className="contact-grid">
                            <div className="contact-card">
                                <h4>General Inquiries</h4>
                                <p>Email: <a href="mailto:gmindtechnologies@gmail.com">gmindtechnologies@gmail.com</a></p>
                                <p>For account assistance, technical issues, or general questions.</p>
                            </div>
                            
                            <div className="contact-card">
                                <h4>Partnerships & Collaborations</h4>
                                <p>Email: <a href="mailto:gmindtechnologies@gmail.com">gmindtechnologies@gmail.com</a></p>
                                <p>For brand partnerships, sponsorship opportunities, and marketing collaborations.</p>
                            </div>
                        </div>
                        
                        <div className="business-address">
                            <h4>Business Address:</h4>
                            <p>Gmind Technologies<br />
                            Chennai, Tamil Nadu, India</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
