export type UserRole = 'ADMIN' | 'OPERATOR' | 'ANALYST' | 'VIEWER';

export interface UserSession {
  user_id: string;
  username: string;
  display_name: string;
  role: UserRole;
  token?: string;
  session_expires_at: string;
}
