import styled from 'styled-components';
import { HiOutlineMenuAlt2 } from 'react-icons/hi';
import { BsPerson } from 'react-icons/bs';

export default function Head() {
  return (
    <Container>
      <MenuIcon>{HiOutlineMenuAlt2}</MenuIcon>
      <PersonIcon>{BsPerson}</PersonIcon>
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
