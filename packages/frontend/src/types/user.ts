import Rules from "../enum/Rules";

type User = {
  _id: number;
  name: string;
  email: string;
  role: Rules;
};

type Session = User & {
  accessToken: string;
};

type FormUser = {
  name?: string;
  password?: string;
  newPassword?: string;
  confirmPassword?: string;
  role?: Rules;
};

type UserDetails = User & {
  createdAt: Date;
};

export type { User, Session, FormUser, UserDetails };
