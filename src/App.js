import { ThemeProvider } from '@material-ui/core/styles';
import './App.css';
//changes to imports 
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom';
import Home from './routes/Home';
import UserList from './routes/UserList';
import NavBar from './components/NavBar'
import { createTheme } from '@material-ui/core/styles'
import PlayerContainer from './components/PlayerContainer';

const theme = createTheme({
  palette: {
    primary: {
      main: "#2e1667",
    },
    secondary: {
      main: "#c7d8ed",
    },
  },
  typography: {
    fontFamily: [
      'Roboto'
    ],
    h4: {
      fontWeight: 600,
      fontSize: 28,
      lineHeight: '2rem',
    },
    h5: {
      fontWeight: 100,
      lineHeight: '2rem',
    },
  },
});


function Usr() {
  let { uid } = useParams();
  return (
    <UserList uid={uid}></UserList>
  )
}

// find post by fetching database
function DynamicPost() {
  let { uid, postID } = useParams();
  return (
    <PlayerContainer uid={uid} postID={postID} ></PlayerContainer>
  )
}

// show post without fetching database
function HardPost() {
  let { uid, userName, title, vID1, vID2 } = useParams();
  return (
    <PlayerContainer uid={uid} userName={userName} title={title} vID1={vID1} vID2={vID2}></PlayerContainer>
  )
}

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <ThemeProvider theme={theme}>
          <NavBar></NavBar>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/user/:uid" element={<Usr />} />
            <Route exact path="/user/:uid/:postID" element={<DynamicPost />}></Route>
            <Route exact path="/user/:uid/:userName/:title/:vID1/:vID2" element={<HardPost />}></Route>
          </Routes>
        </ThemeProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;