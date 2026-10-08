import React from 'react';
import {
  FileText,
  Shield,
  Server,
  Lock,
} from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full mt-auto select-none font-sans text-slate-700 border-t border-slate-300">
      {/* 1. Top Section: Government / Surveillance Links Grid */}
      <div className="bg-slate-900 text-slate-200 px-6 py-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 text-xs">
          {/* Column 1: Helpdesk */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <h4 className="text-sm font-bold text-white flex items-center gap-2 tracking-wide font-sans">
              <FileText className="w-4 h-4 text-blue-400" />
              <span>Helpdesk</span>
            </h4>
            <ul className="space-y-2 text-slate-300 text-xs font-normal">
              <li>
                <a
                  href="#contact"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span className="text-slate-500">•</span>
                  <span>Contact US (24x7 Command Operations)</span>
                </a>
              </li>
              <li>
                <a
                  href="#helpline"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span className="text-slate-500">•</span>
                  <span>National Emergency Helpline (112)</span>
                </a>
              </li>
              <li>
                <a
                  href="#sop"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span className="text-slate-500">•</span>
                  <span>Operator Standard Operating Procedures (SOP)</span>
                </a>
              </li>
              <li>
                <a
                  href="#support"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span className="text-slate-500">•</span>
                  <span>CCTV Grid Technical Support</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Additional Links */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <h4 className="text-sm font-bold text-white flex items-center gap-2 tracking-wide font-sans">
              <FileText className="w-4 h-4 text-blue-400" />
              <span>Additional Links</span>
            </h4>
            <ul className="space-y-2 text-slate-300 text-xs font-normal">
              <li>
                <a
                  href="#mha"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span className="text-slate-500">•</span>
                  <span>Ministry Of Home Affairs</span>
                </a>
              </li>
              <li>
                <a
                  href="#meity"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span className="text-slate-500">•</span>
                  <span>Ministry Of Electronics & IT (MeitY)</span>
                </a>
              </li>
              <li>
                <a
                  href="#smartcity"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span className="text-slate-500">•</span>
                  <span>Smart Cities Mission Surveillance Grid</span>
                </a>
              </li>
              <li>
                <a
                  href="#certin"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span className="text-slate-500">•</span>
                  <span>CERT-In Cyber Defense Cell</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Important Links */}
          <div className="md:col-span-6 flex flex-col gap-3">
            <h4 className="text-sm font-bold text-white tracking-wide font-sans">
              Important Links
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-slate-300 text-xs font-normal">
              <a
                href="#surveillance"
                className="hover:text-white transition-colors flex items-center gap-1.5"
              >
                <span className="text-slate-500">•</span>
                <span>National Surveillance Agency</span>
              </a>
              <a
                href="#threat"
                className="hover:text-white transition-colors flex items-center gap-1.5"
              >
                <span className="text-slate-500">•</span>
                <span>Tactical Threat Intelligence Grid</span>
              </a>
              <a
                href="#inter-agency"
                className="hover:text-white transition-colors flex items-center gap-1.5"
              >
                <span className="text-slate-500">•</span>
                <span>Inter-Agency Video Exchange</span>
              </a>
              <a
                href="#traffic"
                className="hover:text-white transition-colors flex items-center gap-1.5"
              >
                <span className="text-slate-500">•</span>
                <span>Traffic AI & Urban Mobility</span>
              </a>
              <a
                href="#defense"
                className="hover:text-white transition-colors flex items-center gap-1.5"
              >
                <span className="text-slate-500">•</span>
                <span>Critical Infrastructure Security</span>
              </a>
              <a
                href="#privacy-portal"
                className="hover:text-white transition-colors flex items-center gap-1.5"
              >
                <span className="text-slate-500">•</span>
                <span>Public Safety & Grievance Portal</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Middle Ribbon: White Emblem & Agency Partner Logos (Matching Uploaded Image) */}
      <div className="bg-white border-y border-slate-300 py-3.5 px-4 overflow-x-auto shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-6 min-w-[760px] text-slate-800">
          {/* Emblem 1: Gateway / Police Grid */}
          <div className="flex items-center gap-2.5 px-2">
            <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center shrink-0">
              <Shield className="w-4 h-4 text-slate-800" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[11px] font-bold text-slate-900 leading-tight">
                National Security Grid
              </span>
              <span className="text-[9px] text-slate-500 uppercase font-mono">
                Surveillance Division
              </span>
            </div>
          </div>

          <div className="h-7 w-px bg-slate-200" />

          {/* Emblem 2: Admission / Platform Services */}
          <div className="flex items-center gap-2.5 px-2">
            <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center shrink-0">
              <Server className="w-4 h-4 text-slate-800" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[11px] font-bold text-slate-900 leading-tight">
                Unified Sensor Platform
              </span>
              <span className="text-[9px] text-slate-500 uppercase font-mono">
                Command & Control
              </span>
            </div>
          </div>

          <div className="h-7 w-px bg-slate-200" />

          {/* Emblem 3: All India Grid */}
          <div className="flex items-center gap-2.5 px-2">
            <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center shrink-0">
              <Lock className="w-4 h-4 text-slate-800" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[11px] font-bold text-slate-900 leading-tight">
                ALL INDIA SURVEILLANCE
              </span>
              <span className="text-[9px] text-slate-500 uppercase font-mono">
                NETWORK (AISN)
              </span>
            </div>
          </div>

          <div className="h-7 w-px bg-slate-200" />

          {/* Emblem 4: MeitY Emblem */}
          <div className="flex items-center gap-2 px-2">
            <div className="flex flex-col text-left">
              <span className="text-[10px] font-bold text-red-700 leading-tight uppercase tracking-wider">
                National Security
              </span>
              <span className="text-[11px] font-bold text-slate-900 leading-tight">
                Operations Portal
              </span>
              <span className="text-[8px] text-slate-500 leading-tight">
                Ministry of Electronics & Information Tech
              </span>
            </div>
          </div>

          <div className="h-7 w-px bg-slate-200" />

          {/* Emblem 5: Strategic Command */}
          <div className="flex items-center gap-2 px-2">
            <div className="p-1 rounded bg-slate-100 border border-slate-300 font-mono text-[9px] font-bold text-slate-700">
              DRISHTI-GRID
            </div>
            <div className="text-[11px] font-bold text-slate-800">
              U-DISE / CAD
            </div>
          </div>

          <div className="h-7 w-px bg-slate-200" />

          {/* Emblem 6: Collab CAD / Tech */}
          <div className="flex items-center gap-1.5 px-2">
            <span className="text-xs font-black tracking-tight text-blue-700 font-mono">
              Collab
            </span>
            <span className="text-base font-black tracking-tight text-blue-900 font-mono">
              CAD
            </span>
          </div>
        </div>
      </div>

      {/* 3. Policy Bar: Centered Slash-Separated Navigation Links */}
      <div className="bg-slate-800 text-slate-300 py-2.5 px-4 text-center text-xs font-medium border-b border-slate-700">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
          <a href="#copyright" className="hover:text-white transition-colors">
            Copyright Policy
          </a>
          <span className="text-slate-500">/</span>
          <a href="#privacy" className="hover:text-white transition-colors">
            Privacy Policy
          </a>
          <span className="text-slate-500">/</span>
          <a href="#hyperlink" className="hover:text-white transition-colors">
            Hyperlink Policy
          </a>
          <span className="text-slate-500">/</span>
          <a href="#terms" className="hover:text-white transition-colors">
            Terms and Conditions
          </a>
          <span className="text-slate-500">/</span>
          <a href="#sop" className="hover:text-white transition-colors">
            Security Guidelines
          </a>
          <span className="text-slate-500">/</span>
          <a href="#help" className="hover:text-white transition-colors">
            Help
          </a>
        </div>
      </div>

      {/* 4. Bottom Attribution & Hosting Info */}
      <div className="bg-slate-950 text-slate-400 py-6 px-4 text-center text-[11px] leading-relaxed">
        <div className="max-w-4xl mx-auto flex flex-col gap-1.5">
          <p className="text-slate-300 font-medium">
            Content Owned and Maintained by DRISHTI Command & Surveillance Operations Division
          </p>
          <p className="text-slate-400">
            Designed, Developed and hosted by{' '}
            <strong className="text-slate-200 underline decoration-slate-600 underline-offset-2">
              National Informatics Centre (NIC)
            </strong>
            ,
          </p>
          <p className="text-slate-500">
            Ministry of Electronics & Information Technology, Government of India
          </p>
          <p className="text-slate-400 font-mono text-[10px] mt-1">
            Last Updated: <strong className="text-slate-300">Oct 08, 2026</strong>
          </p>
        </div>

        {/* Bottom Agency Badges: S3WaaS, NIC, Digital India */}
        <div className="mt-5 pt-4 border-t border-slate-900 flex items-center justify-center flex-wrap gap-6 text-xs">
          {/* S3WaaS Badge */}
          <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-900 border border-slate-800 rounded-md">
            <span className="text-[10px] text-slate-400 font-mono">Powered by</span>
            <span className="font-extrabold text-white text-xs tracking-wider">
              S3WaaS
            </span>
          </div>

          {/* NIC Badge */}
          <div className="flex items-center gap-1.5 px-3 py-1 bg-blue-950/80 border border-blue-900 rounded-md text-blue-200">
            <span className="font-black text-sm text-white font-mono">NIC</span>
            <div className="flex flex-col text-left leading-none text-[8px] text-blue-300 font-semibold">
              <span>National</span>
              <span>Informatics</span>
              <span>Centre</span>
            </div>
          </div>

          {/* Digital India Badge */}
          <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-900 border border-slate-800 rounded-md">
            <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-orange-500 via-white to-green-600 flex items-center justify-center text-[7px] font-bold text-slate-900">
              i
            </div>
            <div className="flex flex-col text-left leading-none">
              <span className="font-bold text-white text-[10px]">Digital India</span>
              <span className="text-[7px] text-slate-400">Power To Empower</span>
            </div>
          </div>

          {/* ISO / CERT-In Badge */}
          <div className="flex items-center gap-1 px-3 py-1 bg-slate-900 border border-slate-800 rounded-md text-emerald-400 text-[10px] font-mono">
            <Shield className="w-3 h-3 text-emerald-500" />
            <span>CERT-In Audited • DEFCON Secured</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
