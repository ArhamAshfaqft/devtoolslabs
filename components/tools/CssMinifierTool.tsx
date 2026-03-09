'use client';
import React, { useState, useEffect } from 'react';

export default function CssMinifierTool() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [stats, setStats] = useState({ original: 0, minified: 0, saved: 0, percent: 0 });

  // Options
  const [removeComments, setRemoveComments] = useState(true);
  const [removeLastSemicolon, setRemoveLastSemicolon] = useState(true);

  const minifyCss = () => {
    if (!input) {
      setOutput('');
      setStats({ original: 0, minified: 0, saved: 0, percent: 0 });
      return;
    }

    let minified = input;

    if (removeComments) {
      // Remove /* comments */
      minified = minified.replace(/\/\*[\s\S]*?\*\//g, '');
    }

    // Collapse whitespace
    minified = minified.replace(/\s+/g, ' ');

    // Remove spaces around the most common CSS tokens
    minified = minified.replace(/\s*([{}:;,!])\s*/g, '$1');

    if (removeLastSemicolon) {
      // Remove semicolon right before closing brace
      minified = minified.replace(/;}/g, '}');
    }

    // Trim edge spaces
    minified = minified.trim();

    setOutput(minified);

    // Calculate compression stats
    const origSize = new Blob([input]).size;
    const minSize = new Blob([minified]).size;
    const diff = origSize - minSize;
    const pct = origSize > 0 ? ((diff / origSize) * 100).toFixed(1) : '0.0';

    setStats({
      original: origSize,
      minified: minSize,
      saved: diff,
      percent: parseFloat(pct)
    });
  };

  useEffect(() => {
    minifyCss();
  }, [input, removeComments, removeLastSemicolon]);

  const handleCopy = () => {
    if (output) navigator.clipboard.writeText(output);
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      
      {/* Options Bar */}
      <div className="bg-gray-50 border-b border-gray-200 p-4 flex flex-wrap gap-6 items-center">
        <span className="font-semibold text-sm text-gray-700 uppercase tracking-widest hidden md:inline-block">Settings</span>
        <label className="flex items-center gap-2 text-sm text-gray-800 cursor-pointer hover:text-blue-600 transition-colors">
          <input 
            type="checkbox" 
            checked={removeComments} 
            onChange={e => setRemoveComments(e.target.checked)} 
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          Remove Defaults & Comments
        </label>
        <label className="flex items-center gap-2 text-sm text-gray-800 cursor-pointer hover:text-blue-600 transition-colors">
          <input 
            type="checkbox" 
            checked={removeLastSemicolon} 
            onChange={e => setRemoveLastSemicolon(e.target.checked)} 
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          Remove Final Semicolon
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200">
        
        {/* Input */}
        <div className="p-0 flex flex-col h-[450px]">
          <div className="p-3 bg-white border-b border-gray-200 flex justify-between items-center">
             <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Original CSS</h3>
             <button onClick={() => setInput('')} className="text-xs text-blue-600 hover:underline">Clear</button>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="/* Paste your CSS styling here */&#10;.card {&#10;  background-color: #ffffff;&#10;  border-radius: 8px;&#10;  padding: 1rem;&#10;}"
            className="w-full flex-1 p-4 bg-gray-50 font-mono text-sm resize-none focus:outline-none focus:ring-inset focus:ring-2 focus:ring-blue-500 text-gray-800"
            spellCheck="false"
          />
        </div>

        {/* Output */}
        <div className="p-0 flex flex-col h-[450px]">
          <div className="p-3 bg-white border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Minified CSS</h3>
            <button 
              onClick={handleCopy} 
              disabled={!output} 
              className="text-xs font-medium text-white bg-blue-600 border border-transparent px-4 py-1.5 rounded hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              Copy Minified
            </button>
          </div>
          <textarea
            value={output}
            readOnly
            placeholder="Minified output will appear here..."
            className="w-full flex-1 p-4 bg-[#1e1e1e] font-mono text-sm resize-none outline-none text-[#cfb666] break-all whitespace-pre-wrap"
            spellCheck="false"
          />
        </div>

      </div>

      {/* Analytics Bar */}
      <div className="bg-gray-50 border-t border-gray-200 p-4 flex flex-wrap gap-8 justify-center md:justify-start items-center text-sm">
         <div className="flex flex-col">
           <span className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Original Size</span>
           <span className="font-mono text-gray-900 font-semibold">{formatBytes(stats.original)}</span>
         </div>
         <div className="flex flex-col">
           <span className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Minified Size</span>
           <span className="font-mono text-gray-900 font-semibold">{formatBytes(stats.minified)}</span>
         </div>
         <div className="flex flex-col">
           <span className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Bytes Saved</span>
           <span className="font-mono text-green-600 font-semibold">{formatBytes(stats.saved)}</span>
         </div>
         <div className="flex flex-col">
           <span className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Compression Ratio</span>
           <span className="font-mono text-blue-600 font-bold">{stats.percent}% Smaller</span>
         </div>
      </div>
    </div>
  );
}
