
export interface User {
  id: string;
  name: string;
  email: string;
}
  
export interface AuthData {
  token?: string;
  user?: User;
}
  
export interface AuthResponse {
  success: boolean;
  message: string;
  data: AuthData | null;
}
