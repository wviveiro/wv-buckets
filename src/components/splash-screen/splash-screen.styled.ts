import styled from "styled-components";

export const SplashScreenContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .splash-screen-inner {
    font-size: 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .splash-screen-spinner {
      display: block;
      font-size: 40px;
    }
  }
`;
