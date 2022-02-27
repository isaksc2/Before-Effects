import React from "react";
import { CleanLink } from "Shared/CleanLink.style.js";
import { Preview } from "./Thumbnail.styles.js";
import { OverlapParent, OverlapChild } from "Shared/Overlap.style.js";
import { Typography } from "@mui/material";
import { vID2image } from "./Thumbnail.logic";

export function Thumbnail(props) {
  return (
    <CleanLink
      to={
        "/user/" +
        props.uid +
        "/" +
        props.postID +
        "/" +
        props.username +
        "/" +
        props.title +
        "/" +
        props.vID1 +
        "/" +
        props.vID2
      }
    >
      <Typography variant="h5">{props.title}</Typography>
      <OverlapParent>
        <OverlapChild>
          <Preview alt="" src={vID2image(props.vID1)} />
        </OverlapChild>
        <OverlapChild
          style={{
            clipPath: "polygon(50% 0%, 50% 100%, 100% 100%, 100% 0%)",
          }}
        >
          <Preview alt="" src={vID2image(props.vID2)} />
        </OverlapChild>
      </OverlapParent>
    </CleanLink>
  );
}
