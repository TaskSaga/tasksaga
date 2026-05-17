export interface AuthResponse {
  access_token?: string;
  refresh_token?: string;
  detail?: string;
  message?: string;
  currentXp?: number;
  level?: number;
}
