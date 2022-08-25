interface RegSubmitButtonProps {
  path: string;
  value: string;
  handler(name: string, email: string, password: string): Promise<void>;
}

interface AuthSubmitButtonProps {
  path: string;
  value: string;
  handler(email: string, password: string): Promise<void>;
}

interface ForgotSubmitButtonProps {
  path: string;
  value: string;
  handler(email: string): Promise<void>;
}

export type { RegSubmitButtonProps, AuthSubmitButtonProps, ForgotSubmitButtonProps };
