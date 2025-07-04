
export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  location?: string;
}

export interface AuthToken {
  token: string;
  expiresAt: number;
  user: User;
}
