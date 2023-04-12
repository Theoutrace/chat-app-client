import React from "react";
import jwtDecode from "jwt-decode";
import { useSelector } from "react-redux";

const SingleMessage = (props) => {
  const selectedGroup = useSelector((state) => state.chat.selectedGroup);
  const auth = localStorage.getItem("token");
  const loggedInUser = jwtDecode(auth).id;

  return (
    <>
      {selectedGroup.id === props.item.groupId && (
        <div
          className={
            props.item.senderId === loggedInUser
              ? "m-1 d-flex message-component-container-user-right"
              : "m-1 d-flex message-component-container-receiver-left"
          }
          key={props.item.id}
        >
          <span
            className={
              props.item.senderId === loggedInUser
                ? "p-2  my-1 component-container-user-right-inner "
                : "p-2  my-1 component-container-user-left-inner"
            }
          >
            <div className="user-name-cls-msg-sngl">
              {props.item.senderId === loggedInUser
                ? ""
                : props.item.senderName}
            </div>
            {props.item.isUrl ? (
              <img src={props.item.message} width="200" heigth="200" alt="" />
            ) : (
              <h6 key={props.item.id}>{props.item.message}</h6>
            )}
            <p>
              {new Date(Date.parse(props.item.createdAt)).toLocaleTimeString(
                [],
                {
                  hour: "2-digit",
                  minute: "2-digit",
                }
              )}
            </p>
          </span>
        </div>
      )}
    </>
  );
};

export default SingleMessage;
