export type ServiceId = 
  | "software-dev" 
  | "web-portal" 
  | "corporate-web" 
  | "cctv-setup" 
  | "networking-it" 
  | "gps-tracking" 
  | "web-hosting";

export interface ServiceItem {
  id: ServiceId;
  title: string;
  description: string;
  longDescription: string;
  nodeAllocation: number;
  iconName: string;
  techKeywords: string[];
}

export interface BlueprintSpecs {
  engineersAllocated: number;
  slaCategory: string;
  reviewCycle: string;
  deploymentTimeline: string;
  supportHours: string;
  auditFrequency: string;
}

export interface TechBlueprintCalculated {
  items: Array<{
    id: string;
    name: string;
    allocatedNodes: number;
    timelineWeeks: number;
  }>;
  scale: "small" | "medium" | "enterprise";
  timeline: "relaxed" | "standard" | "urgent";
  blueprintSpecs: BlueprintSpecs;
  message: string;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "advisor";
  text: string;
  timestamp: string;
  isDiagram?: boolean;
}

export interface ProjectProposalTemplate {
  title: string;
  scope: string[];
  duration: string;
  terms: string;
}
