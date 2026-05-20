import React, { useState, useEffect, useRef } from "react";
import { 
  ArrowRight, 
  ArrowUp, 
  CheckCircle, 
  ChevronRight, 
  Plus, 
  Menu, 
  X, 
  Play, 
  MessageCircle, 
  Bot, 
  Send, 
  Star, 
  Lightbulb, 
  Users, 
  Cpu, 
  Headphones, 
  Code2, 
  Cloud, 
  Smartphone, 
  ShieldCheck, 
  BrainCircuit, 
  Compass, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram,
  Info
} from "lucide-react";

// Types
interface ChatMessage {
  id: string;
  text: string;
  sender: "user" | "bot";
}

interface ToastMessage {
  id: string;
  text: string;
  type: "success" | "error" | "info";
}

export default function App() {
  // --- STATES ---
  const [loading, setLoading] = useState<boolean>(true);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [navScrolled, setNavScrolled] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Counters
  const [yearsCount, setYearsCount] = useState<number>(0);
  const [projectsCount, setProjectsCount] = useState<number>(0);
  const [clientsCount, setClientsCount] = useState<number>(0);
  const [expertsCount, setExpertsCount] = useState<number>(0);
  const statsRef = useRef<HTMLDivElement>(null);

  // Sliding Portfolio
  const [portfolioIndex, setPortfolioIndex] = useState<number>(0);
  const portfolioContainerRef = useRef<HTMLDivElement>(null);

  // Chatbot
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "initial-welcome",
      text: "👋 Hi! I'm the ZurichTech AI Assistant. How can I help you today?",
      sender: "bot"
    }
  ]);
  const [chatInput, setChatInput] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [chatNotif, setChatNotif] = useState<number>(1);
  const chatMessagesEndRef = useRef<HTMLDivElement>(null);

  // Toast Stack
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Cookie Banner
  const [cookiePreference, setCookiePreference] = useState<string | null>(null);

  // Contact Form
  const [contactName, setContactName] = useState<string>("");
  const [contactEmail, setContactEmail] = useState<string>("");
  const [contactInquiry, setContactInquiry] = useState<string>("");
  const [contactMessage, setContactMessage] = useState<string>("");

  // Newsletter Form
  const [newsletterEmail, setNewsletterEmail] = useState<string>("");

  // --- TOAST TRIGGER ---
  const triggerToast = (text: string, type: "success" | "error" | "info" = "success") => {
    const newToast: ToastMessage = {
      id: `toast-${Date.now()}`,
      text: text,
      type: type
    };
    setToasts((prev) => [...prev, newToast]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
    }, 3500);
  };

  // --- PRELOADER & COOKIES ---
  useEffect(() => {
    // Dismiss preloader safely after 1s
    const preloaderTimeout = setTimeout(() => {
      setLoading(false);
    }, 1000);

    // Initial cookie preference check
    const savedCookie = localStorage.getItem("zurichtech_cookies");
    if (savedCookie) {
      setCookiePreference(savedCookie);
    }

    // Auto-open chat after 8s if never opened
    const chatAutoOpen = setTimeout(() => {
      const openedBefore = sessionStorage.getItem("zurichtech_chat_opened");
      if (!openedBefore) {
        sessionStorage.setItem("zurichtech_chat_opened", "yes");
        setIsChatOpen(true);
        setChatNotif(0);
      }
    }, 8000);

    return () => {
      clearTimeout(preloaderTimeout);
      clearTimeout(chatAutoOpen);
    };
  }, []);

  // --- WINDOW SCROLL LISTENERS ---
  useEffect(() => {
    const handleScroll = () => {
      // Navbar scroll effect
      if (window.scrollY > 60) {
        setNavScrolled(true);
      } else {
        setNavScrolled(false);
      }

      // Back to top behavior
      if (window.scrollY > 500) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }

      // Active nav link highlight
      const sections = ["hero", "about", "services", "portfolio", "team", "faq", "blog", "contact"];
      let currentSec = "hero";
      for (const secId of sections) {
        const element = document.getElementById(secId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 140 && rect.bottom >= 140) {
            currentSec = secId;
          }
        }
      }
      setActiveSection(currentSec);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --- STATS COUNT-UP ANIMATION ---
  useEffect(() => {
    let triggered = false;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !triggered) {
            triggered = true;
            
            // Count configurations
            const counts = [
              { target: 15, set: setYearsCount },
              { target: 250, set: setProjectsCount },
              { target: 120, set: setClientsCount },
              { target: 30, set: setExpertsCount }
            ];

            counts.forEach(({ target, set }) => {
              let current = 0;
              const step = Math.ceil(target / 40);
              const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                  set(target);
                  clearInterval(timer);
                } else {
                  set(current);
                }
              }, 40);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, [loading]);

  // --- NAVIGATION SMOOTH SCROLL ---
  const handleScrollTo = (id: string) => {
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  // --- PORTFOLIO SLIDER ACTIONS ---
  const portfolioItems = [
    {
      title: "Smart Automation Platform",
      category: "AI & Automation",
      desc: "AI-powered workflow automation reducing manual tasks by 70%",
      img: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Enterprise Cloud Migration",
      category: "Cloud & DevOps",
      desc: "Multi-cloud architecture serving 2M+ users globally",
      img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "FinTech Dashboard",
      category: "Software Dev",
      desc: "Real-time financial analytics for banking sector",
      img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "SOC Command Center",
      category: "Cybersecurity",
      desc: "24/7 threat monitoring and incident response",
      img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80"
    }
  ];

  const getVisibleSlidesCount = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth >= 1024) return 3;
      if (window.innerWidth >= 768) return 2;
    }
    return 1;
  };

  const handlePortfolioPrev = () => {
    setPortfolioIndex((prev) => Math.max(0, prev - 1));
  };

  const handlePortfolioNext = () => {
    const maxIndex = portfolioItems.length - getVisibleSlidesCount();
    setPortfolioIndex((prev) => Math.min(maxIndex > 0 ? maxIndex : 0, prev + 1));
  };

  // --- COOKIE BANNER ACTION ---
  const handleCookieConsent = (pref: string) => {
    localStorage.setItem("zurichtech_cookies", pref);
    setCookiePreference(pref);
  };

  // --- FORM SUBMIT ACTIONS ---
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    triggerToast("Message sent successfully! We'll get back to you shortly.", "success");
    setContactName("");
    setContactEmail("");
    setContactInquiry("");
    setContactMessage("");
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    triggerToast("Subscribed successfully to our technology list!", "success");
    setNewsletterEmail("");
  };

  // --- BOT CHAT LOGIC WITH OPTIONAL GEMINI PROXY ---
  const scrollToChatBottom = () => {
    chatMessagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToChatBottom();
  }, [chatMessages, isTyping]);

  const handleSendChatMessage = async (userText: string) => {
    if (!userText.trim()) return;

    // Show user text
    const userMsgId = `msg-user-${Date.now()}`;
    setChatMessages((prev) => [...prev, { id: userMsgId, text: userText, sender: "user" }]);
    setIsTyping(true);

    try {
      // Fetch response from server-side Gemini consultant proxy route
      const response = await fetch("/api/consultant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: userText })
      });

      const data = await response.json();
      setIsTyping(false);

      if (data.success) {
        setChatMessages((prev) => [
          ...prev, 
          { id: `msg-bot-${Date.now()}`, text: data.text, sender: "bot" }
        ]);
      } else {
        throw new Error(data.error || "Request failed");
      }
    } catch (err) {
      setIsTyping(false);
      // Fallback local response engine matching client guidelines
      const fallbackReply = getFallbackBotResponse(userText);
      setChatMessages((prev) => [
        ...prev,
        { id: `msg-bot-${Date.now()}`, text: fallbackReply, sender: "bot" }
      ]);
    }
  };

  const getFallbackBotResponse = (userText: string) => {
    const text = userText.toLowerCase().trim();
    if (text.includes("service") || text.includes("solution") || text.includes("offer") || text.includes("what do you do")) {
      return "Zurich Technologies offers premium solutions:\n\n• Software Development (Custom apps & SaaS)\n• Cloud Solutions & DevOps (AWS, Azure, pipelines)\n• Web & Mobile Apps (React, Flutter, iOS, Android)\n• Cybersecurity & IT Audit (Compliance, audits, security setups)\n• AI, Data & Automation (ML models, NLP configurations)\n• IT Strategic Consulting\n\nHow can we help your operations?";
    }
    if (text.includes("pricing") || text.includes("cost") || text.includes("budget") || text.includes("how much") || text.includes("quote")) {
      return "Our pricing is flexible, tailored, and fully transparent. Simple web architectures start around ₦500,000, larger cloud-native networks range ₦2M – ₦10M, and custom enterprise arrays are built on SLA retainer agreements. Let us define a formal Letter of Engagement for your exact specs.";
    }
    if (text.includes("schedule") || text.includes("call") || text.includes("meeting") || text.includes("book") || text.includes("consult")) {
      return "Let's connect! Direct client lines are +234 805 505 3800 and mailboxes are support@zurichtechnologies.com.ng. You can also file details under our contact form to trigger an advisor response.";
    }
    if (text.includes("support")) {
      return "We stand behind everything we build. Our technical support desk handles server SLAs, backups, security migrations, and direct email dispatch. Contact us at support@zurichtechnologies.com.ng for priority SLA tickets.";
    }
    if (text.includes("about") || text.includes("who are you") || text.includes("zurich")) {
      return "Zurich Technologies Limited is a legendary Nigerian Systems Integrator and Software Firm providing high-availability services, network cabling, responsive engineering, and NITDA compliance solutions to leading enterprises.";
    }
    return "Thank you for reaching out to ZurichTech AI. I specialize in answering architecture specifications, enterprise support programs, cloud solutions, and scheduling quotes. Let me know if you would like support planning services!";
  };

  const handleQuickReplyClick = (label: string) => {
    handleSendChatMessage(label);
  };

  return (
    <div className="bg-white text-z-text font-sans overflow-x-hidden antialiased selection:bg-z-red/20 selection:text-z-red">

      {/* ==================== 1. PRELOADER ==================== */}
      <div 
        id="preloader" 
        className={`fixed inset-0 z-[9999] bg-white flex items-center justify-center transition-opacity duration-500 pointer-events-none ${
          !loading ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="text-center">
          <img 
            src="https://z-cdn-media.chatglm.cn/files/dfbaa407-7afe-4421-8d8b-57788e42d23c.png?auth_key=1879237079-1be447e3f11a42c2a4c00f354d39924d-0-bce22c237865e2c835f2b20e5e6cca16" 
            alt="Zurich Tech" 
            className="h-10 mx-auto mb-5"
          />
          <div className="loader-bar"></div>
        </div>
      </div>

      {/* ==================== 2. TOAST SYSTEM ==================== */}
      <div id="toastContainer" className="fixed top-5 right-5 z-[100] flex flex-col gap-2">
        {toasts.map((t) => (
          <div 
            key={t.id} 
            className="toast flex items-center gap-2.5 px-4 py-3 bg-white border border-z-border shadow-xl max-w-sm rounded-lg animate-slideUp transition-all"
          >
            <CheckCircle className={`h-4.5 w-4.5 shrink-0 text-emerald-500`} />
            <p className="text-[13px] font-light text-z-sub leading-snug">{t.text}</p>
          </div>
        ))}
      </div>

      {/* ==================== 3. STICKY NAVBAR ==================== */}
      <nav 
        id="navbar" 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-white/80 backdrop-blur-xl ${
          navScrolled ? "shadow-md border-b border-z-border" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4 flex items-center justify-between">
          <button onClick={() => handleScrollTo("hero")} className="flex items-center cursor-pointer">
            <img 
              src="https://z-cdn-media.chatglm.cn/files/dfbaa407-7afe-4421-8d8b-57788e42d23c.png?auth_key=1879237079-1be447e3f11a42c2a4c00f354d39924d-0-bce22c237865e2c835f2b20e5e6cca16" 
              alt="Zurich Tech" 
              className="h-9 w-auto"
            />
          </button>
          
          <div className="hidden lg:flex items-center gap-7">
            {[
              { id: "hero", label: "Home" },
              { id: "about", label: "About" },
              { id: "services", label: "Services" },
              { id: "portfolio", label: "Portfolio" },
              { id: "team", label: "Team" },
              { id: "faq", label: "FAQ" },
              { id: "blog", label: "Blog" },
              { id: "contact", label: "Contact" }
            ].map((link) => (
              <button 
                key={link.id} 
                onClick={() => handleScrollTo(link.id)} 
                className={`text-[13px] font-medium tracking-wide transition-colors cursor-pointer ${
                  activeSection === link.id ? "text-z-red font-semibold" : "text-z-sub hover:text-z-red"
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => handleScrollTo("contact")} 
              className="hidden md:inline-flex items-center gap-2 bg-z-red hover:bg-red-700 text-white text-[12px] font-semibold tracking-wider uppercase px-5 py-2.5 transition-all rounded-[2px] cursor-pointer"
            >
              Get A Quote <ArrowRight className="h-3.5 w-3.5" />
            </button>
            <button 
              onClick={() => setMenuOpen(!menuOpen)} 
              className="lg:hidden text-z-sub hover:text-z-red p-2 transition-colors cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {menuOpen ? <X className="h-5.5 w-5.5" /> : <Menu className="h-5.5 w-5.5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu panel */}
        <div className={`lg:hidden bg-white/95 backdrop-blur-xl border-t border-z-border ${menuOpen ? "block" : "hidden"}`}>
          <div className="px-6 py-6 flex flex-col gap-1">
            {[
              { id: "hero", label: "Home" },
              { id: "about", label: "About" },
              { id: "services", label: "Services" },
              { id: "portfolio", label: "Portfolio" },
              { id: "team", label: "Team" },
              { id: "faq", label: "FAQ" },
              { id: "blog", label: "Blog" },
              { id: "contact", label: "Contact" }
            ].map((link) => (
              <button 
                key={link.id} 
                onClick={() => {
                  setMenuOpen(false);
                  handleScrollTo(link.id);
                }} 
                className={`text-left text-sm font-medium py-2.5 transition-colors ${
                  activeSection === link.id ? "text-z-red" : "text-z-sub hover:text-z-red"
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* ==================== 4. HERO SECTION ==================== */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
        <div className="absolute inset-0 grid-bg"></div>
        <div className="absolute top-20 right-20 w-[500px] h-[500px] bg-z-red/[.03] rounded-full blur-[120px]"></div>
        <div className="absolute bottom-20 left-20 w-[400px] h-[400px] bg-z-red/[.02] rounded-full blur-[100px]"></div>
        <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-z-red/20 rotate-45 animate-float-slow"></div>
        <div className="absolute bottom-1/3 left-1/3 w-3 h-3 border border-z-red/10 rotate-45 animate-float-slower"></div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-12 text-center animate-fadeInUp">
          <div className="mb-8">
            <span className="inline-flex items-center gap-2.5 bg-z-light border border-red-100 text-z-red text-[10px] font-semibold tracking-[0.25em] uppercase px-5 py-2 rounded-full">
              <span className="w-1.5 h-1.5 bg-z-red rounded-full animate-pulse"></span>
              Since 2007 — Trusted IT Partner
            </span>
          </div>
          <h1 className="font-serif text-[clamp(2.5rem,6vw,5.5rem)] font-medium tracking-tight leading-[1.08] mb-7">
            Global IT Solutions<br />That Accelerate Your<br />
            Digital Tran<span className="text-gradient">sformation</span>
          </h1>
          <p className="max-w-xl mx-auto text-z-sub text-base md:text-[17px] font-light leading-relaxed mb-10">
            We combine strategy, technology, and innovation to deliver world-class software and IT solutions that enhance efficiency, productivity, and customer experience.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button 
              onClick={() => handleScrollTo("services")} 
              className="group inline-flex items-center gap-2.5 bg-z-red hover:bg-red-700 text-white text-[12px] font-semibold tracking-wider uppercase px-7 py-3.5 transition-all rounded-[2px] shadow-lg shadow-red-600/20 cursor-pointer"
            >
              Explore Solutions <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
            <button 
              onClick={() => handleScrollTo("about")} 
              className="group inline-flex items-center gap-2.5 border border-z-border hover:border-z-red/30 text-z-text text-[12px] font-semibold tracking-wider uppercase px-7 py-3.5 transition-all rounded-[2px] hover:bg-z-light cursor-pointer"
            >
              <Play className="h-3 w-3 fill-current" /> Learn More
            </button>
          </div>

          {/* Scroll Indicator positioned directly & centered under the buttons */}
          <div className="mt-16 flex flex-col items-center gap-2">
            <span className="text-[9px] tracking-[0.3em] uppercase text-z-dim">Scroll</span>
            <div className="w-4 h-7 border border-z-dim rounded-full flex justify-center pt-1.5 mx-auto">
              <div className="w-0.5 h-1.5 bg-z-red rounded-full animate-bounce"></div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 5. PARTNERS MARQUEE ==================== */}
      <section className="relative bg-z-muted border-y border-z-border py-12 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-8">
          <p className="text-[9px] tracking-[0.35em] uppercase text-z-dim text-center">Partners Who Trust ZurichTech</p>
        </div>
        <div className="relative overflow-hidden w-full">
          <div className="marquee-track flex w-max">
            {/* Set 1 */}
            <div className="flex items-center gap-12 px-6 shrink-0">
              <div className="partner-logo flex items-center justify-center h-16 w-40 filter grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Dangote_Group_Logo.svg/1200px-Dangote_Group_Logo.svg.png" alt="Dangote" className="max-h-8 w-auto object-contain" referrerPolicy="no-referrer" />
              </div>
              <div className="partner-logo flex items-center justify-center h-16 w-40 filter grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                <img src="https://upload.wikimedia.org/wikipedia/en/thumb/7/73/Arik_Air_Logo.svg/1200px-Arik_Air_Logo.svg.png" alt="Arik Air" className="max-h-8 w-auto object-contain" referrerPolicy="no-referrer" />
              </div>
              <div className="partner-logo flex items-center justify-center h-16 w-40 filter grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/FIRS_Nigeria_Logo.svg/1200px-FIRS_Nigeria_Logo.svg.png" alt="FIRS" className="max-h-8 w-auto object-contain" referrerPolicy="no-referrer" />
              </div>
              <div className="partner-logo flex items-center justify-center h-16 w-44 filter grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/FSDH_Merchant_Bank_Logo.svg/1200px-FSDH_Merchant_Bank_Logo.svg.png" alt="FSDH Merchant Bank" className="max-h-8 w-auto object-contain" referrerPolicy="no-referrer" />
              </div>
              <div className="partner-logo flex items-center justify-center h-16 w-40 filter grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                <img src="https://upload.wikimedia.org/wikipedia/en/thumb/9/9a/Aero_Contractors_Logo.svg/1200px-Aero_Contractors_Logo.svg.png" alt="Aero" className="max-h-8 w-auto object-contain" referrerPolicy="no-referrer" />
              </div>
              <div className="partner-logo flex items-center justify-center h-16 w-40 filter grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Della_Credit_Logo.svg/1200px-Della_Credit_Logo.svg.png" alt="Della Credit" className="max-h-8 w-auto object-contain" referrerPolicy="no-referrer" />
              </div>
              <div className="partner-logo flex items-center justify-center h-16 w-44 filter grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Hall_7_Real_Estate_Logo.svg/1200px-Hall_7_Real_Estate_Logo.svg.png" alt="Hall 7 Real Estate" className="max-h-8 w-auto object-contain" referrerPolicy="no-referrer" />
              </div>
              <div className="partner-logo flex items-center justify-center h-16 w-40 filter grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Aella_Credit_Logo.svg/1200px-Aella_Credit_Logo.svg.png" alt="Aella Credit" className="max-h-8 w-auto object-contain" referrerPolicy="no-referrer" />
              </div>
            </div>
            {/* Set 2 */}
            <div className="flex items-center gap-12 px-6 shrink-0">
              <div className="partner-logo flex items-center justify-center h-16 w-40 filter grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Dangote_Group_Logo.svg/1200px-Dangote_Group_Logo.svg.png" alt="Dangote" className="max-h-8 w-auto object-contain" referrerPolicy="no-referrer" />
              </div>
              <div className="partner-logo flex items-center justify-center h-16 w-40 filter grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                <img src="https://upload.wikimedia.org/wikipedia/en/thumb/7/73/Arik_Air_Logo.svg/1200px-Arik_Air_Logo.svg.png" alt="Arik Air" className="max-h-8 w-auto object-contain" referrerPolicy="no-referrer" />
              </div>
              <div className="partner-logo flex items-center justify-center h-16 w-40 filter grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/FIRS_Nigeria_Logo.svg/1200px-FIRS_Nigeria_Logo.svg.png" alt="FIRS" className="max-h-8 w-auto object-contain" referrerPolicy="no-referrer" />
              </div>
              <div className="partner-logo flex items-center justify-center h-16 w-44 filter grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/FSDH_Merchant_Bank_Logo.svg/1200px-FSDH_Merchant_Bank_Logo.svg.png" alt="FSDH Merchant Bank" className="max-h-8 w-auto object-contain" referrerPolicy="no-referrer" />
              </div>
              <div className="partner-logo flex items-center justify-center h-16 w-40 filter grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                <img src="https://upload.wikimedia.org/wikipedia/en/thumb/9/9a/Aero_Contractors_Logo.svg/1200px-Aero_Contractors_Logo.svg.png" alt="Aero" className="max-h-8 w-auto object-contain" referrerPolicy="no-referrer" />
              </div>
              <div className="partner-logo flex items-center justify-center h-16 w-40 filter grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Della_Credit_Logo.svg/1200px-Della_Credit_Logo.svg.png" alt="Della Credit" className="max-h-8 w-auto object-contain" referrerPolicy="no-referrer" />
              </div>
              <div className="partner-logo flex items-center justify-center h-16 w-44 filter grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Hall_7_Real_Estate_Logo.svg/1200px-Hall_7_Real_Estate_Logo.svg.png" alt="Hall 7 Real Estate" className="max-h-8 w-auto object-contain" referrerPolicy="no-referrer" />
              </div>
              <div className="partner-logo flex items-center justify-center h-16 w-40 filter grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Aella_Credit_Logo.svg/1200px-Aella_Credit_Logo.svg.png" alt="Aella Credit" className="max-h-8 w-auto object-contain" referrerPolicy="no-referrer" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 6. ABOUT SECTION ==================== */}
      <section id="about" className="relative py-24 md:py-32 bg-white">
        <div className="absolute inset-0 dot-pattern"></div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-start mb-20 animate-fadeInUp">
            <div>
              <span className="text-z-red text-[10px] font-semibold tracking-[0.25em] uppercase mb-3 block">About Us</span>
              <h2 className="font-serif text-3xl md:text-[2.8rem] font-medium tracking-tight leading-[1.15]">
                Your Trusted Partner<br /><span className="text-z-dim">In Digital Excellence</span>
              </h2>
            </div>
            <div className="lg:pt-10">
              <p className="text-z-sub text-[15px] font-light leading-[1.8]">
                We have empowered organizations with strategic IT consulting, tailored software solutions, and innovative technology services. We help enterprises modernize operations, enhance productivity, and stay competitive in an evolving digital era through reliable, secure, and future-ready IT solutions.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                num: "01",
                icon: <Lightbulb className="h-5 w-5 text-z-red" />,
                title: "Digital Transformation Ideas",
                desc: "Expert insights and innovative technology strategies that empower organizations to adapt, evolve, and thrive."
              },
              {
                num: "02",
                icon: <Users className="h-5 w-5 text-z-red" />,
                title: "Expert IT Professionals",
                desc: "Certified and highly skilled IT experts dedicated to delivering top-quality solutions that meet industry standards."
              },
              {
                num: "03",
                icon: <Cpu className="h-5 w-5 text-z-red" />,
                title: "Next-Gen Digital Technology",
                desc: "Powered by next-generation digital tools and cloud technologies designed for productivity and transformation."
              },
              {
                num: "04",
                icon: <Headphones className="h-5 w-5 text-z-red" />,
                title: "Reliable Client Support",
                desc: "Responsive and professional support ensuring your projects run seamlessly with consistent value delivery."
              }
            ].map((card, idx) => (
              <div 
                key={idx} 
                className="group bg-white border border-z-border p-7 card-hover relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-z-red to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                <span className="text-z-red/10 text-4xl font-serif font-bold absolute top-5 right-6">{card.num}</span>
                <div className="w-11 h-11 bg-z-light rounded-lg flex items-center justify-center mb-5 service-icon transition-all duration-500">
                  {card.icon}
                </div>
                <h3 className="text-[15px] font-medium mb-2">{card.title}</h3>
                <p className="text-z-dim text-[13px] font-light leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== 7. STATS COUNT-UP SECTION ==================== */}
      <section ref={statsRef} className="relative py-16 bg-z-muted border-y border-z-border overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { target: yearsCount, suffix: "+", label: "Years of Excellence" },
              { target: projectsCount, suffix: "+", label: "Projects Delivered" },
              { target: clientsCount, suffix: "+", label: "Global Clients" },
              { target: expertsCount, suffix: "+", label: "Tech Experts" }
            ].map((stat, idx) => (
              <div key={idx} className="text-center group">
                <div className="text-4xl md:text-5xl font-serif font-bold text-z-text mb-1.5 hover:scale-105 transition-transform">
                  <span className="counter">{stat.target}</span>{stat.suffix}
                </div>
                <div className="w-6 h-[1px] bg-z-red/40 mx-auto mb-2.5 group-hover:w-10 transition-all duration-500"></div>
                <p className="text-z-dim text-[10px] tracking-[0.2em] uppercase">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== 8. SERVICES SECTION ==================== */}
      <section id="services" className="relative py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-14">
            <div>
              <span className="text-z-red text-[10px] font-semibold tracking-[0.25em] uppercase mb-3 block">Our Services</span>
              <h2 className="font-serif text-3xl md:text-[2.8rem] font-medium tracking-tight leading-[1.15]">
                Innovative IT Solutions<br /><span className="text-z-dim">& Digital Services</span>
              </h2>
            </div>
            <button 
              onClick={() => handleScrollTo("contact")} 
              className="group inline-flex items-center gap-2 text-z-red text-[12px] font-semibold tracking-wider uppercase hover:gap-2.5 transition-all text-left cursor-pointer"
            >
              View All <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                icon: <Code2 className="h-5.5 w-5.5 text-z-red" />,
                title: "Software Development",
                desc: "Custom enterprise software, SaaS platforms, and robust applications designed to scale.",
                tags: ["Custom Apps", "SaaS", "API"]
              },
              {
                icon: <Cloud className="h-5.5 w-5.5 text-z-red" />,
                title: "Cloud Solutions & DevOps",
                desc: "Scalable cloud architecture, CI/CD pipelines, container orchestration, and automation.",
                tags: ["AWS", "Azure", "Docker"]
              },
              {
                icon: <Smartphone className="h-5.5 w-5.5 text-z-red" />,
                title: "Web & Mobile App Development",
                desc: "Responsive web applications and native mobile apps with intuitive UX.",
                tags: ["React", "Flutter", "iOS"]
              },
              {
                icon: <ShieldCheck className="h-5.5 w-5.5 text-z-red" />,
                title: "Cybersecurity & IT Audit",
                desc: "Security assessments, penetration testing, compliance audits, and threat monitoring.",
                tags: ["PenTest", "SOC", "ISO 27001"]
              },
              {
                icon: <BrainCircuit className="h-5.5 w-5.5 text-z-red" />,
                title: "AI, Data Science & Automation",
                desc: "Machine learning models, predictive analytics, intelligent automation, and data-driven decisions.",
                tags: ["ML", "NLP", "RPA"]
              },
              {
                icon: <Compass className="h-5.5 w-5.5 text-z-red" />,
                title: "IT Consulting & Digital Transformation",
                desc: "Strategic technology roadmaps, digital readiness assessments, and transformation advisory.",
                tags: ["Strategy", "Advisory", "Roadmap"]
              }
            ].map((service, idx) => (
              <div 
                key={idx} 
                className="service-card group bg-white border border-z-border p-7 card-hover relative overflow-hidden"
              >
                <div className="absolute -bottom-20 -right-20 w-36 h-36 bg-z-red/[.02] rounded-full blur-3xl group-hover:bg-z-red/[.05] transition-all duration-700"></div>
                <div className="relative">
                  <div className="w-12 h-12 bg-z-light rounded-lg flex items-center justify-center mb-5 service-icon transition-all duration-500">
                    {service.icon}
                  </div>
                  <h3 className="text-base font-medium mb-2">{service.title}</h3>
                  <p className="text-z-dim text-[13px] font-light leading-relaxed mb-5">{service.desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {service.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="text-[9px] tracking-wider uppercase bg-z-muted px-2.5 py-1 rounded-full text-z-dim font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== 9. PROCESS SECTION ==================== */}
      <section className="relative py-24 md:py-32 bg-z-muted overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-20">
            <span className="text-z-red text-[10px] font-semibold tracking-[0.25em] uppercase mb-3 block">Our Process</span>
            <h2 className="font-serif text-3xl md:text-[2.8rem] font-medium tracking-tight leading-[1.15]">
              We Solve Global Technology<br /><span className="text-z-dim">Challenges With Innovation</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-10 relative">
            <div className="hidden md:block absolute top-7 left-[20%] right-[20%] h-px bg-gradient-to-r from-transparent via-z-red/20 to-transparent"></div>
            
            {[
              { step: "1", title: "IT Strategy & Architecture", desc: "We assess your business goals and design scalable digital solutions aligned with your vision." },
              { step: "2", title: "Smart Automation & AI", desc: "We leverage AI and automation to streamline workflows and enhance operational efficiency." },
              { step: "3", title: "Deployment & Integration", desc: "We manage deployment and integration of tailored IT systems with smooth implementation." }
            ].map((item, idx) => (
              <div key={idx} className="text-center relative group">
                <div className="w-14 h-14 bg-z-red rounded-full flex items-center justify-center mx-auto mb-6 relative z-10 shadow-lg shadow-red-600/20 text-white font-serif text-lg font-bold">
                  {item.step}
                  {item.step === "1" && <div className="absolute inset-0 bg-z-red rounded-full animate-pulse-ring"></div>}
                </div>
                <h3 className="text-base font-medium mb-2 group-hover:text-z-red transition-colors">{item.title}</h3>
                <p className="text-z-dim text-[13px] font-light leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Quick CTA banner */}
          <div className="mt-20 bg-white border border-z-red/10 p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8 red-glow rounded-[3px]">
            <div>
              <h3 className="font-serif text-2xl md:text-3xl font-medium mb-2">Ready to Transform Your Business?</h3>
              <p className="text-z-sub text-sm font-light">Let's discuss how our IT expertise can accelerate your digital transformation.</p>
            </div>
            <button 
              onClick={() => handleScrollTo("contact")} 
              className="group shrink-0 inline-flex items-center gap-2.5 bg-z-red hover:bg-red-700 text-white text-[12px] font-semibold tracking-wider uppercase px-7 py-3.5 transition-all rounded-[2px] shadow-lg shadow-red-600/20 cursor-pointer text-center"
            >
              Start A Project <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* ==================== 10. PORTFOLIO CAROUSEL SLIDER ==================== */}
      <section id="portfolio" className="relative py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-14">
            <div>
              <span className="text-z-red text-[10px] font-semibold tracking-[0.25em] uppercase mb-3 block">Recent Work</span>
              <h2 className="font-serif text-3xl md:text-[2.8rem] font-medium tracking-tight leading-[1.15]">
                Explore Large-Scale<br /><span className="text-z-dim">Projects</span>
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={handlePortfolioPrev}
                disabled={portfolioIndex === 0}
                className="w-9 h-9 border border-z-border hover:border-z-red/30 hover:bg-z-light flex items-center justify-center transition-all disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer"
                aria-label="Previous Slide"
              >
                <ChevronRight className="h-4 w-4 rotate-180" />
              </button>
              <button 
                onClick={handlePortfolioNext}
                disabled={portfolioIndex >= portfolioItems.length - getVisibleSlidesCount()}
                className="w-9 h-9 border border-z-border hover:border-z-red/30 hover:bg-z-light flex items-center justify-center transition-all disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer"
                aria-label="Next Slide"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="overflow-hidden">
            <div 
              ref={portfolioContainerRef}
              className="flex gap-5 transition-transform duration-700 ease-out" 
              style={{
                transform: `translateX(-${portfolioIndex * (100 / getVisibleSlidesCount() + 1)}%)`
              }}
            >
              {portfolioItems.map((item, idx) => (
                <div 
                  key={idx} 
                  className="shrink-0 group w-full md:w-[calc(50%-10px)] lg:w-[calc(33.33%-14px)] transition-all duration-500 ease-out hover:-translate-y-2"
                >
                  <div className="relative overflow-hidden aspect-[4/3] bg-z-muted border border-z-border mb-3 rounded-[3px] transition-all duration-500 ease-out group-hover:border-z-red/30 group-hover:shadow-[0_15px_35px_-10px_rgba(220,38,38,0.18)]">
                    <img 
                      src={item.img} 
                      alt={item.title} 
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-z-text/80 via-transparent to-transparent"></div>
                    <div className="absolute bottom-5 left-5 right-5">
                      <span className="text-[9px] tracking-[0.2em] uppercase text-z-red font-semibold">{item.category}</span>
                      <h3 className="text-white text-base font-medium mt-0.5">{item.title}</h3>
                    </div>
                  </div>
                  <p className="text-z-dim text-[13px] font-light leading-relaxed px-1">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 11. TEAM STAFF GRID ==================== */}
      <section id="team" className="relative py-24 md:py-32 bg-z-muted border-y border-z-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-14">
            <span className="text-z-red text-[10px] font-semibold tracking-[0.25em] uppercase mb-3 block">Our Engineers</span>
            <h2 className="font-serif text-3xl md:text-[2.8rem] font-medium tracking-tight leading-[1.15]">
              Meet the Best<br /><span className="text-z-dim">Tech Professionals</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                name: "Frank Ochigbo",
                role: "Sr. Software Engineer",
                img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&h=530&q=80"
              },
              {
                name: "Atteng Simeon",
                role: "UI/UX Expert",
                img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&h=530&q=80"
              },
              {
                name: "Iman Shuaibu",
                role: "Sr. Engineer / DevOps",
                img: "https://images.unsplash.com/photo-1590650213165-c1fef80648c4?auto=format&fit=crop&w=400&h=530&q=80"
              }
            ].map((member, idx) => (
              <div key={idx} className="team-card group cursor-pointer">
                <div className="relative overflow-hidden aspect-[3/4] bg-z-muted border border-z-border mb-3 rounded-[3px]">
                  <img 
                    src={member.img} 
                    alt={member.name} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-104"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-z-text/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                <h3 className="text-sm font-medium group-hover:text-z-red transition-colors">{member.name}</h3>
                <p className="text-z-dim text-[13px] font-light">{member.role}</p>
              </div>
            ))}

            <div className="bg-z-light border border-z-red/10 p-7 flex flex-col justify-center items-center text-center rounded-[3px]">
              <span className="text-4xl font-serif font-bold text-z-red mb-1">350+</span>
              <p className="text-sm font-medium mb-0.5 animate-pulse">Successful Projects</p>
              <p className="text-z-dim text-[12px] font-light leading-relaxed mt-2 p-1">
                Innovative solutions across numerous industries.
              </p>
              <button 
                onClick={() => handleScrollTo("contact")}
                className="mt-5 inline-flex items-center gap-1.5 text-z-red text-[11px] font-semibold tracking-wider uppercase hover:gap-2 transition-all cursor-pointer"
              >
                Get A Quote <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 12. TESTIMONIALS SLIDER ==================== */}
      <section id="testimonials" className="relative py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-14">
            <span className="text-z-red text-[10px] font-semibold tracking-[0.25em] uppercase mb-3 block">Testimonials</span>
            <h2 className="font-serif text-3xl md:text-[2.8rem] font-medium tracking-tight leading-[1.15]">
              What People Say About<br /><span className="text-z-dim">ZurichTech</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {[
              {
                sub: "SD",
                name: "Samuel David",
                role: "Team Manager",
                text: '"Their IT expertise helped streamline our business processes and improve productivity. Everything was handled with excellence and attention to detail."'
              },
              {
                sub: "AS",
                name: "Anas Shuaibu",
                role: "CEO",
                text: '"Their team delivered exceptional technology solutions that transformed our operations. The support and professionalism exceeded our expectations."'
              }
            ].map((test, idx) => (
              <div 
                key={idx} 
                className="bg-white border border-z-border p-7 card-hover relative flex flex-col justify-between"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-z-light rounded-full flex items-center justify-center shrink-0">
                    <span className="text-z-red font-serif font-bold text-sm">{test.sub}</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-z-text">{test.name}</h4>
                    <p className="text-z-dim text-[11px]">{test.role}</p>
                  </div>
                  <div className="ml-auto flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-z-red text-z-red" />
                    ))}
                  </div>
                </div>
                <p className="text-z-sub text-[13px] font-light leading-relaxed italic">
                  {test.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== 13. FAQ ACCORDION ==================== */}
      <section id="faq" className="relative py-24 md:py-32 bg-z-muted border-y border-z-border">
        <div className="max-w-2xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-14">
            <span className="text-z-red text-[10px] font-semibold tracking-[0.25em] uppercase mb-3 block">FAQ</span>
            <h2 className="font-serif text-3xl md:text-[2.8rem] font-medium tracking-tight leading-[1.15]">
              Frequently Asked<br /><span className="text-z-dim">Questions</span>
            </h2>
          </div>

          <div className="space-y-3">
            {[
              { q: "What industries does ZurichTech serve?", a: "We serve finance, healthcare, oil & gas, education, government, retail, and logistics with tailored technology solutions." },
              { q: "How long does a typical project take?", a: "Simple web apps: 4–6 weeks. Enterprise solutions: 3–6 months. Detailed timelines provided during consultation." },
              { q: "Do you offer post-launch support?", a: "Yes — bug fixes, security updates, performance monitoring, and feature enhancements with flexible packages." },
              { q: "Can you work with our existing IT infrastructure?", a: "Absolutely! We specialize in seamless system integration with minimal disruption to your operations." },
              { q: "What is your pricing model?", a: "Fixed-price, time & materials, and retainer-based. We recommend the best fit for your requirements and budget." }
            ].map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="border border-z-border bg-white rounded">
                  <button 
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between px-6 py-4 text-left focus:outline-none cursor-pointer"
                  >
                    <span className="text-sm font-medium pr-4 text-z-text">{faq.q}</span>
                    <Plus className={`h-4.5 w-4.5 text-z-red shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`} />
                  </button>
                  <div 
                    className={`transition-all duration-300 overflow-hidden ${
                      isOpen ? "max-h-40 px-6 pb-4" : "max-h-0"
                    }`}
                  >
                    <p className="text-z-sub text-[13px] font-light leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================== 14. ARTICLES & BLOG SECTION ==================== */}
      <section id="blog" className="relative py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-14">
            <div>
              <span className="text-z-red text-[10px] font-semibold tracking-[0.25em] uppercase mb-3 block">Latest Updates</span>
              <h2 className="font-serif text-3xl md:text-[2.8rem] font-medium tracking-tight leading-[1.15]">
                Articles & Blog<br /><span className="text-z-dim">Insights</span>
              </h2>
            </div>
            <button 
              onClick={() => handleScrollTo("blog")}
              className="group inline-flex items-center gap-2 text-z-red text-[12px] font-semibold tracking-wider uppercase hover:gap-2.5 transition-all cursor-pointer text-left"
            >
              View All <ArrowRight className="h-3.5 w-3.5 animate-pulse" />
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                img: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&h=375&q=80",
                title: "Transforming Business with Advanced IT Solutions",
                desc: "Discover how cloud computing, automation, and AI are driving digital transformation."
              },
              {
                img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&h=375&q=80",
                title: "Building Secure and Scalable IT Infrastructure",
                desc: "How networking, cloud services, and cybersecurity best practices enhance reliability."
              },
              {
                img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&h=375&q=80",
                title: "Innovative IT Solutions Driving Digital Transformation",
                desc: "How cutting-edge software and automation tools help businesses stay ahead."
              }
            ].map((article, idx) => (
              <article key={idx} className="group cursor-pointer">
                <div className="relative overflow-hidden aspect-[16/10] bg-z-muted border border-z-border mb-4 rounded-[3px]">
                  <img 
                    src={article.img} 
                    alt={article.title} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-z-red text-white text-[9px] tracking-[0.15em] uppercase font-semibold px-2.5 py-1 rounded-sm shadow">
                      Technology
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-z-dim text-[11px] mb-2 font-medium">
                  <span>By Admin</span>
                  <span className="w-0.5 h-0.5 bg-z-dim rounded-full"></span>
                  <span>Feb 8, 2025</span>
                </div>
                <h3 className="text-[15px] font-medium mb-1.5 group-hover:text-z-red transition-colors leading-snug">
                  {article.title}
                </h3>
                <p className="text-z-dim text-[13px] font-light leading-relaxed">
                  {article.desc}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== 15. CONTACT & ADDRESS DETAIL ==================== */}
      <section id="contact" className="relative py-24 md:py-32 bg-z-muted border-t border-z-border">
        <div className="absolute inset-0 dot-pattern"></div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-14">
            <span className="text-z-red text-[10px] font-semibold tracking-[0.25em] uppercase mb-3 block">Get In Touch</span>
            <h2 className="font-serif text-3xl md:text-[2.8rem] font-medium tracking-tight leading-[1.15]">
              Let's Build Something<br /><span className="text-z-dim">Amazing Together</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-10">
            {/* Contact Form */}
            <div>
              <form onSubmit={handleContactSubmit} className="bg-white border border-z-border p-7 md:p-9 rounded-[3px] shadow-sm">
                <h3 className="text-base font-medium mb-5">Have a project in mind?</h3>
                
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="text-[9px] tracking-[0.2em] uppercase text-z-dim font-semibold mb-1.5 block">Full Name</label>
                    <input 
                      type="text" 
                      placeholder="John Doe" 
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      required 
                      className="w-full bg-white border border-z-border px-3.5 py-2.5 text-sm font-light text-z-text placeholder-gray-300 transition-all rounded"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] tracking-[0.2em] uppercase text-z-dim font-semibold mb-1.5 block">Email Address</label>
                    <input 
                      type="email" 
                      placeholder="john@company.com" 
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      required 
                      className="w-full bg-white border border-z-border px-3.5 py-2.5 text-sm font-light text-z-text placeholder-gray-300 transition-all rounded"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="text-[9px] tracking-[0.2em] uppercase text-z-dim font-semibold mb-1.5 block">Your Inquiry</label>
                  <select 
                    value={contactInquiry} 
                    onChange={(e) => setContactInquiry(e.target.value)} 
                    className="w-full bg-white border border-z-border px-3.5 py-2.5 text-sm font-light text-z-dim transition-all rounded cursor-pointer"
                  >
                    <option value="">Select a service</option>
                    <option value="Software Development">Software Development</option>
                    <option value="Cloud Solutions">Cloud Solutions & DevOps</option>
                    <option value="Web Mobile Dev">Web & Mobile App Development</option>
                    <option value="Security Audit">Cybersecurity & IT Audit</option>
                    <option value="AI ML">AI, Data Science & Automation</option>
                    <option value="IT Consulting">IT Consulting & Digital Transformation</option>
                  </select>
                </div>

                <div className="mb-5">
                  <label className="text-[9px] tracking-[0.2em] uppercase text-z-dim font-semibold mb-1.5 block">Your Message</label>
                  <textarea 
                    rows={4} 
                    placeholder="Tell us about your project..." 
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    required 
                    className="w-full bg-white border border-z-border px-3.5 py-2.5 text-sm font-light text-z-text placeholder-gray-300 transition-all resize-none rounded"
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="group w-full md:w-auto inline-flex items-center justify-center gap-2.5 bg-z-red hover:bg-red-700 text-white text-[12px] font-semibold tracking-wider uppercase px-7 py-3 transition-all rounded-[2px] shadow-lg shadow-red-600/15 cursor-pointer"
                >
                  Send Message <Send className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </form>
            </div>

            {/* Address, Maps, Social links */}
            <div className="space-y-7">
              <div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3.5 hover:translate-x-1 transition-transform">
                    <div className="w-9 h-9 bg-z-light rounded-lg flex items-center justify-center shrink-0">
                      <MapPin className="h-4.5 w-4.5 text-z-red" />
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-0.5 text-z-text">No 12, Rhine Street, Maitama Abuja, Nigeria</p>
                      <p className="text-z-dim text-[12px] font-light">Mon – Fri: 09:00 AM – 07:00 PM</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 hover:translate-x-1 transition-transform">
                    <div className="w-9 h-9 bg-z-light rounded-lg flex items-center justify-center shrink-0">
                      <Phone className="h-4.5 w-4.5 text-z-red" />
                    </div>
                    <div>
                      <a href="tel:+2348055053800" className="text-sm font-medium text-z-text hover:text-z-red transition-colors">
                        +234 805 505 3800
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 hover:translate-x-1 transition-transform">
                    <div className="w-9 h-9 bg-z-light rounded-lg flex items-center justify-center shrink-0">
                      <Mail className="h-4.5 w-4.5 text-z-red" />
                    </div>
                    <div>
                      <a href="mailto:support@zurichtechnologies.com.ng" className="text-sm font-medium text-z-text hover:text-z-red transition-colors">
                        support@zurichtechnologies.com.ng
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="border border-z-border overflow-hidden rounded-[3px] shadow">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3925.071378393768!2d7.49!3d9.05!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e745f434e5c53%3A0x4f22e7d3e9c0c577!2sMaitama%2C%20Abuja%2C%20Nigeria!5e0!3m2!1sen!2sng!4v1700000000000!5m2!1sen!2sng" 
                    width="100%" 
                    height="220" 
                    style={{ border: 0, filter: "grayscale(30%) contrast(1.1)" }} 
                    allowFullScreen={true} 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>

              <div>
                <h3 className="text-[10px] font-semibold tracking-[0.2em] uppercase text-z-dim mb-3">Follow Us</h3>
                <div className="flex gap-2">
                  {[
                    { icon: <Facebook className="h-4 w-4" />, href: "#" },
                    { icon: <Twitter className="h-4 w-4" />, href: "#" },
                    { icon: <Linkedin className="h-4 w-4" />, href: "#" },
                    { icon: <Instagram className="h-4 w-4" />, href: "#" }
                  ].map((soc, sIdx) => (
                    <a 
                      key={sIdx} 
                      href={soc.href} 
                      className="w-9 h-9 border border-z-border flex items-center justify-center text-z-sub hover:bg-z-red hover:border-z-red hover:text-white transition-all bg-white"
                    >
                      {soc.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 16. FOOTER ==================== */}
      <footer className="relative bg-z-text pt-14 pb-6 text-white text-opacity-90">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
            <div>
              <img 
                src="https://z-cdn-media.chatglm.cn/files/dfbaa407-7afe-4421-8d8b-57788e42d23c.png?auth_key=1879237079-1be447e3f11a42c2a4c00f354d39924d-0-bce22c237865e2c835f2b20e5e6cca16" 
                alt="Zurich Tech" 
                className="h-9 mb-3 brightness-0 invert"
                referrerPolicy="no-referrer"
              />
              <p className="text-neutral-400 text-[13px] font-light leading-relaxed mb-3">
                We deliver innovative IT solutions that empower businesses to operate smarter, faster, and more securely.
              </p>
              <span className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 text-z-red text-[10px] font-semibold px-2.5 py-1 rounded-full">
                <Calendar className="h-3 w-3" /> Since 2007
              </span>
            </div>

            <div>
              <h4 className="text-[10px] font-semibold tracking-[0.2em] uppercase text-neutral-400 mb-4">Useful Links</h4>
              <ul className="space-y-2">
                {["about", "services", "portfolio", "blog", "contact"].map((linkId) => (
                  <li key={linkId}>
                    <button 
                      onClick={() => handleScrollTo(linkId)} 
                      className="text-neutral-500 text-[13px] font-light hover:text-z-red transition-colors text-left uppercase tracking-wider text-[11px] cursor-pointer"
                    >
                      {linkId} ZurichTech
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-[10px] font-semibold tracking-[0.2em] uppercase text-neutral-400 mb-4">Quick Contact</h4>
              <ul className="space-y-2 text-neutral-500 text-[13px] font-light">
                <li className="flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5 text-z-red/50" />
                  <a href="tel:+2348055053800" className="hover:text-z-red transition-colors">
                    +234 805 505 3800
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5 text-z-red/50" />
                  <a href="mailto:support@zurichtechnologies.com.ng" className="hover:text-z-red transition-colors text-ellipsis overflow-hidden">
                    support@zurichtechnologies.com.ng
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-[10px] font-semibold tracking-[0.2em] uppercase text-neutral-400 mb-4">Newsletter</h4>
              <p className="text-neutral-500 text-[13px] font-light mb-3">Subscribe for the latest technology insights.</p>
              
              <form onSubmit={handleNewsletterSubmit} className="flex gap-0">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  required 
                  className="flex-1 bg-white/5 border border-white/10 border-r-0 px-3 py-2.5 text-[13px] font-light text-white placeholder-neutral-600 focus:border-z-red transition-all rounded-l"
                />
                <button type="submit" className="bg-z-red hover:bg-red-700 px-3.5 py-2.5 transition-colors flex items-center justify-center rounded-r cursor-pointer">
                  <Send className="h-3.5 w-3.5 text-white" />
                </button>
              </form>

              <div className="flex gap-2 mt-4">
                {[
                  { icon: <Facebook className="h-3.5 w-3.5" />, href: "#" },
                  { icon: <Twitter className="h-3.5 w-3.5" />, href: "#" },
                  { icon: <Linkedin className="h-3.5 w-3.5" />, href: "#" },
                  { icon: <Instagram className="h-3.5 w-3.5" />, href: "#" }
                ].map((soc, sIdx) => (
                  <a 
                    key={sIdx} 
                    href={soc.href} 
                    className="w-8 h-8 border border-white/10 flex items-center justify-center text-neutral-400 hover:bg-z-red hover:border-z-red hover:text-white transition-all bg-[#111827]"
                  >
                    {soc.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-neutral-600 text-[11px] font-light">
            <p>© 2026 Zurich Technologies. All rights reserved.</p>
            <div className="flex items-center gap-5">
              <span className="hover:text-z-red transition-colors cursor-pointer">Terms & Conditions</span>
              <span className="hover:text-z-red transition-colors cursor-pointer">Privacy Policy</span>
            </div>
          </div>
        </div>
      </footer>

      {/* ==================== 17. BACK TO TOP BUTTON ==================== */}
      <button 
        id="backToTop" 
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-24 right-6 z-40 w-11 h-11 bg-z-red hover:bg-red-700 text-white flex items-center justify-center rounded-full shadow-lg shadow-red-600/20 transition-all cursor-pointer ${
          showBackToTop ? "opacity-100 transform translate-y-0" : "opacity-0 pointer-events-none transform translate-y-4"
        }`}
        aria-label="Back To Top"
      >
        <ArrowUp className="h-4.5 w-4.5" />
      </button>

      {/* ==================== 18. INTELLIGENT CHATBOT WIDGET ==================== */}
      <div id="chatWidget" className="fixed bottom-6 right-6 z-50">
        <button 
          id="chatToggle" 
          onClick={() => {
            setIsChatOpen(!isChatOpen);
            setChatNotif(0);
          }}
          className="w-14 h-14 bg-z-red hover:bg-red-700 text-white rounded-full flex items-center justify-center shadow-xl shadow-red-600/25 transition-all relative cursor-pointer"
        >
          {isChatOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
          {chatNotif > 0 && !isChatOpen && (
            <span id="chatNotif" className="absolute -top-1 -right-1 w-5 h-5 bg-white text-z-red text-[10px] font-bold rounded-full flex items-center justify-center shadow">
              {chatNotif}
            </span>
          )}
        </button>

        <div 
          id="chatWindow" 
          className={`absolute bottom-18 right-0 w-[360px] max-w-[calc(100vw-48px)] bg-white border border-z-border shadow-2xl shadow-black/10 flex flex-col overflow-hidden rounded-lg transition-all duration-300 ${
            isChatOpen ? "scale-100 opacity-100" : "scale-90 opacity-0 pointer-events-none"
          }`}
          style={{ maxHeight: "500px" }}
        >
          {/* Header */}
          <div className="bg-z-red px-4 py-3 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="h-4.5 w-4.5 text-white" />
              </div>
              <div>
                <p className="text-white text-[13px] font-medium">ZurichTech AI Advisor</p>
                <p className="text-white/60 text-[9px] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>Online
                </p>
              </div>
            </div>
            <button 
              onClick={() => setIsChatOpen(false)} 
              className="text-white/60 hover:text-white transition-colors cursor-pointer"
            >
              <X className="h-4.5 w-4.5" />
            </button>
          </div>

          {/* Messages */}
          <div 
            id="chatMessages" 
            className="flex-1 overflow-y-auto p-4 space-y-3 bg-z-muted" 
            style={{ maxHeight: "340px", minHeight: "260px" }}
          >
            {chatMessages.map((msg) => {
              const fromBot = msg.sender === "bot";
              return (
                <div 
                  key={msg.id} 
                  className={`chat-bubble-anim flex gap-2 ${
                    fromBot ? "" : "justify-end"
                  }`}
                >
                  {fromBot && (
                    <div className="w-6 h-6 bg-white border border-z-border rounded-full flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                      <Bot className="h-3.5 w-3.5 text-z-red" />
                    </div>
                  )}
                  <div 
                    className={`p-3 max-w-[85%] rounded-lg border text-[13px] font-light leading-relaxed ${
                      fromBot 
                        ? "bg-white border-z-border rounded-tl-none text-z-sub" 
                        : "bg-z-red/15 border-z-red/10 text-z-text rounded-tr-none"
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                    
                    {/* Welcome options for fast click */}
                    {msg.id === "initial-welcome" && (
                      <div className="flex flex-wrap gap-1.5 mt-2.5" id="quickReplies">
                        {["Services", "Pricing", "Schedule Call", "Support"].map((reply, rIdx) => (
                          <button 
                            key={rIdx}
                            onClick={() => handleQuickReplyClick(reply)}
                            className="text-[10px] bg-z-light border border-z-border text-z-red px-2.5 py-1 rounded-full hover:bg-z-red hover:text-white hover:border-z-red transition-all cursor-pointer font-medium"
                          >
                            {reply}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div className="chat-bubble-anim flex gap-2">
                <div className="w-6 h-6 bg-white border border-z-border rounded-full flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                  <Bot className="h-3.5 w-3.5 text-z-red" />
                </div>
                <div className="bg-white border border-z-border p-3 rounded-lg rounded-tl-none flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce delay-150"></span>
                  <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce delay-300"></span>
                </div>
              </div>
            )}
            <div ref={chatMessagesEndRef} />
          </div>

          {/* Form */}
          <div className="border-t border-z-border p-3 shrink-0 bg-white">
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                handleSendChatMessage(chatInput);
                setChatInput("");
              }}
              className="flex items-center gap-2"
            >
              <input 
                type="text" 
                placeholder="Type your message..." 
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                className="flex-1 bg-z-muted border border-z-border px-3 py-2.5 text-[13px] font-light text-z-text placeholder-z-dim focus:border-z-red focus:outline-none transition-all rounded-lg"
                autoComplete="off"
              />
              <button 
                type="submit" 
                className="w-9 h-9 bg-z-red hover:bg-red-700 flex items-center justify-center transition-colors shrink-0 rounded-lg cursor-pointer"
                aria-label="Send Chat Message"
              >
                <Send className="h-4 w-4 text-white" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* ==================== 19. COOKIE POLICY BANNER ==================== */}
      {cookiePreference === null && (
        <div id="cookieBanner" className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-z-border p-4 md:p-5">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <Info className="h-5 w-5 text-z-red shrink-0" />
              <p className="text-z-sub text-[13px] font-light text-center md:text-left">
                We use cookies to enhance your experience. By continuing, you agree to our <span className="text-z-red hover:underline cursor-pointer">Privacy Policy</span>.
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button 
                onClick={() => handleCookieConsent("declined")}
                className="text-[12px] text-z-dim hover:text-z-text transition-colors px-3 py-1.5 cursor-pointer"
              >
                Decline
              </button>
              <button 
                onClick={() => handleCookieConsent("accepted")}
                className="bg-z-red hover:bg-red-700 text-white text-[12px] font-semibold px-5 py-1.5 transition-colors rounded-[2px] cursor-pointer"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
