"use client";

import React, { useState, useEffect } from 'react';
import bcrypt from 'bcryptjs';
import forge from 'node-forge';

type Algorithm = 'bcrypt' | 'sha1' | 'plain';

interface HtpasswdEntry {
  id: string;
  user: string;
  pass: string;
  algorithm: Algorithm;
  generated: string;
}

export default function HtpasswdGeneratorTool() {
  const [entries, setEntries] = useState<HtpasswdEntry[]>([
    { id: '1', user: '', pass: '', algorithm: 'bcrypt', generated: '' }
  ]);

  const [outputLines, setOutputLines] = useState<string>('');

  const generateHash = (password: string, algo: Algorithm): string => {
    if (!password) return '';
    try {
      if (algo === 'bcrypt') {
         // bcryptjs generates $2a$. Nginx/Apache .htpasswd prefers $2y$, but $2a$ works perfectly mostly everywhere. Let's switch prefix to $2y$ just in case.
         const salt = bcrypt.genSaltSync(10);
         const hash = bcrypt.hashSync(password, salt);
         return hash.replace(/^\$2a\$/, '$2y$');
      } 
      if (algo === 'sha1') {
         // {SHA} + base64(sha1(password))
         const md = forge.md.sha1.create();
         md.update(password, 'utf8');
         const digestHex = md.digest().getBytes();
         const b64 = forge.util.encode64(digestHex);
         return `{SHA}${b64}`;
      }
      if (algo === 'plain') {
         return password;
      }
      return '';
    } catch (e) {
      return '(Error generating hash)';
    }
  };

  useEffect(() => {
    // Generate output string anytime entries change
    const lines = entries.map(entry => {
        if (!entry.user) return '';
        const hashed = generateHash(entry.pass, entry.algorithm);
        if (!hashed) return `${entry.user}:(waiting for password)`;
        return `${entry.user}:${hashed}`;
    }).filter(line => line !== '').join('\n');

    setOutputLines(lines);
  }, [entries]);

  const addEntry = () => {
    if (entries.length >= 10) return;
    setEntries(prev => [...prev, { id: Math.random().toString(36).substr(2, 9), user: '', pass: '', algorithm: prev[0].algorithm, generated: '' }]);
  };

  const removeEntry = (id: string) => {
    if (entries.length <= 1) return;
    setEntries(prev => prev.filter(e => e.id !== id));
  };

  const updateEntry = (id: string, field: keyof HtpasswdEntry, value: string) => {
    setEntries(prev => prev.map(e => e.id === id ? { ...e, [field]: value } : e));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(outputLines);
  };

  const copyOutputLocally = () => {
     // A simple fallback to trigger the download prompt
     const blob = new Blob([outputLines], { type: 'text/plain;charset=utf-8' });
     const url = URL.createObjectURL(blob);
     const link = document.createElement('a');
     link.href = url;
     link.download = '.htpasswd';
     document.body.appendChild(link);
     link.click();
     document.body.removeChild(link);
     setTimeout(() => URL.revokeObjectURL(url), 100);
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-5xl mx-auto">
      
      {/* Input Side */}
      <div className="bg-white border text-gray-800 border-gray-200 rounded-2xl p-6 lg:p-8 shadow-sm">
        <div className="flex justify-between items-center mb-6">
           <div>
              <h3 className="text-lg font-bold text-gray-900">Credential Rows</h3>
              <p className="text-xs text-gray-500 mt-1">Hashes are generated purely in your browser window. Zero network calls.</p>
           </div>
           <button 
             onClick={addEntry}
             disabled={entries.length >= 10}
             className="text-sm font-semibold flex items-center gap-1 text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
           >
             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
             Add Row
           </button>
        </div>

        <div className="space-y-4">
           {/* Header Row */}
           <div className="hidden sm:grid grid-cols-12 gap-3 pb-2 border-b border-gray-200 text-xs font-bold text-gray-500 uppercase tracking-wide">
              <div className="col-span-4 pl-1">Username</div>
              <div className="col-span-4 pl-1">Password (Plain)</div>
              <div className="col-span-3 pl-1">Algorithm</div>
              <div className="col-span-1 text-center">Act</div>
           </div>

           {/* Dynamic Inputs */}
           {entries.map((entry, idx) => (
             <div key={entry.id} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center bg-gray-50 sm:bg-transparent p-4 sm:p-0 rounded-xl sm:rounded-none relative">
                 <div className="sm:hidden absolute top-2 right-2 text-xs font-bold text-gray-400">#{idx + 1}</div>
                 <div className="col-span-4">
                    <label className="sm:hidden text-xs font-bold text-gray-500 mb-1 block">Username</label>
                    <input 
                       type="text" 
                       value={entry.user} 
                       onChange={(e) => updateEntry(entry.id, 'user', e.target.value)}
                       className="w-full border border-gray-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm shadow-sm"
                       placeholder={`user${idx + 1}`}
                    />
                 </div>
                 <div className="col-span-4">
                    <label className="sm:hidden text-xs font-bold text-gray-500 mb-1 block">Password</label>
                    <input 
                       type="text" 
                       value={entry.pass} 
                       onChange={(e) => updateEntry(entry.id, 'pass', e.target.value)}
                       className="w-full border border-gray-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm shadow-sm"
                       placeholder="••••••••"
                    />
                 </div>
                 <div className="col-span-3 w-full">
                    <label className="sm:hidden text-xs font-bold text-gray-500 mb-1 block">Algorithm</label>
                    <select 
                       value={entry.algorithm} 
                       onChange={(e) => updateEntry(entry.id, 'algorithm', e.target.value as Algorithm)}
                       className="w-full border border-gray-300 bg-white rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500 text-sm shadow-sm"
                    >
                       <option value="bcrypt">Bcrypt (Secure, Default)</option>
                       <option value="sha1">SHA-1 ({'{SHA}'})</option>
                       <option value="plain">Plain Text (Insecure)</option>
                    </select>
                 </div>
                 <div className="col-span-1 flex justify-end sm:justify-center mt-2 sm:mt-0">
                    <button 
                       onClick={() => removeEntry(entry.id)}
                       disabled={entries.length <= 1}
                       className="p-2 text-gray-400 hover:text-red-500 transition-colors disabled:opacity-30 flex items-center gap-1 sm:gap-0"
                       title="Remove Row"
                    >
                       <span className="sm:hidden text-xs font-bold">Remove</span>
                       <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                 </div>
             </div>
           ))}
        </div>
      </div>

      {/* Output Side */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl flex flex-col overflow-hidden shadow-lg">
         <div className="bg-gray-800 px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-700 gap-4">
            <h3 className="font-bold text-gray-100 flex items-center gap-2">
               <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
               Generated .htpasswd Output
            </h3>
            <div className="flex gap-2 w-full sm:w-auto">
               <button 
                  onClick={copyOutputLocally}
                  disabled={!outputLines}
                  className="flex-1 sm:flex-none text-xs font-bold px-3 py-1.5 rounded bg-gray-700 text-gray-200 hover:bg-gray-600 border border-gray-600 flex justify-center items-center gap-1.5 transition-colors disabled:opacity-50"
                  title="Download File"
               >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                  Download File
               </button>
               <button 
                  onClick={copyToClipboard}
                  disabled={!outputLines}
                  className="flex-1 sm:flex-none text-xs font-bold px-3 py-1.5 rounded bg-blue-600 text-white hover:bg-blue-500 flex justify-center items-center gap-1.5 transition-colors disabled:opacity-50"
                  title="Copy to Clipboard"
               >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m-7 10h7M8 11h7" /></svg>
                  Copy All
               </button>
            </div>
         </div>
         
         <div className="p-6 relative">
             <div className="absolute top-0 right-0 w-32 h-32 bg-green-500 blur-3xl opacity-10 rounded-bl-full pointer-events-none"></div>
             {outputLines ? (
                <pre className="text-green-400 font-mono text-sm leading-relaxed whitespace-pre-wrap break-all relative z-10">
                   {outputLines}
                </pre>
             ) : (
                <div className="text-gray-600 font-mono text-sm text-center py-8 italic relative z-10">
                   Outputs will appear here as you type a username and password.
                </div>
             )}
         </div>
      </div>
    </div>
  );
}
