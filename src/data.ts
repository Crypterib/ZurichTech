import { ServiceItem } from "./types";

export const SERVICES: ServiceItem[] = [
  {
    id: "software-dev",
    title: "Custom Enterprise Software & Mobile Apps",
    description: "Tailored business automation, cross-platform Android/iOS applications, and high-volume desktop software designed to scale corporate output.",
    longDescription: "We engineer bespoke software architectures tailored specifically to solve unique client process bottlenecks. From automated accounting systems and cross-platform native-performance applications to custom API middleware, we ensure high processing speed and security.",
    nodeAllocation: 8,
    iconName: "Cpu",
    techKeywords: ["React Native", "Node.js", "Docker", "REST/GraphQL APIs", "CI/CD Pipeline", "PostgreSQL"]
  },
  {
    id: "web-portal",
    title: "School, Hospital & E-Commerce Portals",
    description: "Robust database portals linking multi-tier users. Features include result sheets, student/patient records, inventories, and secure online payments.",
    longDescription: "Our specialized portal structures provide secure, role-based controls for educational institutes, medical networks, and large e-retailers. Built with real-time transactional safety, custom ledger engines, dynamic document generation, and direct payment integrations.",
    nodeAllocation: 4,
    iconName: "LayoutDashboard",
    techKeywords: ["React Super-Grid", "Express v5", "REST APIs", "SQL Ledger", "PDF Generator", "Multi-role Access"]
  },
  {
    id: "corporate-web",
    title: "Stunning Ultra-Modern Web Redesign",
    description: "Convert online visitors into loyal customers. Ultra-responsive, fluid, SEO-optimized web engines highlighting brand prestige with exquisite layouts.",
    longDescription: "The focal point of your public-facing brand. We design high-conversion corporate interfaces using modern visual hierarchies, balanced margins, SVG interactivity, fast image-loading structures, and tailored SEO schema tags to boost Google rankings.",
    nodeAllocation: 2,
    iconName: "Flame",
    techKeywords: ["Tailwind Engine", "Framer Motion", "Google Search Rich Snippets", "Web Vitals Grade A", "Responsive Fluidity"]
  },
  {
    id: "cctv-setup",
    title: "Smart HD CCTV Security & Access Control",
    description: "Comprehensive analog/IP camera installations, biometric entryways, smart intercoms, and unified remote tracking hubs for physical asset integrity.",
    longDescription: "Uncompromising physical security integration. We source, configure, and install smart security lines equipped with facial recognition, motion triggers, infra-red night range, power backup systems, and low-latency digital video recording (DVR/NVR) linked to your mobile dashboard.",
    nodeAllocation: 5,
    iconName: "ShieldAlert",
    techKeywords: ["Hikvision/Dahua Integration", "Wired/Wireless IP Cam", "Access Controls & RFID", "Automatic Alerts", "Network Storage Config"]
  },
  {
    id: "networking-it",
    title: "Enterprise Cybersecurity & Network Setup",
    description: "Robust local-area (LAN) cabling, wide-area configurations (WAN), automated servers, and secure hardware cyber firewalls to shield corporate data.",
    longDescription: "Keep your teams interconnected and absolute private data protected. We perform physical CAT6A/fiber layout setups, mount Cisco networking hubs, optimize routers, isolate subnets via VLANs, and configure strict security firewalls with end-point defense.",
    nodeAllocation: 6,
    iconName: "Network",
    techKeywords: ["Cisco IOS", "Symmetric Firewalls", "Fiber Optic Terminals", "VPN Server Setup", "Threat Analysis Reports"]
  },
  {
    id: "gps-tracking",
    title: "GPS Vehicle Tracking & Fleet Management",
    description: "Maintain total oversight of your logistic trucks or private cars. Real-time geo-mapping, speeds, fuel indicators, and instant engine shut-down.",
    longDescription: "Our fleet security suite represents best-in-class vehicle control. Track live location metrics, configure geo-fence perimeters with automated push warnings, generate route playback maps, record speed logs, and safely halt unauthorized operations remotely.",
    nodeAllocation: 3,
    iconName: "Navigation",
    techKeywords: ["GLONASS Global Satellites", "Relay Engine Kill", "Real-time Positioning Map", "Speed Violations Logger", "Fuel Tracking"]
  },
  {
    id: "web-hosting",
    title: "Premium Hosting & Professional Emails",
    description: "Highly redundant 99.99% uptime servers hosting your corporate portals, managing domain registries, and operating secure webmail lines.",
    longDescription: "The baseline of business-class execution. We provide high-throughput managed SSD hosting, handle .com, .com.ng, and .ng registries, set up domain SPF/DKIM/DMARC protocols to guarantee corporate emails deliver directly to inboxes rather than spam folders.",
    nodeAllocation: 1,
    iconName: "Globe",
    techKeywords: ["Managed Linux Cluster", "Corporate Domain (.com.ng / .ng)", "SPF, DKIM, DMARC Guards", "Auto-SSL", "Unmetered Bandwidth"]
  }
];

