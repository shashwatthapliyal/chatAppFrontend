import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useParams } from "react-router";
import {createSocketConnection} from "../utils/socket.js"
import { useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";

const Chat = () => {
  const location = useLocation();
  const { firstName, lastName } = location?.state;
  console.log(firstName);
  const [newMessage, setnewMessage] = useState("");

  const [messages, setMessages] = useState([]);
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const { targetUserId } = useParams();

  const fetchChatMessages = async () => {
    const chat = await axios.get(`${BASE_URL}/chat/${targetUserId}`, {
      withCredentials: true,
    });
    console.log(chat.data.messages);

    const chatMessages = chat?.data?.messages.map((msg) => {
      const { firstName, lastName } = msg.senderId;
      const text = msg.text;

      return {
        firstName,
        lastName,
        text,
      };
    });
    setMessages(chatMessages);
  };

  useEffect(() => {
    fetchChatMessages();
  }, []);

  useEffect(() => {
    if (!user) {
      return;
    }
    // console.log(userId, targetUserId);
    // As soon as page loads , the joinChat event is emitted
const socket=createSocketConnection();

    socket.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    socket.on("messageReceived", ({ firstName, text }) => {
      console.log(firstName + " : " + text);
      setMessages((prev) => [...prev, { firstName, text }]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const sendMessage = () => {
const socket=createSocketConnection();

    socket.emit("sendMessage", {
      firstName: user.firstName,
      userId,
      targetUserId,
      text: newMessage,
    });
    setnewMessage("");
  };

  return (
    <div className="h-screen flex bg-black text-white">
      {/* LEFT SIDEBAR */}
      <div className="w-[30%] mt-14 hidden md:flex flex-col border-r border-white/10 bg-[#020617]">
        {/* Sidebar Header */}
        <div className=" pt-8 px-4 py-4 border-b border-white/10 bg-white/5 backdrop-blur-xl">
          <h2 className="font-semibold text-lg">Chats</h2>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
            <div
              key={item}
              className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 cursor-pointer transition border-b border-white/5"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center font-bold">
                U
              </div>

              <div className="flex-1">
                <h3 className="text-sm font-medium">User {item}</h3>
                <p className="text-xs text-gray-400 truncate">
                  Last message preview...
                </p>
              </div>

              <span className="text-xs text-gray-500">2:30 PM</span>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT CHAT AREA */}
      <div className="flex-1">
        <div className="mt-14 h-[calc(100vh-56px)] flex flex-col bg-gradient-to-br from-[#0f172a] via-[#020617] to-black text-white">
          {/* HEADER */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-white/10 bg-white/5 backdrop-blur-xl sticky top-0 z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center font-bold text-lg shadow-lg">
                {firstName?.[0].toUpperCase()}
              </div>
              <div>
                <h2 className="font-semibold text-base sm:text-lg">
                  {firstName} {lastName && lastName}
                </h2>
                <p className="text-xs text-green-400">● Online</p>
              </div>
            </div>
          </div>

          {/* CHAT AREA */}
          <div className="flex-1 overflow-y-auto px-3 sm:px-6 py-4 space-y-3">
            {messages.map((msg, idx) => {
              const isMe = msg.firstName === user.firstName;

              return (
                <div
                  key={idx}
                  className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[75%] sm:max-w-[60%] px-4 py-2 rounded-2xl text-sm shadow-md ${
                      isMe
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-br-none"
                        : "bg-white/10 backdrop-blur-md text-gray-200 rounded-bl-none"
                    }`}
                  >
                    <p className="break-words">{msg.text}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* INPUT */}
          <div className="px-3 sm:px-6 py-3 border-t border-white/10 bg-white/5 backdrop-blur-xl sticky bottom-0">
            <div className="flex items-center gap-2 sm:gap-3 bg-white/10 rounded-full px-3 py-2 border border-white/20 focus-within:border-purple-400 transition">
              <input
                value={newMessage}
                type="text"
                placeholder="Type a message..."
                className="flex-1 bg-transparent outline-none px-2 text-sm"
                onChange={(e) => setnewMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />

              <button className="p-2 rounded-full hover:bg-white/10 transition">
                😊
              </button>

              <button
                onClick={sendMessage}
                className="px-4 py-1.5 sm:py-2 text-sm rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-105 active:scale-95 transition font-medium"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
