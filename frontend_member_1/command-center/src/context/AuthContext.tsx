import React, { createContext, useContext, useState, useEffect } from 'react';
import type { UserRole, UserSession } from '../types/auth';

interface AuthContextType {
  user: UserSession | null;
  isAuthenticated: boolean;
  login: (role: UserRole, username?: string) => void;
  logout: () => void;
  switchRole: (role: UserRole) => void;
}

const defaultSession: UserSession = {
  user_id: 'usr-ops-09',
  username: 'operator.sharma',
  display_name: 'Rajesh Sharma',
  role: 'OPERATOR',
  token: 'mock-jwt-token-drishti-sec-ops',
  session_expires_at: new Date(Date.now() + 8 * 3600 * 1000).toISOString(),
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserSession | null>(() => {
    const saved = localStorage.getItem('drishti_user_session');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return defaultSession;
      }
    }
    return defaultSession;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('drishti_user_session', JSON.stringify(user));
      localStorage.setItem('drishti_jwt_token', user.token || 'mock-jwt-token');
    } else {
      localStorage.removeItem('drishti_user_session');
      localStorage.removeItem('drishti_jwt_token');
    }
  }, [user]);

  const login = (role: UserRole, username = 'operator.sharma') => {
    const session: UserSession = {
      user_id: `usr-${role.toLowerCase()}-${Date.now().toString().slice(-4)}`,
      username,
      display_name: username.replace('.', ' ').toUpperCase(),
      role,
      token: `drishti-jwt-${role}-${Date.now()}`,
      session_expires_at: new Date(Date.now() + 8 * 3600 * 1000).toISOString(),
    };
    setUser(session);
  };

  const logout = () => {
    setUser(null);
  };

  const switchRole = (role: UserRole) => {
    if (!user) return;
    setUser({ ...user, role });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        switchRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
};
