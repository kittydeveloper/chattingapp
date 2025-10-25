import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faArrowLeft, faShieldAlt, faEye, faMapMarkerAlt, faComments, faMoneyBillWave, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, Link } from 'react-router-dom';
import './SafetyTips.css';

const SafetyTips = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/');
    };

    const safetyTips = [
        {
            icon: faShieldAlt,
            title: "1. Protect Your Privacy from the Start",
            description: "Your personal details are precious — share them only when you truly trust the person.",
            tips: [
                "Avoid disclosing your home address, office location, or daily schedule in early conversations.",
                "Use Lovrhub's in-app chat instead of personal phone numbers, WhatsApp, or email until you're comfortable.",
                "Be mindful of photos — don't post images with landmarks, street signs, vehicle numbers, or any detail that could give away your location."
            ]
        },
        {
            icon: faEye,
            title: "2. Verify Before You Trust",
            description: "Not everyone online is who they claim to be.",
            tips: [
                "Use video calls on Lovrhub to confirm a person's identity before meeting in person.",
                "Cross-check details from conversations to ensure consistency.",
                "Beware of anyone who avoids showing their face or delays verification."
            ]
        },
        {
            icon: faMapMarkerAlt,
            title: "3. Choose Safe Meeting Spots",
            description: "When meeting for the first few times, safety comes first.",
            tips: [
                "Pick public places such as cafés, malls, or popular restaurants.",
                "Inform a trusted friend or family member about your meeting location and timing.",
                "Arrange your own transportation — avoid letting someone you just met pick you up from home."
            ]
        },
        {
            icon: faComments,
            title: "4. Keep Conversations Respectful",
            description: "Healthy relationships begin with respect.",
            tips: [
                "Block or report anyone using abusive, threatening, or manipulative language.",
                "Avoid sending or requesting inappropriate images or videos.",
                "Respect cultural and personal boundaries — remember, consent is key."
            ]
        },
        {
            icon: faMoneyBillWave,
            title: "5. Recognize Financial Scams",
            description: "True love never comes with a price tag.",
            tips: [
                "Do not send money or share bank/card details, no matter the reason given.",
                "Watch for stories about emergencies, investments, or overseas travel expenses — these are common scam tactics.",
                "Use Lovrhub's report feature to flag suspicious profiles."
            ]
        },
        {
            icon: faExclamationTriangle,
            title: "6. Trust Your Instincts",
            description: "If something feels off, it probably is.",
            tips: [
                "End communication if a person's behavior makes you uncomfortable.",
                "Don't let fear of being \"rude\" stop you from protecting yourself.",
                "Remember: your safety matters more than any connection."
            ]
        }
    ];

    return (
        <div className="safety-container">
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

            <div className="safety-content">
                <div className="container">
                    <div className="back-button" onClick={handleBack}>
                        <FontAwesomeIcon icon={faArrowLeft} />
                        <span>Back to Home</span>
                    </div>

                    <div className="safety-header">
                        <h1>Safety Tips</h1>
                        <p>Your safety is our top priority. Follow these guidelines to ensure a safe and enjoyable dating experience.</p>
                    </div>

                    <div className="safety-tips-grid">
                        {safetyTips.map((tip, index) => (
                            <div key={index} className="safety-tip-card">
                                <div className="tip-icon">
                                    <FontAwesomeIcon icon={tip.icon} />
                                </div>
                                <h3>{tip.title}</h3>
                                <p className="tip-description">{tip.description}</p>
                                <ul className="tip-list">
                                    {tip.tips.map((item, itemIndex) => (
                                        <li key={itemIndex}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    <div className="emergency-section">
                        <h2>Need Help?</h2>
                        <p>If you encounter any suspicious behavior or feel unsafe, please contact us immediately:</p>
                        <div className="emergency-contact">
                            <p><strong>Email:</strong> <a href="mailto:gmindtechnologies@gmail.com">gmindtechnologies@gmail.com</a></p>
                            <p><strong>Address:</strong> Gmind Technologies, Chennai, Tamil Nadu, India</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SafetyTips;
