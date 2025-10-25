import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, Link } from 'react-router-dom';
import './TermsOfService.css';

const TermsOfService = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/');
    };

    return (
        <div className="terms-container">
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

            <div className="terms-content">
                <div className="container">
                    <div className="back-button" onClick={handleBack}>
                        <FontAwesomeIcon icon={faArrowLeft} />
                        <span>Back to Home</span>
                    </div>

                    <div className="terms-header">
                        <h1>Terms of Service</h1>
                    </div>

                    <div className="terms-section">
                        <h2>1. Acceptance of Terms</h2>
                        <p>By accessing or using Lovrhub, you agree to comply with and be bound by these Terms of Service and our Community Guidelines. If you do not agree, please do not use Lovrhub.</p>
                    </div>

                    <div className="terms-section">
                        <h2>2. Age Restriction</h2>
                        <p>Lovrhub is intended for users who are 18 years of age or older. By using the platform, you confirm that you are at least 18 years old. If you are under 18, you are not permitted to use Lovrhub.</p>
                    </div>

                    <div className="terms-section">
                        <h2>3. User Accounts</h2>
                        <p>To access certain features, you may need to create an account. You are responsible for maintaining your account security and all activity under your account. You must provide accurate information when registering.</p>
                    </div>

                    <div className="terms-section">
                        <h2>4. User Conduct</h2>
                        <p>You agree to use Lovrhub lawfully and respectfully, adhering to our Community Guidelines. Prohibited activities include posting illegal, offensive, or harmful content, infringing others' rights, harassment, and any acts that disrupt the platform.</p>
                    </div>

                    <div className="terms-section">
                        <h2>5. Content Ownership and License</h2>
                        <p>You retain ownership of content you post but grant Lovrhub a license to use, display, and promote your content on the platform.</p>
                    </div>

                    <div className="terms-section">
                        <h2>6. Intellectual Property</h2>
                        <p>All intellectual property on Lovrhub belongs to Lovrhub or its licensors and cannot be used without permission.</p>
                    </div>

                    <div className="terms-section">
                        <h2>7. Privacy</h2>
                        <p>Your use of Lovrhub is governed by our Privacy Policy.</p>
                    </div>

                    <div className="terms-section">
                        <h2>8. Termination</h2>
                        <p>Lovrhub may suspend or terminate your account for violations or other reasons without notice.</p>
                    </div>

                    <div className="terms-section">
                        <h2>9. Disclaimers and Limitation of Liability</h2>
                        <p>Lovrhub is provided "as is." We are not liable for damages arising from your use.</p>
                    </div>

                    <div className="terms-section">
                        <h2>10. Indemnification</h2>
                        <p>You agree to indemnify Lovrhub for claims arising from your violation of these terms.</p>
                    </div>

                    <div className="terms-section">
                        <h2>11. Governing Law and Dispute Resolution</h2>
                        <p>These Terms are governed by Indian law, with disputes resolved in Chennai courts.</p>
                    </div>

                    <div className="terms-section">
                        <h2>12. Changes to Terms</h2>
                        <p>We may update these Terms and will notify you of major changes.</p>
                    </div>

                    <div className="terms-section">
                        <h2>13. Contact Information</h2>
                        <p>Questions? Contact us at:</p>
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

export default TermsOfService;
