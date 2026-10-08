import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import type { UserRole } from '../types/auth';
import { Shield, User, LogOut, Award, CheckCircle2 } from 'lucide-react';

interface UserMenuProps {
  onOpenLogin?: () => void;
}

export const UserMenu: React.FC<UserMenuProps> = ({ onOpenLogin }) => {
  const { user, isAuthenticated, switchRole, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const roles: UserRole[] = ['OPERATOR', 'ADMIN', 'ANALYST', 'VIEWER'];

  const getOperatorDesignation = (role: UserRole) => {
    switch (role) {
      case 'OPERATOR':
        return 'Tactical Surveillance Operator';
      case 'ADMIN':
        return 'Command Center Administrator';
      case 'ANALYST':
        return 'Senior Threat Intelligence Analyst';
      case 'VIEWER':
        return 'Surveillance Observer / Field Agent';
      default:
        return 'Command Center Operator';
    }
  };

  const getRoleBadgeColor = (role: UserRole) => {
    switch (role) {
      case 'ADMIN':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'OPERATOR':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'ANALYST':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'VIEWER':
        return 'bg-slate-100 text-slate-700 border-slate-300';
    }
  };

  // If unauthenticated: Profile icon triggers login
  if (!isAuthenticated || !user) {
    return (
      <div className="relative" ref={menuRef}>
        <button
          onClick={() => {
            if (onOpenLogin) onOpenLogin();
            else setIsOpen(!isOpen);
          }}
          title="Operator Login"
          className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-300 flex items-center justify-center text-slate-600 hover:text-slate-900 transition-colors cursor-pointer shadow-2xs"
        >
          <User className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="relative" ref={menuRef}>
      {/* Profile Icon Only (no name, no exit sign) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        title="Operator Profile"
        className="relative w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-300 flex items-center justify-center text-slate-700 transition-all cursor-pointer shadow-2xs hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400/30"
      >
        <span className="font-mono text-xs font-bold text-slate-800">
          {user.username?.charAt(0).toUpperCase() || 'O'}
        </span>
        {/* Active online status badge */}
        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white" />
      </button>

      {/* Profile Dropdown Popover */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white border border-slate-300 rounded-xl shadow-xl p-4 z-50 animate-in fade-in slide-in-from-top-1 text-slate-800">
          {/* Header with Avatar & Name */}
          <div className="flex items-center gap-3 pb-3 border-b border-slate-200">
            <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center text-slate-800 font-bold font-mono text-sm shadow-2xs">
              <User className="w-5 h-5 text-slate-700" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs text-slate-400 font-mono uppercase tracking-wider font-semibold">
                Operator Profile
              </span>
              <h3 className="text-sm font-bold text-slate-900 truncate">
                {user.display_name || user.username}
              </h3>
              <p className="text-[11px] font-mono text-slate-500 truncate">
                @{user.username}
              </p>
            </div>
          </div>

          {/* Operator Designation Highlight Card */}
          <div className="mt-3 p-3 rounded-lg bg-slate-50 border border-slate-200 flex flex-col gap-1.5 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold flex items-center gap-1">
                <Award className="w-3 h-3 text-slate-600" />
                Designation
              </span>
              <span
                className={`text-[10px] font-mono px-2 py-0.5 rounded border font-bold ${getRoleBadgeColor(
                  user.role
                )}`}
              >
                {user.role}
              </span>
            </div>
            <div className="text-xs font-bold text-slate-800">
              {getOperatorDesignation(user.role)}
            </div>
            <div className="text-[10px] font-mono text-slate-500 flex items-center gap-1 mt-0.5">
              <Shield className="w-3 h-3 text-emerald-600" />
              <span>CLEARANCE: LEVEL-4 RESTRICTED</span>
            </div>
          </div>

          {/* RBAC Role Switcher (Testing) */}
          <div className="mt-3">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold mb-1.5 px-0.5">
              Switch Role (RBAC)
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {roles.map((r) => (
                <button
                  key={r}
                  onClick={() => {
                    switchRole(r);
                  }}
                  className={`px-2.5 py-1.5 text-[11px] font-mono rounded-lg border flex items-center justify-between transition-colors cursor-pointer ${
                    user.role === r
                      ? 'bg-slate-900 border-slate-900 text-white font-bold shadow-2xs'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span>{r}</span>
                  {user.role === r && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
                </button>
              ))}
            </div>
          </div>

          {/* Exit / Sign Out Button */}
          <div className="mt-3 pt-3 border-t border-slate-200">
            <button
              onClick={() => {
                logout();
                setIsOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out Operator</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
