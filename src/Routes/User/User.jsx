import { Button, Grid, Typography } from "@mui/material";
import React from "react";
import { Thumbnail } from "Routes/User/Thumbnail/Thumbnail.jsx";
import UserLogic from "./User.logic";
import { UsernameField } from "./User.styles";

export default function UserList(props) {
  const {
    tempUsername,
    editingUsername,
    document,
    editUsername,
    editUsernameIcon,
    onChange,
    error,
    isMyPage,
    getPosts,
  } = UserLogic(props);

  const posts = getPosts();
  return (
    <div style={{ marginTop: 80 }}>
      <UsernameField
        color="primary"
        variant="filled"
        disabled={!editingUsername}
        onChange={onChange}
        value={tempUsername}
        label="Username"
        error={error}
        sx={{ input: {} }}
      ></UsernameField>
      {isMyPage() && (
        <Button
          variant="contained"
          onClick={editUsername}
          style={{ position: "absolute", marginTop: 10, marginLeft: 5 }}
        >
          {editUsernameIcon("Save", "Edit")}
        </Button>
      )}
      <div style={{ marginTop: 100 }} />
      {posts.length > 0 ? (
        <Grid container spacing={2} style={{ justifyContent: "center" }}>
          {posts.map((post) => (
            <Grid item key={post["postID"]}>
              <Thumbnail
                uid={props.uid}
                username={document.username}
                vID1={post["vID1"]}
                vID2={post["vID2"]}
                title={post["title"]}
                postID={post["postID"]}
              ></Thumbnail>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h3">
          {(isMyPage() ? "You have" : "This user has") + " not posted any videos yet"}
        </Typography>
      )}
    </div>
  );
}
