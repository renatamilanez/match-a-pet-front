import { useContext } from 'react';
import styled from 'styled-components';
import logo from '../assets/logo4.png';
import UserContext from '../contexts/UserContext';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import UFsList from '../components/UFsList.js';
import axios from 'axios';

export default function Enroll() {
  const {
    userType, setUserType,
    email, setEmail,
    password, setPassword,
    state, setState,
    name, setName,
    userTypeForm, setUserTypeForm,
    URL_BASE
  } = useContext(UserContext);

  const navigate = useNavigate();

  function handleForm(e) {
    e.preventDefault();

    const data = {
      email,
      password,
      name,
      state
    };

    if(userTypeForm === 'Quero adotar!') {
      setUserType('user');
    } else if(userTypeForm === 'Quero colocar para adoção!') {
      setUserType('host');
    } else {
      toast('Selecione um tipo de usuário!');
    }

    const promise = axios.post(`${URL_BASE}${userType}/enroll`, data);
    promise.then(() => {
      navigate('/');
      setEmail('');
      setPassword('');
      setState('');
      setName('');
      setUserType('');
    });

    promise.catch(() => {
      toast('Ooops! Faça o cadastro novamente!');
    });
  }

  return (
    <Container>
      <Image src={logo} />
      <Form onSubmit={handleForm}>
        <Input placeholder='nome' type='text' name='name' required onChange={(e) => setName(e.target.value)} value={name}/>
        <Input placeholder='email' type='email' name='email' required onChange={(e) => setEmail(e.target.value)} value={email}/>
        <Input placeholder='senha' type='password' name='password' required onChange={(e) => setPassword(e.target.value)} value={password}/>
        <Label>Selecione um estado:</Label>
        <Select value={state} required onChange={(e) => setState(e.target.value)}>
          <UFsList />
        </Select>
        <Label>Selecione um tipo de usuário:</Label>
        <Select value={userTypeForm} required onChange={(e) => setUserTypeForm(e.target.value)} placeholder={'Selecione'}>
          <option disabled selected value> -- Selecione um tipo de usuário -- </option>
          <option>Quero adotar!</option>
          <option>Quero colocar para adoção!</option>
        </Select>
        <Button>Entrar</Button>
      </Form>
      <Link to='/entrar'>
        <Title>Já tem uma conta? Faça login!</Title>
      </Link>
    </Container>
  );
}

const Label = styled.label`
  color: #d4d4d4;
  font-size: 14px;
  margin-bottom: 4px;
  margin-left: 28px;
`;

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #1a1717;
    height: 100vh;
`;

const Image = styled.img`
    width: 180px;
    margin-bottom: 32px;
`;

const Button = styled.button`
    width: 80vw;
    height: 45px;
    background-color: #fbb80b;
    border-radius: 25px;
    border: 1px solid #fbb80b;
    color: #000000;
    font-size: 18px;
    font-weight: 400;
    margin-bottom: 25px;
`;

const Select = styled.select`
    width: 80vw;
    height: 45px;
    border-radius: 20px;
    border: 1px solid #d4d4d4;
    background-color: #ffffff;
    color: #d4d4d4;
    font-size: 14px;
    font-weight: 400;
    padding: 4px;
    padding-left: 10px;
    margin-bottom: 6px;
`;

const Input = styled.input`
    width: 80vw;
    height: 45px;
    border: 1px solid #d4d4d4;
    margin-bottom: 6px;
    color: #d4d4d4;
    font-weight: 400;
    font-size: 14px;
    border-radius: 25px;
    text-align: left;
    text-justify: center;
    padding: 20px;
    &::placeholder{
        color: var(--color-gray);
        font-size: 14px;
    }
`;

const Title = styled.h6`
    color: #ffffff;
    font-size: 14px;
    font-weight: 400;
    text-decoration: underline;
    font-family: var(--font-body);
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
`;
