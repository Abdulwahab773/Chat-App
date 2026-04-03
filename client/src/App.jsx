import { useEffect } from "react";
import "./App.css";
import { io } from "socket.io-client";

function App() {
  const socket = io("http://localhost:3000");

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server");
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, [socket]);



  return (
    <>
      <h1>Chat App</h1>
      <input type="text" placeholder="Type a message..." />
      <button>Send</button>
    </>
  );
}

export default App;
