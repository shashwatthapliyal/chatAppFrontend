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
    <div className="h-full flex bg-[#f0f2f5] text-gray-800">
      {/* LEFT SIDEBAR */}
      <div className="hidden md:flex md:w-[30%] lg:w-[25%] flex-col border-r border-gray-200 bg-white">
        <div className="px-4 py-3 border-b border-gray-200 font-semibold">
          Chats
        </div>

        <div className="flex-1 overflow-y-auto">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
            <div
              key={item}
              className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100"
            >
              <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-sm font-medium">
                U
              </div>

              <div className="flex-1">
                <h3 className="text-sm font-medium">User {item}</h3>
                <p className="text-xs text-gray-500 truncate">
                  Last message preview...
                </p>
              </div>

              <span className="text-xs text-gray-400">2:30 PM</span>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT CHAT AREA */}
      <div className="flex-1 flex flex-col">
        {/* HEADER */}
        <div className="flex items-center gap-3 px-4 sm:px-6 py-3 border-b border-gray-200 bg-white">
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center font-medium">
            {firstName?.[0]?.toUpperCase()}
          </div>

          <div>
            <h2 className="font-medium text-sm sm:text-base">
              {firstName} {lastName}
            </h2>
            <p className="text-xs text-green-500">Online</p>
          </div>
        </div>

        {/* CHAT AREA */}
        <div className="flex-1 overflow-y-auto px-3 sm:px-6 py-4 space-y-2">
          {messages.map((msg, idx) => {
            const isMe = msg.firstName === user.firstName;

            return (
              <div
                key={idx}
                className={`flex ${isMe ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[75%] sm:max-w-[60%] px-4 py-2 text-sm ${
                    isMe
                      ? "bg-[#dcf8c6] rounded-lg rounded-br-none"
                      : "bg-white border border-gray-200 rounded-lg rounded-bl-none"
                  }`}
                >
                  <p className="break-words">{msg.text}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* INPUT */}
        <div className="px-3 sm:px-6 py-3 border-t border-gray-200 bg-white">
          <div className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-2">
            <input
              value={newMessage}
              type="text"
              placeholder="Type a message"
              className="flex-1 bg-transparent outline-none text-sm px-2"
              onChange={(e) => setnewMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />

            <button className="text-xl">😊</button>

            <button
              onClick={sendMessage}
              className="bg-[#25D366] text-white px-4 py-1.5 rounded-full text-sm"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
