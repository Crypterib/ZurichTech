import React from "react";
import { Mail, Phone, MapPin, ArrowUp, Github, ExternalLink } from "lucide-react";

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-slate-900 bg-slate-950 font-sans" id="footer-section">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 lg:gap-12">
          
          {/* Brand Brief Column */}
          <div className="md:col-span-5 space-y-5">
            <div className="flex cursor-pointer flex-col group select-none" onClick={handleScrollTop}>
              <div className="flex items-baseline leading-none">
                {/* zurich in bold lowercase styled sans */}
                <span className="font-mono text-xl font-extrabold tracking-tighter text-white lowercase">
                  zur
                  {/* Custom style for 'i' to replace standard round dot with red square dot */}
                  <span className="relative inline-block">
                    <span className="text-transparent">i</span>
                    <span className="absolute inset-0 text-white">i</span>
                    {/* The red square dot overlay precisely over the standard dot of 'i' */}
                    <span className="absolute bg-red-600 w-[4px] h-[4px] top-[1.5px] left-[2.5px]" />
                  </span>
                  ch
                </span>
                {/* tech in smaller lowercase styled sans in red */}
                <span className="font-mono text-lg font-black text-red-600 lowercase relative ml-[1px] leading-none">
                  tech
                  <span className="absolute -top-[2px] -right-[5px] text-[6px] font-bold text-red-600">®</span>
                </span>
              </div>
              {/* Red underline starting under zurich to the end of tech */}
              <div className="h-[2px] bg-red-600 w-24 mt-[1.5px]" />
            </div>
            
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              We engineer mission-critical corporate web portals, customized enterprise software architectures, robust physical security systems, and GLONASS trackers to link and safeguard organizations across Nigeria.
            </p>

            <div className="flex items-center space-x-2.5 text-xs text-slate-500 font-mono">
              <span className="h-2 w-2 rounded-full bg-emerald-500 inline-block" />
              <span>NITDA REGISTERED &bull; RC SC7049-5</span>
            </div>
          </div>

          {/* Quick links sitemaps */}
          <div className="md:col-span-3 space-y-4">
            <span className="font-display font-semibold text-xs text-white uppercase tracking-wider block">
              Core Sitemaps
            </span>
            <ul className="space-y-2.5 text-xs">
              {[
                { id: "services", label: "Core Services" },
                { id: "consultant", label: "AI Architect Console" },
                { id: "quote", label: "SLA Blueprint Configurator" },
                { id: "about", label: "Our SLA Advantage" }
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => onNavigate(link.id)}
                    className="text-slate-400 hover:text-red-500 transition-colors py-0.5 block cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Coordinates Column */}
          <div className="md:col-span-4 space-y-4">
            <span className="font-display font-semibold text-xs text-white uppercase tracking-wider block">
              Corporate Coordinates
            </span>
            <ul className="space-y-3 font-mono text-xs text-slate-400">
              <li className="flex items-start">
                <MapPin className="h-4.5 w-4.5 text-red-500 shrink-0 mr-2.5 mt-0.5" />
                <div>
                  <span className="text-slate-300 font-bold block">Lagos Corporate HQ:</span>
                  <span className="text-[11px]">45, Allen Avenue, Ikeja, Lagos State, Nigeria</span>
                </div>
              </li>
              <li className="flex items-start">
                <MapPin className="h-4.5 w-4.5 text-red-500 shrink-0 mr-2.5 mt-0.5" />
                <div>
                  <span className="text-slate-300 font-bold block">Abuja Liaison office:</span>
                  <span className="text-[11px]">Plot 12, Garki II Financial Hub, FCT, Abuja, Nigeria</span>
                </div>
              </li>
              <li className="flex items-center">
                <Phone className="h-4 w-4 text-red-500 shrink-0 mr-2.5" />
                <span className="text-[11px]">+234 (0) 803 123 4567 // +234 812 345 6789</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-4 w-4 text-red-500 shrink-0 mr-2.5" />
                <span className="text-[11px]">corporate@zurichtechnologies.com.ng</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Dynamic legal line updates */}
        <div className="mt-12 border-t border-slate-900 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[10px] text-slate-500">
          <p className="text-center sm:text-left">
            &copy; {new Date().getFullYear()} Zurich Technologies Limited. All Rights Reserved. Vetted corporate systems integration.
          </p>
          <div className="flex space-x-6">
            <button onClick={handleScrollTop} className="flex items-center space-x-1.5 hover:text-red-500 transition-colors cursor-pointer">
              <span>Return to Top</span>
              <ArrowUp className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
