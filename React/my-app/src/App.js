import { ThemeProvider } from '@material-ui/core/styles';
import './App.css';
//changes to imports 
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom';
import Home from './routes/Home';
import UserList from './routes/UserList';
import NavBar from './components/NavBar'
import { createTheme } from '@material-ui/core/styles'

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
  let { URLuid } = useParams();
  return (
    <UserList uid={URLuid}></UserList>
  )
}

function App() {
  //const ref = firebase.firestore().collection("videos");
  return (
    <BrowserRouter>
      <div className="App">
        <ThemeProvider theme={theme}>
          <NavBar></NavBar>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/user/:URLuid" element={<Usr />} />
          </Routes>
        </ThemeProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;