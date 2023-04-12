import React from "react";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";
import SingleGrpMemNonAdmin from "./SingleGrpMemNonAdmin";

const SingleGroupMember = () => {
  const groupAdmins = useSelector((state) => state.chat.selectedGroupAdmins);
  const chatMembers = useSelector((state) => state.chat.chatMembers);

  return (
    <>
      <div className="justify-content-between align-items-center ">
        {groupAdmins.length === 0 && chatMembers.length === 0 && (
          <h6>No member available</h6>
        )}
        {groupAdmins.map((admin) => {
          return (
            <div
              key={admin.id}
              className="d-flex p-1  my-2 justify-content-between"
            >
              <div>{admin.name}</div>
              <Button
                sx={{
                  color: "white",
                  "&:hover": {
                    cursor: "pointer",
                    color: "white",
                    backgroundColor: `${admin.isAdmin ? "green" : "black"}`,
                  },
                  "&:active": {
                    cursor: "pointer",
                    color: "white",
                    backgroundColor: `${admin.isAdmin ? "" : "black"}`,
                  },
                  marginRight: "5px",
                  backgroundColor: `${admin.isAdmin ? "green" : "#1976D2"}`,
                  borderRadius: "25px",
                  padding: "2px 10px",
                  textTransform: "capitalize",
                  fontSize: "12px",
                }}
              >
                Admin
              </Button>
            </div>
          );
        })}

        {chatMembers.length > 0 &&
          chatMembers.map((member) => {
            return <SingleGrpMemNonAdmin key={member.id} member={member} />;
          })}
      </div>
    </>
  );
};

export default SingleGroupMember;
