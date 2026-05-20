import React, { useState } from "react";
import { FolderGit2, Cpu, Cloud, LineChart, Shield, Terminal, ArrowRight, CheckCircle } from "lucide-react";

interface ProjectItem {
  id: string;
  title: string;
  category: string;
  desc: string;
  stats: string;
  statsLabel: string;
  specs: string[];
  systemLoad: string;
}

const PROJECTS: ProjectItem[] = [
  {
    id: "automation",
    title: "Smart Automation Platform",
    category: "AI, Automation & RPA",
    desc: "A custom low-code workflow automation framework orchestrating backend AI models, routing database transactions, and managing document extractions for public portals.",
    stats: "320k+",
    statsLabel: "Daily Automations",
    specs: ["Multi-model AI Orchestration", "Dynamic PDF Generation", "Webhook Event Router"],
    systemLoad: "Normal // 12% CPU"
  },
  {
    id: "cloud-migration",
    title: "Enterprise Cloud Migration",
    category: "Cloud Solutions & DevOps",
    desc: "Highly redundant migration of distributed physical enterprise servers to multi-region cloud containers with Zero-Downtime database synchronization.",
    stats: "99.999%",
    statsLabel: "System Uptime",
    specs: ["Terraform Provisioned", "Dockerized Microservices", "PostgreSQL Replication Clusters"],
    systemLoad: "Load Balanced"
  },
  {
    id: "fintech",
    title: "FinTech Dashboard",
    category: "Web & Mobile App Development",
    desc: "A high-performance digital gateway linking Monnify, Paystack, and bank APIs. Provides real-time clearance reporting, automated refund flows, and invoice ledgers.",
    stats: "₦1.2B+",
    statsLabel: "Processed Volumes",
    specs: ["Paystack / Monnify Bridges", "256-bit Row-level Security", "Millisecond Ledger Reconciliations"],
    systemLoad: "Active Gateway"
  },
  {
    id: "soc-command",
    title: "SOC Command Center",
    category: "Cybersecurity & IT Audit",
    desc: "A central Security Operations Center console visualizer providing real-time malware analysis, packet auditing, network trace tracking, and instant alerts.",
    stats: "<1.2s",
    statsLabel: "Threat Mitigation",
    specs: ["IDS/IPS Packet Inspector", "Automated IP Blacklisting", "Real-time Telemetry Maps"],
    systemLoad: "Shield Secure"
  }
];

export default function ProjectsSection() {
  const [activeProj, setActiveProj] = useState<string>("automation");
  const currentProj = PROJECTS.find(p => p.id === activeProj) || PROJECTS[0];

  return (
    <section className="bg-slate-950 py-20 border-t border-slate-900" id="projects">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center space-x-1.5 rounded-full border border-red-500/20 bg-red-950/20 px-3 py-1 font-mono text-xs text-red-400">
            <FolderGit2 className="h-3.5 w-3.5" />
            <span>Scale Integration Portfolio</span>
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white font-display sm:text-4xl uppercase">
            Featured Large-Scale Projects
          </h2>
          <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed">
            We deliver state-of-the-art tech frameworks to meet the aggressive processing and extreme security demands of modern African conglomerates.
          </p>
        </div>

        {/* Layout Split: Left column selector cards, Right column terminal specification */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Selector List */}
          <div className="lg:col-span-6 space-y-4">
            <p className="font-mono text-xs font-bold text-slate-400 uppercase tracking-widest pl-1 mb-4">
              Select Project to Inspect Architecture
            </p>
            {PROJECTS.map((proj) => {
              const isSelected = proj.id === activeProj;
              return (
                <button
                  key={proj.id}
                  onClick={() => setActiveProj(proj.id)}
                  id={`project-select-${proj.id}`}
                  className={`w-full text-left rounded-2xl border p-5 transition-all duration-300 relative overflow-hidden cursor-pointer ${
                    isSelected 
                      ? "border-red-500/30 bg-red-950/5 shadow-md shadow-red-950/20" 
                      : "border-slate-900 bg-[#020408]/40 hover:border-slate-800"
                  }`}
                >
                  {isSelected && (
                    <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-red-650" />
                  )}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-mono text-[9px] uppercase tracking-wider text-red-500 font-bold block mb-1">
                        {proj.category}
                      </span>
                      <h4 className="font-display font-bold text-base text-white">
                        {proj.title}
                      </h4>
                    </div>
                    <ArrowRight className={`h-4 w-4 transition-all duration-300 ${
                      isSelected ? "translate-x-1 text-red-500" : "text-slate-600 group-hover:text-slate-400"
                    }`} />
                  </div>
                  <p className="mt-2 text-xs text-slate-400 leading-relaxed font-sans line-clamp-2">
                    {proj.desc}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Terminal Spec Right */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl border border-slate-900 bg-[#020408]/60 p-6 md:p-8 backdrop-blur-md overflow-hidden">
              <div className="absolute top-0 right-0 h-40 w-40 bg-red-500/5 blur-3xl rounded-full" />

              <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
                <div className="flex items-center space-x-2">
                  <Terminal className="h-4 w-4 text-red-500 animate-pulse" />
                  <span className="font-mono text-[10px] tracking-widest text-slate-300 uppercase font-bold">
                    SYSTEM_AUDIT_SPEC // {currentProj.id.toUpperCase()}_ENV
                  </span>
                </div>
                <span className="font-mono text-[8px] border border-white/10 px-2 py-0.5 rounded text-slate-500 font-bold">
                  {currentProj.systemLoad}
                </span>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-display font-extrabold text-xl text-white">
                    {currentProj.title}
                  </h3>
                  <span className="inline-block mt-1 font-mono text-[10px] bg-white/5 px-2.5 py-0.5 rounded text-red-400 border border-white/5 uppercase tracking-wider">
                    {currentProj.category}
                  </span>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  {currentProj.desc}
                </p>

                {/* Grid for parameters */}
                <div className="grid grid-cols-2 gap-4 border-t border-b border-white/5 py-4 my-2">
                  <div>
                    <span className="font-mono text-[9px] text-slate-500 uppercase block">Performance Stat</span>
                    <span className="font-display text-2xl font-black text-white mt-1 block">
                      {currentProj.stats}
                    </span>
                    <span className="font-mono text-[8px] text-red-500 block">
                      {currentProj.statsLabel}
                    </span>
                  </div>
                  <div>
                    <span className="font-mono text-[9px] text-slate-500 uppercase block">Service Model</span>
                    <span className="font-display text-base font-bold text-slate-300 mt-2 block">
                      SLA Tier 1 Secured
                    </span>
                    <span className="font-mono text-[8px] text-slate-500 block">
                      Full-availability cluster
                    </span>
                  </div>
                </div>

                {/* Mini Checklist of Specs */}
                <div>
                  <span className="font-mono text-[10px] text-slate-400 block uppercase tracking-wider mb-2.5">
                    Core Technical Implementation Specs:
                  </span>
                  <div className="space-y-2">
                    {currentProj.specs.map((spec, i) => (
                      <div key={i} className="flex items-center space-x-2.5 text-xs text-slate-300">
                        <CheckCircle className="h-4 w-4 text-red-500 shrink-0" />
                        <span className="font-mono text-[11px]">{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <span className="font-mono text-[9px] text-slate-500 uppercase block tracking-widest">
                    RECONCILIATION AUTH KEY: MD5_SUM_F0A8F19B
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
