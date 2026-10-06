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
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'OPERATOR':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'ANALYST':
        return 'bg-slate-100 text-slate-800 border-slate-300';
      case 'VIEWER':
        return 'bg-slate-50 text-slate-600 border-slate-200';
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
      >
        <div className="w-6 h-6 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center text-slate-700">
          <User className="w-3.5 h-3.5" />
        </div>
        <div className="text-left hidden sm:block">
          <div className="text-xs font-semibold text-slate-800">{user.display_name}</div>
          <div className="text-[10px] font-mono text-slate-500">{user.role}</div>
        </div>
        <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-1" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-xl py-2 z-50">
          <div className="px-3 py-2 border-b border-slate-100">
            <div className="text-xs text-slate-500">Signed in as</div>
            <div className="text-sm font-bold text-slate-900">{user.username}</div>
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

          <div className="px-3 py-2 text-[11px] text-slate-500 font-medium">
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
                className={`w-full text-left px-3 py-1.5 text-xs rounded-lg flex items-center justify-between transition-colors ${
                  user.role === r
                    ? 'bg-slate-900 text-white font-medium'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Shield className="w-3.5 h-3.5" />
                  {r}
                </span>
                {user.role === r && <span className="text-[10px] text-slate-300">ACTIVE</span>}
              </button>
            ))}
          </div>

          <div className="mt-2 pt-2 border-t border-slate-100 px-1">
            <button
              onClick={() => {
                logout();
                setIsOpen(false);
              }}
              className="w-full text-left px-3 py-1.5 text-xs text-red-600 hover:bg-red-50 rounded-lg flex items-center gap-2 transition-colors cursor-pointer"
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
