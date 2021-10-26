import styled from 'styled-components/macro';

export const AccountContainer = styled.div`
  background: #fff;
  color: #000;
  display: flex;
  padding: 15px;
  margin: 10px 0;
  border-radius: 4px;

  .loading-account {
    color: #ccc;
    width: 100%;

    p {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }

  .icon-area {
    width: 30px;

    .icon {
      display: block;
    }
  }

  .account-details {
    color: #aaa;
    flex-grow: 1;
    width: calc(100% - 30px);

    h4 {
      color: #000;
      font-size: 1rem;
      font-weight: bold;
      margin-bottom: 0;
    }

    .account-id {
      display: block;
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-size: 0.8rem;
    }
  }
`;
