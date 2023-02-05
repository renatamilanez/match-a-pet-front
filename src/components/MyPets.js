import { useEffect, useContext } from 'react';
import styled from 'styled-components';
import Head from './Head';
import imagem from '../assets/dog-image.jpeg';
import { IoTrashOutline } from 'react-icons/io5';
import UserContext from '../contexts/UserContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function MyPets() {
  const { favorites, setFavorites, URL_BASE, config } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const promise = axios.get(`${URL_BASE}user/mypets`, config);
    promise
      .then(res => {
        setFavorites(res.data);
      })
      .catch(() => {
        toast('Ooops, algo deu errado, tente novamente!');
        navigate('');
      });
  }, []);

  return (
    <>
      <Head />
      <Container>
        <Title>Meus Favoritos</Title>
        {favorites === null ? 
          <Text>Você ainda não tem nenhum favorito.</Text> 
          :
          favorites.map((fav, i) => {
            return(
              <PetCard key={i}>
                <Image alt={''} src={fav.picture}></Image>
                <AlignItems>
                  <Name>{fav.name}</Name>
                  <SubTitle onClick={() => navigate(`/pet/${fav.id}`)}>Ver detalhes</SubTitle>
                </AlignItems>
                <TrashIcon />
              </PetCard>
            );
          })
        }
      </Container>
    </>
  );
}

const Container = styled.div`
  width: 100%;
  padding: 24px;
  padding-right: 0;
  margin-top: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h4`
  font-size: 24px;
  color: #ffffff;
  font-weight: 600;
  position: absolute;
  top: 100px;
  left: 30px;
`;

const Text = styled.h4`
  font-size: 16px;
  color: #ffffff;
  font-weight: 600;
  position: absolute;
  left: 44px;
`;

const PetCard = styled.div`
  width: 100%;
  height: 240px;
  background-color: #282425;
  border-top-left-radius: 34px;
  border-bottom-left-radius: 34px;
  border: 1px solid #282425;
  padding: 10px;
  display: flex;
  align-items: flex-start;
  position: relative;
  margin-bottom: 16px;
`;

const Image = styled.img`
  width: 160px;
  height: 100%;
  border-radius: 28px;
`;

const TrashIcon = styled(IoTrashOutline)`
  font-size: 22px;
  color: #ffffff;
  position: absolute;
  right: 16px;
  bottom: 16px;

  &:hover {
    cursor: pointer;
  }
`;

const Name = styled.h5`
  color: #ffffff;
  font-size: 22px;
  margin-left: 24px;
  margin-top: 12px;
`;

const SubTitle = styled.h5`
  color: #ffffff;
  font-size: 12px;
  margin-left: 24px;
  margin-top: 12px;

  &:hover {
    cursor: pointer;
  }
`;

const AlignItems = styled.div`
  display: flex;
  flex-direction: column;
`;
