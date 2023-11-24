import styled from 'styled-components';

export const Text = styled.p`
  margin: 0 auto;
  margin-bottom: 32px;
  max-width: 100%;
  color: ${props => props.theme.colors.accent};
  text-shadow: ${props => props.theme.shadows.textShadow};

  text-align: center;
  
  font-family: ${props => props.theme.fonts.heading}
  font-size: ${props => props.theme.fontSizes.m}
`;
