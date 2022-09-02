type ButtonProps = {
  path: string;
  icon: JSX.Element;
  iconPosition: 'left' | 'right';
  text: string;
  onClick: () => void;
  className: string;
  isStyled: boolean;
  customStyles: string;
  style: React.CSSProperties;
  isDisabled: boolean;
};

export type { ButtonProps };
