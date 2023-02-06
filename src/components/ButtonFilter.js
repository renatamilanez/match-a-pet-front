import axios from 'axios';
import { useState, useContext } from 'react';
import styled from 'styled-components';
import UserContext from '../contexts/UserContext';

export default function ButtonFilter({ item }) {
  const [isClicked, setIsClicked] = useState(false);
  const { type, setType, setCards, URL_BASE, config } = useContext(UserContext);

  const name = item.name[0].toUpperCase() + item.name.substring(1);

  function getPetsByFilter(name) {
    setIsClicked(!isClicked);

    if(item.name === 'Não tenho certeza' || item.name === 'Outros') {
      setType('Pet');
    }
    setType(name);

    if(type !== 'Pet') {
      const promise = axios.get(`${URL_BASE}pets/type/${item.name}`, config);
      promise
        .then((res) => {
          setCards(res.data[0].AvailablePets);
        });
    }
  }
  return (
    <Button isClicked={isClicked} onClick={() => getPetsByFilter(name)}>{name}</Button>
  );
}

const Button = styled.button`
  height: 40px;
  color: ${(props) => {
    if(props.isClicked === true) return '#000000';
    return '#ffffff';
  }};;
  font-size: 18px;
  border-radius: 36px;
  padding: 24px 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #282425;
  margin: 6px;
  background-color: ${(props) => {
    if(props.isClicked === true) return '#47f0c4';
    return '#282425';
  }};
`;
