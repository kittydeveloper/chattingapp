
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faVideo, faEllipsisV, faArrowLeft, faUser, faBan, faTrash, faVolumeMute, faBell } from "@fortawesome/free-solid-svg-icons";
import './Chat.css';
import dayjs from 'dayjs'

const ChatBody1 = ({messages, typingStatus, lastMessageRef}) => { 
  const navigate = useNavigate()
  const senderid = localStorage.getItem("useridno")
  const receivernames = localStorage.getItem("receive_name")
  const [showMenu, setShowMenu] = useState(false)
   const groupByDate = (messages) => {
      const groups = {};
      messages.forEach((msg) => {
        const date = dayjs(msg.created_at).format("YYYY-MM-DD"); // created_at from DB
        if (!groups[date]) groups[date] = [];
        groups[date].push(msg);
      });
      return groups;
    };
  
    const groupedMessages = groupByDate(messages);
    console.log(groupedMessages)
  
    // Format header text
    const formatDate = (date) => {
      if (dayjs(date).isSame(dayjs(), "day")) return "Today";
      if (dayjs(date).isSame(dayjs().subtract(1, "day"), "day")) return "Yesterday";
      return dayjs(date).format("MMM DD, YYYY");
    };
  console.log(groupedMessages,"group")

  const handleLeaveChat = () => {
    navigate("/home/MainDashboard/dashboard")
  }

  const handleCall = () => {
    console.log('Voice call initiated')
    // Implement voice call functionality
  }

  const handleVideoCall = () => {
    console.log('Video call initiated')
    // Implement video call functionality
  }

  const handleMenuToggle = () => {
    setShowMenu(!showMenu)
  }

  const handleBlock = () => {
    console.log('User blocked')
    setShowMenu(false)
  }

  const handleClearChat = () => {
    console.log('Chat cleared')
    setShowMenu(false)
  }

  const handleMute = () => {
    console.log('Chat muted')
    setShowMenu(false)
  }

  console.log(messages,'mess')
  return (
    <>
      <header className='chat__mainHeader'>
        <div className="chat__header-left">
          <button className="back-btn" onClick={handleLeaveChat}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <div className="chat__profile-info">
            <div className="chat__profile-avatar">
              <img 
                src="https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=100&h=100&fit=crop&crop=face" 
                alt={receivernames || 'Chat Partner'}
              />
              <div className="online-indicator"></div>
            </div>
            <div className="chat__profile-details">
              <h3 className="chat__profile-name">{receivernames || 'Chat Partner'}</h3>
              <p className="chat__profile-status">Online</p>
            </div>
          </div>
        </div>
        
        <div className="chat__header-right">
          <button className="header-btn" onClick={handleCall}>
            <FontAwesomeIcon icon={faPhone} />
          </button>
          <button className="header-btn" onClick={handleVideoCall}>
            <FontAwesomeIcon icon={faVideo} />
          </button>
          <div className="menu-container">
            <button className="header-btn" onClick={handleMenuToggle}>
              <FontAwesomeIcon icon={faEllipsisV} />
            </button>
            {showMenu && (
              <div className="chat__menu">
                <button className="menu-item" onClick={handleMute}>
                  <FontAwesomeIcon icon={faVolumeMute} />
                  <span>Mute notifications</span>
                </button>
                <button className="menu-item" onClick={handleClearChat}>
                  <FontAwesomeIcon icon={faTrash} />
                  <span>Clear chat</span>
                </button>
                <button className="menu-item" onClick={handleBlock}>
                  <FontAwesomeIcon icon={faBan} />
                  <span>Block user</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>



        
     <div className='message__container'>

            {Object.keys(groupedMessages).map((date) => (
              <div key={date}>
                {/* 📌 Date Separator */}
                <div className="text-center my-2">
                  <small className="bg-white text-muted px-2 py-1 rounded border">
                    {formatDate(date)}
                  </small>
                </div>
            
                {/* 📌 Messages */}
                {groupedMessages[date].map((msg, i) => (
                  <div
                    key={i}
                    className={`mb-2 d-flex ${
                      msg.sender_id === senderid ? "justify-content-end" : "justify-content-start"
                    }`}
                  >
                     <div
                      className={`p-2 rounded ${
                        msg.sender_id === senderid
                          ? "bg-primary text-white"
                          : "bg-secondary text-white"
                      }`}
                      style={{ maxWidth: "70%" }}
                    >
                      {msg.message}
                      <div className="text-end mt-1" style={{ fontSize: "0.7rem" }}>
                        {dayjs(msg.created_at).format("hh:mm A")}{" "}
                        
                        
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
            
                  {/* <div ref={chatEndRef} />
                </div> */}

          <div className='message__status'>
            <p>{typingStatus}</p>
          </div>
          <div ref={lastMessageRef} />   
        </div> 
    </>
  )
}

export default ChatBody1