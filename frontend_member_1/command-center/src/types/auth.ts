export type UserRole = 'ADMIN' | 'OPERATOR' | 'ANALYST' | 'VIEWER';

export interface UserSession {
  user_id: string;
  username: string;
  display_name: string;
  role: UserRole;
  token?: string;
  session_expires_at: string;
}

export interface PrivilegeItem {
  id: string;
  label: string;
  allowed: boolean;
  scope: string;
}

export interface RolePrivilegeConfig {
  designation: string;
  clearanceLevel: string;
  clearanceBadge: string;
  description: string;
  privileges: PrivilegeItem[];
}

export const getRolePrivileges = (role: UserRole): RolePrivilegeConfig => {
  switch (role) {
    case 'ADMIN':
      return {
        designation: 'Command Center Administrator',
        clearanceLevel: 'LEVEL-4 TOP SECRET (ROOT)',
        clearanceBadge: 'bg-purple-100 text-purple-800 border-purple-300',
        description: 'Full unconstrained administrative authority over the surveillance grid.',
        privileges: [
          { id: 'cam-ptz', label: 'PTZ Camera Control & Stream Override', allowed: true, scope: 'Grid Control' },
          { id: 'inc-dispatch', label: 'Incident Triage & Rapid Unit Dispatch', allowed: true, scope: 'Operations' },
          { id: 'threat-defcon', label: 'DEFCON Threat Level Emergency Override', allowed: true, scope: 'Strategic' },
          { id: 'sys-config', label: 'System Gateway & Node Configuration', allowed: true, scope: 'System Core' },
          { id: 'report-export', label: 'Forensic Video & Incident Audit Export', allowed: true, scope: 'Intelligence' },
          { id: 'user-rbac', label: 'Security Clearance & Operator RBAC Mgmt', allowed: true, scope: 'Security' },
        ],
      };
    case 'OPERATOR':
      return {
        designation: 'Tactical Surveillance Operator',
        clearanceLevel: 'LEVEL-3 RESTRICTED (TACTICAL)',
        clearanceBadge: 'bg-blue-100 text-blue-800 border-blue-300',
        description: 'Frontline operational access for live CCTV monitoring and incident triage.',
        privileges: [
          { id: 'cam-ptz', label: 'PTZ Camera Control & Stream Override', allowed: true, scope: 'Grid Control' },
          { id: 'inc-dispatch', label: 'Incident Triage & Rapid Unit Dispatch', allowed: true, scope: 'Operations' },
          { id: 'report-export', label: 'Forensic Video & Incident Audit Export', allowed: true, scope: 'Intelligence' },
          { id: 'raw-feeds', label: 'Real-time High-FPS RTSP Grid Access', allowed: true, scope: 'Surveillance' },
          { id: 'threat-defcon', label: 'DEFCON Threat Level Emergency Override', allowed: false, scope: 'Admin Only' },
          { id: 'sys-config', label: 'System Gateway & Node Configuration', allowed: false, scope: 'Admin Only' },
        ],
      };
    case 'ANALYST':
      return {
        designation: 'Senior Threat Intelligence Analyst',
        clearanceLevel: 'LEVEL-2 CONFIDENTIAL (ANALYTICS)',
        clearanceBadge: 'bg-amber-100 text-amber-800 border-amber-300',
        description: 'Read-only intelligence analysis, anomaly telemetry, and post-incident auditing.',
        privileges: [
          { id: 'report-export', label: 'Forensic Video & Incident Audit Export', allowed: true, scope: 'Intelligence' },
          { id: 'threat-analysis', label: 'AI Anomaly & Threat Posture Telemetry', allowed: true, scope: 'Analytics' },
          { id: 'raw-feeds', label: 'Real-time High-FPS RTSP Grid Access', allowed: true, scope: 'Surveillance' },
          { id: 'cam-ptz', label: 'PTZ Camera Control & Stream Override', allowed: false, scope: 'Operator Only' },
          { id: 'inc-dispatch', label: 'Incident Triage & Rapid Unit Dispatch', allowed: false, scope: 'Operator Only' },
          { id: 'sys-config', label: 'System Gateway & Node Configuration', allowed: false, scope: 'Admin Only' },
        ],
      };
    case 'VIEWER':
      return {
        designation: 'Surveillance Observer / Field Agent',
        clearanceLevel: 'LEVEL-1 PUBLIC SAFETY (READ-ONLY)',
        clearanceBadge: 'bg-slate-100 text-slate-700 border-slate-300',
        description: 'Field agent observer access limited to watermarked public overview feeds.',
        privileges: [
          { id: 'watermarked-feed', label: 'Public CCTV Overview (Watermarked)', allowed: true, scope: 'Observation' },
          { id: 'advisory-board', label: 'Active Incidents Public Advisory Read', allowed: true, scope: 'Advisory' },
          { id: 'cam-ptz', label: 'PTZ Camera Control & Stream Override', allowed: false, scope: 'Restricted' },
          { id: 'inc-dispatch', label: 'Incident Triage & Rapid Unit Dispatch', allowed: false, scope: 'Restricted' },
          { id: 'report-export', label: 'Forensic Video & Incident Audit Export', allowed: false, scope: 'Restricted' },
          { id: 'sys-config', label: 'System Gateway & Node Configuration', allowed: false, scope: 'Restricted' },
        ],
      };
  }
};
