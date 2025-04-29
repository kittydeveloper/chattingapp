import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import Peer from "simple-peer";

// Connect to your backend
const socket = io("http://localhost:3001");

function VideoCall() {
  const [me, setMe] = useState("");
  const [stream, setStream] = useState();
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const [idToCall, setIdToCall] = useState("");
  const [callStarted, setCallStarted] = useState(false);

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    // Get user's webcam and mic
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((currentStream) => {
      setStream(currentStream);
      if (myVideo.current) {
        myVideo.current.srcObject = currentStream;
      }
    });

    // Get my socket id
    socket.on("me", (id) => {
      setMe(id);
      console.log("My ID:", id);
    });

    // When someone calls me
    socket.on("call_user", (data) => {
      setReceivingCall(true);
      setCaller(data.from);
      setCallerSignal(data.signal);
    });

    // Optional: when call ended
    socket.on("call_ended", () => {
      window.location.reload();
    });
  }, []);

  // Call someone
  const callUser = (id) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", (data) => {
      socket.emit("call_user", {
        userToCall: id,
        signalData: data,
        from: me,
      });
    });

    peer.on("stream", (currentStream) => {
      if (userVideo.current) {
        userVideo.current.srcObject = currentStream;
      }
    });

    socket.on("call_accepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  // Answer the call
  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", (data) => {
      socket.emit("answer_call", { signal: data, to: caller });
    });

    peer.on("stream", (currentStream) => {
      if (userVideo.current) {
        userVideo.current.srcObject = currentStream;
      }
    });

    peer.signal(callerSignal);
    connectionRef.current = peer;
  };

  // Start Video Call button
  const startVideoCall = () => {
    setCallStarted(true);
  };

  // End Call button
  const leaveCall = () => {
    connectionRef.current.destroy();
    window.location.reload();
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "30px" }}>
      <h1>React Video Call App 📞🎥</h1>

      {/* Show My Video */}
      {stream && (
        <video
          playsInline
          muted
          ref={myVideo}
          autoPlay
          style={{ width: "300px", borderRadius: "10px", marginBottom: "20px", backgroundColor: "#000" }}
        />
      )}

      {/* Start Video Call Button */}
      {!callStarted && (
        <button
          onClick={startVideoCall}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            marginBottom: "20px",
          }}
        >
          Start Video Call
        </button>
      )}

      {/* After starting call */}
      {callStarted && (
        <>
          <input
            placeholder="Enter ID to call"
            value={idToCall}
            onChange={(e) => setIdToCall(e.target.value)}
            style={{
              marginBottom: "10px",
              padding: "8px",
              width: "250px",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
          />
          <button
            onClick={() => callUser(idToCall)}
            style={{
              padding: "10px 20px",
              backgroundColor: "#28a745",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              marginBottom: "20px",
            }}
          >
            Call Now
          </button>
        </>
      )}

      {/* Incoming call UI */}
      {receivingCall && !callAccepted && (
        <div>
          <h3>Incoming Call 📞</h3>
          <button
            onClick={answerCall}
            style={{
              padding: "10px 20px",
              backgroundColor: "#ffc107",
              color: "#000",
              border: "none",
              borderRadius: "8px",
            }}
          >
            Answer
          </button>
        </div>
      )}

      {/* Show User Video */}
      {callAccepted && (
        <div style={{ marginTop: "20px" }}>
          <video
            playsInline
            ref={userVideo}
            autoPlay
            style={{ width: "300px", borderRadius: "10px", backgroundColor: "#000" }}
          />
        </div>
      )}

      {/* End Call button */}
      {callAccepted && (
        <button
          onClick={leaveCall}
          style={{
            padding: "10px 20px",
            backgroundColor: "#dc3545",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            marginTop: "20px",
          }}
        >
          End Call
        </button>
      )}
    </div>
  );
}

export default VideoCall;
