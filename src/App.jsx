import "App.css";
//changes to imports
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import Home from "Routes/Home/Home";
import UserList from "Routes/User/User";
import NavBar from "Shared/NavBar/NavBar";
import { ThemeProvider } from "@mui/material/styles";
import PlayerContainer from "Shared/Player/PlayerContainer";
import IntermediatePlayer from "Shared/Player/IntermediatePlayer";
import { useEffect } from "react";
import { defaultTheme } from "Core-ui/Global.theme.js";
//import { theme } from "Core-ui/Global.theme.js";
import { CssBaseline } from "@mui/material";

// get user page
function Usr() {
  let { uid } = useParams();
  return <UserList uid={uid}></UserList>;
}

// find post by fetching database
function DynamicPost() {
  let { uid, postID } = useParams();
  return <IntermediatePlayer uid={uid} postID={postID}></IntermediatePlayer>;
}

// show post without fetching database
function HardPost() {
  let { uid, postID, username, title, vID1, vID2 } = useParams();
  return (
    <PlayerContainer
      uid={uid}
      postID={postID}
      username={username}
      title={title}
      vID1={vID1}
      vID2={vID2}
    ></PlayerContainer>
  );
}

function App() {
  useEffect(() => {
    //document.body.style.backgroundColor = "#111111";
  }, []);

  //const classes = useStyles();

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <BrowserRouter>
        <div className="App">
          <NavBar></NavBar>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/user/:uid" element={<Usr />} />
            <Route exact path="/user/:uid/:postID" element={<DynamicPost />}></Route>
            <Route exact path="/user/:uid/:postID/:username/:title/:vID1/:vID2" element={<HardPost />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
