import styled from 'styled-components/macro';
import { Button } from 'react-bootstrap';

export const LoginContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const LoginButtton = styled(Button)`
  padding: 0;
  border: 0;
  padding-right: 15px;
  & > svg {
    width: 40px;
  }
`;
