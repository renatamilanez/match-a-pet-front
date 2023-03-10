import styled from 'styled-components';
import axios from 'axios';
import { useEffect, useContext } from 'react';
import UserContext from '../contexts/UserContext';
import PetCard from './PetCard';

export default function Cards() {
  const { cards, setCards, URL_BASE, config, userType, type } = useContext(UserContext);

  useEffect(() => {
    async function getPets() {
      const pets = await axios.get(`${URL_BASE}pets`, config);
      setCards(pets.data);
    }
    getPets();
  }, [type, cards]);

  if(userType === 'user') {
    return(
      <Container>
        {cards === null ? <Text>Ainda não há nenhum pet disponível para adoção...</Text> : 
          cards.map((item, i) => {
            return(
              <PetCard item={item} key={i}/>
            );
          })}
      </Container>
    );
  }

  if(userType === 'host') {
    return(
      <Container>
        {cards === null ? <Text>Você ainda não adicionou nenhum pet para adoção...</Text> : 
          cards.map((item, i) => {
            return(
              <PetCard item={item} key={i}/>
            );
          })}
      </Container>
    );
  }
}

const Text = styled.h4`
  color: #ffffff;
  font-size: 14px;
  margin-top: 14px;
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 24px;
  padding-top: 0;
`;
