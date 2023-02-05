import styled from 'styled-components';
import { BsPerson } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import Menu from './Menu';
import UserContext from '../contexts/UserContext';
import { useContext } from 'react';
import { FaRegHeart } from 'react-icons/fa';
import { MdPets } from 'react-icons/md';
import { HiMenuAlt2 } from 'react-icons/hi';

export default function Head() {
  const { userType, setIsMenuVisible } = useContext(UserContext);
  const navigate = useNavigate();

  function userIcon() {
    return (
      <FavoriteIcon onClick={() => navigate('/favoritos')}/>
    );
  }

  function hostIcon() {
    return (
      <PetIcon onClick={() => navigate('/pets/cadastros')}/>
    );
  }

  function menuIcon() {
    return (
      <MenuIcon onClick={() => navigate('/entrar')}/>
    );
  }

  return (
    <Container>
      <Menu />
      {userType === 'host' ? hostIcon() : userType === 'user' ? userIcon() : menuIcon()}
      <Title onClick={() => navigate('/')}>Match-a-Pet</Title>
      <PersonIcon onClick={() => setIsMenuVisible(true)} />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 70px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 24px;
  padding-right: 24px;
  background-color: #1A1717;
`;

const PersonIcon = styled(BsPerson)`
  font-size: 28px;
  color: #ffffff;

  &:hover {
    cursor: pointer;
  }
`;

const Title = styled.h4`
  color: #ffffff;
  font-size: 18px;
`;

const FavoriteIcon = styled(FaRegHeart)`
  font-size: 22px;
  color: #ffffff;

  &:hover {
    cursor: pointer;
  }
`;

const PetIcon = styled(MdPets)`
  font-size: 22px;
  color: #ffffff;

  &:hover {
    cursor: pointer;
  }
`;

const MenuIcon = styled(HiMenuAlt2)`
  font-size: 22px;
  color: #ffffff;

  &:hover {
    cursor: pointer;
  }
`;
