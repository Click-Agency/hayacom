type User = {
  _id: number;
  name: string;
  email: string;
};

type Session = User & {
  accessToken: string;
};

export type { User, Session };
