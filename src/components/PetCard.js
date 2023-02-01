import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import image from '../assets/dog-image.jpeg';

export default function PetCard() {
  const navigate = useNavigate();

  const hostId = 1;
  const petId = 1;

  function openPetPage() {
    navigate(`/pet/${hostId}/${petId}`);
  }

  return(
    <>
      <Container>
        <img src={image}/>
        <Name onClick={openPetPage}>Caramelo</Name>
      </Container>
    </>
  );
}

const Container = styled.div`
  width: 100%;
  max-width: 100%;
  height: 450px;
  background-color: #ffffff;
  border-radius: 38px;
  border: 0px solid #ffffff;
  margin-bottom: 24px;
  position: relative;
  overflow: hidden;

  img {
    position: absolute;
    left: 50%;
    top: 50%;
    height: 100%;
    width: auto;
      -webkit-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);;
  }
`;

const Name = styled.div`
  height: 40px;
  background-color: #ffffff;
  border-radius: 36px;
  padding: 24px 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ffffff;
  position: absolute;
  bottom: 18px;
  left: 18px;
  opacity: 0.9;
  font-size: 16px;
  color: #000000;
  cursor: pointer;
`;

