import { useContext } from 'react';
import UserContext from '../contexts/UserContext';

export default function useToken() {
  const { userToken } = useContext(UserContext);

  return userToken;
}
