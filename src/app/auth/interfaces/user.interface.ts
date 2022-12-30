export default interface User {
  email: string;
  name: string;
  id: number;
  admin: boolean;
}

export interface Credentials {
  email: string;
  password: string;
  name?: string;
}
