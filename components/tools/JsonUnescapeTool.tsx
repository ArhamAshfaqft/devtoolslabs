'use client';

import React, { useState, useCallback } from 'react';
import Editor from '@monaco-editor/react';

export default function JsonUnescapeTool() {
  const [input, setInput] = useState<string>('{\n  "log_message": "{\\\"status\\\": \\\"success\\\", \\\"code\\\": 200, \\\"data\\\": \\\"User registered successfully\\\\nWelcome aboard!\\\"}"\n}');
  const [error, setError] = useState<string | null>(null);

  const handleUnescape = useCallback(() => {
    try {
      setError(null);
      
      // Step 1: Attempt to unquote/unescape the string if it's wrapped in quotes
      let processed = input.trim();
      
      // Remove wrapping quotes if present
      if (processed.startsWith('"') && processed.endsWith('"')) {
        processed = processed.substring(1, processed.length - 1);
      }

      // Step 2: Unescape common sequences
      processed = processed
        .replace(/\\"/g, '"')
        .replace(/\\\\/g, '\\')
        .replace(/\\n/g, '\n')
        .replace(/\\r/g, '\r')
        .replace(/\\t/g, '\t');

      // Step 3: Attempt to parse and re-format as clean JSON
      try {
        const parsed = JSON.parse(processed);
        setInput(JSON.stringify(parsed, null, 2));
      } catch (jsonErr) {
        // If it's not valid JSON yet, just show the unescaped string
        setInput(processed);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to unescape string');
    }
  }, [input]);

  const handleCopy = () => {
    navigator.clipboard.writeText(input);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Escaped JSON / String</label>
          <div className="flex gap-2">
            <button 
              onClick={handleUnescape}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-sm transition-all shadow-md flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Clean & Unescape
            </button>
            <button 
              onClick={handleCopy}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-bold text-sm transition-all border border-gray-200 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              </svg>
              Copy
            </button>
          </div>
        </div>
        
        <div className="h-[500px] border border-gray-200 rounded-xl overflow-hidden shadow-inner bg-white">
          <Editor
            height="100%"
            defaultLanguage="json"
            theme="vs-light"
            value={input}
            onChange={(value) => setInput(value || '')}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              scrollBeyondLastLine: false,
              wordWrap: 'on',
              automaticLayout: true,
              padding: { top: 16, bottom: 16 }
            }}
          />
        </div>
        
        {error && (
          <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm font-bold flex items-center gap-3 rounded-r-lg">
             {error}
          </div>
        )}
      </div>

      <div className="prose prose-blue max-w-none bg-blue-50/30 p-8 rounded-2xl border border-blue-100">
        <h3 className="text-blue-900 border-none">Expert Insight: Solving the "Leaky Abstraction" of Escaped JSON</h3>
        <p className="text-gray-700 leading-relaxed">
          Escaped JSON is one of the most frustrating obstacles for developers debugging cloud logs (AWS CloudWatch, Datadog) or handling legacy database fields. It occurs when a JSON object is stored as a string within another JSON object, leading to a "backslash explosion" (e.g., <code>\\\\\\"key\\\\\\"</code>).
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-white p-5 rounded-xl shadow-sm border border-blue-50">
            <h4 className="text-sm font-black uppercase text-blue-600 mb-3 border-none">Multi-Layer Unescaping</h4>
            <p className="text-xs text-gray-600 leading-relaxed">
               Our tool doesn't just run a simple regex. It intelligently handles double-quoted wrappers and common escape sequences like <code>\\n</code> and <code>\\t</code>, preparing the string for deep structural analysis.
            </p>
          </div>
          <div className="bg-white p-5 rounded-xl shadow-sm border border-blue-50">
            <h4 className="text-sm font-black uppercase text-blue-600 mb-3 border-none">Auto-Format Logic</h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              Once successfully unescaped, our engine attempts a <strong>Semantic JSON Parse</strong>. If valid, it reformats the data with 2-space indentation, turning a messy log line into a readable blueprint instantly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
