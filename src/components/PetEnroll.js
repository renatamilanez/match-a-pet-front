import styled from 'styled-components';
import { IoTrashOutline } from 'react-icons/io5';
import { useContext } from 'react';
import UserContext from '../contexts/UserContext';
import { toast } from 'react-toastify';
import axios from 'axios';

export default function PetEnroll() {
  const { URL_BASE } = useContext(UserContext);

  function deletePet() {
    const promise = axios.delete(`${URL_BASE}pets/:petId`);
    promise
      .then(() => {
        toast('Pet deletado com sucesso!');
      })
      .catch(() => {
        toast('Ooops, algo deu errado! Tente novamente!');
      });
  }

  return(
    <PetCard>
      <Image alt={''}></Image>
      <AlignItems>
        <Name>Caramelo</Name>
        <SubTitle>Vacinado:</SubTitle>
        <SubTitle>Raça:</SubTitle>
        <SubTitle>Idade:</SubTitle>
        <SubTitle>Disponível:</SubTitle>
        <SubTitle>Likes:</SubTitle>
      </AlignItems>
      <TrashIcon onClick={deletePet}/>
    </PetCard>
  );
}

const PetCard = styled.div`
  width: 100%;
  height: 240px;
  background-color: #282425;
  border-radius: 34px;
  border: 1px solid #282425;
  padding: 10px;
  display: flex;
  align-items: flex-start;
  position: relative;
  margin-top: 16px;
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
