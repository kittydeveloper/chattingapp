// import logo from './logo.svg';
import { useEffect, useState } from 'react';
import {Routes, Route } from 'react-router-dom';
// import Register from './Component/Registerpage/Register';
import SignUpForm from './Component/Registerpage/Register';
import LoginForm from './Component/LoginPage/Login';
// import VideoCall from './Component/SidebarPage/Sidebar';
// import VideoCall from './Component/SidebarPage/Sidebar'
import {Home}  from './Component/Homepage/Home';
// import DashBoard from './Component/DashboardPage/Dashboard';
// import DashBoard from './Component/DashboardPage/Dashboard';
import DashBoard from './Component/DashboardPage/Dashboard';
import MainDashBoard from './Component/MainDashboard/MainDashboard';
import Profile from './Component/Profilepage/Profile';
import ChatPage from './Component/ChatPage/Chatpage';
import Discover from './Component/DiscoverPage/Discover';

// Footer Pages
import AboutUs from './Component/AboutUs/AboutUs';
import TermsOfService from './Component/TermsOfService/TermsOfService';
import PrivacyPolicy from './Component/PrivacyPolicy/PrivacyPolicy';
import SafetyTips from './Component/SafetyTips/SafetyTips';

import { apiurl } from './Component/url';
import axios from 'axios';
import { useUserprofile } from './Component/Profilepage/UserProfileContext';
import { useUser } from './Component/LoginPage/userContext'

// import SideBar from './Component/SidebarPage/Sidebar';

function App() {
  const apiUrl = apiurl
   const {Profileimagetriggger,setprofieimagetrigger}=useUserprofile()
     const {userdashboard} = useUser();
   
const [profiledata,setProfile_data]=useState(null)
 const  dataid =  localStorage.getItem("useridno")

useEffect(() => {
  const fetchdata = async () => {
    try {
      const response = await axios.get(`${apiUrl}/getprofileimage/${dataid}`);
      console.log(dataid,"imagekkkkkkkkkkkkkkkkkkkkkkkkkkk")
      console.log('Image fetch response:', response.data,response);

      if (response.status === 200 && response.data.length > 0) {
        const profilePic = response.data[0].Profile_picture;
        
        setProfile_data(profilePic);
        // Optionally trigger other UI changes
        setprofieimagetrigger(true)
        // ref.current = true;
      } else {
          setProfile_data(null);
        console.warn('No profile picture found.');
      }
    } catch (err) {
      console.error('Image fetch error:', err);
    }
  };
if(dataid !== null){
  console.log("imagesnulllllllllllllllll")
  fetchdata();
}
}, [Profileimagetriggger,apiUrl,userdashboard]);



  return (
  
     
       <Routes>
          <Route path="/" element={<Home />} />
           <Route path="/signup" element={<SignUpForm/>} />
           <Route path="/LoginForm" element={<LoginForm/>} />
           <Route path="/chat" element={<ChatPage/>} />
           <Route path="/discover" element={<Discover/>} />
           <Route path="/about" element={<AboutUs />} />

            <Route path="/home/MainDashboard" element={<MainDashBoard />} >
            {/* <Route path="/home/MainDashboard/dashboard" element={<DashBoard />} /> */}
                        <Route path="/home/MainDashboard/dashboard" element={<Discover n  />} />

                    <Route path="/home/MainDashboard/Profile" element={<Profile  profiledata={profiledata}/>} />
                    {/* <Route path="/discover" element={<Discover/>} /> */}
            </Route>
   <Route path="/ChatPage" element={<ChatPage/>} />

           {/* Footer Pages */}
           <Route path="/about" element={<AboutUs />} />
           <Route path="/terms-of-service" element={<TermsOfService />} />
           <Route path="/privacy-policy" element={<PrivacyPolicy />} />
           <Route path="/safety-tips" element={<SafetyTips />} />

              
       
           
           
            
             
          
    {/* <Register/> */}
    {/* <V.ideoCall/> */}
    {/* <Home/> */}
    {/* <SignUpForm/>/ */}
    {/* <LoginForm/> */}
    </Routes>
   
  
  
  );
}

export default App;
