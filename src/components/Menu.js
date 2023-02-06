import { useContext } from 'react';
import styled from 'styled-components';
import { IoCloseSharp } from 'react-icons/io5';
import UserContext from '../contexts/UserContext';
import { css } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Menu() {
  const { setUserType, setUserToken, isMenuVisible, setIsMenuVisible, URL_BASE, config } = useContext(UserContext);
  const navigate = useNavigate();

  function signOut() {
    const promise = axios.delete(`${URL_BASE}user/sign-out`, config);
    promise
      .then(() => {
        localStorage.removeItem('match-a-pet-token');
        localStorage.removeItem('match-a-pet-user');
        setUserToken(null);
        setUserType(null);
        setIsMenuVisible(false);
        navigate('/entrar');
      })
      .catch(() => {
        toast('Não foi possível sair da sua conta, tente novamente!');
      });
  }

  return (
    <>
      <Container isVisible={isMenuVisible}>
        <nav>
          <Item onClick={() => navigate('/perfil')}>Meu perfil</Item>
          <Item onClick={signOut}>Sair</Item>
        </nav>
        <CloseIcon onClick={() => setIsMenuVisible(false)}/>
      </Container>
      <HalfContainer isVisible={isMenuVisible}></HalfContainer>
    </>
  );
}

const Container = styled.div`
  width: 150px;
  height: 100vh;
  position: fixed;
  z-index: 100;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  padding: 24px;
  background: linear-gradient(180deg, rgba(40,36,37,0.95) 0%, rgba(0,0,0,0.95) 100%);
  opacity: 0;
  pointer-events: none;

  transition: .5s;
  transform: translateX(1px);

  > svg {
    transform: rotate(45deg);
    transition: .7s;
  }

  nav {
    transform: scale(0.7);
    transition: 0.7s;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-between;
  }

  ${({ isVisible }) => isVisible && css`
    opacity: 1;
    pointer-events: auto;
    
    > svg {
      transform: rotate(0deg);
    }

    nav {
      transform: scale(1);
    }
  `}
`;

const HalfContainer = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  z-index: 99;
  top: 0;
  left: 0;
  bottom: 0;
  backdrop-filter: blur(3px);
  opacity: 0;
  pointer-events: none;

  ${({ isVisible }) => isVisible && css`
    opacity: 1;
    pointer-events: auto;
    transition: 1s;
  `}
`;

const Item = styled.h4`
  color: #ffffff;
  font-size: 22px;
  margin-bottom: 1.5rem;
`;

const CloseIcon = styled(IoCloseSharp)`
  font-size: 24px;
  color: #ffffff;

  &:hover {
    cursor: pointer;
  }
`;
