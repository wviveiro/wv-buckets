import { FooterContainer } from './styled';
import { FooterProps } from './types';

export const LayoutFooter: React.FC<FooterProps> = ({ children }) => {
  return <FooterContainer>{children}</FooterContainer>;
};
