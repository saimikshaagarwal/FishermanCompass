import React, { useState, useEffect } from "react";
import { FaCommentDots, FaTimes, FaPaperPlane } from "react-icons/fa";
const Chatbotfrontend = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    setMessages([{ text: "Hi, how may I assist you?", sender: "bot" }]);
  }, []);
  const sendMessage = async () => {
    if (!input) return;
    const userMessage = { text: input, sender: "user" };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    try {
      const response = await fetch("http://localhost:8080/chat", {
        
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: "1234", message: input }),
      });
      console.log("Response got", response);
      if (!response.ok) throw new Error("Failed to fetch response");
      const data = await response.json();

      console.log("Data got", data);
      const botMessage = { text: data.reply, sender: "bot" };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.log("Error:", error);
    }
    setInput("");
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };
  return (
    <div className="fixed bottom-5 right-5 z-50">
      {!isOpen && (
        <button
          className="bg-blue-500 text-white p-3
rounded-full shadow-lg"
          onClick={() => setIsOpen(true)}
        >
          <FaCommentDots size={24} />
        </button>
      )}

      {isOpen && (
        <div
          className="w-96 h-[520px] bg-white rounded-lg
shadow-lg flex flex-col fixed bottom-0 right-5 animate-slide-up z-50"
        >
          <div
            className="w-full bg-orange-500 text-white p-3
flex justify-between items-center rounded-t-lg"
          >
            <h2>Chat with Us</h2>
            <button onClick={() => setIsOpen(false)}>
              <FaTimes size={20} />
            </button>
          </div>

          
          <div
            className="flex-1 p-3 overflow-y-auto flex
flex-col"
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg mb-2
max-w-[75%] z-50 break-words ${
                  msg.sender === "user"
                    ? "bg-gray-300 text-black self-end text-right"
                    : "bg-gray-300 text-black self-start text-left"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="flex border-t border-gray-300 p-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              onKeyDown={handleKeyDown}
              className="flex-1 p-2 border-none
outline-none text-black"
            />
            <button
              onClick={sendMessage}
              className="bg-orange-500 text-white p-2"
            >
              <FaPaperPlane />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default Chatbotfrontend;
