import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "@mui/material/Card";
import jwtDecode from "jwt-decode";
import "./ChatInput.css";
import { ChatActions } from "../../Store/reducers/chat-reducer";
import SendIcon from "@mui/icons-material/Send";

const ChatInput = (props) => {
  const dispatch = useDispatch();
  const selectedGroup = useSelector((state) => state.chat.selectedGroup);
  const AllChats = useSelector((state) => state.chat.AllChats);
  const [messageText, setMessageText] = useState("");
  const userDetails = jwtDecode(localStorage.getItem("token"));

  const messageOnChangeHandler = (e) => {
    setMessageText(() => e.target.value);
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();

    const sentMessageDetails = {
      createdAt: new Date().toISOString(),
      groupId: selectedGroup.id,
      message: messageText,
      senderId: userDetails.id,
      senderName: userDetails.name,
      isUrl: false,
    };
    props.socket.emit("send-message", sentMessageDetails); // <--- sending submitted message to the socket
    setMessageText(() => "");
  };

  if (props.socket) {
    props.socket.on("new-message", (data) => {
      dispatch(ChatActions.addToAllChat([...AllChats, data]));
    });
  }

  return (
    <Card
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "60px",
        padding: "20px 30px",
        borderRadius: "0px 0px 5px 5px",
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        position: "absolute",
        left: "0",
        bottom: "0",
        zIndex: "2",
      }}
    >
      <form className=" add-form-inp-frm-dcls" onSubmit={formSubmitHandler}>
        <input
          className="col-sm-10  input-bx-cls-add"
          placeholder="start typing..."
          onChange={messageOnChangeHandler}
          value={messageText}
        />
        <button className=" additional-send-attach-cls bg-grey " type="submit ">
          <SendIcon sx={{ fontSize: "20px", color: "white" }} />
        </button>
      </form>
    </Card>
  );
};

export default ChatInput;
