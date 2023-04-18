import { zIndex } from 'components/util/z-index';
import styled from 'styled-components';

export const FooterContainer = styled.div`
    width: 100%;
    height: 58px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;
    box-shadow: #000 0 0 1px 0;
    z-index: ${zIndex.footer};
    padding: 0 50px;
    padding-bottom: env(safe-area-inset-bottom, 0);
`;
