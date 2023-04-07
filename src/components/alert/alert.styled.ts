import styled from 'styled-components';
import { Alert } from 'react-bootstrap';
import { zIndex } from 'components/util/z-index';

export const AlertComponent = styled(Alert)`
  position: 'fixed';
  bottom: 0;
  width: 100%;
  z-index: ${zIndex.alert};
`;
