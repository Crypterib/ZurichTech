import React, { useState, useRef, useEffect } from "react";
import { ChatMessage } from "../types";
import { Terminal, Send, ArrowRight, User, Cpu, Sparkles, Check, ChevronRight } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface SolutionsArchitectProps {
  triggerPrompt?: { text: string; id: number } | null;
}

export default function SolutionsArchitect({ triggerPrompt }: SolutionsArchitectProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "initial-advis",
      sender: "advisor",
      text: "### Welcome to Zurich Technologies Architecture Board\n\nI am your virtual **Principal Solutions Architect**. I help prospective enterprises design high-integrity software, physical networks, CCTV systems, and fleet tracker hubs.\n\nSelect one of our preset query systems below, or describe your project in the terminal console below. I will compile a technical blueprint, complete with structural recommendations and industry-standard protocols.",
      timestamp: "10:00 AM"
    }
  ]);

  const [inputMessage, setInputMessage] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [activePromptLabel, setActivePromptLabel] = useState<string>("");
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Suggested enterprise prompts to trigger beautiful AI architectures
  const presetQueries = [
    {
      label: "Design a 1,500 Student School Result Portal",
      prompt: "I want to design a robust web portal for a school in Lekki with 1,500 students, supporting teacher grade boards, secure parent logins, and payment integrations for tuition fees. Suggest a tech stack and SLA structure."
    },
    {
      label: "Layout Physical Network & CCTV for a 3-Floor Office",
      prompt: "Can you design a comprehensive LAN layout and IP CCTV surveillance setup for our new 3-story office building in Ikeja? We have 60 active endpoints and require access control on the executive doors."
    },
    {
      label: "Configure Sat Tracker Fleet Hub for 40 Trucks",
      prompt: "We run a transit logistics company in Port Harcourt with 40 diesel trailer trucks. We need to implement GLONASS satellite tracking, fuel drain sensors, geofencing limits, and remote engine relays. Please design this layout."
    }
  ];

  // Auto scroll to latest advice
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isProcessing]);

  // Execute query handler
  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || inputMessage;
    if (!textToSend.trim()) return;

    // Clear main input if sent via main input
    if (!customText) setInputMessage("");

    // Add user question to timeline
    const userMsgId = `usr-${Date.now()}`;
    const newUserMessage: ChatMessage = {
      id: userMsgId,
      sender: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newUserMessage]);
    setIsProcessing(true);

    try {
      const response = await fetch("/api/consultant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          projectContext: { redesignPreviewSource: "AIS-Build" }
        })
      });

      const data = await response.json();
      
      const advisorMsgId = `adv-${Date.now()}`;
      const newAdvisorMsg: ChatMessage = {
        id: advisorMsgId,
        sender: "advisor",
        text: data.text || "I apologize, our advisory processors are recycling. How can Zurich Technologies design solutions for your team today?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, newAdvisorMsg]);
    } catch (e: any) {
      const errorMsgId = `err-${Date.now()}`;
      setMessages(prev => [...prev, {
        id: errorMsgId,
        sender: "advisor",
        text: `### advisory System Interrupted\n\nWe encountered an error linking with the server-side advisory endpoint. Verify that your **GEMINI_API_KEY** is configured in the Settings panel.\n\n*Connection report: ${e.message}*`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } finally {
      setIsProcessing(false);
    }
  };

  // External trigger handler
  useEffect(() => {
    if (triggerPrompt && triggerPrompt.text) {
      handleSendMessage(triggerPrompt.text);
    }
  }, [triggerPrompt]);

  return (
    <section className="bg-slate-950 py-20 border-t border-slate-900" id="consultant">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Module Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center space-x-1.5 rounded-full border border-red-500/20 bg-red-950/20 px-3 py-1 font-mono text-xs text-red-500">
            <Sparkles className="h-3.5 w-3.5 animate-pulse" />
            <span>Interactive System Advisor Workspace</span>
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white font-display sm:text-4xl">
            Meet Your Principal IT Architect
          </h2>
          <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed">
            Our Gemini-powered Solutions Architect analyzes your corporate challenges in real-time, outputting custom structural maps, hardware catalogs, and robust maintenance sequences.
          </p>
        </div>

        {/* Console layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-stretch" id="chat-architect-layout">
          
          {/* Preset Prompts Left Side */}
          <div className="lg:col-span-4 flex flex-col justify-start space-y-4">
            <div className="rounded-xl border border-slate-900 bg-slate-900/10 p-5">
              <span className="font-mono text-[9px] font-bold text-slate-500 block uppercase tracking-wider mb-3">
                Select Blueprint presets:
              </span>
              <div className="space-y-3">
                {presetQueries.map((preset, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setActivePromptLabel(preset.label);
                      handleSendMessage(preset.prompt);
                    }}
                    id={`preset-prompt-${idx}`}
                    className="w-full text-left rounded-lg border border-slate-800 bg-slate-950 p-4 transition-all duration-300 hover:border-red-500/30 hover:bg-slate-900/30 group relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 h-10 w-10 bg-red-500/5 blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="font-display font-bold text-xs text-slate-200 group-hover:text-red-500 transition-colors block leading-snug">
                      {preset.label}
                    </span>
                    <div className="mt-2 flex items-center text-[10px] text-slate-500 font-mono">
                      <span>Inquire Blueprint Specs</span>
                      <ChevronRight className="h-3.5 w-3.5 ml-1 transition-transform group-hover:translate-x-1 text-red-500" />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-slate-900 bg-slate-900/10 p-5">
              <span className="font-mono text-[9px] font-bold text-slate-500 block uppercase tracking-wider mb-2">
                Operational Compliance:
              </span>
              <p className="text-[10px] text-slate-400 font-mono leading-relaxed">
                All drafted systems strictly align with local standard guidelines (NITDA Security Framework, federal cyber privacy bills) and pass rigorous pen-test diagnostics prior to physical deployment.
              </p>
            </div>
          </div>

          {/* Interactive Advice Dialog Terminal Right */}
          <div className="lg:col-span-8 flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/30 overflow-hidden min-h-128 shadow-2xl relative">
            
            {/* Terminal status bar */}
            <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950 px-5 py-3.5">
              <div className="flex items-center space-x-3">
                <div className="flex space-x-1">
                  <span className="h-2 w-2 rounded-full bg-red-500" />
                  <span className="h-2 w-2 rounded-full bg-yellow-500" />
                  <span className="h-2 w-2 rounded-full bg-green-500" />
                </div>
                <div className="h-4 w-[1px] bg-slate-800" />
                <div className="flex items-center space-x-1.5 font-mono text-[10px] text-slate-400 uppercase tracking-widest font-semibold">
                  <Terminal className="h-3.5 w-3.5 text-red-500" />
                  <span>Interactive Terminal Advisory Panel</span>
                </div>
              </div>
              <span className="font-mono text-[9px] bg-red-950/50 border border-red-500/10 text-red-500 rounded px-2.5 py-0.5 font-bold uppercase">
                ARCHITECT_GENAI_ONLINE
              </span>
            </div>

            {/* Scrolling Dialogue Display */}
            <div className="flex-1 overflow-y-auto px-5 py-6 space-y-6 max-h-[420px] bg-slate-950/40">
              {messages.map((msg) => {
                const isUser = msg.sender === "user";
                return (
                  <div 
                    key={msg.id} 
                    className={`flex space-x-4 items-start ${isUser ? "justify-end text-right" : ""}`}
                    id={`chat-msg-${msg.id}`}
                  >
                    {/* Advisor icon */}
                    {!isUser && (
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-red-500/20 bg-slate-900 glow-red text-red-500">
                        <Cpu className="h-5 w-5" />
                      </div>
                    )}

                    <div className={`max-w-[78%] rounded-xl p-4 border block text-left ${
                      isUser 
                        ? "border-red-500/20 bg-red-950/20 text-slate-200" 
                        : "border-slate-900 bg-slate-950/60"
                    }`}>
                      {/* Markdown rendering of advisor answers */}
                      {isUser ? (
                        <p className="text-sm font-sans font-medium text-slate-200">{msg.text}</p>
                      ) : (
                        <div className="markdown-body">
                          <ReactMarkdown>{msg.text}</ReactMarkdown>
                        </div>
                      )}
                      
                      <span className="font-mono text-[8px] text-slate-600 mt-2 block tracking-wider uppercase font-medium">
                        {msg.timestamp} &bull; {isUser ? "Client Terminal" : "Zurich Lead Architect"}
                      </span>
                    </div>

                    {/* User icon */}
                    {isUser && (
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-slate-400">
                        <User className="h-5 w-5" />
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Loader feedback ticker */}
              {isProcessing && (
                <div className="flex space-x-4 items-start" id="chat-msg-loading">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-red-500/20 bg-slate-900 text-red-500 animate-spin">
                    <Cpu className="h-5 w-5" />
                  </div>
                  <div className="max-w-[78%] rounded-xl p-4 border border-slate-900 bg-slate-950/40 font-mono text-[10px] text-red-500 flex items-center space-x-3">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75"></span>
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500"></span>
                    </span>
                    <span className="animate-pulse-slow font-medium uppercase tracking-wider">
                      Analyzing Requirements &amp; Compiling System Topologies...
                    </span>
                  </div>
                </div>
              )}

              <div ref={chatBottomRef} />
            </div>

            {/* Message Submission Area */}
            <div className="border-t border-slate-800 bg-slate-950 px-5 py-4">
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center space-x-3"
              >
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Describe your enterprise IT project nodes (e.g. results management portal, CCTV config)..."
                  className="flex-1 rounded-lg border border-slate-800 bg-slate-900/60 px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:border-red-500 focus:bg-slate-950 focus:outline-none transition-all font-sans"
                />
                <button
                  type="submit"
                  id="chat-submit-btn"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-red-650 text-white hover:bg-red-550 transition-colors duration-200 glow-red shadow-md"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
