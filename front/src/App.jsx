import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import io from "socket.io-client";

const socket = io("http://localhost:8800");
function App() {
  const [msg, setMsg] = useState("");
  const [room, setRoom] = useState("");
  // console.log(msg);
  const sendMessage = () => {
    socket.emit("send_message", { message: msg, room: room });
  };

  const connectRoom = () => {
    socket.emit("join_room", room, (response) => {
      console.log(response.status);
    });
  };

  useEffect(() => {
    try {
      socket.on("receive_message", (msg) => {
        console.log(msg);
      });
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <>
      <div>
        <h1>Socket Message Testing</h1>
        <input
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          placeholder="Type your message"
        />
        <button onClick={sendMessage}>Send</button>

        <input
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          placeholder="Type your room"
        />
        <button onClick={connectRoom}>Enter</button>
      </div>
    </>
  );
}

export default App;
