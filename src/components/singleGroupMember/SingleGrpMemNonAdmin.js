import React from "react";
import jwtDecode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { Button } from "@mui/material";
import axios from "axios";
import { ChatActions } from "../../Store/reducers/chat-reducer";

const SingleGrpMemNonAdmin = (props) => {
  const dispatch = useDispatch();
  const loggedInUser = jwtDecode(localStorage.getItem("token"));
  const groupAdmins = useSelector((state) => state.chat.selectedGroupAdmins);
  const selectedGroup = useSelector((state) => state.chat.selectedGroup);
  let showMakeAdmin = false;
  for (let i = 0; i < groupAdmins.length; i++) {
    if (loggedInUser.id === groupAdmins[i].id) {
      showMakeAdmin = true;
    }
  }

  const removeGroupMemberHandler = async () => {
    const memberToRemove = {
      memberId: props.member.id,
      groupId: selectedGroup.id,
    };
    await axios.post(
      `http://localhost:3001/groups/removemember`,
      memberToRemove,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      }
    );
    dispatch(ChatActions.fetchGroupMembers());
  };

  const makeAdminHandler = async () => {
    const memberDetails = {
      ...props.member,
    };
    await axios.post(`http://localhost:3001/groups/makeadmin`, memberDetails, {
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    });
    dispatch(ChatActions.fetchGroupMembers());
  };

  return (
    <div className="d-flex p-1  my-2 justify-content-between">
      <div>{props.member.name}</div>
      {showMakeAdmin && (
        <div>
          <Button
            onClick={makeAdminHandler}
            sx={{
              color: "white",
              "&:hover": {
                cursor: "pointer",
                color: "white",
                backgroundColor: `${props.member.isAdmin ? "green" : "black"}`,
              },
              "&:active": {
                cursor: "pointer",
                color: "white",
                backgroundColor: "black",
              },
              marginRight: "5px",
              backgroundColor: "#1976D2",
              borderRadius: "25px",
              padding: "2px 10px",
              textTransform: "capitalize",
              fontSize: "12px",
            }}
          >
            Make Admin
          </Button>

          <RemoveCircleOutlineIcon
            onClick={removeGroupMemberHandler}
            sx={{
              color: "grey",
              "&:hover": { cursor: "pointer", color: "red" },
            }}
          />
        </div>
      )}
    </div>
  );
};

export default SingleGrpMemNonAdmin;
