import styled from 'styled-components';
import { BsPerson } from 'react-icons/bs';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import { FaHeart } from 'react-icons/fa';
import { IoCloseSharp } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import image from '../assets/dog-image.jpeg';
import { FaRegHeart } from 'react-icons/fa';

export default function PetPage() {
  const navigate = useNavigate();
  
  function registerLike() {
    //adicionar contador de likes na tabela do pet
    //adicionar pet na lista de MyPet do usuário

    console.log('oi');
  }

  function openEnrollPage() {
    navigate('/cadastro');
  }

  function openFavoriteList() {
    navigate('/favoritos');
  }

  function exitPage() {
    navigate('/');
  }

  return(
    <>
      <Head>
        <FavoriteIcon onClick={openFavoriteList} />
        <Text>Pesquisa</Text>
        <PersonIcon onClick={openEnrollPage} />
      </Head>
      <PhotoContainer>
        <ImageBox>
          <img src={image}/>
          <LikeButton onClick={registerLike}>
            <LikeIcon />
          </LikeButton>
          <CloseButton onClick={exitPage}>
            <CloseIcon />
          </CloseButton>
        </ImageBox>
      </PhotoContainer>
      <DescriptionContainer>
        <Text>Oi, meu nome é</Text>
        <Title>Caramelo</Title>
        <Text>Atualmente eu moro em São Paulo.</Text>
        <Text>Eu tenho 4 anos.</Text>
        <Text>Sou vacinado e castrado.</Text>
        <Text>Sou um golden com orgulho.</Text>
      </DescriptionContainer>
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
  opacity: 0.9;
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
  opacity: 0.9;
`;

const Head = styled.div`
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

const ReturnIcon = styled(MdKeyboardArrowLeft)`
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

const FavoriteIcon = styled(FaRegHeart)`
  font-size: 22px;
  color: #ffffff;

  &:hover {
    cursor: pointer;
  }
`;
