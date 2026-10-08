import React from 'react';
import {
  FileText,
  Shield,
  Radio,
  Server,
  Lock,
  Cpu,
  CheckCircle2,
} from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full mt-auto select-none font-sans text-slate-700 border-t border-slate-300">
      {/* 1. Top Section: 3-Column Surveillance & Government Links (Full-width, compact scaling) */}
      <div className="w-full bg-slate-900 text-slate-300 px-4 md:px-6 py-4 md:py-5 border-b border-slate-800">
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-5 text-[11px]">
          {/* Column 1: Operations & Helpdesk (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5 font-mono">
              <FileText className="w-3.5 h-3.5 text-blue-400" />
              <span>Operations & Support Desk</span>
            </h4>
            <ul className="space-y-1 text-slate-300">
              <li>
                <a href="#control-room" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span className="text-slate-500">•</span>
                  <span>24x7 Control Room & Incident Dispatch</span>
                </a>
              </li>
              <li>
                <a href="#helpline" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span className="text-slate-500">•</span>
                  <span>Emergency Response Helpline (Dial 112)</span>
                </a>
              </li>
              <li>
                <a href="#sop" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span className="text-slate-500">•</span>
                  <span>Operator Standard Operating Procedure (SOP)</span>
                </a>
              </li>
              <li>
                <a href="#stream-support" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span className="text-slate-500">•</span>
                  <span>RTSP & ONVIF Stream Integration Diagnostics</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Government & Regulatory Links (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5 font-mono">
              <Shield className="w-3.5 h-3.5 text-blue-400" />
              <span>Government & Security Grid</span>
            </h4>
            <ul className="space-y-1 text-slate-300">
              <li>
                <a href="#mha" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span className="text-slate-500">•</span>
                  <span>Ministry of Home Affairs (MHA)</span>
                </a>
              </li>
              <li>
                <a href="#meity" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span className="text-slate-500">•</span>
                  <span>Ministry of Electronics & IT (MeitY)</span>
                </a>
              </li>
              <li>
                <a href="#smartcity" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span className="text-slate-500">•</span>
                  <span>Smart Cities Mission Surveillance Infrastructure</span>
                </a>
              </li>
              <li>
                <a href="#certin" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span className="text-slate-500">•</span>
                  <span>Indian Computer Emergency Response Team (CERT-In)</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: AI Systems & Defense Infrastructure (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5 font-mono">
              <Cpu className="w-3.5 h-3.5 text-blue-400" />
              <span>Surveillance Architecture & AI</span>
            </h4>
            <ul className="space-y-1 text-slate-300">
              <li>
                <a href="#neural" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span className="text-slate-500">•</span>
                  <span>DRISHTI Neural Vision & Anomaly Engine</span>
                </a>
              </li>
              <li>
                <a href="#inter-agency" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span className="text-slate-500">•</span>
                  <span>Inter-Agency High-Speed Video Exchange Gateway</span>
                </a>
              </li>
              <li>
                <a href="#defcon" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span className="text-slate-500">•</span>
                  <span>National DEFCON Threat Assessment Matrix</span>
                </a>
              </li>
              <li>
                <a href="#retention" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span className="text-slate-500">•</span>
                  <span>Data Protection & Video Retention Protocols</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 2. Middle Emblem / Partner Ribbon (White band, full-width, compact scaling) */}
      <div className="w-full bg-white border-y border-slate-300 py-2.5 px-4 md:px-6 overflow-x-auto shadow-2xs">
        <div className="w-full flex items-center justify-between gap-4 min-w-[720px] text-slate-800">
          {/* Badge 1: Central Command */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-7 h-7 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center">
              <Shield className="w-3.5 h-3.5 text-slate-800" />
            </div>
            <div className="flex flex-col text-left leading-tight">
              <span className="text-[11px] font-bold text-slate-900">Central Command Operations</span>
              <span className="text-[9px] text-slate-500 uppercase font-mono">Integrated Defense Grid</span>
            </div>
          </div>

          <div className="h-5 w-px bg-slate-200" />

          {/* Badge 2: Police & Law Enforcement */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-7 h-7 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center">
              <Server className="w-3.5 h-3.5 text-slate-800" />
            </div>
            <div className="flex flex-col text-left leading-tight">
              <span className="text-[11px] font-bold text-slate-900">Law Enforcement Ops</span>
              <span className="text-[9px] text-slate-500 uppercase font-mono">Unified Command Portal</span>
            </div>
          </div>

          <div className="h-5 w-px bg-slate-200" />

          {/* Badge 3: NIC */}
          <div className="flex items-center gap-1.5 shrink-0 px-2 py-0.5 bg-blue-50 border border-blue-200 rounded">
            <span className="font-black text-xs text-blue-900 font-mono">NIC</span>
            <div className="flex flex-col text-left leading-none text-[8px] text-blue-800 font-semibold">
              <span>National</span>
              <span>Informatics</span>
              <span>Centre</span>
            </div>
          </div>

          <div className="h-5 w-px bg-slate-200" />

          {/* Badge 4: DRISHTI AI Tactical Core */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-7 h-7 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center">
              <Radio className="w-3.5 h-3.5 text-slate-800" />
            </div>
            <div className="flex flex-col text-left leading-tight">
              <span className="text-[11px] font-black text-slate-900 tracking-wider font-mono">DRISHTI-AI</span>
              <span className="text-[9px] text-slate-500 font-mono">Autonomous Threat Engine</span>
            </div>
          </div>

          <div className="h-5 w-px bg-slate-200" />

          {/* Badge 5: Digital India */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-amber-500 via-white to-emerald-600 flex items-center justify-center text-[7px] font-bold text-slate-900 border border-slate-300">
              i
            </div>
            <div className="flex flex-col text-left leading-none">
              <span className="font-bold text-slate-900 text-[10px]">Digital India</span>
              <span className="text-[8px] text-slate-500 font-medium">Power To Empower</span>
            </div>
          </div>

          <div className="h-5 w-px bg-slate-200" />

          {/* Badge 6: CERT-In Cyber Security */}
          <div className="flex items-center gap-1.5 shrink-0 px-2 py-0.5 bg-emerald-50 border border-emerald-200 rounded text-emerald-800 text-[10px] font-mono">
            <Lock className="w-3 h-3 text-emerald-600" />
            <span className="font-bold">CERT-In AUDITED</span>
          </div>
        </div>
      </div>

      {/* 3. Policy & Compliance Strip (Clean slate bar, compact) */}
      <div className="w-full bg-slate-800 text-slate-300 py-1.5 px-4 md:px-6 text-center text-[10px] font-medium border-b border-slate-700">
        <div className="w-full flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
          <a href="#copyright" className="hover:text-white transition-colors">
            Copyright Policy
          </a>
          <span className="text-slate-500">/</span>
          <a href="#privacy" className="hover:text-white transition-colors">
            Privacy & Video Retention Policy
          </a>
          <span className="text-slate-500">/</span>
          <a href="#hyperlink" className="hover:text-white transition-colors">
            Hyperlink Policy
          </a>
          <span className="text-slate-500">/</span>
          <a href="#terms" className="hover:text-white transition-colors">
            Terms & Conditions of Surveillance
          </a>
          <span className="text-slate-500">/</span>
          <a href="#guidelines" className="hover:text-white transition-colors">
            Operator Code of Conduct
          </a>
          <span className="text-slate-500">/</span>
          <a href="#help" className="hover:text-white transition-colors">
            Help & Documentation
          </a>
        </div>
      </div>

      {/* 4. Bottom Attribution & Security Badges (Pure Black Theme) */}
      <div className="w-full bg-black text-zinc-400 py-4 px-4 md:px-6 text-center text-[10px] leading-relaxed border-t border-zinc-800">
        <div className="w-full flex flex-col gap-1.5 max-w-5xl mx-auto">
          <p className="text-zinc-200 font-medium">
            Content Owned and Maintained by DRISHTI Tactical Defense & Surveillance Operations Grid
          </p>
          <p className="text-zinc-400">
            Designed, Developed and Hosted by{' '}
            <strong className="text-white underline decoration-zinc-600 underline-offset-2">
              National Informatics Centre (NIC)
            </strong>
            , Ministry of Electronics & Information Technology
          </p>
          <div className="flex items-center justify-center gap-2 text-zinc-500 font-mono text-[9px] mt-0.5">
            <span>Last Updated: <strong className="text-zinc-300">Oct 08, 2026</strong></span>
            <span>•</span>
            <span>Security Classification: <strong className="text-emerald-400">RESTRICTED // LEVEL-4</strong></span>
          </div>
        </div>

        {/* Scaled Accreditation Badges */}
        <div className="mt-3 pt-3 border-t border-zinc-800 flex items-center justify-center flex-wrap gap-4 text-[10px]">
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-zinc-900 border border-zinc-800 rounded text-zinc-300 shadow-2xs">
            <span className="text-[9px] text-zinc-500 font-mono">Framework:</span>
            <span className="font-bold text-white text-[10px]">S3WaaS</span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-zinc-900 border border-zinc-800 rounded text-zinc-300 shadow-2xs">
            <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-amber-500 via-white to-emerald-600 flex items-center justify-center text-[7px] font-bold text-black border border-zinc-700">
              i
            </div>
            <span className="font-bold text-white text-[10px]">Digital India</span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-zinc-900 border border-zinc-800 rounded text-emerald-400 font-mono shadow-2xs">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            <span>ISO 27001 Security Compliant</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
