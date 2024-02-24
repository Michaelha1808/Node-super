import { useEffect, useState } from "react";
import socket from "./socket";
const profile = JSON.parse(localStorage.getItem("profile"));
export default function Chat() {
  const [value, setValue] = useState("");
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    socket.auth = {
      _id: profile._id,
    };
    socket.connect();
    socket.on("receive private message", (data) => {
      const content = data.content;
      setMessages((message) => [
        ...message,
        {
          content,
          isSender: false,
        },
      ]);
    });
    return () => {
      socket.disconnect();
    };
  }, []);
  const send = (e) => {
    e.preventDefault();
    setValue("");
    socket.emit("private message", {
      content: value,
      to: "65d847b2cf6270fc066da37f", // user_id
    });
    setMessages((message) => [
      ...message,
      {
        content: value,
        isSender: true,
      },
    ]);
  };
  return (
    <div>
      <h1>Chat</h1>
      <div className="chat">
        {messages.map((message, index) => (
          <div key={index}>
            <div className="message-container">
              <div
                className={
                  "message " + (message.isSender ? "message-right" : "")
                }
              >
                {message.content}
              </div>
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={send}>
        <input
          type="text"
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
        <button>send</button>
      </form>
    </div>
  );
}
