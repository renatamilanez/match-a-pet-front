import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import UserContext from './contexts/UserContext.js';
import { useState } from 'react';
import GlobalStyles from './assets/GlobalStyles.js';
import SignIn from './components/SignIn';
import Enroll from './components/Enroll.js';
import Feed from './components/Feed.js';

export default function App() {
  const [userToken, setUserToken] = useState(
    localStorage.getItem('match-a-pet-token') || null
  );
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [state, setState] = useState('');
  const [name, setName] = useState('');
  const [userType, setUserType] = useState('');

  const URL_BASE = process.env.REACT_APP_API_BASE_URL;

  const contextValue = {
    userToken, setUserToken,
    email, setEmail,
    password, setPassword,
    state, setState,
    name, setName,
    userType, setUserType,
    URL_BASE
  };

  return (
    <>
      <UserContext.Provider value={contextValue}>
        <ToastContainer />
        <GlobalStyles />
        <Router>
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/enroll" element={<Enroll />} />
            <Route path="/home" element={<Feed />} />
          </Routes> 
        </Router>
      </UserContext.Provider>
    </>
  );
}
