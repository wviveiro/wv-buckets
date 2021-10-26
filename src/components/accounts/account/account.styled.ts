import styled from 'styled-components/macro';

export const AccountContainer = styled.div`
  background: #fff;
  color: #000;
  padding: 10px 15px;
  margin: 10px 0;
  border-radius: 4px;

  .loading-account {
    color: #ccc;

    p {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
`;
