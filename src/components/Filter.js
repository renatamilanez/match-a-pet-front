import styled from 'styled-components';
import { useEffect, useState, useContext } from 'react';
import ButtonFilter from './ButtonFilter';
import axios from 'axios';
import UserContext from '../contexts/UserContext';

export default function Filter() {
  const [type, setType] = useState('Pet');
  const [types, setTypes] = useState([]);
  //const types = ['Cachorro', 'Gato', 'Pássaro', 'Outros', 'Não tenho certeza'];

  const { URL_BASE } = useContext(UserContext);

  useEffect(() => {
    const promise = axios.get(`${URL_BASE}pet-types`);
    promise.then(res => {
      setTypes(res.data);
    });
  }, []);

  return (
    <Container>
      <Title>É hora de escolher seu <a>#{type}</a></Title>
      <AlignButtons>
        {types.map((name, i) => {
          return(<ButtonFilter type={type} setType={setType} name={name} key={i}/>);
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

  a {
    color: #fbb80b;
  }
`;

const AlignButtons = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const Button = styled.button`
  height: 40px;
  background-color: ${(props) => {
    if(props.click === false) {
      return '#282425';
    } if(props.click === true) {
      return '47f0c4';
    }
  }
};
  color: #ffffff;
  font-size: 18px;
  border-radius: 36px;
  padding: 24px 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #282425;
  margin: 6px;
`;
