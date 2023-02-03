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
import PetPage from './components/PetPage.js';
import Enrollment from './components/Enrollment.js';

export default function App() {
  const [userToken, setUserToken] = useState(
    localStorage.getItem('match-a-pet-token') || null
  );
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [state, setState] = useState('');
  const [name, setName] = useState('');
  const [userType, setUserType] = useState('');
  const [petData, setPetData] = useState({}); 

  const URL_BASE = process.env.REACT_APP_API_BASE_URL;

  const config = {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  };

  const contextValue = {
    userToken, setUserToken,
    email, setEmail,
    password, setPassword,
    state, setState,
    name, setName,
    userType, setUserType,
    petData, setPetData,
    URL_BASE, config
  };

  return (
    <>
      <UserContext.Provider value={contextValue}>
        <ToastContainer />
        <GlobalStyles />
        <Router>
          <Routes>
            <Route path="/entrar" element={<SignIn />} />
            <Route path="/registrar" element={<Enroll />} />
            <Route path="/" element={<Feed />} />
            <Route path="/pet/:hostId/:petId" element={<PetPage />} />
            <Route path="/cadastro" element={<Enrollment />} />
          </Routes> 
        </Router>
      </UserContext.Provider>
    </>
  );
}
