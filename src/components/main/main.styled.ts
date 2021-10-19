import styled from 'styled-components/macro';

export const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  background: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.textWhite};

  .inner-container {
    padding: 0 40px;
    width: 100%;
  }

  &.flex {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  .add-account-btn {
    width: 100%;
  }
`;
