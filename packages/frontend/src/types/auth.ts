type Login = {
  email: string;
  password: string;
  rememberMe: boolean;
};

type Register = {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
  role: string;
};

export type { Login, Register };
