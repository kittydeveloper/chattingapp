import React, { useEffect, useState, useRef,useMemo} from 'react'
import ChatBar from '../Chatheaderfooter/ChatBar'
import ChatFooter from '../Chatheaderfooter/ChatFooter';
import ChatBody1 from '../Chatheaderfooter/ChatBody12';
import { io } from "socket.io-client";
import { useUserchet } from './chatcontext';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';
// import { useUser } from './userContext'

// import Peer from "simple-peer";

// // Replace with your server's IP
const socket = io("http://localhost:4000");

const ChatPage = () => { 
  const [messages, setMessages] = useState([])
  const [typingStatus, setTypingStatus] = useState("")
  // const lastMessageRef = useRef(null);
  const chatEndRef = useRef(null);
  const{chattrigger,setChatIndividual}=useUserchet()

    const receiver =localStorage.getItem("receive_id")
const sender= localStorage.getItem("useridno") ;
// const username =localStorage.getItem("username"); 
// const receivername = localStorage.getItem("receive_name")


  const fetchMessages = async (senderId, receiverId) => {
    console.log("Fetching messages for:", senderId, receiverId,sender,receiver);
    if (!senderId || !receiverId) return;

    try {
      const res = await fetch(`http://localhost:4000/messages/${senderId}/${receiverId}`);
      const data = await res.json();
      setMessages(data);
    } catch (err) {
      console.error("Error fetching messages:", err);
    }
  };

  // 🔹 Auto-fetch when sender/receiver changes
  useEffect(() => {
    fetchMessages(sender, receiver);
  }, [sender, receiver]);


  
 useEffect(() => {
     socket.on("receive_message", (data) => {
       setMessages((prev) => [...prev, data]);
      //  console.log(data.id,"iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii")
       //  socket.emit("delivered", data.id);
    //      if (data.receiver_id === receiver) {
    //  socket.emit("delivered", { msgId: data.id, });
    //      }
   
     });
 
     return () => {
       socket.off("receive_message");
     };
   }, []);

     useEffect(() => {
       chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
     }, [messages]);

      useEffect(() => {
       chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
     }, [messages]);
   
   
  //  useEffect(()=> {
  //   socket.emit("messageResponse",{Reciever_id:recievrid,sender_id:senderid,username:username,receivername:receivername})
  // }, [chattrigger])

  useEffect(()=> {
    socket.on("typingResponse", data => setTypingStatus(data))
  }, [socket])

  

  return (
    <div className="chat-page-wrapper">
      {/* Top Bar */}
      <div className="top-bar">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-md-6">
              <div className="top-bar-left d-flex align-items-center">
                <span className="email-text ms-3">support@seventhqueen.com</span>
              </div>
            </div>
            <div className="col-md-6">
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="navbar navbar-expand-lg main-navbar">
        <div className="nav-container container-fluid">
          <div className="logo">
            <FontAwesomeIcon icon={faHeart} className="logo-heart" />
            <span className="logo-text">Sweet Date 4u</span>
            <div className="logo-tagline">DATING THEME FOR LOVERS</div>
          </div>

          <div className="nav-links">
            <Link to="/" className="nav-link">Welcome</Link>
            <Link to="/discover" className="nav-link">Explore</Link>
            <Link to="/chat"  onClick={() => {
   setChatIndividual(true);
  }}className="nav-link active">Chats</Link>
            <Link to="/posts" className="nav-link">Posts</Link>
            <Link to="/about" className="nav-link">AboutUs</Link>
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

      <div className="chat" style={{marginTop: '120px'}}>
        <ChatBar socket={socket} onSelectUser={fetchMessages}/>
        <div className='chat__main'>
          <ChatBody1 messages={messages} typingStatus={typingStatus} lastMessageRef={chatEndRef}/>
          <ChatFooter socket={socket}/>
        </div>
      </div>
    </div>
  )
}

export default ChatPage