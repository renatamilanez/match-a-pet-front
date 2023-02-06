import styled from 'styled-components';
import Head from './Head';
import { useState, useContext } from 'react';
import { css } from 'styled-components';
import { IoIosArrowDown } from 'react-icons/io';
import axios from 'axios';
import UserContext from '../contexts/UserContext';
import { toast } from 'react-toastify';
import PetEnroll from './PetEnroll';
import { useNavigate } from 'react-router-dom';

export default function PetForm() {
  const navigate = useNavigate();
  const { userType, URL_BASE, config } = useContext(UserContext);

  const [animalType, setAnimalType] = useState('');
  const [vaccine, setVaccine] = useState('');
  const [formVisible, setFormVisible] = useState(false);
  const [name, setName] = useState('');
  const [picture, setPicture] = useState('');
  const [race, setRace] = useState('');
  const [age, setAge] = useState('');

  if(userType !== 'host') {
    navigate('/entrar');
    localStorage.clear();
  }

  function handleForm(e) {
    e.preventDefault();

    let isVaccinated = false;
    if(vaccine === 'Sim') {
      isVaccinated = true;
    }

    const data = {
      name,
      age,
      race,
      picture,
      isVaccinated,
      animalType,
    };

    const promise = axios.post(`${URL_BASE}pets`, data, config);
    promise
      .then(() => {
        toast('Pet adicionado com sucesso!');
        formVisible(false);
      })
      .catch(() => {
        toast('Ooops, algo deu errado! Tente novamente!');
      });
  }

  return (
    <>
      <Head />
      <Container>
        <FormContainer onSubmit={handleForm} isVisible={formVisible}>
          <ArrowIcon onClick={() => setFormVisible(!formVisible)}/>
          <Title>Adicione um novo pet</Title>
          <nav>
            <Input placeholder='Nome' type='name' required onChange={(e) => setName(e.target.value)} value={name}></Input>
            <Input placeholder='Idade' type='number' required onChange={(e) => setAge(e.target.value)} value={age}></Input>
            <Input placeholder='Raça' type='string' required onChange={(e) => setRace(e.target.value)} value={race}></Input>
            <Input placeholder='Foto' type='url' required onChange={(e) => setPicture(e.target.value)} value={picture}></Input>
            <Label>Selecione o tipo de animal</Label>
            <Select value={animalType} required onChange={(e) => setAnimalType(e.target.value)}>
              <option disabled selected value> -- Selecione o tipo de animal -- </option>
              <option>Cachorro</option>
              <option>Gato</option>
              <option>Pássaro</option>
              <option>Outros</option>
            </Select>
            <Label>O pet é vacinado?</Label>
            <Select value={vaccine} required onChange={(e) => setVaccine(e.target.value)}>
              <option disabled selected value> -- O pet é vacinado? -- </option>
              <option>Sim</option>
              <option>Não</option>
            </Select>
            <Button>Salvar</Button>
          </nav>
        </FormContainer>
        <nav>
          <PetEnroll>
          </PetEnroll>
        </nav>
      </Container>
    </>
  );
}

const Button = styled.button`
    width: 80vw;
    height: 45px;
    background-color: #282425;
    border-radius: 25px;
    border: 1px solid #d4d4d4;
    color: #d4d4d4;
    font-size: 16px;
    font-weight: 400;
    margin-top: 10px;
`;

const Container = styled.div`
  width: 100%;
  padding: 24px;
  margin-top: 80px;
`;

const FormContainer = styled.form`
  width: 100%;
  height: 50px;
  background-color: #282425;
  border-radius: 36px;
  padding: 10px;
  position: relative;

  transition: .5s;
  transform: translateX(1px);

  nav {
    opacity: 0;
    transition: .5s;
  }

  > svg {
      transform: rotate(0deg);
      transition: .7s;
    }

  ${({ isVisible }) => isVisible && css`
    opacity: 1;
    pointer-events: auto;
    height: 425px;
    
    > svg {
      transform: rotate(180deg);
      transition: .7s;
    }

    nav {
      opacity: 1;
    }
  `}
`;

const Input = styled.input`
  width: 100%;
  border-radius: 24px;
  height: 40px;
  padding: 12px;
  margin-bottom: 8px;
  border: 1px solid #d4d4d4;
`;

const Title = styled.h4`
  font-size: 16px;
  color: #d4d4d4;
  margin-bottom: 16px;
  margin-left: 18px;
  margin-top: 6px;
`;

const Select = styled.select`
    width: 80vw;
    height: 36px;
    border-radius: 20px;
    border: 1px solid #d4d4d4;
    background-color: #ffffff;
    color: #d4d4d4;
    font-size: 14px;
    font-weight: 400;
    padding: 4px;
    padding-left: 10px;
    margin-top: 6px;
`;

const Label = styled.label`
  color: #d4d4d4;
  font-size: 13px;
  margin-left: 28px;
  margin-top: 4px;
`;

const ArrowIcon = styled(IoIosArrowDown)`
  font-size: 22px;
  color: #ffffff;
  position: absolute;
  right: 20px;
  top: 14px;

  &:hover {
    cursor: pointer;
  }
`;
