interface RegSubmitButtonProps {
  avatar: string;
  path: string;
  value: string;
  handler(avatar: string, name: string, email: string, password: string): Promise<void>;
}

interface UpdateProfileSubmitButtonProps {
  path: string;
  value: string;
  handler(name: string, password: string): Promise<void>;
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

export type {
  RegSubmitButtonProps,
  UpdateProfileSubmitButtonProps,
  AuthSubmitButtonProps,
  ForgotSubmitButtonProps
};
