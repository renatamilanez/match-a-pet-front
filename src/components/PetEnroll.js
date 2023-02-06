import styled from 'styled-components';
import { IoTrashOutline } from 'react-icons/io5';
import { useContext } from 'react';
import UserContext from '../contexts/UserContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PetEnroll() {
  const { userType, setUserType, URL_BASE, config } = useContext(UserContext);
  const [hostPets, setHostPets] = useState(null);
  const navigate = useNavigate();

  if(userType === 'user') {
    navigate('/entrar');
    setUserType(null);
    localStorage.clear();
  }

  async function getPets() {
    const pets = await axios.get(`${URL_BASE}pets`, config);
    setHostPets(pets.data);
  }

  useEffect(() => {
    getPets();
  }, [hostPets]);

  function deletePet(id) {
    const promise = axios.delete(`${URL_BASE}pets/${id}`, config);
    promise
      .then(() => {
        toast('Pet deletado com sucesso!');
        getPets();
      })
      .catch(() => {
        toast('Ooops, algo deu errado! Tente novamente!');
      });
  }

  return(
    <>
      {hostPets === null ? (<p>oi</p>) :
        (hostPets.map((pet, i) => {
          return(
            <PetCard key={i}>
              <Image alt={''} src={pet.picture}></Image>
              <AlignItems>
                <Name>{pet.name}</Name>
                <SubTitle>Vacinado: {pet.isVaccinated === true ? 'Sim' : 'Não'}</SubTitle>
                <SubTitle>Raça: {pet.race}</SubTitle>
                <SubTitle>Idade: {pet.age}</SubTitle>
                <SubTitle>Likes: {pet.countLikes}</SubTitle>
              </AlignItems>
              <TrashIcon onClick={() => deletePet(pet.id)}/>
            </PetCard>
          );
        }))}
    </>
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
