import React from "react";
import { ChatActions } from "../../Store/reducers/chat-reducer";
import { useDispatch, useSelector } from "react-redux";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import { Card } from "@mui/material";
import "./SingleNotification.css";
import axios from "axios";
import jwtDecode from "jwt-decode";

const SingleNotification = (props) => {
  console.log(props);
  const dispatch = useDispatch();
  const groups = useSelector((state) => state.chat.groups);

  const onAcceptHandler = async () => {
    const sendObj = {
      status: "accepted",
      notification: props.item,
    };
    try {
      const response = await axios.post(
        `http://localhost:3001/user/invite/status`,
        sendObj,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        }
      );
      dispatch(ChatActions.fetchGroups());
      dispatch(ChatActions.fetchinvite());
      dispatch(ChatActions.addGroups([...groups, ...response.data.groups]));

      const details = {
        groupId: props.item.groupId,
        groupName: props.item.groupName,
        joinerName: jwtDecode(localStorage.getItem("token")).name,
      };

      props.socket.emit("join-private-group", details, (data) => {
        console.log(data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onRejectHandler = async () => {
    const sendObj = {
      status: "rejected",
      notification: props.item,
    };
    try {
      await axios.post(`http://localhost:3001/user/invite/status`, sendObj, {
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.log(error);
    }

    dispatch(ChatActions.fetchGroups());
  };

  return (
    <div className="single-noti-receiver-outer-dv m-1">
      <Card
        sx={{
          padding: "10px",
        }}
      >
        <div className="text-secondary">
          <p className="m-0">
            <span className="mx-1 text-black sender-nme-name-sty">
              {props.item.invitorName}
            </span>
            has invited you to
          </p>
          <div className="my-1">
            <span className="text-white spn-cls-dv-in-grp-inv-ite">
              {props.item.groupName}
            </span>
          </div>
        </div>
        <ButtonGroup
          disableElevation
          variant="contained"
          aria-label="Disabled elevation buttons"
          sx={{ marginTop: "10px" }}
        >
          <Button
            sx={{ backgroundColor: "black", fontSize: "11px" }}
            onClick={onAcceptHandler}
          >
            Accept
          </Button>
          <Button
            sx={{ backgroundColor: "black", fontSize: "11px" }}
            onClick={onRejectHandler}
          >
            Ignore
          </Button>
        </ButtonGroup>
      </Card>
    </div>
  );
};

export default SingleNotification;
