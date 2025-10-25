
import React, {useState, useEffect} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faUser, faCircle, faComments, faSearch, faPlus } from "@fortawesome/free-solid-svg-icons";
import './Chat.css';
import { apiurl } from '../url';
import axios from 'axios';
import dayjs from 'dayjs'
import { useUserchet } from '../ChatPage/chatcontext'; 

const ChatBar = ({socket,onSelectUser}) => {
    const [users, setUsers] = useState([])
    const [isOnline, setIsOnline] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const{chatindividual}=useUserchet()
// localStorage.setItem("username", data.user_name);
              const dataid =  localStorage.getItem("useridno");
         const userdatachatbar = async()=>{
     try{
  const response=await axios.get(`${apiurl}/api/chats/${dataid}`)
  console.log(response,"eee")
  const data =response.data;
  setUsers(data)

     }
     catch(err){
   console.log(err)
     }
       }
       useEffect(()=>{
    //    userdata()
    userdatachatbar()
       },[socket,dataid,apiurl])

    // useEffect(()=> {
    //     socket.on("newUserResponse", data => setUsers(data))
    // }, [socket, users])
    
    // const recievrid = localStorage.getItem("receive_id")
    // const senderid = localStorage.getItem("useridno")  
    // const username = localStorage.getItem("username");
    // const receivernames = localStorage.getItem("receive_name")

    // Mock chat history data - in real app, this would come from your backend
    const chatHistory = [
        {
            id: 1,
            name: "Emma",
            lastMessage: "Hey! How are you doing?",
            timestamp: "2:30 PM",
            unreadCount: 2,
            isOnline: true,
            lastSeen: "Online",
            avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=100&h=100&fit=crop&crop=face"
        },
        {
            id: 2,
            name: "Sofia",
            lastMessage: "Thanks for the great conversation!",
            timestamp: "1:15 PM",
            unreadCount: 0,
            isOnline: false,
            lastSeen: "2 hours ago",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
        },
        {
            id: 3,
            name: "Isabella",
            lastMessage: "Can't wait to meet you!",
            timestamp: "12:45 PM",
            unreadCount: 1,
            isOnline: true,
            lastSeen: "Online",
            avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face"
        },
        {
            id: 4,
            name: "Mia",
            lastMessage: "Good morning! ☀️",
            timestamp: "11:20 AM",
            unreadCount: 0,
            isOnline: false,
            lastSeen: "5 hours ago",
            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face"
        },
        {
            id: 5,
            name: "Charlotte",
            lastMessage: "See you tomorrow!",
            timestamp: "Yesterday",
            unreadCount: 0,
            isOnline: true,
            lastSeen: "Online",
            avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face"
        }
    ];

    const filteredChats = users.filter(chat => 
        chat.user_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    


    const formatDate = (date) => {
      if (dayjs(date).isSame(dayjs(), "day")) return  dayjs(date).format("HH:MM");;
      if (dayjs(date).isSame(dayjs().subtract(1, "day"), "day")) return "Yesterday";
      return dayjs(date).format("DD/MM/YYYY");
    };
    const sender= localStorage.getItem("useridno") ;
 const handleclick = (user) => {
      console.log("Clicked user:", user);
    localStorage.setItem("receive_id",user.userId)
       localStorage.setItem("receive_name",user.user_name)
       onSelectUser(sender,user.userId);
    // alert("Email icon clicked!");
    // navigate("/ChatPage");
    // or redirect: window.location.href = "mailto:someone@example.com"
  };
    return (
        <div className='chat__sidebar'>
            <div className="chat__sidebar-header">
                <div className="chat__logo">
                    <FontAwesomeIcon icon={faHeart} className="chat__logo-icon" />
                    <h2>Sweet Chat</h2>
                </div>
                <div className="online-indicator">
                    <FontAwesomeIcon icon={faCircle} className={`status-dot ${isOnline ? 'online' : 'offline'}`} />
                    <span>{isOnline ? 'Online' : 'Offline'}</span>
                </div>
            </div>
          
            <div className="chat__search-section">
                <div className="search-container">
                    <FontAwesomeIcon icon={faSearch} className="search-icon" />
                    <input 
                        type="text" 
                        placeholder="Search conversations..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                </div>
                <button className="new-chat-btn">
                    <FontAwesomeIcon icon={faPlus} />
                </button>
            </div>

            <div className="chat__conversations">
                <div className="conversations-header">
                    <FontAwesomeIcon icon={faComments} className="conversations-icon" />
                    <h4>Recent Chats</h4>
                </div>
                 {chatindividual &&  <>
                <div className="conversations-list">
                    {filteredChats.map((chat) => (
                        <div key={chat.id} className="conversation-item" onClick={() => handleclick(chat)}>
                            <div className="conversation-avatar">
                                <img src={`${apiurl}/profileimages/${chat.Profile_picture}`}  />
                                <div className={`online-status ${chat?.isOnline ? 'online' : 'offline'}`}></div>
                            </div>
                            <div className="conversation-details">
                                <div className="conversation-header-info">
                                    <h5 className="conversation-name">{chat.user_name}</h5>
                                    <span className="conversation-time">{formatDate(chat.lastMessageTime)}</span>
                                </div>
                                <div className="conversation-preview">
                                    <p className="last-message">{chat.lastMessage}</p>
                                    {chat.unreadCount > 0 && (
                                        <span className="unread-badge">{chat.unreadCount}</span>
                                    )}
                                </div>
                                <p className="last-seen">{chat.lastSeen}</p>
                            </div>
                        </div>
                    ))}
                </div>
                 </>
}
           
            </div>
           

        </div>
    )
}

export default ChatBar