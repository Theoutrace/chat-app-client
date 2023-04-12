import React from "react";
import { ChatActions } from "../../Store/reducers/chat-reducer";
import { useDispatch, useSelector } from "react-redux";
import GroupsIcon from "@mui/icons-material/Groups";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import "./Group.css";

const Group = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedGroup = useSelector((state) => state.chat.selectedGroup);

  const openGroupHandler = async () => {
    navigate(`/chat/${props.item.id}`);
    dispatch(ChatActions.selectGroup(props.item));
  };

  return (
    <Box
      onClick={openGroupHandler}
      key={props.item.id}
      sx={{
        backgroundColor: `${
          selectedGroup && selectedGroup.id === props.item.id
            ? "wheat"
            : "white"
        }`,
        height: "55px",
        marginBottom: "3px",
        display: "flex",
        justifyContent: "left",
        alignItems: "center",
        paddingLeft: "8px",
        fontWeight: "500",
        "&:hover": {
          backgroundColor: "#ebedee",
          cursor: "pointer",
        },
      }}
    >
      <GroupsIcon
        sx={{
          margin: "10px 20px",
          color: "grey",
          "&:hover": {
            cursor: "pointer",
            color: "#1976d2",
          },
        }}
      ></GroupsIcon>
      <div className="d-flex flex-row user-single-sidebr-outer-contnr">
        <h6 className="m-0 p-2">{props.item.name}</h6>
      </div>
    </Box>
  );
};

export default Group;
