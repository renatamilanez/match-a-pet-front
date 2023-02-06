import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled, { css } from 'styled-components';
import UserContext from '../contexts/UserContext';
import Head from './Head';
import UFsList from './UFsList';

export default function Profile() {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [state, setState] = useState(null);
  const [phone, setPhone] = useState('');
  const [data, setData] = useState(null);

  const navigate = useNavigate();

  const { URL_BASE, userType, config } = useContext(UserContext);

  async function getData() {
    const res = await axios.get(`${URL_BASE}${userType}/profile`, config);
    if(!res) {
      navigate('/entrar');
      localStorage.clear();
    }
    setName(res.data.name);
    setEmail(res.data.email);
    setState(res.data.state);
    setPhone(res.data.phone);
    setData(res.data);
  }

  useEffect(() => {
    getData();
  }, [data]);

  const { setIsMenuVisible } = useContext(UserContext);
  setIsMenuVisible(false);

  async function updateData() {
    const data = {
      name,
      email,
      state,
      phone
    };
    console.log(data);

    try {
      await axios.put(`${URL_BASE}${userType}/profile`, data, config);
      toast('Dados atualizados com sucesso!');
    } catch (error) {
      toast('Ooops, algo deu errado! Tente novamente!');
    }
  }

  function handleForm(e) {
    e.preventDefault();
    updateData();
  }

  return (
    <>
      <Head />
      <Container>
        <Title>Dados Cadastrais</Title>
        <FormContainer onSubmit={handleForm}>
          <nav>
            <Input placeholder='Nome' type='name' required onChange={(e) => setName(e.target.value)} value={name}></Input>
            <Input placeholder='Email' type='email' required onChange={(e) => setEmail(e.target.value)} value={email}></Input>
            <Input placeholder='Estado' type='string' required onChange={(e) => setState(e.target.value)} value={state}></Input>
            <Input placeholder='Telefone' type='number' onChange={(e) => setPhone(e.target.value)} value={phone}></Input>
            <Label>Selecione o seu estado</Label>
            <Select value={state} required onChange={(e) => setState(e.target.value)}>
              <UFsList />
            </Select>
            <Button>Atualizar dados</Button>
          </nav>
        </FormContainer>
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
  background-color: #282425;
  border-radius: 36px;
  padding: 10px;
  position: relative;
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
