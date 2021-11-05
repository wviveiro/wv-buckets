import styled from 'styled-components/macro';

export const AccountsContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .inner-container {
    padding: 0 40px;
    width: 100%;
  }

  .accounts-list {
    margin-bottom: 20px;
  }

  .add-account-btn {
    width: 100%;
    background-color: ${(props) => props.theme.colors.background2};
    color: #fff;
    padding: 20px;
  }
`;
