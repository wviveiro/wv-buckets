import styled from 'styled-components';

export const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: ${(props) => props.theme.colors.bgmodal};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalBox = styled.div`
  background: ${(props) => props.theme.colors.modalbox};
  width: calc(100% - 20px);
  max-width: 400px;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0px 0px 6px 0px ${(props) => props.theme.colors.bgmodal};
`;
