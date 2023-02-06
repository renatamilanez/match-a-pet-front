import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { UserProvider } from './contexts/UserContext.js';
import GlobalStyles from './assets/GlobalStyles.js';
import SignIn from './components/SignIn';
import Enroll from './components/Enroll.js';
import Feed from './components/Feed.js';
import PetPage from './components/PetPage.js';
import Profile from './components/Profile.js';
import MyPets from './components/MyPets.js';
import PetForm from './components/PetForm.js';
import useToken from './hooks/useToken';

export default function App() {
  return (
    <>
      <UserProvider>
        <ToastContainer />
        <GlobalStyles />
        <Router>
          <Routes>
            <Route path="/entrar" element={<SignIn />} />
            <Route path="/registrar" element={<Enroll />} />
            <Route element={<ProtectedRouteGuard />}>
              <Route path="/" element={<Feed />} />
              <Route path="/pet/:petId" element={<PetPage />} />
              <Route path="/pets/cadastros" element={<PetForm />} />
              <Route path="/favoritos" element={<MyPets />} />
              <Route path="/perfil" element={<Profile />} />
            </Route>
          </Routes> 
        </Router>
      </UserProvider>
    </>
  );
}

function ProtectedRouteGuard() {
  const token = useToken();

  if (!token) {
    toast('Faça o login para acessar.');
    localStorage.clear();
    return <Navigate to="/entrar" />;
  }

  return <>
    <Outlet/>
  </>;
}