export const VALUES = [
  {
    id: "val-1",
    title: "Absolute Technical Excellence",
    desc: "We do not believe in standard patterns. We write clean, high-performance, vetted code and install certified corporate network hardware."
  },
  {
    id: "val-2",
    title: "Local Integrity, Global Standards",
    desc: "As a registered Nigerian systems integration firm, we strictly follow NITDA regulations while delivering world-class agile engineering."
  },
  {
    id: "val-3",
    title: "24/7 SLA Responsiveness",
    desc: "We stand firmly behind our installations. Our Service Level Agreements guarantee rapid technical remediation within hours."
  }
];

export const ROADMAP = [
  {
    step: "01",
    title: "Discovery & Blueprinting",
    desc: "We gather clear process specifications, analyze existing IT layouts, and sketch system designs and mockups to ensure perfect synergy."
  },
  {
    step: "02",
    title: "Agile Engineering & Auditing",
    desc: "Our engineers build using modular methodologies, while cybersecurity leads conduct rigorous penetration and stress tests."
  },
  {
    step: "03",
    title: "Deployment & Rigorous Testing",
    desc: "Systems are safely run, physical trackers or network nodes are mounted, and we provide thorough training handovers to leadership."
  },
  {
    step: "04",
    title: "Managed SLA Monitoring",
    desc: "Constant automatic status check audits, security patches, system backups, and live 24/7 tech assistance lines to maintain 100% operation status."
  }
];

export const FAQS = [
  {
    q: "Are the technical blueprint allocations final?",
    a: "They represent highly accurate structural guidelines. Once you configure and download your plan, our systems architect schedules a brief technical session to refine exact physical nodes and draft a formal proposal and SLA."
  },
  {
    q: "Do you supply the physical network cabled equipment and CCTV tracking hardware?",
    a: "Absolutely. We specify, source, and deliver best-in-class OEM certified components (Cisco, Hikvision, Dahua, GLONASS relays) directly. Each hardware installment includes our direct product malfunction replacement warranty."
  },
  {
    q: "How does the GPS remote shut-down command operate exactly?",
    a: "It sends an encoded digital token over the secure mobile network directly to our installed vehicle relay. The relay safely cuts the fuel pump flow only when the car's velocity drops under 20km/h, ensuring no physical accident is triggered."
  },
  {
    q: "Does our database portal link with commercial payment APIs in Nigeria?",
    a: "Yes. We directly integrate with all leading registered CBN licensed payment solutions like Paystack, Flutterwave, and Monnify to support real-time debit card, bank transfer, and USSD payments."
  }
];

export const TESTIMONIALS = [
  {
    name: "Dr. Aliyu Mohammed",
    role: "Director of Administration, Apex Academic Group",
    quote: "Zurich Technologies replaced our manual result ledger with a secure student results portal. Teachers upload scores easily, and parents can monitor progress. They won our respect with their meticulous support.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80"
  },
  {
    name: "Mrs. Funmi Adebayo",
    role: "Managing Director, SecureTransit Logistics Ltd.",
    quote: "With over 45 supply trucks navigating Nigerian federal expressways daily, hijacking and fuel siphoning were continuous nightmares. Zurich's GPS trackers, live fuel sensors, and emergency speed limits saved us millions.",
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&h=120&q=80"
  },
  {
    name: "Engr. Chinedu Okafor",
    role: "Chief Technology Officer, VeloBank Nigeria PLC",
    quote: "Our Lekki headquarters needed high-integrity LAN rewiring and a modern fail-safe WAN system. Zurich Technologies delivered beautiful server racks, neat fiber cording, and robust firewalls that run flawlessly.",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80"
  }
];
