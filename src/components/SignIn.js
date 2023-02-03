import { useContext } from 'react';
import styled from 'styled-components';
import logo from '../assets/logo4.png';
import UserContext from '../contexts/UserContext';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

export default function SignIn() {
  const {
    userType, setUserType,
    userToken, setUserToken,
    email, setEmail,
    password, setPassword,
    URL_BASE
  } = useContext(UserContext);

  const navigate = useNavigate();

  function handleForm(e) {
    e.preventDefault();

    let type = '';

    if(userType === 'Quero adotar!') {
      type = 'user';
    } else if(userType === 'Quero colocar para adoção!') {
      type = 'host';
    } else {
      toast('Selecione um tipo de usuário!');
    }

    const data = {
      email,
      password,
      userType: type
    };

    const promise = axios.post(`${URL_BASE}sign-in`, data);
    promise.then(res => {
      localStorage.setItem('match-a-pet-token', res.data.token);
      setUserToken(localStorage.getItem('match-a-pet-token'));
      console.log('token', userToken);
      navigate('/');
      setEmail('');
      setPassword(''); 
    });

    promise.catch(res => {
      toast('Ooops! Faça o login novamente!');
    });
  };

  return (
    <Container>
      <Image src={logo} />
      <Form onSubmit={handleForm}>
        <Select value={userType} required onChange={(e) => setUserType(e.target.value)}>
          <option disabled selected value> -- Selecione um tipo de usuário -- </option>
          <option>Quero adotar!</option>
          <option>Quero colocar para adoção!</option>
        </Select>
        <Input placeholder='email' type='email' name='email' required onChange={(e) => setEmail(e.target.value)} value={email}/>
        <Input placeholder='senha' type='password' name='password' required onChange={(e) => setPassword(e.target.value)} value={password}/>
        <Button>Entrar</Button>
      </Form>
      <Link to='/registrar'>
        <Title>Não tem uma conta? Cadastre-se!</Title>
      </Link>
    </Container>
  );
}

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
        font-size: 12px;
    }
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
    align-items: center;
`;

const Select = styled.select`
    width: 80vw;
    height: 45px;
    background-color: var(--color-dark-grey);
    border-radius: 20px;
    border: 1px solid #d4d4d4;
    background-color: #ffffff;
    color: #d4d4d4;
    font-size: 14px;
    font-weight: 400;
    padding: 20px;
    margin-bottom: 6px;
`;
