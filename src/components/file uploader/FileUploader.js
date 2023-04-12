// import axios from "axios";
// import React from "react";

// const FileUploader = (props) => {
//   const onFileChangeHandler = async (event) => {
//     const file = event.target.files[0];
//     const buffer = await file.arrayBuffer();
//     let formData = new FormData();
//     formData.append("file", file);
//     formData.append("buffer", buffer);
//     const response = await axios.post(
//       "http://localhost:3001/chat/userchats/uploadfiles",
//       formData,
//       {
//         headers: {
//           Authorization: localStorage.getItem("token"),
//           "Content-Type": "multipart/form-data",
//         },
//       }
//     );
//     console.log(response);
//   };
//   return (
//     <div>
//       <input type="file" name="file" onChange={onFileChangeHandler} />
//     </div>
//   );
// };

// export default FileUploader;

import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChatActions } from "../../Store/reducers/chat-reducer";

const FileUploader = (props) => {
  const dispatch = useDispatch();
  const AllChats = useSelector((state) => state.chat.AllChats);
  const onFileChangeHandler = async (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    const formData = new FormData(file);
    const response = await axios.post(
      "http://localhost:3001/chat/userchats/uploadfiles",
      formData,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(response);
    dispatch(ChatActions.addToAllChat([...AllChats, response.data]));
  };
  return <input type="file" name="inputFile" onChange={onFileChangeHandler} />;
};

export default FileUploader;
