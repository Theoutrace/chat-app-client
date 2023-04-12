import React, { useEffect, useState } from "react";
import SingleNotification from "../singlenotification/SingleNotification";
import MarkEmailUnreadIcon from "@mui/icons-material/MarkEmailUnread";
import { ChatActions } from "../../Store/reducers/chat-reducer";
import { useDispatch, useSelector } from "react-redux";
import CreateGroup from "../modal/CreateGroup";
import notiIcon from "./images/notify.png";
import Group from "../sidebarUser/Group";
import { Tooltip } from "@mui/material";
import { Provider } from "react-redux";
import Card from "@mui/material/Card";
import { Box } from "@mui/system";
import Store from "../../Store";
import axios from "axios";
import "./Sidebar.css";
import AddIcon from "@mui/icons-material/Add";

const Sidebar = (props) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const fetchGroups = useSelector((state) => state.chat.fetchGroups);
  const notifications = useSelector((state) => state.chat.notifications);
  const selectedGroup = useSelector((state) => state.chat.selectedGroup);
  const allGroups = useSelector((state) => state.chat.groups);
  const dispatch = useDispatch();

  const fetchNotifications = useSelector(
    (state) => state.chat.fetchNotifications
  );

  useEffect(() => {
    if (props.socket) {
      props.socket.on("invitation-notification", (data) => {
        dispatch(ChatActions.addNotifications([...notifications, data]));
      });
    }
  }, [dispatch, notifications, props.socket]);

  useEffect(() => {
    (async function fetchGroups() {
      const response = await axios.get(
        `http://localhost:3001/groups/getgroups`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        }
      );
      dispatch(ChatActions.addGroups(response.data.groups));
    })();
  }, [dispatch, fetchGroups]);

  const createGroupModalHandler = () => {
    props.modal.render(
      <Provider store={Store}>
        <CreateGroup modal={props.modal} socket={props.socket} />
      </Provider>
    );
  };

  useEffect(() => {
    (async function fetchNotifications() {
      const response = await axios.get(`http://localhost:3001/user/getinvite`, {
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      });
      dispatch(ChatActions.addNotifications(response.data.invitations));
    })();
  }, [dispatch, fetchNotifications, showNotifications, fetchGroups]);

  const showNotificationsHandler = async () => {
    setShowNotifications((p) => !p);
  };

  return (
    <Card
      sx={{
        display: { xs: selectedGroup ? "none" : "block", md: "block" },
        width: { xs: selectedGroup ? "0%" : "100%", md: "25%" },
      }}
      className="sidebar-conp-out-er-conp"
    >
      <Box className="sidebar-box-bx-in-er-conp">
        <div className="d-flex additional-cls-css-sidebar-header-tp">
          <Tooltip title={`${notifications.length} Notifications`}>
            <MarkEmailUnreadIcon
              sx={{
                margin: "10px 20px",
                color: "grey",
                "&:hover": {
                  cursor: "pointer",
                  color: "#1976d2",
                },
                position: "relative",
              }}
              onClick={showNotificationsHandler}
            ></MarkEmailUnreadIcon>
          </Tooltip>
          {notifications.length > 0 && (
            <img
              className="notifi-dot-cls-img"
              src={notiIcon}
              alt="notification"
            />
          )}
          <Tooltip title="+ Create group">
            <AddIcon
              sx={{
                margin: "10px 20px",
                color: "grey",
                "&:hover": {
                  cursor: "pointer",
                  color: "#1976d2",
                },
              }}
              onClick={createGroupModalHandler}
            ></AddIcon>
          </Tooltip>
        </div>
      </Box>
      <div className="user-cnt-container-div">
        {showNotifications && (
          <div className="not-ifi-cation-container-all-side-bar">
            {notifications.length > 0 &&
              notifications.map((item) => {
                return (
                  <SingleNotification
                    key={Math.random().toString()}
                    item={item}
                    socket={props.socket}
                  />
                );
              })}
          </div>
        )}
        {allGroups.map((user) => {
          return <Group key={user.id} item={user} />;
        })}
      </div>
    </Card>
  );
};

export default Sidebar;
