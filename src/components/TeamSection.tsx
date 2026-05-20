import React from "react";
import { Users, Cpu, Server, ShieldCheck, Mail, Linkedin } from "lucide-react";

interface TeamMember {
  name: string;
  role: string;
  desc: string;
  portrait: string;
  specialty: string;
  certs: string[];
}

const TEAM: TeamMember[] = [
  {
    name: "Ahmad Musa",
    role: "Lead Software Architect",
    desc: "Spearheads the custom enterprise software division. Specializes in multi-tier server architectures, performance microservices, and database security layout designs.",
    portrait: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=350&h=350&q=80",
    specialty: "High-Volume Portal Engine",
    certs: ["AWS Solutions Architect Pro", "TOGAF certified"]
  },
  {
    name: "Khalid Mahmud",
    role: "Cloud DevOps & Infrastructure Lead",
    desc: "Engineers corporate cloud migration frameworks, automatic failover Kubernetes clusters, and continuous integration pipelines.",
    portrait: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=350&h=350&q=80",
    specialty: "Cluster & Redundancy DevOps",
    certs: ["Google Cloud Certified Professional DevOp", "Docker Certified"]
  },
  {
    name: "Emmanuel David",
    role: "Senior Security Analyst & IT Auditor",
    desc: "Oversees the cybersecurity threat monitoring desk. Experts in hardware wire cabling layouts, network penetration audits, and NITDA compliance audits.",
    portrait: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=350&h=350&q=80",
    specialty: "Network Intrusion & Firewalls",
    certs: ["CISSP Certification", "CEH (Certified Ethical Hacker)"]
  }
];

export default function TeamSection() {
  return (
    <section className="bg-[#020408] py-20 border-t border-white/5" id="team">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center space-x-1.5 rounded-full border border-red-500/20 bg-red-950/20 px-3 py-1 font-mono text-xs text-red-500">
            <Users className="h-3.5 w-3.5" />
            <span>Zurich Elite Experts</span>
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white font-display sm:text-4xl uppercase">
            Meet Our Tech Professionals
          </h2>
          <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed">
            A combined 40+ years of corporate strategy, enterprise development, cloud architecture, and cybersecurity auditing across West Africa.
          </p>
        </div>

        {/* Profiles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TEAM.map((member, idx) => (
            <div 
              key={idx} 
              className="group relative rounded-2xl border border-white/10 bg-slate-950/40 p-6 overflow-hidden transition-all duration-300 hover:border-red-500/20 hover:bg-[#020408]/90"
              id={`team-card-${idx}`}
            >
              {/* Soft Red Ambient Radial Glow */}
              <div className="absolute -top-10 -right-10 h-32 w-32 bg-red-500/5 blur-2xl group-hover:bg-red-500/10 transition-all rounded-full" />

              <div className="flex flex-col items-center text-center">
                {/* Image Portrait */}
                <div className="relative h-28 w-28 rounded-full border border-white/10 p-1 group-hover:border-red-500/30 transition-all mb-4 overflow-hidden">
                  <img 
                    src={member.portrait} 
                    alt={member.name} 
                    className="h-full w-full rounded-full object-cover filter brightness-95 group-hover:brightness-100 transition-all"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Info Text */}
                <span className="font-mono text-[9px] text-red-500 uppercase tracking-widest font-bold">
                  {member.role}
                </span>
                <h4 className="font-display font-extrabold text-lg text-white mt-1.5">
                  {member.name}
                </h4>
                
                <span className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full font-mono text-[9px] bg-red-950/30 text-red-400 border border-red-500/10 uppercase tracking-wider">
                  {member.specialty}
                </span>

                <p className="mt-4 text-xs text-slate-400 leading-relaxed font-sans max-w-sm">
                  {member.desc}
                </p>

                {/* Credentials / Certificates */}
                <div className="mt-6 pt-5 border-t border-white/5 w-full flex flex-col items-center">
                  <span className="font-mono text-[8px] text-slate-500 block uppercase tracking-wider mb-2">
                    Verified Credentials:
                  </span>
                  <div className="flex flex-wrap gap-1.5 justify-center">
                    {member.certs.map((cert, cIdx) => (
                      <span 
                        key={cIdx} 
                        className="rounded bg-white/5 border border-white/5 px-2 py-0.5 font-mono text-[8px] text-slate-300"
                      >
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Social Actions */}
                <div className="mt-6 flex space-x-3 text-slate-500 group-hover:text-slate-400 transition-colors">
                  <button className="h-8 w-8 rounded-lg border border-white/5 flex items-center justify-center hover:text-white hover:border-white/10 transition-all bg-[#020408]/60 cursor-pointer">
                    <Linkedin className="h-3.5 w-3.5" />
                  </button>
                  <button className="h-8 w-8 rounded-lg border border-white/5 flex items-center justify-center hover:text-white hover:border-white/10 transition-all bg-[#020408]/60 cursor-pointer">
                    <Mail className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
