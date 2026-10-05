import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import type { UserRole } from '../types/auth';
import { ChevronDown, Shield, User, LogOut } from 'lucide-react';

export const UserMenu: React.FC = () => {
  const { user, switchRole, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  if (!user) return null;

  const roles: UserRole[] = ['ADMIN', 'OPERATOR', 'ANALYST', 'VIEWER'];

  const getRoleBadgeColor = (role: UserRole) => {
    switch (role) {
      case 'ADMIN':
        return 'bg-purple-950/80 text-purple-300 border-purple-800';
      case 'OPERATOR':
        return 'bg-blue-950/80 text-blue-300 border-blue-800';
      case 'ANALYST':
        return 'bg-cyan-950/80 text-cyan-300 border-cyan-800';
      case 'VIEWER':
        return 'bg-slate-800 text-slate-400 border-slate-700';
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg hover:border-slate-700 transition-colors"
      >
        <div className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-cyan-400">
          <User className="w-3.5 h-3.5" />
        </div>
        <div className="text-left hidden sm:block">
          <div className="text-xs font-medium text-slate-200">{user.display_name}</div>
          <div className="text-[10px] font-mono text-slate-400">{user.role}</div>
        </div>
        <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-1" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-slate-900 border border-slate-800 rounded-lg shadow-xl shadow-black/80 py-2 z-50">
          <div className="px-3 py-2 border-b border-slate-800">
            <div className="text-xs text-slate-400">Signed in as</div>
            <div className="text-sm font-semibold text-slate-200">{user.username}</div>
            <div className="mt-1">
              <span
                className={`inline-block text-[10px] font-mono px-2 py-0.5 rounded border ${getRoleBadgeColor(
                  user.role
                )}`}
              >
                {user.role} PERMISSIONS
              </span>
            </div>
          </div>

          <div className="px-3 py-2 text-[11px] text-slate-400 font-medium">
            Switch RBAC Role (Testing):
          </div>

          <div className="px-1 space-y-0.5">
            {roles.map((r) => (
              <button
                key={r}
                onClick={() => {
                  switchRole(r);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3 py-1.5 text-xs rounded flex items-center justify-between transition-colors ${
                  user.role === r
                    ? 'bg-slate-800 text-cyan-400 font-semibold'
                    : 'text-slate-300 hover:bg-slate-800/60'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Shield className="w-3.5 h-3.5" />
                  {r}
                </span>
                {user.role === r && <span className="text-[10px] text-cyan-400">ACTIVE</span>}
              </button>
            ))}
          </div>

          <div className="mt-2 pt-2 border-t border-slate-800 px-1">
            <button
              onClick={() => {
                logout();
                setIsOpen(false);
              }}
              className="w-full text-left px-3 py-1.5 text-xs text-rose-400 hover:bg-rose-950/30 rounded flex items-center gap-2 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
