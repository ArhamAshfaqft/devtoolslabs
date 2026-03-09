'use client';
import React, { useState, useEffect } from 'react';

export default function CurlToFetchTool() {
  const [input, setInput] = useState("curl 'https://api.github.com/repos/tj/commander.js' \\\n  -H 'Accept: application/vnd.github.v3+json' \\\n  -H 'Authorization: token YOUR_TOKEN'");
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!input.trim() || !input.trim().startsWith('curl')) {
      setOutput('');
      setError('Input must be a valid cURL command starting with "curl".');
      return;
    }

    const parseCommand = async () => {
      try {
        const response = await fetch('/api/curl-to-fetch', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ curlString: input })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || 'Server parsing error');
        }
        
        setOutput(data.result);
        setError('');
      } catch (err: any) {
        setError(err.message || 'Failed to parse cURL command syntax.');
        setOutput('');
      }
    };

    parseCommand();
  }, [input]);

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex flex-col md:flex-row gap-4 border border-gray-200 p-4 rounded-lg bg-gray-50 items-center justify-between">
        <div className="flex items-center gap-3">
           <span className="px-3 py-1 bg-gray-900 text-white rounded text-xs font-bold tracking-widest uppercase">cURL</span>
           <span className="text-gray-400 font-bold">→</span>
           <span className="px-3 py-1 bg-yellow-400 text-yellow-900 rounded text-xs font-bold tracking-widest uppercase">JavaScript fetch()</span>
        </div>
        
        <button 
          onClick={handleCopy}
          disabled={!output}
          className="w-full md:w-auto px-6 py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-lg hover:bg-gray-800 transition-colors focus:ring-4 focus:ring-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Copy Code snippet
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <div className="flex justify-between items-center mb-2">
             <label className="block text-sm font-semibold text-gray-900">Bash cURL Command</label>
             {error && <span className="text-xs font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded max-w-xs text-right truncate">{error}</span>}
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="curl -X POST https://api.example.com..."
            className={`w-full h-[400px] p-4 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none transition-colors font-mono text-sm bg-gray-900 text-green-400 ${error ? 'border-red-300' : 'border-gray-300'}`}
            spellCheck="false"
          ></textarea>
        </div>

        <div>
           <label className="block text-sm font-semibold text-gray-900 mb-2">JavaScript Output</label>
          <textarea
            readOnly
            value={output}
            placeholder="// fetch() code will generate here"
            className="w-full h-[400px] p-4 border border-gray-300 rounded-lg bg-gray-50 font-mono text-sm outline-none text-blue-900"
            spellCheck="false"
          ></textarea>
        </div>
      </div>
    </div>
  );
}
