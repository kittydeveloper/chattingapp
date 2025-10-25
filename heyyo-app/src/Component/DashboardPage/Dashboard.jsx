import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faMessage,faVideo,faPhone} from "@fortawesome/free-solid-svg-icons";
// import { useSelectedRoleData } from "../Context/SelectedRoleContext";
import { IoChatbubble } from "react-icons/io5";
import './Dashboard.css';
import { useUser } from "../LoginPage/userContext";
import { apiurl } from "../url";


// }
import axios from "axios";
import { useEffect } from "react";
const DashBoard = () => {
 const navigate = useNavigate()
       const { loginUser, userdashboard } = useUser();
       const[users,setUsers]=useState([])
const useriddata = localStorage.getItem("useridno")
       const userdata = async()=>{
     try{
  const response=await axios.get(`${apiurl}/getalluserlogindata/${useriddata}`)
  console.log(response)
  const data =response.data;
  setUsers(data)

     }
     catch(err){
   console.log(err)
     }
       }
       useEffect(()=>{
       userdata()
       },[userdashboard,apiurl])

 
 const handleEmailClick = (user) => {
    localStorage.setItem("receive_id",user.userid)
       localStorage.setItem("receive_name",user.username)
    // alert("Email icon clicked!");
    navigate("/ChatPage");
    // or redirect: window.location.href = "mailto:someone@example.com"
  };

  
    return (
        <div className="container-fluid">
            <div className="px-md-4 py-4 dashboard-main">
                <h2>Dashboard</h2>
                <div className='d-flex flex-row flex-wrap gap-4'>
                    {users.map((user, index) => {
                        return <div key={index} className="card shadow text-center mt-5" style={{ width: '15rem', borderRadius: '1rem', height: "auto" }}>
                            <div className="position-relative">
                                <img
                                    src={"https://images.unsplash.com/photo-1517816743773-6e0fd518b4a6"}
                                    className="card-img-top"
                                    alt="Background"
                                    style={{ height: '100px', objectFit: 'cover', borderTopLeftRadius: '1rem', borderTopRightRadius: '1rem' }}
                                />
                                <img
                                    src={"https://randomuser.me/api/portraits/men/78.jpg"}
                                    className="rounded-circle position-absolute"
                                    alt="Profile"
                                    style={{
                                        width: '70px',
                                        height: '70px',
                                        border: '4px solid white',
                                        top: '60px',
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                    }}
                                />
                            </div>

                            <div className="card-body mt-4">
                                <h5 className="card-title mb-0">{user.username}</h5>
                                <p className="text-muted small">{user.title}</p>

                                <div className="d-flex justify-content-around my-3  fw-bold">
                                    <div className='d-flex gap-5 fs-5 social-icons'>
                                     
                                       <FontAwesomeIcon
          icon={faMessage}
          size="lg"
          onClick={()=>handleEmailClick(user)}
          style={{ cursor: "pointer" }}
        />

         
                                       <FontAwesomeIcon
          icon={faVideo}
          size="lg"
          onClick={handleEmailClick}
          style={{ cursor: "pointer" }}
        />

         
                                       <FontAwesomeIcon
          icon={faPhone}
          size="lg"
          onClick={handleEmailClick}
          style={{ cursor: "pointer" }}
        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    })}
                </div>
            </div>

            {/* </div> */}
        </div>
    )
}
export default DashBoard;