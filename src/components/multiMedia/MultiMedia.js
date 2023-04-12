import { Box } from "@mui/material";
import React from "react";
import ImageIcon from "@mui/icons-material/Image";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import ArticleIcon from "@mui/icons-material/Article";

const MultiMedia = (props) => {
  return (
    <Box
      sx={{
        margin: "5px 0px",
        backgroundColor: "#1976d2",
        padding: "10px",
        borderRadius: "25px",
        paddingLeft: "20px",
        textTransform: "uppercase",
        fontWeight: "500",
        "&:hover": {
          backgroundImage:
            "linear-gradient(-225deg, #AC32E4 0%, #7918F2 48%, #4801FF 100%)",
          cursor: "pointer",
        },
      }}
    >
      {props.item === "Image" && (
        <div className="d-flex">
          <ImageIcon sx={{ color: "white" }} />
          <div className="mx-2 text-white">Image</div>
        </div>
      )}
      {props.item === "Video" && (
        <div className="d-flex">
          <VideoLibraryIcon sx={{ color: "white" }} />
          <div className="mx-2 text-white">Video</div>
        </div>
      )}
      {props.item === "Document" && (
        <div className="d-flex">
          <ArticleIcon sx={{ color: "white" }} />
          <div className="mx-2 text-white">Document</div>
        </div>
      )}
    </Box>
  );
};

export default MultiMedia;
