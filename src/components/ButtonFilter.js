import { useState } from 'react';
import styled from 'styled-components';

export default function ButtonFilter(type, setType, name, i) {
  const [isClicked, setIsClicked] = useState(false);

  function changeType(name) {
    if(name === 'Não tenho certeza' || name === 'Outros') {
      setType('Pet');
    }
    setType(name);
  }

  return (
    <Button onClick={() => changeType({ name })}>{name}</Button>
  );
}

const Button = styled.button`
  height: 40px;
  color: #ffffff;
  font-size: 18px;
  border-radius: 36px;
  padding: 24px 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #282425;
  margin: 6px;
  background-color: #282425;
`;

// background-color: ${(props) => {
//   if(props.color === false) {
//     return '#282425';
//   } if(props.color === true) {
//     return '47f0c4';
//   }
// }
// };
