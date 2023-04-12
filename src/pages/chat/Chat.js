import React, { useEffect, useState } from "react";
import ChatDisplay from "../../components/chatDisplay/ChatDisplay";
import { AuthActions } from "../../Store/reducers/auth-reducer";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../components/sidebar/Sidebar";
import io from "socket.io-client";
import axios from "axios";
import "./Chat.css";
import { ChatActions } from "../../Store/reducers/chat-reducer";

const Chat = (props) => {
  const dispatch = useDispatch();
  const [socketVal, setSocketVal] = useState("");

  //local data
  const msgInLocal = JSON.parse(localStorage.getItem("message"));
  const userEmail = localStorage.getItem("email");
  const auth = localStorage.getItem("token");

  useEffect(() => {
    if (userEmail) {
      dispatch(AuthActions.login({ email: userEmail }));
    }
  }, [userEmail, dispatch]);

  const askId =
    msgInLocal === null || msgInLocal === "undefined" || msgInLocal.length === 0
      ? 0
      : msgInLocal[msgInLocal.length - 1].messageId;

  useEffect(() => {
    // socket created -----
    if (auth) {
      const newSocket = io("http://localhost:3001", {
        auth: {
          token: auth,
        },
      });
      setSocketVal(newSocket);
    }
  }, [auth, dispatch]);

  useEffect(() => {
    (async function fetchChat() {
      const response = await axios.get(
        `http://localhost:3001/chat/userchats/${askId}`,
        {
          headers: {
            Authorization: auth,
            "Content-Type": "application/json",
          },
        }
      );
      if (
        msgInLocal === "undefined" ||
        msgInLocal === null ||
        msgInLocal.length === 0
      ) {
        localStorage.setItem("message", JSON.stringify(response.data.chats));
        dispatch(ChatActions.addToAllChat(response.data.chats));
      } else {
        const combinedChats = [...msgInLocal, ...response.data.chats];
        localStorage.setItem("message", JSON.stringify(combinedChats));
        dispatch(ChatActions.addToAllChat(combinedChats));
      }
    })();
  }, [auth, askId, msgInLocal, dispatch]);

  return (
    <div className=" p-2 d-flex container additional-chat-page-design-css">
      <Sidebar modal={props.modal} socket={socketVal} />
      <ChatDisplay socket={socketVal} />
    </div>
  );
};

export default Chat;
