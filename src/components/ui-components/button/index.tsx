import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

const buttonCss = css<{ $isActive?: boolean }>`
    &,
    &:active,
    &:hover {
        ${({ $isActive, ...props }) => css`
            color: ${$isActive
                ? props.theme.colors.gray
                : props.theme.colors.textWhite};
        `}
    }
`;

export const Button = styled.button`
    ${buttonCss}
`;

export const LinkButton = styled(Link)`
    ${buttonCss}
`;
