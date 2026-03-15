'use client';
import React, { useState, useEffect } from 'react';

export default function AdvancedPasswordSecurityTool() {
  const [password, setPassword] = useState('P@ssword123!');
  const [entropy, setEntropy] = useState(0);
  const [crackTimeOffline, setCrackTimeOffline] = useState('');
  const [crackTimeOnline, setCrackTimeOnline] = useState('');
  const [strength, setStrength] = useState(0); // 0-4
  const [vulnerabilities, setVulnerabilities] = useState<string[]>([]);

  const calculateEntropy = (pwd: string) => {
    if (!pwd) return 0;
    let charset = 0;
    if (/[a-z]/.test(pwd)) charset += 26;
    if (/[A-Z]/.test(pwd)) charset += 26;
    if (/[0-9]/.test(pwd)) charset += 10;
    if (/[^a-zA-Z0-9]/.test(pwd)) charset += 32;
    
    return Math.log2(Math.pow(charset, pwd.length));
  };

  const formatTime = (seconds: number) => {
    if (seconds === Infinity) return 'Infinity';
    if (seconds < 1) return 'Instantly';
    if (seconds < 60) return `${Math.floor(seconds)} seconds`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours`;
    if (seconds < 31536000) return `${Math.floor(seconds / 86400)} days`;
    if (seconds < 3153600000) return `${Math.floor(seconds / 31536000)} years`;
    if (seconds < 3153600000000) return `${Math.floor(seconds / 3153600000)} centuries`;
    return 'Millions of years';
  };

  useEffect(() => {
    const e = calculateEntropy(password);
    setEntropy(e);

    // Online Attack: 100 guesses/sec (throttled)
    const online = Math.pow(2, e) / 100;
    setCrackTimeOnline(formatTime(online));

    // Offline Attack: 10 billion guesses/sec (GPU)
    const offline = Math.pow(2, e) / 10000000000;
    setCrackTimeOffline(formatTime(offline));

    // Strength Mapping
    if (e < 28) setStrength(0);
    else if (e < 36) setStrength(1);
    else if (e < 60) setStrength(2);
    else if (e < 128) setStrength(3);
    else setStrength(4);

    // Dynamic Vulnerability Checks
    const vulns = [];
    if (password.length < 12) vulns.push('Password is too short (Minimum 12 chars recommended).');
    if (!/[A-Z]/.test(password)) vulns.push('No uppercase characters detected.');
    if (!/[0-9]/.test(password)) vulns.push('No numbers detected.');
    if (!/[^a-zA-Z0-9]/.test(password)) vulns.push('No special characters detected.');
    if (/^[a-zA-Z]+$/.test(password)) vulns.push('Only contains letters (Dictionary attack risk).');
    if (/qwerty|asdfgh|123456/i.test(password)) vulns.push('Contains common keyboard patterns.');
    
    setVulnerabilities(vulns);
  }, [password]);

  const strengthColors = [
    'bg-red-500',    // Very Weak
    'bg-orange-500', // Weak
    'bg-yellow-500', // Moderate
    'bg-green-500',  // Strong
    'bg-blue-500'    // Cryptographic Grade
  ];

  const strengthLabels = [
    'Extremely Weak',
    'Weak (Common Patterns)',
    'Moderate (Standard)',
    'Strong (Enterprise)',
    'Cryptographic Grade'
  ];

  return (
    <div className="flex flex-col gap-8 w-full max-w-4xl mx-auto">
      
      {/* Input Section */}
      <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm flex flex-col gap-6">
        <div>
           <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Test Password Strength</label>
           <div className="relative">
              <input 
                type="text" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-4 pr-16 text-2xl font-mono border-2 border-gray-100 rounded-xl focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 outline-none transition-all placeholder-gray-200"
                placeholder="Enter password..."
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                 <span className="text-xs font-bold text-gray-300">{password.length} chars</span>
              </div>
           </div>
        </div>

        {/* Strength Meter */}
        <div className="flex flex-col gap-2">
           <div className="flex items-center justify-between mb-1">
              <span className={`text-sm font-bold ${strength === 4 ? 'text-blue-600' : strength >= 3 ? 'text-green-600' : 'text-gray-500'}`}>
                {strengthLabels[strength]}
              </span>
              <span className="text-xs font-mono text-gray-400">Entropy: {Math.floor(entropy)} bits</span>
           </div>
           <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden flex gap-1">
              {[0, 1, 2, 3].map((idx) => (
                <div 
                  key={idx}
                  className={`flex-1 h-full transition-all duration-500 ${idx <= strength - 1 ? strengthColors[strength] : 'bg-gray-200'}`}
                />
              ))}
           </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div className="bg-red-50 p-6 rounded-2xl border border-red-100 flex flex-col items-center text-center">
            <span className="text-[10px] font-black uppercase tracking-widest text-red-400 mb-2">Crack Time (Offline / GPU)</span>
            <span className="text-3xl font-black text-red-900 leading-tight">
               {crackTimeOffline}
            </span>
            <p className="text-[10px] text-red-600 mt-2 font-medium">Estimated time for an attacker with high-end hardware.</p>
         </div>

         <div className="bg-green-50 p-6 rounded-2xl border border-green-100 flex flex-col items-center text-center">
            <span className="text-[10px] font-black uppercase tracking-widest text-green-400 mb-2">Crack Time (Online / Throttled)</span>
            <span className="text-3xl font-black text-green-900 leading-tight">
               {crackTimeOnline}
            </span>
            <p className="text-[10px] text-green-600 mt-2 font-medium">Estimated time for brute-forcing a web login form.</p>
         </div>
      </div>

      {/* Vulnerabilities & Tips */}
      <div className="bg-gray-900 rounded-2xl p-8 text-white shadow-xl">
         <h4 className="text-sm font-black uppercase tracking-[0.2em] mb-6 flex items-center gap-2 text-blue-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
            Security Audit
         </h4>
         
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-4">
               <span className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1 border-b border-gray-800 pb-2">Identified Risks</span>
               {vulnerabilities.length > 0 ? vulnerabilities.map((v, i) => (
                  <div key={i} className="flex gap-3 text-sm text-red-300 font-medium">
                     <span className="text-red-500">•</span>
                     {v}
                  </div>
               )) : (
                  <div className="flex gap-3 text-sm text-green-400 font-bold items-center">
                     <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293l-4 4a1 1 0 01-1.414 0l-2-2a1 1 0 111.414-1.414L9 10.586l3.293-3.293a1 1 0 111.414 1.414z"></path></svg>
                     No immediate structural vulnerabilities found.
                  </div>
               )}
            </div>

            <div className="flex flex-col gap-4">
               <span className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1 border-b border-gray-800 pb-2">Pro Mitigation Steps</span>
               <div className="text-xs text-gray-400 leading-relaxed font-medium space-y-3">
                  <p>1. <strong className="text-white">Use a Passphrase:</strong> Instead of complex characters, use 4 random words (e.g., "CorrectHorseBatteryStaple"). It is easier to remember but exponentially harder to crack.</p>
                  <p>2. <strong className="text-white">Avoid reuse:</strong> Never use the same password for banking and social media. One breach would compromise your entire life.</p>
                  <p>3. <strong className="text-white">Entropy Matters:</strong> Length is mathematically superior to complexity. A 16-character lowercase password is often stronger than an 8-character mixed-case password.</p>
               </div>
            </div>
         </div>
      </div>

    </div>
  );
}
