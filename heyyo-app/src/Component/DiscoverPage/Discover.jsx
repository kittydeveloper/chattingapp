import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faMapMarkerAlt, faFilter, faUserCheck, faTimes, faInfo, faGlobe,faMessage} from "@fortawesome/free-solid-svg-icons";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Navbar from '../Shared/Navbar';
import Navbar from '../Shared/Navbar2';
import './Discover.css';
import { useNavigate } from 'react-router-dom';
import { useUser } from "../LoginPage/userContext";
import { apiurl } from "../url";
import axios from "axios";
import { useUserchet } from '../ChatPage/chatcontext'; 

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Discover = () => {
     const navigate = useNavigate()
           const { loginUser, userdashboard } = useUser();
           const{chatindividual,setChatIndividual}=useUserchet()
           const[users,setUsers]=useState([])
    const useriddata = localStorage.getItem("useridno")
    const [currentLocation, setCurrentLocation] = useState({ city: 'Loading...', country: '' });
    const [searchRadius, setSearchRadius] = useState(10);
    const [ageRange, setAgeRange] = useState([22, 35]);
    const [selectedInterests, setSelectedInterests] = useState([]);
    const [matches, setMatches] = useState([]);
    
    // Refs for animations
    const headerRef = useRef(null);
    const filtersRef = useRef(null);
    const matchCardsRef = useRef([]);
       const userdata = async()=>{
     try{
  const response=await axios.get(`${apiurl}/getalluserlogindata/${useriddata}`)
  console.log(response)
  const data =response.data;
  console.log(data,'lllll')
  setUsers(data)
   setMatches(data)

     }
     catch(err){
   console.log(err)
     }
       }
       useEffect(()=>{
       userdata()
       },[userdashboard,apiurl])

        const handleEmailClick = (user) => {
            setChatIndividual(false)
    localStorage.setItem("receive_id",user.userid)
       localStorage.setItem("receive_name",user.user_name)
    // alert("Email icon clicked!");
    navigate("/ChatPage");
    // or redirect: window.location.href = "mailto:someone@example.com"
  };

    // Mock data for potential matches
    const mockMatches = [
        {
            id: 1,
            name: "Emma",
            age: 26,
            distance: "2 km away",
            interests: ["Photography", "Travel", "Coffee"],
            image: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=300&h=400&fit=crop&crop=face",
            bio: "Adventure seeker and coffee enthusiast ☕",
            online: true
        },
        {
            id: 2,
            name: "Sofia",
            age: 24,
            distance: "5 km away",
            interests: ["Fitness", "Music", "Art"],
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=400&fit=crop&crop=face",
            bio: "Yoga instructor spreading good vibes ✨",
            online: false
        },
        {
            id: 3,
            name: "Isabella",
            age: 28,
            distance: "8 km away",
            interests: ["Books", "Wine", "Travel"],
            image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=400&fit=crop&crop=face",
            bio: "Book lover with a passion for exploration 📚",
            online: true
        },
        {
            id: 4,
            name: "Mia",
            age: 25,
            distance: "3 km away",
            interests: ["Dancing", "Food", "Movies"],
            image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=400&fit=crop&crop=face",
            bio: "Dancer who loves trying new cuisines 💃",
            online: true
        },
        {
            id: 5,
            name: "Charlotte",
            age: 27,
            distance: "6 km away",
            interests: ["Art", "Nature", "Photography"],
            image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&h=400&fit=crop&crop=face",
            bio: "Artist finding beauty in everyday moments 🎨",
            online: false
        },
        {
            id: 6,
            name: "Amelia",
            age: 23,
            distance: "4 km away",
            interests: ["Music", "Travel", "Fitness"],
            image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&h=400&fit=crop&crop=face",
            bio: "Musician exploring the world one song at a time 🎵",
            online: true
        }
    ];

    const interests = ["Photography", "Travel", "Coffee", "Fitness", "Music", "Art", "Books", "Wine", "Dancing", "Food", "Movies", "Nature"];

    useEffect(() => {
        // Get user's location
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    // Mock location data - in real app, you'd reverse geocode these coordinates
                    setCurrentLocation({ city: 'New York', country: 'USA' });
                },
                (error) => {
                    setCurrentLocation({ city: 'New York', country: 'USA' });
                }
            );
        }

        // Set mock matches
        // setMatches(mockMatches);

        // Initialize animations
        const tl = gsap.timeline({ delay: 0.3 });

        tl.fromTo(headerRef.current,
            { y: -50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
        )
        .fromTo(filtersRef.current,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
            "-=0.5"
        );

        // Animate match cards on scroll
        ScrollTrigger.create({
            trigger: ".matches-grid",
            start: "top 80%",
            onEnter: () => {
                gsap.fromTo(matchCardsRef.current.filter(card => card),
                    { y: 50, opacity: 0, scale: 0.9 },
                    { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.7)" }
                );
            }
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    const handleInterestToggle = (interest) => {
        setSelectedInterests(prev => 
            prev.includes(interest) 
                ? prev.filter(i => i !== interest)
                : [...prev, interest]
        );
    };

    const handleLike = (matchId) => {
        // Handle like action
        console.log('Liked user:', matchId);
        // Add animation
        const card = matchCardsRef.current.find(card => card && card.dataset.matchId == matchId);
        if (card) {
            gsap.to(card, {
                x: 300,
                opacity: 0,
                duration: 0.5,
                ease: "power2.in",
                onComplete: () => {
                    setMatches(prev => prev.filter(match => match.id !== matchId));
                }
            });
        }
    };

    const handlePass = (matchId) => {
        // Handle pass action
        console.log('Passed user:', matchId);
        // Add animation
        const card = matchCardsRef.current.find(card => card && card.dataset.matchId == matchId);
        if (card) {
            gsap.to(card, {
                x: -300,
                opacity: 0,
                duration: 0.5,
                ease: "power2.in",
                onComplete: () => {
                    setMatches(prev => prev.filter(match => match.id !== matchId));
                }
            });
        }
    };
console.log(matches,"kkkkk")
    return (
        <div className="discover-page">
            <Navbar />
            
            {/* Header */}
            <div className="discover-header" ref={headerRef}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-8">
                            <h1 className="display-4 fw-bold text-white mb-3">
                                <FontAwesomeIcon icon={faGlobe} className="me-3" />
                                Discover Love Nearby
                            </h1>
                            <p className="lead text-white-50 mb-0">
                                <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2" />
                                Finding matches in {currentLocation.city}, {currentLocation.country}
                            </p>
                        </div>
                        <div className="col-lg-4 text-lg-end">
                            <div className="location-info">
                                <div className="active-users bg-white bg-opacity-10 backdrop-blur rounded-pill px-4 py-2 d-inline-block">
                                    <span className="text-white fw-semibold">
                                        <span className="online-indicator me-2"></span>
                                        {matches.filter(m => m.online).length} users online nearby
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="filters-section py-4 bg-white border-bottom" ref={filtersRef}>
                <div className="container">
                    <div className="row g-4 align-items-center">
                        <div className="col-md-3">
                            <label className="form-label fw-semibold">
                                <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2 text-primary" />
                                Distance: {searchRadius} km
                            </label>
                            <input
                                type="range"
                                className="form-range"
                                min="1"
                                max="50"
                                value={searchRadius}
                                onChange={(e) => setSearchRadius(e.target.value)}
                            />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label fw-semibold">
                                Age: {ageRange[0]} - {ageRange[1]}
                            </label>
                            <div className="d-flex gap-2">
                                <input
                                    type="range"
                                    className="form-range"
                                    min="18"
                                    max="60"
                                    value={ageRange[0]}
                                    onChange={(e) => setAgeRange([parseInt(e.target.value), ageRange[1]])}
                                />
                                <input
                                    type="range"
                                    className="form-range"
                                    min="18"
                                    max="60"
                                    value={ageRange[1]}
                                    onChange={(e) => setAgeRange([ageRange[0], parseInt(e.target.value)])}
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label fw-semibold">
                                <FontAwesomeIcon icon={faFilter} className="me-2 text-primary" />
                                Interests
                            </label>
                            <div className="interests-tags">
                                {interests.slice(0, 6).map(interest => (
                                    <button
                                        key={interest}
                                        className={`btn btn-sm rounded-pill me-2 mb-2 ${
                                            selectedInterests.includes(interest)
                                                ? 'btn-primary'
                                                : 'btn-outline-secondary'
                                        }`}
                                        onClick={() => handleInterestToggle(interest)}
                                    >
                                        {interest}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Matches Grid */}
            <div className="matches-section py-5">
                <div className="container">
                    <div className="row mb-4">
                        <div className="col-12">
                            <h2 className="h3 fw-bold mb-2">Potential Matches</h2>
                            <p className="text-muted">Swipe right to like, left to pass</p>
                        </div>
                    </div>
                    
                    <div className="matches-grid row g-4">
                        {matches.map((match, index) => (
                            <div key={match.id} className="col-lg-4 col-md-6">
                                <div 
                                    className="match-card card border-0 shadow-sm h-100"
                                    ref={el => matchCardsRef.current[index] = el}
                                    data-match-id={match.id}
                                >
                                    <div className="card-img-container position-relative">
                                        {match.Profile_picture ? (
                                        <img 
                                            src={'http://localhost:4000/profileimages/' + match.Profile_picture} 
                                            // alt={match.name}
                                            className="card-img-top match-image"
                                        />
                                        ):(
                                            <>
                                             <img 
                                            src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2P3H3wo7nRHZbF1XxAvxfxvKTlhfhvYNfI-IfE1kGB9qYglInbOZGNdFK_dkXZvgZPzA&usqp=CAU"} className="card-img-top match-image" />
                                            </>
                                        )
}
                                        <div className="online-status position-absolute top-0 end-0 m-3">
                                            <span className={`badge ${match.online ? 'bg-success' : 'bg-secondary'} rounded-pill`}>
                                                {match.online ? 'Online' : 'Offline'}
                                            </span>
                                        </div>
                                        <div className="card-overlay position-absolute bottom-0 start-0 end-0 p-3">
                                            <h5 className="card-title text-white fw-bold mb-1">
                                                {match.user_name}, {match.Age}
                                            </h5>
                                            <p className="card-text text-white-50 small mb-0">
                                                <FontAwesomeIcon icon={faMapMarkerAlt} className="me-1" />
                                                {match.distance}
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div className="card-body">
                                        <p className="card-text text-muted mb-3">{match.Bio_data}</p>
                                        
                                        <div className="interests-list mb-3">
                                            {match.Interested?.split(",").map(interest => (
                                                <span key={interest} className="badge bg-light text-dark me-1 mb-1">
                                                    {interest}
                                                </span>
                                            ))}
                                        </div>
                                        
                                        <div className="card-actions d-flex gap-2">
                                            <button 
                                                className="btn btn-outline-secondary flex-fill"
                                                onClick={() => handlePass(match.id)}
                                            >
                                                <FontAwesomeIcon icon={faTimes} className="me-2" />
                                                Pass
                                            </button>
                                            <button 
                                                className="btn btn-outline-primary flex-fill"
                                            >
                                                <FontAwesomeIcon icon={faInfo} className="me-2" />
                                                Info
                                            </button>
                                            <button 
                                                className="btn btn-primary flex-fill"
                                                onClick={() => handleLike(match.id)}
                                            >
                                                <FontAwesomeIcon icon={faHeart} className="me-2" />
                                                Like
                                            </button>
                                             <button 
                                                className="btn btn-primary flex-fill"
                                                onClick={() =>handleEmailClick(match)}
                                            >
                                                <FontAwesomeIcon icon={faMessage} className="me-2" />
                                                chat
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {matches.length === 0 && (
                        <div className="text-center py-5">
                            <FontAwesomeIcon icon={faUserCheck} size="3x" className="text-muted mb-3" />
                            <h3 className="h4 text-muted">You've seen everyone nearby!</h3>
                            <p className="text-muted">Try expanding your search radius or check back later for new matches.</p>
                            <button className="btn btn-primary" onClick={() => window.location.reload()}>
                                Refresh Matches
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Discover;
