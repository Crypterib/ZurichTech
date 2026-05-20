import React from "react";
import { BookOpen, Calendar, ArrowRight, UserCircle } from "lucide-react";

interface BlogArticle {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  author: string;
  imageUrl: string;
  consultPrompt: string;
}

const ARTICLES: BlogArticle[] = [
  {
    title: "Transforming Business with Advanced IT Solutions",
    excerpt: "How automated school ledger engines and secure API portals are saving regional administrative departments hundreds of hours of manual entry.",
    category: "Portal Technology",
    date: "May 18, 2026",
    author: "Engr. Ahmad Musa",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80",
    consultPrompt: "How can advanced enterprise software and custom portals eliminate redundant staff entry hours?"
  },
  {
    title: "Building Secure and Scalable IT Infrastructure",
    excerpt: "Diving deep into cabled Cisco hubs, symmetric hardware firewalls, and GLONASS trackers optimized to preserve West African fleet security.",
    category: "Security & DevOps",
    date: "May 10, 2026",
    author: "Engr. Emmanuel David",
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=400&q=80",
    consultPrompt: "Configure a highly scalable multi-region cloud layout with direct hardware firewall protections."
  },
  {
    title: "Innovative IT Solutions Driving Digital Transformation",
    excerpt: "Modern business relies on real-time speed. Explore how NITDA guidelines and CBN licensed payment integrations are fueling frictionless growth.",
    category: "Digital Strategy",
    date: "April 29, 2026",
    author: "Engr. Khalid Mahmud",
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=400&q=80",
    consultPrompt: "What are the core steps to integrate Paystack and Monnify API gateways securely inside school or commercial networks?"
  }
];

interface BlogSectionProps {
  onSelectArticlePrompt: (prompt: string) => void;
}

export default function BlogSection({ onSelectArticlePrompt }: BlogSectionProps) {
  return (
    <section className="bg-slate-950 py-20 border-t border-slate-900" id="blog">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center space-x-1.5 rounded-full border border-red-500/20 bg-red-950/20 px-3 py-1 font-mono text-xs text-red-500">
            <BookOpen className="h-3.5 w-3.5" />
            <span>Zurich Corporate Insights</span>
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white font-display sm:text-4xl uppercase">
            Articles & Blog Insights
          </h2>
          <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed">
            Read our expert engineers' guides on physical security infrastructure, custom web models, and digital transformation strategy.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ARTICLES.map((article, idx) => (
            <div 
              key={idx} 
              className="group flex flex-col rounded-2xl border border-slate-900 bg-[#020408]/40 overflow-hidden transition-all duration-300 hover:border-red-500/20"
              id={`blog-card-${idx}`}
            >
              {/* Image top */}
              <div className="relative h-48 w-full overflow-hidden">
                <div className="absolute inset-0 bg-red-950/20 mix-blend-multiply opacity-60 group-hover:opacity-20 transition-opacity" />
                <img 
                  src={article.imageUrl} 
                  alt={article.title} 
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-4 left-4 rounded bg-red-600 px-2 py-0.5 font-mono text-[9px] font-bold tracking-wider text-white uppercase shadow-md">
                  {article.category}
                </span>
              </div>

              {/* Body Text */}
              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <div className="flex items-center space-x-4 text-[10px] text-slate-500 font-mono mb-3">
                    <span className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {article.date}
                    </span>
                    <span className="flex items-center">
                      <UserCircle className="h-3 w-3 mr-1" />
                      {article.author}
                    </span>
                  </div>

                  <h4 className="font-display font-bold text-base text-white group-hover:text-red-400 transition-colors leading-snug">
                    {article.title}
                  </h4>
                  <p className="mt-3 text-xs text-slate-400 leading-relaxed font-sans line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>

                {/* Interactive trigger action */}
                <div className="mt-6 pt-5 border-t border-slate-900 flex justify-between items-center">
                  <button 
                    onClick={() => onSelectArticlePrompt(article.consultPrompt)}
                    className="flex items-center space-x-1 hover:text-red-500 text-slate-400 text-[11px] font-mono font-bold tracking-wider uppercase transition-colors cursor-pointer"
                  >
                    <span>Consult AI on this</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1 text-red-500" />
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
