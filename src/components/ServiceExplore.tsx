import React, { useState, useEffect } from "react";
import { SERVICES } from "../data";
import { ServiceId, ServiceItem } from "../types";
import { Cpu, LayoutDashboard, Flame, ShieldAlert, Network, Navigation, Globe, Eye, Zap, Play, Square, Settings2 } from "lucide-react";

export default function ServiceExplore() {
  const [selectedService, setSelectedService] = useState<ServiceId>("gps-tracking");

  // GPS Simulation States
  const [vehicleSpeed, setVehicleSpeed] = useState<number>(68);
  const [isRelayTripped, setIsRelayTripped] = useState<boolean>(false);
  const [ignitionState, setIgnitionState] = useState<"ON" | "OFF">("ON");
  const [gpsLog, setGpsLog] = useState<string[]>(["Satellites acquired (12)", "Beacon normal"]);

  // CCTV Simulation States
  const [cctvTime, setCctvTime] = useState<string>("");
  const [activeCam, setActiveCam] = useState<"cam1" | "cam2">("cam1");
  const [cameraHeat, setCameraHeat] = useState<{ x: number; y: number }>({ x: 45, y: 60 });

  // Web Portal Simulation States
  const [activePortalRole, setActivePortalRole] = useState<"admin" | "accountant" | "student">("admin");

  // Update timestamps and micro-animations safely
  useEffect(() => {
    const timer = setInterval(() => {
      // 1. GPS Drift
      if (ignitionState === "ON") {
        setVehicleSpeed(prev => {
          if (isRelayTripped) {
            const nextSpeed = prev - 8;
            if (nextSpeed <= 0) {
              setIgnitionState("OFF");
              setGpsLog(logs => ["SHUTDOWN: Fuel relay triggered, vehicle immobilized.", ...logs.slice(0, 4)]);
              return 0;
            }
            return nextSpeed;
          }
          // Default drift
          const drift = Math.floor(Math.sin(Date.now() / 3000) * 4);
          return Math.max(0, 65 + drift);
        });
      }

      // 2. CCTV time
      const now = new Date();
      setCctvTime(now.toISOString().split("T")[1].slice(0, 8));

      // 3. CCTV heatmap drift
      setCameraHeat({
        x: Math.floor(40 + Math.sin(Date.now() / 2000) * 20),
        y: Math.floor(50 + Math.cos(Date.now() / 2200) * 15)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [ignitionState, isRelayTripped]);

  // Handle GPS shutdown relay click
  const triggerGPSRelay = () => {
    if (isRelayTripped) {
      // Reset
      setIsRelayTripped(false);
      setIgnitionState("ON");
      setVehicleSpeed(68);
      setGpsLog(logs => ["IGNITION RESET: Relay cleared, engine available.", ...logs.slice(0, 4)]);
    } else {
      setIsRelayTripped(true);
      setGpsLog(logs => ["WARNING: Deploying secure immobilizer token.", "RELAY: Engaging lock sequence below 20km/h.", ...logs.slice(0, 3)]);
    }
  };

  // Helper matching local icon strings to Lucide elements
  const getIcon = (iconName: string, className = "h-5 w-5") => {
    switch (iconName) {
      case "Cpu": return <Cpu className={className} />;
      case "LayoutDashboard": return <LayoutDashboard className={className} />;
      case "Flame": return <Flame className={className} />;
      case "ShieldAlert": return <ShieldAlert className={className} />;
      case "Network": return <Network className={className} />;
      case "Navigation": return <Navigation className={className} />;
      case "Globe": return <Globe className={className} />;
      default: return <Cpu className={className} />;
    }
  };

  const currentService = SERVICES.find(s => s.id === selectedService) || SERVICES[0];

  return (
    <section className="bg-[#020408] py-20 border-t border-white/5" id="services">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Module Header */}
        <div className="text-center md:text-left md:flex md:items-end md:justify-between mb-12">
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-red-500">
              Enterprise Capabilities
            </span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-white font-display sm:text-4xl">
              Engineered IT Ecosystems
            </h2>
            <p className="mt-4 max-w-2xl text-slate-400 text-sm sm:text-base">
              Zurich Technologies provides a spectrum of advanced integration tools. Interact with our service simulators to explore their live capabilities.
            </p>
          </div>
          <div className="mt-6 md:mt-0 flex items-center space-x-2 text-xs font-mono text-slate-500">
            <Zap className="h-4 w-4 text-red-500 animate-pulse-slow" />
            <span>Interactive Redesign Playground</span>
          </div>
        </div>

        {/* Bento Grid layout containing selector & dynamic live simulation playground */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-stretch">
          
          {/* List of Services Left */}
          <div className="lg:col-span-5 flex flex-col space-y-3">
            {SERVICES.map((item) => {
              const isSelected = selectedService === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedService(item.id)}
                  id={`service-select-${item.id}`}
                  className={`group rounded-2xl border p-5 text-left transition-all duration-300 cursor-pointer ${
                    isSelected 
                      ? "border-white/20 bg-gradient-to-r from-red-950/20 to-transparent shadow-[0_0_20px_rgba(220,38,38,0.15)] xl:translate-x-1" 
                      : "border-white/5 bg-white/[0.02] hover:border-white/10 hover:bg-[#020408]/40"
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`rounded-xl p-2.5 transition-colors duration-300 ${
                      isSelected ? "bg-red-600/25 text-red-500 animate-pulse-slow" : "bg-white/5 text-slate-400 group-hover:text-slate-200"
                    }`}>
                      {getIcon(item.iconName)}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white group-hover:text-red-500 transition-colors duration-200 uppercase tracking-wider">
                        {item.title}
                      </h4>
                      <p className="mt-1 text-xs text-slate-400 leading-relaxed max-w-sm line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Interactive Simulation Console Right */}
          <div className="lg:col-span-7 rounded-3xl border border-white/10 bg-gradient-to-br from-[#060b13] to-[#020408]/80 p-6 md:p-8 backdrop-blur-xl shadow-2xl flex flex-col justify-between relative overflow-hidden">
            
            {/* Simulation Header */}
            <div>
              <div className="flex items-center justify-between border-b border-white/5 pb-5 mb-6">
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="font-mono text-[9px] tracking-widest text-slate-400 uppercase font-semibold">
                    ACTIVE SIMULATION INTERFACE // {currentService.title.split(" ")[0]}
                  </span>
                </div>
                <div className="rounded bg-white/5 px-2.5 py-1 font-mono text-[9px] text-red-500 border border-white/10 font-bold">
                  LEVEL_INTEGRATED_V505
                </div>
              </div>

              {/* Dynamic Simulators Base on SelectedService */}
              <div className="min-h-72">
                
                {/* 1. MOCK GPS DASHBOARD */}
                {selectedService === "gps-tracking" && (
                  <div className="space-y-6" id="sim-gps-tracking">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                      {/* Interactive map display */}
                      <div className="md:col-span-7 h-48 rounded-2xl bg-[#020408] border border-white/5 relative overflow-hidden bg-radar-grid flex items-center justify-center">
                        <div className="absolute inset-0 bg-red-500/2 pointer-events-none" />
                        
                        {/* Dynamic vehicle tracking indicator */}
                        {ignitionState === "ON" ? (
                          <div 
                            className="absolute h-4 w-4 rounded-full bg-red-500 flex items-center justify-center border border-white/10 shadow-[0_0_15px_rgba(239,68,68,0.5)]"
                            style={{
                              transform: `translate(${Math.sin(Date.now() / 3000) * 35}px, ${Math.cos(Date.now() / 2500) * 20}px)`
                            }}
                          >
                            <span className="h-8 w-8 rounded-full border border-red-500/30 animate-ping absolute" />
                          </div>
                        ) : (
                          <div className="absolute h-4 w-4 rounded-full bg-red-500 flex items-center justify-center border border-white/10 shadow-lg">
                            <span className="text-[8px] font-bold text-white">X</span>
                          </div>
                        )}

                        {/* Lagos grid details vector mockup lines overlay */}
                        <div className="absolute bottom-3 left-3 flex flex-col space-y-0.5 pointer-events-none">
                          <span className="font-mono text-[7px] tracking-widest text-slate-500 font-bold uppercase">REGION: IKEJA EXPRESWY LGA</span>
                          <span className="font-mono text-[7px] text-slate-500">LAT: 6.5244° N // LON: 3.3792° E</span>
                        </div>
                      </div>

                      {/* Speedometer telemetry */}
                      <div className="md:col-span-5 flex flex-col justify-between space-y-3">
                        <div className="rounded-2xl bg-[#020408] border border-white/5 p-4 text-center">
                          <span className="font-mono text-[9px] text-slate-500 block uppercase font-bold tracking-widest">Telemetry Speed</span>
                          <span className="font-display text-4xl font-extrabold text-white mt-1 block">
                            {vehicleSpeed} <span className="text-sm text-slate-500">km/h</span>
                          </span>
                        </div>
                        <div className="rounded-xl bg-[#020408] border border-white/5 p-3.5 text-xs font-mono space-y-1">
                          <div className="flex justify-between">
                            <span className="text-slate-500 font-bold">IGNITION STATE:</span>
                            <span className={ignitionState === "ON" ? "text-emerald-400 font-bold" : "text-amber-500 font-bold"}>{ignitionState}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500 font-bold">FUEL LEVEL:</span>
                            <span className="text-slate-300 font-semibold">{ignitionState === "ON" ? "74%" : "0%"}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500 font-bold">GPS SATELLITES:</span>
                            <span className="text-red-500 font-bold">{ignitionState === "ON" ? "12 Locks" : "0 Units"}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Operational Commands */}
                    <div className="flex flex-col sm:flex-row items-center justify-between border-t border-white/5 pt-5 gap-4">
                      <div className="text-center sm:text-left">
                        <span className="font-display font-bold text-xs text-slate-200 block">Fleet Command Center Console</span>
                        <p className="text-[10px] text-slate-400 max-w-sm mt-0.5">
                          Press command below to test satellite tracking remote relays in action. Engages immediate fuel stop deceleration.
                        </p>
                      </div>
                      <button
                        onClick={triggerGPSRelay}
                        id="gps-relay-action-btn"
                        className={`rounded-full px-5 py-2.5 text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                          isRelayTripped 
                            ? "bg-amber-950/80 border border-amber-500/50 text-amber-400" 
                            : "bg-red-600 text-white shadow-[0_0_15px_rgba(239,68,68,0.3)] hover:bg-red-500"
                        }`}
                      >
                        {isRelayTripped ? "Reset Vehicle Power" : "ENGAGE IMMOBILIZER RELAY"}
                      </button>
                    </div>

                    {/* Sim Log Terminal output */}
                    <div className="rounded-xl bg-[#020408] p-3 font-mono text-[9px] text-slate-400 h-20 overflow-y-auto space-y-1 border border-white/5">
                      {gpsLog.map((log, i) => (
                        <div key={i} className="flex space-x-2">
                          <span className="text-red-500 font-bold">[{i+1}]</span>
                          <span>{log}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 2. MOCK CCTV FEEDS */}
                {selectedService === "cctv-setup" && (
                  <div className="space-y-4" id="sim-cctv-setup">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Live camera module 1 */}
                      <div className={`relative h-44 rounded-2xl bg-[#020408] border overflow-hidden flex items-center justify-center transition-all ${activeCam === "cam1" ? "border-red-500/30 shadow-[0_0_15px_rgba(220,38,38,0.15)]" : "border-white/5"}`}>
                        <div className="absolute top-2 left-2 z-15 bg-black/60 px-1.5 py-0.5 rounded font-mono text-[8px] text-slate-200 flex items-center space-x-1">
                          <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                          <span>ZURICH_CCTV_01 // server_room</span>
                        </div>
                        <div className="absolute top-2 right-2 font-mono text-[8px] text-slate-400 bg-black/40 px-1 py-0.5 rounded">{cctvTime}</div>
                        
                        {/* Static security vector mesh mockup grid representing CCTV scanning */}
                        <div className="absolute inset-0 border border-emerald-500/5 flex items-center justify-center">
                          {/* Live drifting simulated motion bounding matrix */}
                          <div 
                            className="h-12 w-16 border border-emerald-400 bg-emerald-400/5 rounded absolute flex items-center justify-center transition-all duration-1000"
                            style={{ 
                              left: `${cameraHeat.x}%`, 
                              top: `${cameraHeat.y}%`,
                              transform: "translate(-50%, -50%)"
                            }}
                          >
                            <span className="font-mono text-[6px] text-emerald-400 font-bold tracking-wider absolute -top-4 bg-slate-1050/80 px-1 rounded">MOTION</span>
                          </div>
                        </div>
                        
                        {/* High-contrast camera overlay visuals */}
                        <div className="absolute h-[1px] w-full bg-red-500/5 top-1/2" />
                        <div className="absolute w-[1px] h-full bg-red-500/5 left-1/2" />
                        
                        <span className="font-mono text-[10px] text-slate-500">Ikeja HQ - Rack B3 Feed</span>
                      </div>

                      {/* Live camera module 2 */}
                      <div className={`relative h-44 rounded-2xl bg-[#020408] border overflow-hidden flex items-center justify-center transition-all ${activeCam === "cam2" ? "border-red-500/30 shadow-[0_0_15px_rgba(220,38,38,0.15)]" : "border-white/5"}`}>
                        <div className="absolute top-2 left-2 z-15 bg-black/60 px-1.5 py-0.5 rounded font-mono text-[8px] text-slate-200 flex items-center space-x-1">
                          <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
                          <span>ZURICH_CCTV_02 // main_entry</span>
                        </div>
                        <div className="absolute top-2 right-2 font-mono text-[8px] text-slate-400 bg-black/40 px-1 py-0.5 rounded">{cctvTime}</div>
                        
                        {/* Simple grid lines representing camera scanner */}
                        <div className="absolute inset-0 bg-cyber-grid opacity-10" />
                        
                        <div className="absolute h-8 w-8 rounded-full border border-red-500/20 flex items-center justify-center text-[7px] text-red-400 font-bold animate-pulse-slow">
                          SECURE
                        </div>

                        <span className="font-mono text-[10px] text-slate-500">Abuja Liaison - Main Entry Feed</span>
                      </div>
                    </div>

                    <div className="flex border-t border-white/5 pt-4 items-center justify-between text-xs">
                      <span className="font-mono text-slate-500 uppercase text-[8px] font-bold tracking-widest">Camera feeds synchronization: LIVE v04</span>
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => setActiveCam("cam1")} 
                          className={`px-3 py-1.5 cursor-pointer text-[10px] font-mono rounded-full border transition-all ${activeCam === "cam1" ? "border-red-500 bg-red-950/45 text-red-400 font-bold" : "border-white/5 text-slate-400 hover:text-slate-200 bg-white/5"}`}
                        >
                          Focus Server Room
                        </button>
                        <button 
                          onClick={() => setActiveCam("cam2")} 
                          className={`px-3 py-1.5 cursor-pointer text-[10px] font-mono rounded-full border transition-all ${activeCam === "cam2" ? "border-red-500 bg-red-950/45 text-red-400 font-bold" : "border-white/5 text-slate-400 hover:text-slate-200 bg-white/5"}`}
                        >
                          Focus Main Gate
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. WEB PORTALS ROLE PREVIEW */}
                {selectedService === "web-portal" && (
                  <div className="space-y-4" id="sim-web-portal">
                    {/* Compact Interactive Role Controls */}
                    <div className="flex justify-between border-b border-white/5 pb-3">
                      {(["admin", "accountant", "student"] as const).map((role) => (
                        <button
                          key={role}
                          onClick={() => setActivePortalRole(role)}
                          className={`font-display text-[10px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full border transition-all cursor-pointer ${
                            activePortalRole === role 
                              ? "border-white/20 bg-white/10 text-white" 
                              : "border-transparent text-slate-400 hover:text-white"
                          }`}
                        >
                          {role === "admin" && "School Admin Portal"}
                          {role === "accountant" && "Financial Treasury"}
                          {role === "student" && "Student Hub / E-Docs"}
                        </button>
                      ))}
                    </div>

                    {/* Mock Portal Canvas Panel */}
                    <div className="rounded-2xl bg-[#020408] border border-white/5 p-4 min-h-44 text-slate-200">
                      
                      {/* SCHOOL ADMIN PANEL */}
                      {activePortalRole === "admin" && (
                        <div className="space-y-3 font-mono text-xs">
                          <div className="flex items-center justify-between border-b border-white/5 pb-2">
                            <span className="text-red-500 text-[9px] tracking-widest font-bold">ZURICH PORTAL V3.9 - ADMIN DESK</span>
                            <span className="text-[9px] text-slate-500 font-semibold">Total Enrollment: 2,450 Students</span>
                          </div>
                          
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            <div className="border border-white/5 bg-white/[0.01] rounded-xl p-2.5 text-center">
                              <span className="text-[8px] text-slate-500 block uppercase font-bold tracking-wider">PENDING RESULTS</span>
                              <span className="text-sm font-bold block text-white mt-1">12 Class Files</span>
                            </div>
                            <div className="border border-white/5 bg-white/[0.01] rounded-xl p-2.5 text-center">
                              <span className="text-[8px] text-slate-500 block uppercase font-bold tracking-wider">STAFF ROSTER</span>
                              <span className="text-sm font-bold block text-white mt-1">45 Vetted Users</span>
                            </div>
                            <div className="border border-white/5 bg-white/[0.01] rounded-xl p-2.5 text-center col-span-2 sm:col-span-1">
                              <span className="text-[8px] text-slate-500 block uppercase font-bold tracking-wider">SYSTEM STATUS</span>
                              <span className="text-xs font-bold block mt-1 text-emerald-400">SLA HEURISTICS G_OK</span>
                            </div>
                          </div>

                          <div className="rounded-xl border border-dashed border-white/10 p-2 text-center text-[10px] text-slate-500">
                            + Drag & Drop Grade sheet compilation template csv to bulk process calculations.
                          </div>
                        </div>
                      )}

                      {/* TUITION SETTLEMENT GATEWAY */}
                      {activePortalRole === "accountant" && (
                        <div className="space-y-3 font-mono text-xs">
                          <div className="flex items-center justify-between border-b border-white/5 pb-2">
                            <span className="text-teal-400 text-[9px] tracking-widest font-bold">TUITION CLEARANCE REGISTER</span>
                            <span className="text-[9px] text-slate-500 font-semibold">Gateway Link: SECURE_API</span>
                          </div>

                          <div className="space-y-2">
                            {[
                              { label: "Invoice #10425 (Tuition Payment - Aliyu M.)", val: "PAID IN FULL", status: "CLEARED PAYSTACK", color: "text-emerald-400" },
                              { label: "Invoice #10426 (Registration - Adebayo O.)", val: "AWAITING RELAY", status: "PENDING BANK_ACC", color: "text-amber-500" },
                              { label: "Invoice #10427 (Library Dues - Chinedu K.)", val: "PAID IN FULL", status: "CLEARED MONNIFY", color: "text-emerald-400" }
                            ].map((invoice, idx) => (
                              <div key={idx} className="flex justify-between border-b border-white/5 pb-1 text-[10px]">
                                <span className="text-slate-400">{invoice.label}</span>
                                <div className="text-right">
                                  <span className="font-bold text-white block">{invoice.val}</span>
                                  <span className={`text-[8px] font-bold block ${invoice.color}`}>{invoice.status}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* STUDENT HUB PANEL */}
                      {activePortalRole === "student" && (
                        <div className="space-y-3 font-mono text-xs">
                          <div className="flex items-center justify-between border-b border-white/5 pb-2">
                            <span className="text-red-400 text-[9px] tracking-widest font-bold">STUDENT SECTOR // CLASS 11-A (A. Mohammed)</span>
                            <span className="text-[9px] text-slate-500 font-semibold">Term: Third Term 2026</span>
                          </div>

                          <div className="space-y-1.5 text-[10px]">
                            <div className="flex justify-between">
                              <span className="text-slate-400">C++ Software Engineering Architecture:</span>
                              <span className="text-emerald-400 font-bold">94% (Grade A) - PASSED</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-400">Cisco IP Subnets and Router Interfaces:</span>
                              <span className="text-emerald-400 font-bold">88% (Grade A) - PASSED</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-400">Business Ethics & IT Operations SLA:</span>
                              <span className="text-red-400 font-bold">78% (Grade B) - PASSED</span>
                            </div>
                          </div>

                          <button className="w-full mt-2.5 rounded-full bg-red-600/20 border border-red-500/30 text-white text-[10px] font-bold uppercase tracking-wider py-2 hover:bg-red-600/30 transition-all cursor-pointer">
                            Generate Official PDF Transcript Receipt
                          </button>
                        </div>
                      )}

                    </div>
                  </div>
                )}

                {/* 4. DEFAULT COMPILING LOGS */}
                {selectedService !== "gps-tracking" && selectedService !== "cctv-setup" && selectedService !== "web-portal" && (
                  <div className="space-y-4 font-mono text-xs" id="sim-default">
                    <div className="rounded-2xl bg-[#020408] border border-white/10 p-4 h-48 overflow-y-auto space-y-1 text-slate-400">
                      <div className="text-red-500 font-bold flex items-center space-x-1 uppercase tracking-wider">
                        <Settings2 className="h-3.5 w-3.5 animate-spin" />
                        <span>INTEGRATION COMPILER STACK // {currentService.id.toUpperCase()}</span>
                      </div>
                      <p className="text-[10px] text-slate-500">Executing diagnostic protocols...</p>
                      
                      <div className="text-[10px] space-y-0.5 mt-2">
                        <div>&gt; mounting framework modules in namespace</div>
                        <div className="text-emerald-400">&gt; SUCCESS: responsive layout bindings checked</div>
                        <div>&gt; compiling typescript structures: types.ts &amp; data.ts</div>
                        <div>&gt; security checklist audit: verified with local hashes</div>
                        <div className="text-red-400">&gt; listening secure socket relays on port: 3000</div>
                        <div className="text-slate-300 animate-pulse">&gt; waiting command block inputs... status: online</div>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>

            {/* Simulation Explainer Footer Area */}
            <div className="mt-6 border-t border-white/5 pt-5">
              <span className="font-display text-[10px] font-semibold text-slate-400 uppercase block tracking-widest">
                Tech Stack Specifications Include:
              </span>
              <div className="flex flex-wrap gap-2 mt-2 select-none">
                {currentService.techKeywords.map((tag, idx) => (
                  <span 
                    key={idx} 
                    className="rounded-full bg-white/5 px-3 py-1 font-mono text-[9px] text-red-450 border border-white/10 tracking-widest uppercase font-semibold"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
