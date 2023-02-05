import styled from 'styled-components';
import Head from './Head';

export default function Enrollment() {
  return (
    <>
      <Head />
      <Container>
        <Title>Dados Cadastrais</Title>
        <FormContainer>
        </FormContainer>
      </Container>
    </>
  );
}

const Container = styled.div`
  width: 100%;
  padding: 24px;
  margin-top: 90px;
`;

const FormContainer = styled.form`
  width: 100%;
  padding: 24px;
  background-color: #282425;
  border-radius: 36px;
`;

const Title = styled.h4`
  font-size: 24px;
  color: #ffffff;
  margin-bottom: 20px;
`;
