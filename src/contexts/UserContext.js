import { createContext, useState } from 'react';

const UserContext = createContext();
export default UserContext;

export function UserProvider({ children }) {
  const [userToken, setUserToken] = useState(
    localStorage.getItem('match-a-pet-token') || null
  );
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [state, setState] = useState('');
  const [name, setName] = useState('');
  const [userType, setUserType] = useState('');
  const [petData, setPetData] = useState([]);
  const [types, setTypes] = useState([]);
  const [cards, setCards] = useState(null);
  const [type, setType] = useState('Pet');
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [userTypeForm, setUserTypeForm] = useState('Quero adotar!');
  const [favorites, setFavorites] = useState(null);

  const URL_BASE = `${process.env.REACT_APP_API_BASE_URL}`;

  const config = {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  };

  return (
    <UserContext.Provider  value={{
      userToken, setUserToken,
      email, setEmail,
      password, setPassword,
      state, setState,
      name, setName,
      userType, setUserType,
      petData, setPetData,
      types, setTypes,
      cards, setCards,
      type, setType,
      isMenuVisible, setIsMenuVisible,
      userTypeForm, setUserTypeForm,
      favorites, setFavorites,
      URL_BASE, config
    }}>
      {children}
    </UserContext.Provider>
  );
}
