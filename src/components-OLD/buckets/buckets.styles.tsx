import styled from 'styled-components/macro';
import { GridItem } from '../../ui-components/grid/grid';

export const BucketItem = styled(GridItem)`
  width: 150px;
  height: 150px;
  border: solid 1px ${(props) => props.theme.colors.grey};
  border-radius: 5px;
  margin: 10px;
`;
