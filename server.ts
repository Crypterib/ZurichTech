import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const app = express();
const PORT = 3000;

app.use(express.json());

// Helper for lazy loading Gemini API safely
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
      aiClient = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
    }
  }
  return aiClient;
}

// 1. API Endpoint: Technical blueprint mapping & automated resource planner
app.post("/api/quote-calculator", (req, res) => {
  try {
    const { 
      servicesSelected = [], 
      projectScale = "medium", // small, medium, enterprise
      timeline = "standard", // relaxed, standard, urgent
      details = "" 
    } = req.body;

    // Node multiplier configuration
    const scaleMultiplier = 
      projectScale === "small" ? 0.75 : 
      projectScale === "enterprise" ? 2.5 : 1.0;

    const timelineWeeksBase: Record<string, number> = {
      "relaxed": 8,
      "standard": 4,
      "urgent": 2
    };

    const serviceNodes: Record<string, { nodes: number, label: string }> = {
      "software-dev": { nodes: 8, label: "Custom Enterprise Software & Mobile Apps" },
      "web-portal": { nodes: 4, label: "School, Hospital & E-Commerce Portals" },
      "corporate-web": { nodes: 2, label: "Stunning Ultra-Modern Web Redesign" },
      "cctv-setup": { nodes: 5, label: "Smart HD CCTV Security & Access Control" },
      "networking-it": { nodes: 6, label: "Enterprise Cybersecurity & Network Setup" },
      "gps-tracking": { nodes: 3, label: "GPS Vehicle Tracking & Fleet Management" },
      "web-hosting": { nodes: 1, label: "Premium Hosting & Professional Emails" }
    };

    let totalNodes = 0;
    const itemsList = [];

    for (const service of servicesSelected) {
      if (serviceNodes[service]) {
        const item = serviceNodes[service];
        const allocatedNodes = Math.max(1, Math.round(item.nodes * scaleMultiplier));
        let timelineWeeks = timelineWeeksBase[timeline] || 4;
        if (projectScale === "enterprise") timelineWeeks = Math.round(timelineWeeks * 1.5);
        if (projectScale === "small") timelineWeeks = Math.max(1, Math.round(timelineWeeks * 0.8));

        totalNodes += allocatedNodes;
        itemsList.push({
          id: service,
          name: item.label,
          allocatedNodes: allocatedNodes,
          timelineWeeks: timelineWeeks
        });
      }
    }

    // Determine blueprint specifications
    const engineersAllocated = Math.max(2, Math.round(totalNodes / 2));
    const slaCategory = projectScale === "enterprise" ? "Mission Critical Layer-1 SLA (24/7)" : 
                        projectScale === "medium" ? "Standard Corporate Layer-2 SLA (9/5)" : "Growth Level-3 Active Support";
    const reviewCycle = timeline === "urgent" ? "Bi-Weekly Accelerated Audit" : "Monthly Coherent Technical Audit";
    
    let baseDays = totalNodes * 3;
    if (timeline === "urgent") baseDays = Math.max(5, Math.round(baseDays * 0.5));
    if (timeline === "relaxed") baseDays = Math.round(baseDays * 1.3);
    const deploymentTimeline = `${baseDays} Working Days`;

    const supportHours = projectScale === "enterprise" ? "24/7/365 Direct Relay" : "08:00 to 18:00 Standard";
    const auditFrequency = projectScale === "enterprise" ? "Continuous Heuristic Telemetry" : "Manual Monthly Deployment Scan";

    res.json({
      success: true,
      items: itemsList,
      scale: projectScale,
      timeline,
      blueprintSpecs: {
        engineersAllocated,
        slaCategory,
        reviewCycle,
        deploymentTimeline,
        supportHours,
        auditFrequency
      },
      message: "Technical blueprint structure compiled successfully by Zurich Technologies Automator."
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 2. API Endpoint: Gemini-Powered interactive IT consultant
app.post("/api/consultant", async (req, res) => {
  try {
    const { message, chatHistory = [], projectContext = {} } = req.body;

    const systemPrompt = `You are a highly professional, distinguished, and brilliant Principal Solutions Architect and IT Consultant representing "Zurich Technologies Limited", Nigeria. 
Zurich Technologies is a top-tier systems integrator and software engineering firm in Nigeria. 
They specialize in:
1. Software Development (Custom business platforms, iOS, Android, Desktop apps).
2. Web Design & Custom Web Portals (Corporate websites, school management systems, e-commerce, government portals).
3. CCTV & Smart Surveillance (High-definition IP cameras, biometrics, access control, motion detection).
4. IT Infrastructure & Networking (Cisco systems, WAN/LAN setups, enterprise cyber security firewalls).
5. GPS Vehicle Tracking & Fleet Management Solutions (Real-time tracking, speed limits, geofencing, fuel status, remote immobilizer).
6. Managed Cloud Hosting, Professional Domain Registry & Dedicated Business Emails.

Your objective:
- Engage the prospective client warmly and professionally, with high-level technology consulting expertise.
- Discuss how Zurich Technologies can design and deploy ultra-secure, scalable networks, responsive enterprise software, safe tracking, and high-performance Web Portals in Nigeria.
- Give constructive, concrete advice. Format the responses in clean, beautiful Markdown with clear sections, bullet points, technical architectural terms, and structural suggestions.
- IMPORTANT: Do NOT include any pricing, financial quotes, rates, Naira (₦) estimates, budgets, or monetary service package prices under any circumstances. Public pricing is strictly confidential and custom-tailored during subsequent consultations. Emphasize that Zurich Technologies discusses and defines commercial engagements directly in formal Letters of Engagement. Instead, focus entirely on the technical architectural blueprints, security protocols, node counts, physical equipment bills, and Service Level Agreement (SLA) coverage details.
- Always be structured, innovative, objective, and friendly. Speak as a master software engineer or cybersecurity expert.
- Keep the tone corporate, modern, and highly persuasive. Mention that local deployments conform strictly to Nigerian NITDA guidelines and general cybersecurity best practices.

User message: "${message}"
Current Client Project Context: ${JSON.stringify(projectContext)}
Keep the reply professional, formatted with clear markdown paragraphs.`;

    const ai = getGeminiClient();

    if (!ai) {
      // Fallback response if GEMINI_API_KEY is missing
      const fallbackReplies: string[] = [
        "### Zurich Technologies - Corporate IT Advisory\n\nThank you for reaching out to **Zurich Technologies**. We would be absolutely thrilled to assist you with your project!\n\nTo give you immediate insights,\n\n* **Our Core Architectures**: We construct high-availability cloud platforms using modern React frontends, robust Node.js backends, and highly scalable cloud structures conforming to Nigerian NITDA safety standards.\n* **Smart Monitoring**: Our CCTV setups utilize IP-based high-fidelity camera feeds, smart biometric access, and local data NVR storage with remote mobile feeds.\n* **Fleet Safety**: Our tracking package installs tamper-proof GLONASS/GPS components that feed real-time velocity, location, geofence violations, and fuel monitoring dashboards.\n\n*Please configure your **GEMINI_API_KEY** in the Secrets panel to unlock the full potential of our interactive, customized AI Solutions Architect assistant!*",
        "### Enterprise Portfolio Architect's Desk\n\nWelcome to Zurich Technologies' automated design deck. Here are first-class recommendations based on industry standards:\n\n1. **High Security Standards**: We secure all databases with AES-256 encryption. Our IT networking solutions feature customized enterprise-grade firewalls and isolated VLANS.\n2. **Modern Web Interfaces**: We craft fast, responsive, SEO-optimized web engines with stunning graphics and layout design.\n3. **Scalable Support**: Every project we deliver includes our premium SLA (Service Level Agreement), offering 24/7 technical monitoring.\n\n*Please configure your **GEMINI_API_KEY** in the system secrets to engage in deep customized systems architectural design sessions.*"
      ];
      const randomReply = fallbackReplies[Math.floor(Math.random() * fallbackReplies.length)];

      // Artificially delay slightly for a realistic server response
      await new Promise(resolve => setTimeout(resolve, 800));

      return res.json({
        success: true,
        text: randomReply,
        isDemoMode: true
      });
    }

    // Call actual Gemini API
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: [
        { role: "user", parts: [{ text: systemPrompt }] }
      ]
    });

    const replyText = response.text || "I apologize, our consulting systems are temporarily cycling. How can Zurich Technologies deliver software, surveillance, or vehicle tracking solutions for you today?";

    res.json({
      success: true,
      text: replyText,
      isDemoMode: false
    });
  } catch (error: any) {
    console.error("Gemini Error:", error);
    res.status(500).json({ 
      success: false, 
      error: error.message,
      text: "### Advisory System Standby\n\nWe encountered an error processing your architectural requirements. Please verify that your **GEMINI_API_KEY** is correctly registered in your secrets settings.\n\n*Error details: " + error.message + "*"
    });
  }
});

// Setup dev server or static server
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    // Development Mode - Mount Vite dev server middleware
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite dev server mounted.");
  } else {
    // Production Mode - Serve static files built under /dist
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Serving static production build from /dist.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Zurich Technologies server running on http://localhost:${PORT}`);
  });
}

startServer();
