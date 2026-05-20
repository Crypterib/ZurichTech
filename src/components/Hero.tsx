import React, { useState } from "react";
import { Terminal, Shield, Cpu, RefreshCw, Layers } from "lucide-react";

interface HeroProps {
  onStartConsult: () => void;
  onOpenCalculator: () => void;
}

export default function Hero({ onStartConsult, onOpenCalculator }: HeroProps) {
  const [selectedNode, setSelectedNode] = useState<string>("firewall");

  // Modern illustrative security schematics interactive cards to replace dull images
  const topologyNodes = [
    {
      id: "firewall",
      label: "Cisco Firewall IPS/IDS",
      description: "Performs real-time packet inspection and threat shielding to safeguard server workloads.",
      status: "ACTIVE",
      color: "border-red-500/30 text-red-500"
    },
    {
      id: "database",
      label: "AES-256 Ledger Database",
      description: "Encrypted static fields with strict row-level segregation, optimized for multi-role portals.",
      status: "ENCRYPTED",
      color: "border-red-500/30 text-red-500"
    },
    {
      id: "sat-node",
      label: "Fleet GLONASS Network",
      description: "Telemetry nodes operating live satellite links for real-time fleet relays and remote shutdowns.",
      status: "LINK ONLINE",
      color: "border-red-500/30 text-red-500"
    }
  ];

  return (
    <section className="relative overflow-hidden bg-[#020408] py-20 sm:py-28" id="hero-section">
      {/* Background Atmospheric Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-red-600/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-red-600/5 blur-[100px] rounded-full pointer-events-none"></div>
      
      {/* Visual cyber-grid backdrop */}
      <div className="absolute inset-0 bg-cyber-grid opacity-30 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8 items-center">
          {/* Main textual marketing pitch */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 w-fit">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-red-500">Your Trusted Partner In Digital Excellence</span>
            </div>

            <h1 className="font-display text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Global IT Solutions<br/>
              That Accelerate Your<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-600 to-amber-500">
                Digital Transformation
              </span>
            </h1>

            <p className="max-w-xl text-slate-400 text-sm sm:text-base leading-relaxed">
              We combine strategy, technology, and innovation to deliver world-class software and IT solutions that enhance business efficiency, productivity, and customer experience.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={onOpenCalculator}
                id="hero-quote-trigger"
                className="px-6 py-3.5 bg-red-600 text-white text-xs font-bold uppercase tracking-widest rounded-full shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:bg-red-500 transition-all text-center cursor-pointer"
              >
                Explore SLA Blueprint Creator
              </button>
              
              <button
                onClick={onStartConsult}
                id="hero-chat-trigger"
                className="flex items-center justify-center rounded-full border border-white/10 bg-white/5 hover:bg-white/10 px-6 py-3.5 text-xs font-bold uppercase tracking-widest text-white transition-all text-center cursor-pointer"
              >
                <Terminal className="mr-2 h-4.5 w-4.5 text-red-500" />
                Consult AI Architect
              </button>
            </div>

            {/* Micro client verification */}
            <p className="text-[10px] text-slate-500 font-mono tracking-widest uppercase">
              Trusted Partners &bull; DANGOTE GROUP &bull; APEX CHANNELS &bull; NIGERIAN LOGISTICS HUBS
            </p>
          </div>

          {/* Interactive cyber-topology illustration screen */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl border border-white/10 bg-slate-950/80 p-6 backdrop-blur-xl shadow-2xl overflow-hidden group">
              {/* Scanline visual accent */}
              <div className="absolute inset-x-0 h-[1px] bg-red-600/20 animate-scanline pointer-events-none" />

              <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
                <div className="flex items-center space-x-1.5 animate-pulse-slow">
                  <div className="h-2 w-2 rounded-full bg-red-600/50" />
                  <div className="h-2 w-2 rounded-full bg-red-500/50" />
                  <div className="h-2 w-2 rounded-full bg-amber-500/50" />
                </div>
                <span className="font-mono text-[9px] tracking-widest text-slate-500 uppercase">
                  HEURISTICS MAP // ZURICH LABS
                </span>
              </div>

              {/* Glowing Interactive Visual Circuit Grid */}
              <div className="relative h-60 w-full rounded-lg bg-[#020408]/90 border border-white/5 flex items-center justify-center overflow-hidden bg-radar-grid">
                {/* Simulated center hub */}
                <div className="absolute h-16 w-16 rounded-full border border-white/10 bg-slate-900/40 flex items-center justify-center animate-pulse-slow">
                  <Layers className="h-6 w-6 text-red-500" />
                </div>

                {/* SVG connection cables */}
                <svg className="absolute inset-0 h-full w-full pointer-events-none">
                  <line x1="20%" y1="20%" x2="50%" y2="50%" stroke="rgba(220, 38, 38, 0.2)" strokeWidth="1.5" strokeDasharray="4 4" />
                  <line x1="80%" y1="25%" x2="50%" y2="50%" stroke="rgba(220, 38, 38, 0.15)" strokeWidth="1.5" strokeDasharray="4 4" />
                  <line x1="50%" y1="80%" x2="50%" y2="50%" stroke="rgba(220, 38, 38, 0.2)" strokeWidth="1.5" strokeDasharray="4 4" />
                </svg>

                {/* Cyber network nodes buttons */}
                {topologyNodes.map((node, idx) => {
                  const positions = [
                    "top-6 left-6 sm:left-12", // firewall
                    "top-10 right-6 sm:right-12", // database
                    "bottom-6 left-1/2 -ml-20 sm:-ml-28 w-40 sm:w-56" // tracking node
                  ];
                  const isSelected = selectedNode === node.id;
                  
                  return (
                    <button
                      key={node.id}
                      onClick={() => setSelectedNode(node.id)}
                      id={`node-btn-${node.id}`}
                      className={`absolute rounded-xl border p-2 backdrop-blur-md text-left transition-all duration-300 ${positions[idx]} ${
                        isSelected 
                          ? "border-red-500 bg-red-950/60 shadow-lg scale-102" 
                          : "border-white/5 bg-[#020408]/80 opacity-80 hover:opacity-100"
                      }`}
                    >
                      <div className="flex items-center space-x-1.5">
                        <span className={`inline-block h-1.5 w-1.5 rounded-full ${isSelected ? "bg-red-500 animate-ping" : "bg-slate-500"}`} />
                        <span className="font-mono text-[9px] font-semibold text-slate-300 tracking-wider">
                          {node.label.split(" ")[0]}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Node explainer box */}
              <div className="mt-5 rounded-lg border border-white/5 bg-[#020408]/60 p-4 min-h-24">
                {(() => {
                  const node = topologyNodes.find(n => n.id === selectedNode);
                  if (!node) return null;
                  return (
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-display text-sm font-bold text-slate-100">
                          {node.label}
                        </span>
                        <span className="rounded bg-white/5 px-2 py-0.5 font-mono text-[8px] tracking-widest text-red-500 border border-white/5 uppercase">
                          {node.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {node.description}
                      </p>
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>
        </div>

        {/* High-value corporate metrics grid */}
        <div className="mt-16 grid grid-cols-2 gap-4 border-t border-white/5 pt-16 sm:grid-cols-4">
          {[
            { metric: "15+", title: "Years of IT Excellence", desc: "Corporate strategy & delivery" },
            { metric: "250+", title: "Projects Delivered", desc: "Enterprise & portal systems" },
            { metric: "120+", title: "Happy Global Clients", desc: "With bulletproof SLA response" },
            { metric: "30+", title: "Certified Experts", desc: "Professional DevOps & engineers" }
          ].map((item, idx) => (
            <div key={idx} className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-5 text-center transition-all duration-300 hover:border-red-500/20 hover:scale-[1.02]">
              <span className="font-display text-2xl font-extrabold text-red-500 sm:text-3xl">
                {item.metric}
              </span>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-white">
                {item.title}
              </p>
              <p className="mt-0.5 text-[9px] text-slate-500 font-mono">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
