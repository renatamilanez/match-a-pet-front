import { useContext } from 'react';
import UserContext from '../contexts/UserContext';

export default function useUserType() {
  const { userType, setUserType } = useContext(UserContext);

  if(!userType || userType === null || userType === '') {
    setUserType(localStorage.getItem('match-a-pet-user'));
  }

  return userType;
}
