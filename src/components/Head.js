import styled from 'styled-components';
import { HiOutlineMenuAlt2 } from 'react-icons/hi';
import { BsPerson } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

export default function Head() {
  const navigate = useNavigate();

  function openEnrollPage() {
    navigate('/cadastro');
  }

  return (
    <Container>
      <MenuIcon>{HiOutlineMenuAlt2}</MenuIcon>
      <Title>Match-a-Pet</Title>
      <PersonIcon onClick={openEnrollPage}>{BsPerson}</PersonIcon>
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
`;

const MenuIcon = styled(HiOutlineMenuAlt2)`
  font-size: 28px;
  color: #ffffff;

  &:hover {
    cursor: pointer;
  }
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
