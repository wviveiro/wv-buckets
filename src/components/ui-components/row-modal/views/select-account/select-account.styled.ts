import styled from 'styled-components/macro';
import { gray, gray2 } from '../../row-modal.styled';

export const SelectAccountContainer = styled.div`
  margin-top: 30px;

  .row-modal-account-item {
    margin-top: 10px;
    display: flex;
    border-bottom: solid 2px ${gray2};
    padding-bottom: 20px;

    .row-modal-account-icon {
      margin-right: 20px;
    }

    .row-modal-account-details {
      flex-grow: 1;
      width: calc(100% - 60px);
      p {
        margin-bottom: 5px;
      }

      span {
        color: ${gray};
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 100%;
        white-space: nowrap;
        font-size: 0.8rem;
      }
    }

    .row-modal-account-selected {
      color: ${(props) => props.theme.colors.primary};
    }
  }
`;
