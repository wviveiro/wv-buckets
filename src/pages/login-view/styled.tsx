import styled from "styled-components";

export const LoginContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LoginButtton = styled.button`
  padding: 0;
  border: 0;
  padding-right: 15px;
  display: flex;
  align-items: center;

  & > img {
    padding-right: 15px;
    width: 40px;
  }
`;
