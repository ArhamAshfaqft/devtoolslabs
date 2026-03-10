"use client";

import React, { useState } from "react";

export default function RegexGeneratorTool() {
  const [matchType, setMatchType] = useState<"email" | "url" | "phone" | "postal" | "ip" | "date" | "password">("email");
  const [flags, setFlags] = useState({
    g: true,
    i: true,
    m: false,
  });

  const REGEX_PATTERNS = {
    email: {
      title: "Email Address",
      pattern: "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}",
      description: "Matches standard email addresses (e.g., user@example.com)",
      example: "user.name+tag@company.co.uk"
    },
    url: {
      title: "URL (Web Address)",
      pattern: "https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)",
      description: "Matches HTTP and HTTPS URLs with or without WWW.",
      example: "https://www.devtoolslabs.com/tools?id=1"
    },
    phone: {
      title: "US Phone Number",
      pattern: "^\\+?\\d{0,1}[\\s.-]?\\(?\\d{3}\\)?[\\s.-]?\\d{3}[\\s.-]?\\d{4}$",
      description: "Matches standard US/North American phone numbers in various formats.",
      example: "(123) 456-7890 or 123-456-7890"
    },
    postal: {
      title: "US Zip Code",
      pattern: "^\\d{5}(?:[-\\s]\\d{4})?$",
      description: "Matches 5-digit US ZIP codes, and 9-digit ZIP+4 codes.",
      example: "12345 or 12345-6789"
    },
    ip: {
      title: "IPv4 Address",
      pattern: "^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$",
      description: "Strictly matches valid IPv4 addresses.",
      example: "192.168.1.1"
    },
    date: {
      title: "Date (YYYY-MM-DD)",
      pattern: "^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$",
      description: "Matches standard ISO 8601 date formats.",
      example: "2024-12-31"
    },
    password: {
      title: "Strong Password",
      pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$",
      description: "Matches minimum 8 characters, at least one uppercase, one lowercase, one number and one special character.",
      example: "SuperS3cr3t!"
    }
  };

  const handleFlagChange = (flag: "g" | "i" | "m") => {
    setFlags(prev => ({ ...prev, [flag]: !prev[flag] }));
  };

  const currentSettings = REGEX_PATTERNS[matchType];
  const activeFlags = `${flags.g ? "g" : ""}${flags.i ? "i" : ""}${flags.m ? "m" : ""}`;
  const fullRegex = `/${currentSettings.pattern}/${activeFlags}`;
  
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(fullRegex);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Selection Area */}
        <div className="md:col-span-1 space-y-4">
          <label className="block text-sm font-semibold text-gray-900">What do you want to match?</label>
          <div className="flex flex-col gap-2">
            {(Object.keys(REGEX_PATTERNS) as Array<keyof typeof REGEX_PATTERNS>).map((key) => (
              <button
                key={key}
                onClick={() => setMatchType(key)}
                className={`text-left px-4 py-3 rounded-lg border text-sm transition-all ${
                  matchType === key 
                    ? "bg-blue-50 border-blue-600 text-blue-900 font-medium shadow-sm" 
                    : "bg-white border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                {REGEX_PATTERNS[key].title}
              </button>
            ))}
          </div>
        </div>

        {/* Display Area */}
        <div className="md:col-span-2 space-y-6">
          
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <div>
              <h3 className="text-lg font-bold text-gray-900">{currentSettings.title}</h3>
              <p className="text-gray-600 text-sm mt-1">{currentSettings.description}</p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-sm">
              <span className="font-semibold text-gray-500 uppercase tracking-wide text-xs mb-1 block">Valid Example:</span>
              <span className="text-gray-900 font-mono tracking-tight">{currentSettings.example}</span>
            </div>

            <div className="pt-4 border-t border-gray-100">
              <label className="block text-sm font-semibold text-gray-900 mb-3">Regex Flags</label>
              <div className="flex flex-wrap gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={flags.g} onChange={() => handleFlagChange("g")} className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
                  <span className="text-sm text-gray-700">Global (g)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={flags.i} onChange={() => handleFlagChange("i")} className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
                  <span className="text-sm text-gray-700">Case Insensitive (i)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={flags.m} onChange={() => handleFlagChange("m")} className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
                  <span className="text-sm text-gray-700">Multiline (m)</span>
                </label>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-900">Generated Regular Expression</label>
            <div className="relative">
              <div className="w-full min-h-[5rem] p-4 pr-32 font-mono text-base md:text-lg bg-gray-900 border border-gray-800 rounded-lg shadow-inner overflow-x-auto text-blue-300 leading-relaxed whitespace-pre-wrap break-all">
                {fullRegex}
              </div>
              <button
                onClick={handleCopy}
                className={`absolute top-3 right-3 px-4 py-2 rounded-md font-semibold text-xs transition-all duration-200 shadow-sm ${
                  copied
                    ? "bg-green-500 text-white"
                    : "bg-white text-gray-800 hover:bg-gray-100"
                }`}
              >
                {copied ? "COPIED ✓" : "COPY REGEX"}
              </button>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
