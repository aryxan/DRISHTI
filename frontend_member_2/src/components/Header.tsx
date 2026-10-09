import React, { useState, useRef, useEffect } from 'react';
import { User, LogOut, Shield, Mail, Building2, ChevronDown, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';
import { useIntelligence } from '../context/IntelligenceContext';

export const Header: React.FC = () => {
  const {
    toastMessage: contextToast,
    dismissToast: dismissContextToast
  } = useIntelligence();

  const [localToast, setLocalToast] = useState<{ text: string; type: 'info' | 'success' | 'warning' } | null>(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [showSignOutConfirm, setShowSignOutConfirm] = useState(false);
  const [isSignedOut, setIsSignedOut] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsUserMenuOpen(false);
        setShowSignOutConfirm(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleSignOut = () => {
    setIsUserMenuOpen(false);
    setShowSignOutConfirm(true);
  };

  const confirmSignOut = () => {
    setShowSignOutConfirm(false);
    setIsSignedOut(true);
    setLocalToast({
      text: 'Session terminated. Operator operator.b has signed out safely.',
      type: 'warning'
    });
  };

  const handleSignIn = () => {
    setIsSignedOut(false);
    setLocalToast({
      text: 'Session authenticated. Welcome back, operator.b.',
      type: 'success'
    });
  };

  const activeToast = localToast || contextToast;
  const dismissToast = () => {
    setLocalToast(null);
    dismissContextToast();
  };


  return (
    <header className="bg-white border-b border-slate-300 sticky top-0 z-30 shadow-2xs">
      <div className="px-5 py-2.5 flex items-center justify-between gap-3">
        {/* Portal Title */}
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-700 animate-pulse" />
          <div>
            <div className="text-xs font-mono font-bold text-slate-800">
              10. Frontend Portal 2 – AI Intelligence (frontend/intelligence)
            </div>
            <div className="text-[11px] text-slate-500 font-medium">
              AI-Driven Multi-Modal Threat Reasoning & Forensic Intelligence
            </div>
          </div>
        </div>

        {/* User Profile Box & Dropdown */}
        <div className="relative" ref={menuRef}>
          {isSignedOut ? (
            <button
              onClick={handleSignIn}
              className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-xs font-mono font-bold transition cursor-pointer shadow-xs"
            >
              <User className="h-3.5 w-3.5" />
              <span>SIGN IN AS OPERATOR</span>
            </button>
          ) : (
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg border text-xs font-sans transition cursor-pointer shadow-2xs ${
                isUserMenuOpen
                  ? 'bg-slate-200 border-slate-400 text-slate-900 ring-2 ring-slate-400/30'
                  : 'bg-slate-100 hover:bg-slate-200/80 border-slate-300 text-slate-800'
              }`}
              title="Click to view user profile & options"
              aria-expanded={isUserMenuOpen}
            >
              <div className="w-6 h-6 rounded-full bg-slate-800 text-white flex items-center justify-center text-[10px] font-bold font-mono shrink-0">
                <User className="h-3.5 w-3.5" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold text-slate-900 leading-tight">
                  operator.b
                </span>
                <span className="text-[9px] text-slate-500 uppercase font-mono font-semibold leading-none">
                  AI ANALYST
                </span>
              </div>
              <ChevronDown
                className={`h-3.5 w-3.5 text-slate-500 ml-1 transition-transform duration-200 ${
                  isUserMenuOpen ? 'rotate-180 text-slate-800' : ''
                }`}
              />
            </button>
          )}

          {/* User Profile Dropdown Menu */}
          {isUserMenuOpen && !isSignedOut && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-slate-300 rounded-xl shadow-xl z-50 overflow-hidden animate-fadeIn">
              {/* Profile Card Header */}
              <div className="bg-slate-50 p-4 border-b border-slate-200 flex items-start gap-3">
                <div className="w-11 h-11 rounded-full bg-slate-800 text-white flex items-center justify-center font-mono font-bold text-base shadow-sm shrink-0">
                  <User className="h-6 w-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <h4 className="text-sm font-bold text-slate-900 truncate">
                      Operator B
                    </h4>
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300 shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                      ON DUTY
                    </span>
                  </div>
                  <p className="text-xs font-mono text-slate-500">@operator.b</p>
                  <p className="text-[11px] text-slate-600 font-medium mt-0.5">
                    Lead AI Forensic & Threat Analyst
                  </p>
                </div>
              </div>

              {/* Detailed User Information Section */}
              <div className="p-3.5 space-y-2.5 text-xs text-slate-700 bg-white">
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold px-1">
                  User Details
                </div>

                <div className="flex items-center gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
                  <Mail className="h-4 w-4 text-slate-500 shrink-0" />
                  <div className="flex flex-col min-w-0">
                    <span className="text-[10px] font-mono text-slate-400 uppercase font-semibold">Email</span>
                    <span className="text-slate-800 font-mono font-medium truncate">operator.b@drishti.mil</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
                  <Shield className="h-4 w-4 text-slate-500 shrink-0" />
                  <div className="flex flex-col min-w-0">
                    <span className="text-[10px] font-mono text-slate-400 uppercase font-semibold">Security Clearance</span>
                    <span className="text-slate-800 font-semibold flex items-center gap-1.5">
                      Level 4 • TS/SCI Forensics
                      <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
                  <Building2 className="h-4 w-4 text-slate-500 shrink-0" />
                  <div className="flex flex-col min-w-0">
                    <span className="text-[10px] font-mono text-slate-400 uppercase font-semibold">Assigned Station</span>
                    <span className="text-slate-800 font-medium">DRISHTI Command Center • Alpha Wing</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
                  <Clock className="h-4 w-4 text-slate-500 shrink-0" />
                  <div className="flex flex-col min-w-0">
                    <span className="text-[10px] font-mono text-slate-400 uppercase font-semibold">Session Authenticated</span>
                    <span className="text-slate-800 font-mono text-[11px]">Today at 08:30 IST (Active)</span>
                  </div>
                </div>
              </div>

              {/* Actions & Sign Out Section */}
              <div className="p-2 bg-slate-50 border-t border-slate-200 space-y-1">
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-rose-700 hover:text-rose-900 hover:bg-rose-50 border border-transparent hover:border-rose-200 rounded-lg transition cursor-pointer font-sans"
                >
                  <span className="flex items-center gap-2">
                    <LogOut className="h-4 w-4" />
                    <span>Sign Out</span>
                  </span>
                  <span className="text-[10px] font-mono font-normal text-rose-500">End session</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sign Out Confirmation Modal Dialog */}
      {showSignOutConfirm && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-300 rounded-xl shadow-2xl max-w-sm w-full p-5 space-y-4 animate-scaleUp">
            <div className="flex items-center gap-3 text-rose-700">
              <div className="p-2 rounded-full bg-rose-100 border border-rose-200">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 font-sans">
                Sign Out of DRISHTI?
              </h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Are you sure you want to sign out from the <strong>Frontend Portal 2 (AI Intelligence)</strong> console? Your operational session for <strong>operator.b</strong> will be terminated.
            </p>
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => setShowSignOutConfirm(false)}
                className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-medium text-slate-700 hover:bg-slate-100 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmSignOut}
                className="px-3.5 py-1.5 rounded-lg bg-rose-700 hover:bg-rose-800 text-white text-xs font-bold transition cursor-pointer shadow-xs flex items-center gap-1.5"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span>Confirm Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Alert Toast Notification */}
      {activeToast && (
        <div className="w-full p-2 bg-slate-50 border-t border-slate-200">
          <div className={`max-w-7xl mx-auto px-3 py-1.5 rounded-lg border text-xs font-mono flex items-center justify-between ${
            activeToast.type === 'warning' ? 'bg-rose-50 border-rose-300 text-rose-800' :
            activeToast.type === 'success' ? 'bg-emerald-50 border-emerald-300 text-emerald-800' :
            'bg-slate-100 border-slate-300 text-slate-800'
          }`}>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-current" />
              <span>{activeToast.text}</span>
            </div>
            <button onClick={dismissToast} className="text-slate-400 hover:text-slate-700 font-bold ml-4">
              ✕
            </button>
          </div>
        </div>
      )}
    </header>
  );
};


