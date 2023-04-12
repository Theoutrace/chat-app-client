import React, { useEffect, useRef } from "react";
import SingleGroupMember from "../singleGroupMember/SingleGroupMember";
import ChatDisplayHeader from "../chatDisplayUser/ChatDisplayHeader";
import { ChatActions } from "../../Store/reducers/chat-reducer";
import SingleUserInvite from "../singleUser/SingleUserInvite";
import { useDispatch, useSelector } from "react-redux";
import ChatInput from "../chatInput/ChatInput";
import SingleMessage from "./SingleMessage";
import groupIcon from "./images/group.png";
import teaIcon from "./images/teaIcon.gif";
import { Card } from "@mui/material";
import { Box } from "@mui/system";
import "./ChatDisplay.css";
import axios from "axios";

const ChatDisplay = (props) => {
  const fetchGroupMembers = useSelector((state) => state.chat.fetchMembers);
  const selectedGroup = useSelector((state) => state.chat.selectedGroup);
  const fetchMembers = useSelector((state) => state.chat.fetchMembers);
  const GroupChats = useSelector((state) => state.chat.GroupChats);
  const showMembers = useSelector((state) => state.chat.showMembers);
  const fetchUsers = useSelector((state) => state.chat.fetchUsers);
  const allUsers = useSelector((state) => state.chat.users);
  const AllChats = useSelector((state) => state.chat.AllChats);
  const messagesEndRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    (async function fetchUsers() {
      const response = await axios.get(
        `http://localhost:3001/users/receivers`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        }
      );
      dispatch(ChatActions.addUsers(response.data.users));
    })();
  }, [fetchUsers, dispatch]);

  useEffect(() => {
    scrollToBottom();
  }, [GroupChats]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView();
  };

  useEffect(() => {
    if (selectedGroup) {
      (async function fetchGrpMemb() {
        const response = await axios.get(
          `http://localhost:3001/groups/getmembers/${selectedGroup.id}`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
              "Content-Type": "application/json",
            },
          }
        );
        dispatch(ChatActions.addGroupMembers(response.data.groupMembers));
        dispatch(ChatActions.addGroupAdmins(response.data.groupAdmins));
      })();
    }
  }, [selectedGroup, fetchGroupMembers, dispatch, fetchMembers]);

  useEffect(() => {
    if (selectedGroup) {
      const groupChatFiltered =
        AllChats &&
        AllChats.filter((chat) => chat.groupId === selectedGroup.id);
      dispatch(ChatActions.addToGroupChats(groupChatFiltered));
    }
  }, [AllChats, dispatch, selectedGroup]);

  return (
    <Card
      className="chat-disp-outer-card-comp"
      sx={{
        width: {
          xs: selectedGroup ? "100%" : "0%",
          md: "75%",
          borderRadius: "5px",
        },
      }}
    >
      {selectedGroup ? (
        <div className="col-sm-12 container message-box-cntnr-disp ">
          <ChatDisplayHeader />
          {fetchUsers && (
            <Card
              sx={{
                position: "absolute",
                zIndex: "8",
                right: "30px",
                top: "70px",
                width: "200px",
                padding: "10px 20px",
              }}
            >
              {allUsers.length > 1 ? (
                allUsers.map((user) => {
                  return (
                    <div className="p-1" key={user.id}>
                      <SingleUserInvite
                        key={user.id}
                        user={user}
                        socket={props.socket}
                      />
                    </div>
                  );
                })
              ) : (
                <h6>No users available</h6>
              )}
            </Card>
          )}
          {showMembers && (
            <Card
              sx={{
                position: "absolute",
                zIndex: "8",
                right: { xs: "50px", md: "100px" },
                top: "70px",
                width: "300px",
                padding: "10px 20px",
              }}
            >
              <div className="p-1">
                <SingleGroupMember />
              </div>
            </Card>
          )}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              paddingTop: "80px",
              paddingBottom: "80px",
            }}
          >
            {GroupChats.length !== 0 ? (
              GroupChats.map((item) => {
                return <SingleMessage key={item.id} item={item} />;
              })
            ) : (
              <div className="d-flex flex-column justify-content-center align-items-center mt-4">
                <img src={teaIcon} alt="teaIcon" width="40px" />
                <h4 className="text-secondary">Start the conversation...</h4>
              </div>
            )}
            <div ref={messagesEndRef} />
          </Box>
          <ChatInput socket={props.socket} />
        </div>
      ) : (
        <div className="col-sm-12 add-cls-ad-non-existent-group-case">
          <img src={groupIcon} alt="" />
          <h4>Create groups and share whatever you want to.</h4>
          <h2 className="my-4 text-primary">Dhindhora</h2>
        </div>
      )}
    </Card>
  );
};

export default ChatDisplay;
