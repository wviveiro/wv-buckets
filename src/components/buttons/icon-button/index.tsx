import styled from "styled-components";

export const IconButton = styled.button<{ active: boolean }>`
  border: 0;
  margin: 0;
  border-radius: 50%;
  padding: 8px;
  background: inherit;
  width: 32px;
  height: 32px;
  color: ${({ active }) => (active ? "#000" : "#007afe")};

  &:hover {
    background-color: #eee;
  }
`;
