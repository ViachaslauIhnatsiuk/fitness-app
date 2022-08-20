type ButtonProps = {
  path?: string;
  icon?: JSX.Element;
  iconPosition?: 'left' | 'right';
  text?: string;
  onClick?: () => void;
  className?: string;
  isStyled?: boolean;
  customStyles?: string;
};

export type { ButtonProps };
