import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import type { UserRole } from '../types/auth';
import { KeyRound, Lock, Shield, User } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const { login } = useAuth();
  const [username, setUsername] = useState('operator.sharma');
  const [role, setRole] = useState<UserRole>('OPERATOR');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(role, username);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 shadow-2xl relative text-slate-900">
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center mx-auto mb-3 shadow-2xs">
            <Lock className="w-6 h-6 text-slate-700" />
          </div>
          <h2 className="text-lg font-bold text-slate-900 font-mono tracking-wider">
            DRISHTI OPERATOR LOGIN
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Authenticate to Command & Control Center
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-slate-700 mb-1.5 font-medium">
              Operator Identifier / Call-sign
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full bg-white border border-slate-300 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-slate-800 font-mono shadow-2xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-700 mb-1.5 font-medium">
              Security Access Role (RBAC)
            </label>
            <div className="grid grid-cols-2 gap-2">
              {(['OPERATOR', 'ADMIN', 'ANALYST', 'VIEWER'] as UserRole[]).map((r) => (
                <button
                  type="button"
                  key={r}
                  onClick={() => setRole(r)}
                  className={`p-2.5 rounded-lg border text-xs font-mono flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    role === r
                      ? 'bg-slate-900 border-slate-900 text-white font-bold shadow-2xs'
                      : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <Shield className="w-3.5 h-3.5" />
                  {r}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-700 mb-1.5 font-medium">
              Authorization Token / Passcode
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                defaultValue="••••••••••••••••"
                className="w-full bg-white border border-slate-300 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-slate-800 font-mono shadow-2xs"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-mono text-xs font-bold tracking-wider uppercase shadow-xs transition-all cursor-pointer"
            >
              Initialize Session
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
