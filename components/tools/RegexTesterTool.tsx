'use client';
import React, { useState, useEffect } from 'react';

export default function RegexTesterTool() {
  const [regexString, setRegexString] = useState('(?<username>\\w+)@(?<domain>[\\w.-]+)');
  const [flags, setFlags] = useState('g');
  const [testString, setTestString] = useState('Contact us at support@example.com or sales@test.org.');
  const [matches, setMatches] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!regexString) {
      setMatches([]);
      setError(null);
      return;
    }

    try {
      const regex = new RegExp(regexString, flags);
      setError(null);

      const newMatches = [];
      let match;
      
      // If global flag is set, find all matches
      if (flags.includes('g')) {
        while ((match = regex.exec(testString)) !== null) {
          // Avoid infinite loops with zero-length matches
          if (match.index === regex.lastIndex) {
            regex.lastIndex++;
          }
          newMatches.push({
            fullMatch: match[0],
            index: match.index,
            groups: match.groups ? { ...match.groups } : null,
            captures: match.slice(1) // Numbered capture groups
          });
        }
      } else {
        // Without global flag, just get the first match
        match = regex.exec(testString);
        if (match) {
           newMatches.push({
            fullMatch: match[0],
            index: match.index,
            groups: match.groups ? { ...match.groups } : null,
            captures: match.slice(1)
          });
        }
      }
      
      setMatches(newMatches);
    } catch (e: any) {
      setError(e.message);
      setMatches([]);
    }
  }, [regexString, flags, testString]);

  const toggleFlag = (flag: string) => {
    if (flags.includes(flag)) {
      setFlags(flags.replace(flag, ''));
    } else {
      setFlags(flags + flag);
    }
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      
      {/* Configuration Header */}
      <div className="bg-gray-50 border-b border-gray-200 p-4 space-y-4">
        
        {/* Regex Input Row */}
        <div className="flex gap-2 items-stretch">
            <div className="flex items-center justify-center px-4 bg-gray-100 border border-gray-300 rounded-lg text-gray-500 font-mono text-lg font-bold">
                /
            </div>
            <input 
                type="text" 
                value={regexString}
                onChange={(e) => setRegexString(e.target.value)}
                placeholder="Enter regex pattern..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                spellCheck="false"
            />
            <div className="flex items-center justify-center px-4 bg-gray-100 border border-gray-300 rounded-lg text-gray-500 font-mono text-lg font-bold">
                /
            </div>
            <input 
                type="text" 
                value={flags}
                onChange={(e) => setFlags(e.target.value)}
                placeholder="flags"
                className="w-20 px-4 py-3 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                spellCheck="false"
            />
        </div>

        {/* Flag Toggles */}
        <div className="flex gap-2 flex-wrap">
             {[
               { id: 'g', label: 'Global (g)' },
               { id: 'i', label: 'Case Insensitive (i)' },
               { id: 'm', label: 'Multiline (m)' },
               { id: 's', label: 'Dot All (s)' }
             ].map(f => (
               <label key={f.id} className="flex items-center gap-2 text-xs text-gray-600 font-medium cursor-pointer hover:bg-gray-100 px-3 py-1.5 rounded-md border border-gray-200 bg-white transition-colors">
                  <input 
                    type="checkbox" 
                    checked={flags.includes(f.id)} 
                    onChange={() => toggleFlag(f.id)}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  {f.label}
               </label>
             ))}
        </div>
        
        {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded text-xs text-red-600 font-semibold font-mono break-all">
                Regex Error: {error}
            </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200">
        
        {/* Test String Input */}
        <div className="p-0 flex flex-col h-[400px]">
          <div className="p-3 bg-white border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-widest">Test String</h3>
            <button onClick={() => setTestString('')} className="text-[10px] text-gray-400 hover:text-red-500 font-bold uppercase">Clear</button>
          </div>
          <textarea
            value={testString}
            onChange={(e) => setTestString(e.target.value)}
            placeholder="Paste the text you want to search here..."
            className="w-full flex-1 p-4 bg-gray-50 font-mono text-sm resize-none focus:outline-none focus:ring-inset focus:ring-2 focus:ring-blue-50"
            spellCheck="false"
          />
        </div>

        {/* Results Output */}
        <div className="p-0 flex flex-col h-[400px] bg-white relative">
          <div className="p-3 border-b border-gray-200 flex justify-between items-center bg-white sticky top-0 z-10 shadow-sm">
             <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-widest">
                Matches & Extractions
             </h3>
             <span className="text-xs font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded">
                {matches.length} {matches.length === 1 ? 'Match' : 'Matches'}
             </span>
          </div>
          
          <div className="flex-1 overflow-auto p-4 space-y-4 bg-gray-50/50">
             {matches.length === 0 ? (
                 <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-2">
                     <svg className="w-8 h-8 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                     <p className="text-sm">No matches found.</p>
                 </div>
             ) : (
                 matches.map((m, i) => (
                     <div key={i} className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow">
                         <div className="flex justify-between items-center mb-2 pb-2 border-b border-gray-100">
                             <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Match #{i + 1}</span>
                             <span className="text-[10px] font-mono text-gray-400">Index: {m.index}</span>
                         </div>
                         <div className="font-mono text-sm text-gray-900 bg-green-50 px-3 py-2 rounded border border-green-100 break-all">
                             {m.fullMatch}
                         </div>
                         
                         {/* Named Capture Groups */}
                         {m.groups && Object.keys(m.groups).length > 0 && (
                             <div className="mt-3">
                                 <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Named Groups</h4>
                                 <div className="space-y-1">
                                     {Object.entries(m.groups).map(([key, val]) => (
                                         <div key={key} className="flex text-xs font-mono">
                                             <span className="text-purple-600 w-24 flex-shrink-0">{key}:</span>
                                             <span className="text-gray-700 break-all">{String(val)}</span>
                                         </div>
                                     ))}
                                 </div>
                             </div>
                         )}

                         {/* Numbered Captures (Only show if there are captures AND no named groups, logic simplified for display) */}
                         {m.captures.length > 0 && (!m.groups || Object.keys(m.groups).length === 0) && (
                             <div className="mt-3">
                                 <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Capture Groups</h4>
                                 <div className="space-y-1">
                                     {m.captures.map((val: string, idx: number) => val !== undefined && (
                                         <div key={idx} className="flex text-xs font-mono">
                                             <span className="text-purple-600 w-8 flex-shrink-0">#{idx + 1}:</span>
                                             <span className="text-gray-700 break-all">{val}</span>
                                         </div>
                                     ))}
                                 </div>
                             </div>
                         )}

                     </div>
                 ))
             )}
          </div>
        </div>
      </div>
    </div>
  );
}
