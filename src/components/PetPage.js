import styled from 'styled-components';
import { FaHeart } from 'react-icons/fa';
import { IoCloseSharp } from 'react-icons/io5';
import { TbPencil } from 'react-icons/tb';
import { useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import UserContext from '../contexts/UserContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import Head from './Head';

export default function PetPage() {
  const { petId } = useParams();
  const navigate = useNavigate();

  const {
    petData, setPetData, 
    isMenuVisible, 
    userType, setUserType,
    URL_BASE, config, 
  } = useContext(UserContext);

  setUserType(localStorage.getItem('match-a-pet-user'));

  useEffect(() => {
    const promise = axios.get(`${URL_BASE}pets/id/${petId}`, config);
    promise
      .then(res => {
        setPetData(res.data);
      })
      .catch(error => {
        toast('Ooops, algo deu errado, tente novamente!');
        navigate('/');
      });
  }, []);
  
  async function registerLike() {
    let count = petData.countLikes;
    count += 1;

    const data = {
      petId: petData.id,
      count
    };

    try {
      await axios.post(`${URL_BASE}user/mypets`, data, config);
      toast(`${petData.name} foi adicionado à sua lista de favoritos!`);
    } catch (error) {
      if(error.response.status === 409) {
        toast('Esse pet já está em sua lista de favoritos!');
      } else {
        toast('Ooops, algo deu errado, tente novamente!');
      }
    }
  }

  function exitPage() {
    navigate('/');
  }

  return(
    <>
      <Head isVisible={ isMenuVisible } />
      {petData.length === 0 ? <></> : 
        <>
          <PhotoContainer>
            <ImageBox>
              <img alt={''} src={petData.picture}/>
              {userType === 'user' ?
                <LikeButton onClick={registerLike}> 
                  <LikeIcon />
                </LikeButton>
                : <LikeButton onClick={() => navigate('/pets/cadastros')}>
                  <EditIcon />
                </LikeButton>}
              <CloseButton onClick={exitPage}>
                <CloseIcon />
              </CloseButton>
            </ImageBox>
          </PhotoContainer>
          <DescriptionContainer>
            <Text>Oi, meu nome é</Text>
            <Title>{petData.name}</Title>
            <Text>Atualmente eu moro em {petData.state}.</Text>
            <Text>Eu tenho {petData.age} anos.</Text>
            {petData.isVaccinated === true ? <Text>Já sou vacinado.</Text> : <Text>Ainda não sou vacinado.</Text>}
            <Text>Sou um {petData.race} com orgulho.</Text>
          </DescriptionContainer>
        </>
      }
    </>
  );
}

const PhotoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 80px;
  padding: 10px;
  margin-bottom: 6px;
`;

const ImageBox = styled.div`
  width: 100%;
  max-width: 100%;
  height: 450px;
  border-radius: 38px;
  border: 0px solid #ffffff;
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

const LikeButton = styled.div`
  width: 48px;
  height: 48px;
  position: absolute;
  top: 201px;
  right: 0;
  background-color: #47f0c4;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top-left-radius: 50%;
  border-bottom-left-radius: 50%;
  border: 1px solid #47f0c4;
  opacity: 0.7;
`;

const CloseButton = styled.div`
  width: 48px;
  height: 48px;
  position: absolute;
  top: 201px;
  left: 0;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top-right-radius: 50%;
  border-bottom-right-radius: 50%;
  border: 1px solid #ffffff;
  opacity: 0.7;
`;

const LikeIcon = styled(FaHeart)`
  font-size: 18px;
  color: #ffffff;

  &:hover {
    cursor: pointer;
  }
`;

const CloseIcon = styled(IoCloseSharp)`
  font-size: 22px;
  color: #000000;

  &:hover {
    cursor: pointer;
  }
`;

const EditIcon = styled(TbPencil)`
  font-size: 22px;
  color: #ffffff;

  &:hover {
    cursor: pointer;
  }
`;

const Text = styled.h4`
  font-size: 18px;
  color: #ffffff;
  font-weight: 400;
  margin-bottom: 6px;
`;

const DescriptionContainer = styled.div`
  width: 92%;
  background-color: #282425;
  right: 0;
  position: absolute;
  border-top-left-radius: 36px;
  border-bottom-left-radius: 36px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 36px;
  margin-bottom: 36px;
`;

const Title = styled.h2`
  font-size: 40px;
  color: #ffffff;
  margin-left: 36px;
  margin-bottom: 36px;
`;
