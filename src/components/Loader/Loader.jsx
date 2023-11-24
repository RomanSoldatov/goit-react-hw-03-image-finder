import React from 'react';
import { LoaderBackdrop } from './Loader.styled';
import ClipLoader from 'react-spinners/ClipLoader';

export const Loader = () => {
  return (
    <LoaderBackdrop>
      <ClipLoader
        color="#f68000"
        size={150}
        cssOverride={{ position: 'absolute', top: '25%', left: '45%' }}
      />
    </LoaderBackdrop>
  );
};
