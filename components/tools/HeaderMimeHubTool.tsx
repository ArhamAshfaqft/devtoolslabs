"use client";

import React, { useState } from "react";

interface HeaderInfo {
  name: string;
  category: "Security" | "MIME Type" | "Caching" | "System";
  description: string;
  example?: string;
}

const HEADERS: HeaderInfo[] = [
  // Security Headers
  { name: "Content-Security-Policy (CSP)", category: "Security", description: "Prevents XSS by defining which resources the browser is allowed to load.", example: "default-src 'self'; script-src 'self' https://trusted.com" },
  { name: "Strict-Transport-Security (HSTS)", category: "Security", description: "Tells the browser to only communicate with the server over HTTPS.", example: "max-age=63072000; includeSubDomains; preload" },
  { name: "X-Content-Type-Options", category: "Security", description: "Prevents MIME-sniffing by the browser.", example: "nosniff" },
  { name: "X-Frame-Options", category: "Security", description: "Controls whether your site can be embedded in an <iframe> (Clickjacking protection).", example: "DENY / SAMEORIGIN" },
  { name: "Referrer-Policy", category: "Security", description: "Controls how much referrer information is sent with requests.", example: "no-referrer-when-downgrade" },
  
  // MIME Types
  { name: "application/json", category: "MIME Type", description: "Standard format for API responses and configuration data." },
  { name: "text/html", category: "MIME Type", description: "Standard format for web pages." },
  { name: "image/svg+xml", category: "MIME Type", description: "Scalable Vector Graphics format." },
  { name: "application/pdf", category: "MIME Type", description: "Portable Document Format." },
  { name: "multipart/form-data", category: "MIME Type", description: "Used for submitting forms with binary file uploads." },
  { name: "application/javascript", category: "MIME Type", description: "Standard format for executable scripts." },

  // Caching
  { name: "Cache-Control", category: "Caching", description: "Directive for caching mechanisms in both browsers and proxies.", example: "public, max-age=31536000, immutable" },
  { name: "ETag", category: "Caching", description: "A unique identifier for a specific version of a resource.", example: 'W/"xy-12345"' },
];

export default function HeaderMimeHubTool() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [search, setSearch] = useState("");

  const filtered = HEADERS.filter(h => {
    const matchesCategory = activeCategory === "All" || h.category === activeCategory;
    const matchesSearch = h.name.toLowerCase().includes(search.toLowerCase()) || h.description.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-gray-50 p-6 rounded-2xl border border-gray-200">
        <div className="flex flex-wrap gap-2">
          {["All", "Security", "MIME Type", "Caching"].map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                activeCategory === cat 
                  ? "bg-gray-900 text-white shadow-md" 
                  : "bg-white text-gray-500 border border-gray-200 hover:border-gray-900 hover:text-gray-900"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="relative w-full md:w-64">
           <input
            type="text"
            placeholder="Search headers or types..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all font-poppins text-sm"
           />
           <svg className="absolute left-3 top-2.5 w-4.5 h-4.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
           </svg>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(h => (
          <div key={h.name} className="p-6 bg-white border border-gray-200 rounded-2xl hover:shadow-sm transition-all">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-bold text-gray-900 font-mono tracking-tight">{h.name}</h3>
              <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded ${
                h.category === "Security" ? "bg-red-50 text-red-600" : h.category === "MIME Type" ? "bg-blue-50 text-blue-600" : "bg-green-50 text-green-600"
              }`}>
                {h.category}
              </span>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">{h.description}</p>
            {h.example && (
              <div className="mt-auto">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2">Pro Example</span>
                <code className="block p-3 bg-gray-50 rounded-lg text-xs text-blue-800 break-all border border-gray-100 font-mono">
                  {h.example}
                </code>
              </div>
            )}
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-20 text-center text-gray-400 font-medium">
          No matches found for your search.
        </div>
      )}
    </div>
  );
}
