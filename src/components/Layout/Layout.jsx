import React from 'react';
import { Container } from './Layout.styled';

export const Layout = ({ children }) => {
  return (
    <>
      <Container>{children}</Container>
    </>
  );
};
