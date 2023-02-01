import styled from 'styled-components';
import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import UserContext from '../contexts/UserContext';
import PetCard from './PetCard';

export default function Cards() {
  const [cards, setCards] = useState([]);

  const { URL_BASE } = useContext(UserContext);

  useEffect(() => {
    const promise = axios.get(`${URL_BASE}pets`);
    promise.then((res) => {
      setCards(res.data);
    });
  }, []);

  return(
    <Container>
      {cards.length === 0 ? <PetCard></PetCard> : 
        cards.map((card, i) => {
          <></>;
        })}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 24px;
`;
