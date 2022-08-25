export interface SocialAuthButtonProps {
  method(): void;
  icon: JSX.Element;
  title?: string;
  style?: { color: string };
}
