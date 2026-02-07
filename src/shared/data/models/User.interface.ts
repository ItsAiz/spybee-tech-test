import { UserRole } from '../config/Roles.config';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  rol: UserRole;
}

export interface UserSafe {
  id: string;
  name: string;
  email: string;
  rol: UserRole;
}
