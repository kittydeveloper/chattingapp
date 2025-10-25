import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, Link } from 'react-router-dom';
import './PrivacyPolicy.css';

const PrivacyPolicy = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/');
    };

    return (
        <div className="privacy-container">
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
                        <Link to="/about" className="nav-link">About</Link>
                        <Link to="/signup" className="nav-link signup-btn">Sign Up</Link>
                    </div>
                </div>
            </nav>

            <div className="privacy-content">
                <div className="container">
                    <div className="back-button" onClick={handleBack}>
                        <FontAwesomeIcon icon={faArrowLeft} />
                        <span>Back to Home</span>
                    </div>

                    <div className="privacy-header">
                        <h1>Privacy Policy</h1>
                    </div>

                    <div className="privacy-section">
                        <h2>Introduction</h2>
                        <p>At Lovrhub, your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you use our platform and services. By accessing or using Lovrhub, you agree to the terms of this Privacy Policy.</p>
                    </div>

                    <div className="privacy-section">
                        <h2>Information We Collect</h2>
                        <p>We collect the following types of information to provide and improve our services:</p>
                        <ul>
                            <li><strong>Personal Information:</strong> Name, email address, phone number, and any other information you provide when registering or using Lovrhub.</li>
                            <li><strong>Usage Data:</strong> Information on how you use the platform, including pages visited, features used, and interaction data.</li>
                            <li><strong>Device Information:</strong> IP address, browser type, operating system, and device identifiers.</li>
                            <li><strong>Cookies and Tracking Technologies:</strong> We use cookies and similar technologies to enhance your experience, analyze usage, and deliver personalized content.</li>
                        </ul>
                    </div>

                    <div className="privacy-section">
                        <h2>How We Use Your Information</h2>
                        <p>We use your information to:</p>
                        <ul>
                            <li>Provide, operate, and maintain Lovrhub services</li>
                            <li>Communicate with you, including sending updates, notifications, and support messages</li>
                            <li>Personalize and improve your experience on Lovrhub</li>
                            <li>Monitor and analyze usage to enhance performance and security</li>
                            <li>Comply with legal obligations and enforce our policies</li>
                        </ul>
                    </div>

                    <div className="privacy-section">
                        <h2>Information Sharing and Disclosure</h2>
                        <p>We do not sell or rent your personal information to third parties. We may share your information with:</p>
                        <ul>
                            <li><strong>Service Providers:</strong> Trusted third parties who help us operate Lovrhub, under strict confidentiality agreements.</li>
                            <li><strong>Legal Authorities:</strong> When required by law, regulation, or legal process.</li>
                            <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets.</li>
                        </ul>
                    </div>

                    <div className="privacy-section">
                        <h2>Data Security</h2>
                        <p>We implement industry-standard security measures to protect your personal data against unauthorized access, disclosure, alteration, or destruction. However, no method of transmission or storage is completely secure, and we cannot guarantee absolute security.</p>
                    </div>

                    <div className="privacy-section">
                        <h2>Your Rights</h2>
                        <p>You have the right to:</p>
                        <ul>
                            <li>Access and update your personal information</li>
                            <li>Request deletion of your data, subject to legal and operational constraints</li>
                            <li>Opt-out of marketing communications</li>
                            <li>Raise concerns or complaints regarding your privacy</li>
                        </ul>
                    </div>

                    <div className="privacy-section">
                        <h2>Data Retention</h2>
                        <p>We retain your personal information only as long as necessary to provide services and fulfill legal obligations.</p>
                    </div>

                    <div className="privacy-section">
                        <h2>Changes to This Privacy Policy</h2>
                        <p>We may update this Privacy Policy from time to time. We will notify you of any significant changes via Lovrhub or official communication channels.</p>
                    </div>

                    <div className="privacy-section">
                        <h2>Contact Us</h2>
                        <p>If you have any questions or concerns about this Privacy Policy or your personal data, please contact us at:</p>
                        <div className="contact-info">
                            <p><strong>Email:</strong> <a href="mailto:gmindtechnologies@gmail.com">gmindtechnologies@gmail.com</a></p>
                            <p><strong>Address:</strong> Gmind Technologies, Chennai, Tamil Nadu, India</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
