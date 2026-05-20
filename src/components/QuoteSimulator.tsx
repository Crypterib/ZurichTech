import React, { useState, useEffect } from "react";
import { TechBlueprintCalculated, ServiceId } from "../types";
import { SERVICES } from "../data";
import { Calculator, Check, ShieldAlert, FileText, Layers, Users, Clock, Shield } from "lucide-react";

export default function QuoteSimulator() {
  const [selectedServices, setSelectedServices] = useState<ServiceId[]>(["corporate-web", "web-hosting"]);
  const [projectScale, setProjectScale] = useState<"small" | "medium" | "enterprise">("medium");
  const [timeline, setTimeline] = useState<"relaxed" | "standard" | "urgent">("standard");
  const [projectDetails, setProjectDetails] = useState<string>("");
  const [blueprintResult, setBlueprintResult] = useState<TechBlueprintCalculated | null>(null);
  const [isCompiling, setIsCompiling] = useState<boolean>(false);

  // Auto compile blueprint calculations on state updates
  useEffect(() => {
    const fetchBlueprintCalculation = async () => {
      setIsCompiling(true);
      try {
        const response = await fetch("/api/quote-calculator", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            servicesSelected: selectedServices,
            projectScale: projectScale,
            timeline: timeline,
            details: projectDetails
          })
        });

        const data = await response.json();
        if (data.success || data.items) {
          setBlueprintResult(data);
        }
      } catch (err) {
        console.error("Blueprint calc error:", err);
      } finally {
        setIsCompiling(false);
      }
    };

    fetchBlueprintCalculation();
  }, [selectedServices, projectScale, timeline, projectDetails]);

  // Toggle selection
  const handleToggleService = (id: ServiceId) => {
    setSelectedServices(prev => {
      if (prev.includes(id)) {
        // Guarantee at least one selection
        if (prev.length === 1) return prev;
        return prev.filter(s => s !== id);
      }
      return [...prev, id];
    });
  };

  // Download Blueprint proposal (text-based corporate download)
  const handleDownloadProposal = () => {
    if (!blueprintResult) return;

    const scaleLabel = 
      projectScale === "small" ? "GROWTH/SME MULTI-ROLE RECONCILIATION" :
      projectScale === "medium" ? "ENTERPRISE CAPABLE MULTI-PORTAL WORKFLOW" : "CONGLOMERATE SECURE HIGH-CONCURRENCY ENVIRONMENT";

    const timelineLabel = 
      timeline === "relaxed" ? "RELAXED PROGRESSIVE STAGING (COHERENT AUDIT FOCUS)" :
      timeline === "standard" ? "STANDARD CONCURRENT INTEGRATION PATH" : "IMMEDIATE EXPRESS DEPLOYMENT (CONCURRENT DEVOPS)";

    const timestamp = new Date().toLocaleDateString("en-NG", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });

    const body = `====================================================================
                        ZURICH TECHNOLOGIES LIMITED
              Innovative IT and Physical Security Solutions
               Lagos: 45, Allen Avenue, Ikeja LGA, Lagos State
              Abuja: Plot 12, Garki Area Hub, Garki II, FCT, Abuja
                    Email: corporate@zurichtechnologies.com.ng
====================================================================
               TECHNICAL INTEGRATION SYSTEM BLUEPRINT & SLA SPEC
                   Draft Created: ${timestamp}
====================================================================

[PROJECT INGRESS & COMPILING CONTROL]
- Target Infrastructure Scale: ${scaleLabel}
- Deployment Timeline Mode:   ${timelineLabel}

[SELECTED MODULES & MICRO-NODE ALLOCATIONS]
${blueprintResult.items.map((it, idx) => `${idx + 1}. [${it.name}]
   - Allocated Active Communication Nodes: ${it.allocatedNodes} Nodes
   - Module Integration Phase Duration:   ${it.timelineWeeks} Weeks`).join("\n\n")}

====================================================================
[PRE-COMPUTED RESOURCE LAYOUT RECONCILIATION]
- Assigned System Engineers:     ${blueprintResult.blueprintSpecs.engineersAllocated} Dedicated Engineers
- Integration Support Grade:     ${blueprintResult.blueprintSpecs.slaCategory}
- Periodic Optimization Audits:  ${blueprintResult.blueprintSpecs.reviewCycle}
- Deployment Timeline Duration:  ${blueprintResult.blueprintSpecs.deploymentTimeline}
- Telemetry Scan Frequency:      ${blueprintResult.blueprintSpecs.auditFrequency}
- SLA Direct Access Window:      ${blueprintResult.blueprintSpecs.supportHours}
====================================================================

[ZURICH STANDARD SERVICE LEVEL AGREEMENT (SLA) STANDARDS]
1. Discovery Architecture: Delivery of interface mockups and server architecture layout maps within 5 working days.
2. Penetration Auditing: All databases and network firewalls are audited for malware vector streams and SQL injection paths.
3. Rapid SLA Assistance: Zurich SLA guarantees technical response on-site or virtual support within 45 minutes of incident logger telemetry warnings.
4. Maintenance Protection: Post-launch warranty includes automated security patching, continuous network telemetry monitoring, and system backup management by Zurich engineers.

Draft Reference ID: ZURICH-IT-SYS-${Date.now().toString().slice(-6)}

Thank you for selecting Zurich Technologies.
We look forward to delivering your enterprise-grade integrations.
=== END OF SYSTEM BLUEPRINT PLAN ===
`;

    const blob = new Blob([body], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `Zurich_Tech_System_Blueprint_${Date.now().toString().slice(-6)}.txt`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="bg-slate-950 py-20 border-t border-slate-900" id="quote">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Module Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center space-x-1.5 rounded-full border border-red-500/20 bg-red-950/20 px-3 py-1 font-mono text-xs text-red-400">
            <Calculator className="h-3.5 w-3.5 animate-pulse-slow" />
            <span>Interactive Systems Blueprint & SLA Planner</span>
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white font-display sm:text-4xl uppercase">
            Systems Architecture Planner
          </h2>
          <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed">
            Configure your enterprise integration nodes, select deployment schedules, and resource scales. Instantly generate a highly descriptive technical blueprint and SLA package ready for implementation.
          </p>
        </div>

        {/* Layout split: Controls left, Quote Receipt display right */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-start" id="quote-simulator-content">
          
          {/* Controls Left */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* 1. Services selection checks */}
            <div>
              <span className="font-mono text-xs font-bold text-slate-400 block uppercase tracking-wider mb-4">
                Step 1: Select Your Integration Modules
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {SERVICES.map((serv) => {
                  const isChecked = selectedServices.includes(serv.id);
                  return (
                    <button
                      key={serv.id}
                      onClick={() => handleToggleService(serv.id)}
                      id={`calc-service-check-${serv.id}`}
                      className={`flex items-start text-left rounded-xl border p-4.5 transition-all duration-200 cursor-pointer ${
                        isChecked 
                          ? "border-red-500/30 bg-red-950/5 text-slate-100" 
                          : "border-slate-900 bg-[#020408]/40 text-slate-400 hover:border-slate-800"
                      }`}
                    >
                      <div className={`mt-0.5 mr-3 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded border transition-all ${
                        isChecked ? "border-red-500 bg-red-600 text-white animate-pulse" : "border-slate-800 bg-[#020408]"
                      }`}>
                        {isChecked && <Check className="h-3.5 w-3.5 stroke-[3.5]" />}
                      </div>
                      <div>
                        <span className="font-display font-medium text-xs sm:text-sm block text-white group-hover:text-red-400">
                          {serv.title}
                        </span>
                        <span className="text-[10px] text-slate-400 block mt-1 font-mono uppercase tracking-wider">
                          Node Allocation: {serv.nodeAllocation} Network Node{serv.nodeAllocation > 1 ? 's' : ''}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Project scale selector */}
            <div>
              <span className="font-mono text-xs font-bold text-slate-400 block uppercase tracking-wider mb-3">
                Step 2: Operations Scale & Capacity
              </span>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: "small", label: "Growth / SME Cluster", multiplier: "x0.75 Nodes Scale" },
                  { id: "medium", label: "Enterprise Ready Core", multiplier: "1.00 Base Nodes Standard" },
                  { id: "enterprise", label: "Conglomerate Grid", multiplier: "x2.50 High Capacity Nodes" }
                ].map((scale) => (
                  <button
                    key={scale.id}
                    onClick={() => setProjectScale(scale.id as any)}
                    id={`calc-scale-${scale.id}`}
                    className={`rounded-lg border p-4 text-center transition-all cursor-pointer ${
                      projectScale === scale.id 
                        ? "border-red-500/20 bg-red-950/20 text-red-000 font-bold text-red-400 border-red-500/40 glow-red" 
                        : "border-slate-900 bg-slate-950 text-slate-500 hover:text-slate-400 hover:border-slate-800"
                    }`}
                  >
                    <span className="font-display text-xs block truncate">{scale.label}</span>
                    <span className="font-mono text-[9px] block mt-1 text-slate-500 font-medium">
                      {scale.multiplier}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Timeline urgent selection */}
            <div>
              <span className="font-mono text-xs font-bold text-slate-400 block uppercase tracking-wider mb-2">
                Step 3: Integration Schedule & Urgent priority
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: "relaxed", label: "Relaxed schedule", effect: "Staged deployment cycles" },
                  { id: "standard", label: "Standard schedule", effect: "Regular sprint velocity" },
                  { id: "urgent", label: "Express Priority", effect: "Accelerated Devops / High Priority" }
                ].map((sched) => (
                  <button
                    key={sched.id}
                    onClick={() => setTimeline(sched.id as any)}
                    id={`calc-timeline-${sched.id}`}
                    className={`rounded-lg border p-3.5 text-center transition-all cursor-pointer ${
                      timeline === sched.id 
                        ? "border-red-500/20 bg-red-950/20 text-red-400 font-bold border-red-500/40" 
                        : "border-slate-900 bg-slate-950 text-slate-500 hover:text-slate-400"
                    }`}
                  >
                    <span className="font-display text-xs block">{sched.label}</span>
                    <span className="font-mono text-[8px] block mt-1 text-slate-500 uppercase font-semibold">
                      {sched.effect}
                    </span>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Technical Blueprint Right Column Panel */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl border border-slate-950 bg-[#020408]/60 p-6 md:p-8 backdrop-blur-md overflow-hidden" id="receipt-display-panel">
              <div className="absolute top-0 right-0 h-40 w-40 bg-red-500/5 blur-3xl rounded-full" />

              <div className="flex items-center space-x-2 text-slate-400 mb-6 border-b border-white/5 pb-5">
                <span className="font-mono text-[10px] tracking-widest uppercase font-bold text-slate-300">
                  SYSTEM BLUEPRINT SPECIFICATION SHEET
                </span>
              </div>

              {isCompiling ? (
                <div className="min-h-80 flex flex-col items-center justify-center space-y-4" id="quota-loader">
                  <div className="h-8 w-8 rounded-full border-2 border-slate-800 border-t-red-600 animate-spin" />
                  <span className="font-mono text-[10px] text-red-400 uppercase tracking-widest animate-pulse">Compiling Architecture...</span>
                </div>
              ) : blueprintResult ? (
                <div className="space-y-6">
                  {/* Selected items receipt timeline */}
                  <div className="space-y-3.5 max-h-44 overflow-y-auto pr-1">
                    {blueprintResult.items.map((it, idx) => (
                      <div key={idx} className="flex justify-between text-xs border-b border-white/5 pb-2">
                        <div className="max-w-[70%]">
                          <span className="font-display font-medium text-slate-200 block truncate">
                            {it.name}
                          </span>
                          <span className="font-mono text-[9px] text-slate-500 uppercase font-semibold">
                            Integration Target Duration
                          </span>
                        </div>
                        <div className="text-right flex flex-col justify-end">
                          <span className="font-mono font-bold text-red-500 block">
                            {it.allocatedNodes} Nodes
                          </span>
                          <span className="font-mono text-[9px] text-slate-400 block">
                            {it.timelineWeeks} Weeks
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Blueprint Specifications Grid */}
                  <div className="rounded-xl bg-slate-950 border border-slate-900 p-4 space-y-3 font-mono text-xs">
                    <div className="flex justify-between items-center pb-2 border-b border-white/5 text-[9px] tracking-wider text-slate-500 uppercase font-bold">
                      <span>Operational Category</span>
                      <span>Target Provisioning</span>
                    </div>

                    <div className="flex justify-between items-center text-[11px]">
                      <span className="text-slate-500 flex items-center gap-1">
                        <Users className="h-3 w-3 text-red-500/70" /> Staffing:
                      </span>
                      <span className="text-slate-200 font-bold">
                        {blueprintResult.blueprintSpecs.engineersAllocated} Dedicated Engineers
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-[11px]">
                      <span className="text-slate-500 flex items-center gap-1">
                        <Shield className="h-3 w-3 text-red-500/70" /> Support Tier:
                      </span>
                      <span className="text-slate-200 font-bold text-right text-xs truncate max-w-[170px]" title={blueprintResult.blueprintSpecs.slaCategory}>
                        {blueprintResult.blueprintSpecs.slaCategory}
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-[11px]">
                      <span className="text-slate-500 flex items-center gap-1">
                        <Clock className="h-3 w-3 text-red-500/70" /> Service SLO:
                      </span>
                      <span className="text-slate-200 font-bold">
                        {blueprintResult.blueprintSpecs.supportHours}
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-[11px]">
                      <span className="text-slate-500 flex items-center gap-1">
                        <Layers className="h-3 w-3 text-red-500/70" /> Audit Scope:
                      </span>
                      <span className="text-slate-200 font-bold text-right truncate max-w-[170px]">
                        {blueprintResult.blueprintSpecs.reviewCycle}
                      </span>
                    </div>

                    <div className="border-t border-slate-900 pt-3 flex justify-between items-baseline">
                      <span className="text-slate-400 font-bold uppercase tracking-wide text-[10px]">Development Timeline:</span>
                      <span className="font-display text-lg font-extrabold text-red-500">
                        {blueprintResult.blueprintSpecs.deploymentTimeline}
                      </span>
                    </div>
                  </div>

                  {/* Trust warning and SLA info */}
                  <div className="rounded-lg bg-red-950/20 border border-red-500/10 p-4 flex items-start space-x-3 text-xs text-red-400">
                    <ShieldAlert className="h-5 w-5 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-display font-bold block">Enterprise Delivery Standards Guaranteed</span>
                      <p className="text-[10px] leading-relaxed text-red-500/90 mt-1">
                        Our SLA includes continuous post-launch security auditing, system architecture topology drawings, daily cloud state backups, and critical emergency patch guarantees according to modern Nigerian NITDA frameworks. No pricing is included in this blueprint; all commercial engagements are drafted in tailored Letters of Engagement.
                      </p>
                    </div>
                  </div>

                  {/* Action elements */}
                  <div className="space-y-3 pt-2">
                    <button
                      onClick={handleDownloadProposal}
                      id="download-proposal-btn"
                      className="w-full flex items-center justify-center space-x-2 rounded-lg bg-red-600 hover:bg-red-500 text-white py-3 text-xs font-mono font-bold uppercase tracking-widest transition-all duration-300 shadow-md shadow-red-950/50 glow-red cursor-pointer"
                    >
                      <FileText className="h-4 w-4" />
                      <span>Download Blueprint SLA Spec Sheet</span>
                    </button>
                    <p className="text-[9px] text-center text-slate-500 font-mono tracking-wider">
                      BLUEPRINT CODE: ZURICH-SYS-BLUEPRINT-{Date.now().toString().slice(-4)}
                    </p>
                  </div>
                </div>
              ) : null}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
