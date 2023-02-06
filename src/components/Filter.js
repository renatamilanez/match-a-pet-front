import styled from 'styled-components';
import { useEffect, useContext } from 'react';
import ButtonFilter from './ButtonFilter';
import axios from 'axios';
import UserContext from '../contexts/UserContext';
import { toast } from 'react-toastify';

export default function Filter() {
  const { type, types, setTypes, URL_BASE, config } = useContext(UserContext);

  useEffect(() => {
    const promise = axios.get(`${URL_BASE}pets/types`, config);
    promise
      .then(res => {
        setTypes(res.data);
      })
      .catch((error) => {
        toast('Ooops, algo deu errado, tente novamente!');
      });
  }, []);

  return (
    <Container>
      <Title>É hora de escolher seu <span>#{type}</span></Title>
      <AlignButtons>
        {types.map((item, i) => {
          return(<ButtonFilter item={item} key={i}/>);
        })}
      </AlignButtons>
    </Container>
  );
}

const Container = styled.div`
  margin-top: 80px;
  width: 100%;
  display: flex;
  padding: 24px;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 36px;
  color: #ffffff;
  margin-bottom: 10px;

  span {
    color: #9a8fe2;
  }
`;

const AlignButtons = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
`;
