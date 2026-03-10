"use client";

import React, { useState, useEffect } from "react";

export default function PasswordEntropyTool() {
  const [password, setPassword] = useState<string>("");
  const [entropyInfo, setEntropyInfo] = useState({
    length: 0,
    poolSize: 0,
    entropy: 0,
    crackTime: "Instantly",
    strength: "Very Weak",
    color: "bg-red-500",
    bgClass: "bg-red-50 border-red-200 text-red-900"
  });

  const getPoolSize = (pass: string) => {
    let pool = 0;
    if (/[a-z]/.test(pass)) pool += 26; // lowercase
    if (/[A-Z]/.test(pass)) pool += 26; // uppercase
    if (/\d/.test(pass)) pool += 10;    // numbers
    if (/[^a-zA-Z\d]/.test(pass)) pool += 32; // special chars (standard roughly 32)
    return pool === 0 ? 1 : pool; // prevent log(0)
  };

  const calculateCrackTime = (entropyBits: number) => {
    // Assumptions for a massively parallel offline hashing rig (e.g. 100 Billion guesses/second)
    const guessesPerSecond = 100_000_000_000;
    const totalGuesses = Math.pow(2, entropyBits);
    
    // Average time to crack is half the total space
    const seconds = (totalGuesses / 2) / guessesPerSecond;
    
    if (seconds < 1) return "Instantly";
    if (seconds < 60) return `${Math.round(seconds)} seconds`;
    if (seconds < 3600) return `${Math.round(seconds / 60)} minutes`;
    if (seconds < 86400) return `${Math.round(seconds / 3600)} hours`;
    if (seconds < 2592000) return `${Math.round(seconds / 86400)} days`;
    if (seconds < 31536000) return `${Math.round(seconds / 2592000)} months`;
    if (seconds < 3153600000) return `${Math.round(seconds / 31536000)} years`;
    if (seconds < 3153600000000) return `${Math.round(seconds / 3153600000)} centuries`;
    
    return "Millions of years";
  };

  useEffect(() => {
    if (!password) {
      setEntropyInfo({
        length: 0,
        poolSize: 0,
        entropy: 0,
        crackTime: "-",
        strength: "None",
        color: "bg-gray-200",
        bgClass: "bg-gray-50 border-gray-200 text-gray-500"
      });
      return;
    }

    const L = password.length;
    const R = getPoolSize(password);
    
    // Entropy formula: E = L * log2(R)
    const entropy = L * (Math.log(R) / Math.log(2));
    const roundedEntropy = Math.round(entropy);
    
    let strength = "Very Weak";
    let color = "bg-red-500";
    let bgClass = "bg-red-50 border-red-200 text-red-900";
    
    if (entropy >= 80) {
      strength = "Very Strong";
      color = "bg-green-600";
      bgClass = "bg-green-50 border-green-200 text-green-900";
    } else if (entropy >= 60) {
      strength = "Strong";
      color = "bg-green-400";
      bgClass = "bg-green-50 border-green-200 text-green-900";
    } else if (entropy >= 40) {
      strength = "Reasonable";
      color = "bg-yellow-400";
      bgClass = "bg-yellow-50 border-yellow-200 text-yellow-900";
    } else if (entropy >= 25) {
      strength = "Weak";
      color = "bg-orange-400";
      bgClass = "bg-orange-50 border-orange-200 text-orange-900";
    }

    setEntropyInfo({
      length: L,
      poolSize: R,
      entropy: roundedEntropy,
      crackTime: calculateCrackTime(entropy),
      strength,
      color,
      bgClass
    });
  }, [password]);

  return (
    <div className="space-y-8">
      
      {/* Input Section */}
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-gray-700">Type a Password to Test</label>
        <div className="relative">
          <input
            type="text" // Keep as text to see what is being typed for a tool
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="e.g. correct_horse-battery-staple!"
            className="w-full p-4 pr-12 text-lg font-mono border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
            autoComplete="off"
            spellCheck="false"
          />
          {password && (
            <button
               onClick={() => setPassword("")}
               className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          )}
        </div>
        <p className="text-xs text-gray-500 font-medium">
          <span className="text-green-600 font-bold">100% Private:</span> Your keystrokes never leave your browser.
        </p>
      </div>

      {/* Results Section */}
      <div className={`p-6 md:p-8 rounded-2xl border transition-colors duration-300 shadow-sm ${entropyInfo.bgClass}`}>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest opacity-70 mb-1">Information Entropy</h3>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl md:text-6xl font-black tracking-tight">{entropyInfo.entropy}</span>
              <span className="text-xl font-bold opacity-70">bits</span>
            </div>
          </div>
          
          <div className="md:text-right">
            <h3 className="text-sm font-bold uppercase tracking-widest opacity-70 mb-1">Estimated Crack Time</h3>
            <span className="text-2xl md:text-3xl font-bold">{entropyInfo.crackTime}</span>
          </div>
        </div>

        {/* Visual Strength Meter */}
        <div className="space-y-3">
          <div className="flex justify-between items-end">
            <span className="text-sm font-bold uppercase tracking-widest opacity-70">Password Strength</span>
            <span className="font-bold text-lg">{entropyInfo.strength}</span>
          </div>
          <div className="h-4 w-full bg-white/50 rounded-full overflow-hidden border border-black/10">
            <div 
              className={`h-full transition-all duration-500 ease-out ${entropyInfo.color}`} 
              style={{ width: `${Math.min((entropyInfo.entropy / 100) * 100, 100)}%` }}
            ></div>
          </div>
        </div>

      </div>

      {/* Maths Breakdown */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl text-center">
          <span className="block text-xl font-bold text-gray-900">{entropyInfo.length}</span>
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Length (L)</span>
        </div>
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl text-center">
          <span className="block text-xl font-bold text-gray-900">{entropyInfo.poolSize}</span>
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Character Pool (R)</span>
        </div>
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl text-center col-span-2 md:col-span-2">
          <span className="block text-lg font-mono font-bold text-gray-800 break-all select-all pt-1">E = L × log₂(R)</span>
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest block mt-1">Shannon Entropy Formula</span>
        </div>
      </div>

    </div>
  );
}
