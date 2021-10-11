import { BottomModal } from 'components/ui-components/bottom-modal';
import styled from 'styled-components/macro';

export const ModalAddAccountContainer = styled(BottomModal)`
  h2 {
    margin-bottom: 20px;
  }

  .disclaimer {
    font-style: italic;
    font-size: 0.85rem;
    opacity: 0.7;
  }

  .create-account {
    width: 100%;
    padding: 20px;
    background: ${(props) => props.theme.colors.background};
    color: ${(props) => props.theme.colors.textWhite};
    border: 0;
    border-radius: 5px;
    margin: 30px 0 10px;
    text-transform: uppercase;
  }

  .cancel-creation {
    background: none;
    border: none;
    color: #000;
    font-weight: bold;
    text-decoration: none;
  }
`;
