import { Btn } from './Button.styled';

export const Button = ({ children, type = 'button', onClick = null }) => {
  return (
    <Btn type={type} onClick={onClick}>
      {children}
    </Btn>
  );
};
