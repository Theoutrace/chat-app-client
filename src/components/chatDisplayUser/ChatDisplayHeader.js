import React from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { ChatActions } from "../../Store/reducers/chat-reducer";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useDispatch, useSelector } from "react-redux";
import GroupsIcon from "@mui/icons-material/Groups";
import { Button } from "@mui/material";
import { Card } from "@mui/material";
import "./ChatDisplayHeader.css";

const ChatDisplayHeader = () => {
  const selectedGroup = useSelector((state) => state.chat.selectedGroup);
  const dispatch = useDispatch();
  const displayUsersHandler = () => {
    dispatch(ChatActions.fetchUsers());
  };

  const showMembersHandler = () => {
    dispatch(ChatActions.showMembers());
    dispatch(ChatActions.fetchGroupMembers());
  };

  const goBackHandler = () => {
    dispatch(ChatActions.selectGroup(null));
  };
  return (
    <div className="col-sm-12 add-cls-msg-bx-disp-outer">
      <Card
        sx={{
          borderRadius: "5px 5px 0px 0px",
          boxShadow: "rgba(0, 0, 0, 0.2) 0px 2px 15px",
          padding: "0px 20px",
          backgroundColor: "white",
        }}
        className="Adept-chat-disp-cls-ou-se-c-co-mp"
      >
        <div className="xtra-dv-cls-thr-in">
          <ChevronLeftIcon
            onClick={goBackHandler}
            sx={{
              backgroundColor: "black",
              width: "30px",
              height: "30px",
              borderRadius: "25px",
              color: "white",
              display: { xs: "block", md: "none" },
              cursor: "pointer",
            }}
          />
          {selectedGroup && (
            <GroupsIcon
              sx={{
                color: "#1976D2",
                "&:hover": {
                  cursor: "pointer",
                  color: "#1976d2",
                },
                display: { xs: "none", md: "block" },
              }}
            ></GroupsIcon>
          )}
          <div className="d-flex align-items-center mx-2">
            <h6 className="text-secondary my-2">
              {selectedGroup ? selectedGroup.name : ""}
            </h6>
          </div>
        </div>
        <div className="col-sm-1 bg-primary d-flex justify-content-end align-items-center">
          <Button
            sx={{
              position: "absolute",
              right: "100px",
              backgroundColor: "white",
              borderRadius: "20px",
              color: "#1976D2",
              padding: "0px 10px",
              border: "2px dashed #1976D2",
              textTransform: "capitalize",
              "&:hover": {
                backgroundColor: "#1976D2",
                color: "white",
                border: "2px solid #1976D2",
              },
            }}
            onClick={showMembersHandler}
          >
            <ArrowDropDownIcon />
            Members
          </Button>
          <PersonAddIcon
            sx={{
              position: "absolute",
              right: "50px",
              color: "#1976D2",
              "&:hover": { cursor: "pointer" },
            }}
            onClick={displayUsersHandler}
          />
          <MoreVertIcon sx={{ position: "absolute", right: "10px" }} />
        </div>
      </Card>
    </div>
  );
};

export default ChatDisplayHeader;
