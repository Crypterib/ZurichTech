import React from "react";
import { Shield, Server, ArrowRight } from "lucide-react";

interface HeaderProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export default function Header({ onNavigate, activeSection }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#020408]/80 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Authentic stylized logo */}
        <div 
          onClick={() => onNavigate("hero")} 
          className="flex cursor-pointer flex-col group select-none"
          id="zurich-logo-container"
          role="button"
          tabIndex={0}
        >
          <div className="flex items-baseline leading-none">
            {/* zurich in bold lowercase styled sans */}
            <span className="font-mono text-2xl font-extrabold tracking-tighter text-white lowercase">
              zur
              {/* Custom style for 'i' to replace standard round dot with red square dot */}
              <span className="relative inline-block">
                <span className="text-transparent">i</span>
                <span className="absolute inset-0 text-white">i</span>
                {/* The red square dot overlay precisely over the standard dot of 'i' */}
                <span className="absolute bg-red-600 w-[4.5px] h-[4.5px] top-[2px] left-[3px]" />
              </span>
              ch
            </span>
            {/* tech in smaller lowercase styled sans in red */}
            <span className="font-mono text-xl font-black text-red-600 lowercase relative ml-[1.5px] leading-none">
              tech
              <span className="absolute -top-[3px] -right-[6px] text-[7px] font-bold text-red-600">®</span>
            </span>
          </div>
          {/* Red underline starting under zurich to the end of tech */}
          <div className="h-[2px] bg-red-600 w-full mt-[1.5px]" />
        </div>

        {/* Global Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center space-x-6 text-xs font-semibold uppercase tracking-widest text-slate-400" id="desktop-nav-links">
          {[
            { id: "services", label: "Services" },
            { id: "projects", label: "Projects" },
            { id: "consultant", label: "AI Architect" },
            { id: "team", label: "Our Team" },
            { id: "quote", label: "SLA Blueprint" },
            { id: "about", label: "SLA Advantage" },
            { id: "blog", label: "Insights" },
          ].map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                id={`nav-link-${item.id}`}
                className={`transition-all duration-200 hover:text-red-500 cursor-pointer ${
                  isActive ? "text-red-500" : "text-slate-400"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Status Sentinel & Call to Action button */}
        <div className="flex items-center space-x-4">
          <div className="hidden lg:flex items-center space-x-2 rounded-full border border-emerald-500/20 bg-emerald-950/25 px-3.5 py-1 text-xs text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            <span className="font-mono text-[9px] tracking-wider uppercase font-semibold">
              SLA GUARD ACTIVE
            </span>
          </div>

          <button
            onClick={() => onNavigate("quote")}
            id="quote-cta-header"
            className="group flex items-center space-x-1 px-6 py-2.5 bg-red-600 text-white text-xs font-bold uppercase tracking-widest rounded-full shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:bg-red-500 transition-all duration-300"
          >
            <span>Get Proposal</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </header>
  );
}
