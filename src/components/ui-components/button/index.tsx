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

const LargeCss = css`
    background-color: ${(props) => props.theme.colors.background2};

    width: 90%;
    padding: 20px;
    border-radius: 5px;
    margin: 0 auto;
    display: block;
    text-align: center;

    &,
    &:active,
    &:visited,
    &:hover,
    &:focus {
        color: ${(props) => props.theme.colors.textWhite};
    }
`;

export const LargeButton = styled.button`
    ${LargeCss}
`;

export const LargeLink = styled(Link)`
    ${LargeCss}
`;
