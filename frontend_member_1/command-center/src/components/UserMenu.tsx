import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import type { UserRole } from '../types/auth';
import { Shield, LogOut, Award, CheckCircle2 } from 'lucide-react';

interface UserMenuProps {
  onOpenLogin?: () => void;
}

/**
 * Exact circular user silhouette icon matching the reference design:
 * Circle outline ring, solid round head, and solid curved shoulders/torso.
 */
export const ProfileAvatarIcon: React.FC<{ className?: string }> = ({
  className = 'w-7 h-7 text-slate-900',
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Outer circle boundary ring */}
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8" />
    {/* Solid silhouette head */}
    <circle cx="12" cy="8.3" r="3.1" fill="currentColor" />
    {/* Solid silhouette shoulders / torso */}
    <path
      d="M5.8 19.3C6.7 15.6 9.1 13.6 12 13.6C14.9 13.6 17.3 15.6 18.2 19.3C16.5 20.9 14.4 21.8 12 21.8C9.6 21.8 7.5 20.9 5.8 19.3Z"
      fill="currentColor"
    />
  </svg>
);

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
          className="relative p-0.5 rounded-full text-slate-800 hover:text-black hover:scale-105 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-slate-400/40"
        >
          <ProfileAvatarIcon className="w-7 h-7 text-slate-800 hover:text-black transition-colors" />
        </button>
      </div>
    );
  }

  return (
    <div className="relative" ref={menuRef}>
      {/* Profile Icon matching user reference image */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        title="Operator Profile"
        className="relative p-0.5 rounded-full text-slate-800 hover:text-black hover:scale-105 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-slate-400/40"
      >
        <ProfileAvatarIcon className="w-7 h-7 text-slate-900 hover:text-black transition-colors" />
      </button>

      {/* Profile Dropdown Popover */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white border border-slate-300 rounded-xl shadow-xl p-4 z-50 animate-in fade-in slide-in-from-top-1 text-slate-800">
          {/* Header with Avatar & Name */}
          <div className="flex items-center gap-3 pb-3 border-b border-slate-200">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-slate-900 shrink-0">
              <ProfileAvatarIcon className="w-9 h-9 text-slate-900" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider font-semibold">
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
