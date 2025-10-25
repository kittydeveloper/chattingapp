
import React, {useEffect, useState} from 'react'
import './Chat.css';
// import { useUserchet } from '../ChatPage/chatcontext';
// import dayjs from 'dayjs'

const ChatFooter = ({socket}) => {
        const [message, setMessage] = useState("")
    // const {setChatTrigger}=useUserchet()
    
    // const handleTyping = () => socket.emit("typing",`${localStorage.getItem("userName")} is typing`)
const recievrid =localStorage.getItem("receive_id")
const senderid = localStorage.getItem("useridno")  

   const sendMessage = (e) => {
    e.preventDefault(); // Prevent page reload
    if (message.trim() !== "") {
      socket.emit("send_message", { 
        sender_id: senderid, 
        receiver_id: recievrid,
        message 
      });
      setMessage("");
    }
  };
  
  return (
    <div className='chat__footer'>

               <form className='form' onSubmit={sendMessage} >
      <input 
            type="text" 
            placeholder='Write message' 
            className='message' 
            value={message} 
            onChange={e => setMessage(e.target.value)}
            // onKeyDown={handleTyping}
            />
            <button className="sendBtn"  >SEND</button>
        </form>
     </div>
  )
}

export default ChatFooter