import React, { useState } from "react";
import { ChatActions } from "../../Store/reducers/chat-reducer";
import { useDispatch, useSelector } from "react-redux";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, Input } from "@mui/material";
import Card from "@mui/material/Card";
import "./CreateGroup.css";
import axios from "axios";
import jwtDecode from "jwt-decode";

export default function CreateGroup(props) {
  const [groupName, setGroupName] = useState("");
  const groupChats = useSelector((state) => state.chat.groupChats);
  const dispatch = useDispatch();

  const grpNameOnchangeHandler = (e) => {
    setGroupName(e.target.value);
  };

  const createGroupSubmitHandler = async (e) => {
    e.preventDefault();
    const grpObj = {
      groupName,
    };
    const response = await axios.post(
      `http://localhost:3001/groups/create`,
      grpObj,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      }
    );
    console.log("response create grp: ", response);
    const groupDetails = {
      groupId: response.data.groupObj.id,
      groupName: response.data.groupObj.name,
      joinerName: jwtDecode(localStorage.getItem("token")).name,
    };
    props.socket.emit("join-private-group", groupDetails, (data) => {
      console.log(data);
    });

    dispatch(ChatActions.fetchGroups());
    closeModalHandler();
  };

  const closeModalHandler = () => {
    props.modal.render(<></>);
  };

  return (
    <div className="modal-container-outer">
      <div className="mdl-inr-cnt-nr" onClick={closeModalHandler}></div>
      <Card
        component="form"
        onSubmit={createGroupSubmitHandler}
        sx={{
          maxWidth: 345,
          position: "absolute",
          zIndex: "10",
          top: "25%",
        }}
      >
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Group
          </Typography>
          <Typography
            variant="body2"
            sx={{ marginBottom: "20px" }}
            className="text-secondary"
          >
            Unleash the power of collaboration and organization for your
            personal or professional projects.... Explore the power of
            <span className="text-primary"> Dhindhora</span>
          </Typography>
          <Input
            type="text"
            placeholder="Group Name"
            value={groupName}
            onChange={grpNameOnchangeHandler}
          />
          <Button type="submit">+ Create</Button>
        </CardContent>
      </Card>
    </div>
  );
}
