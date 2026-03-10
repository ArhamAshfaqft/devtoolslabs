"use client";

import React, { useState } from "react";

export default function HttpHeaderParserTool() {
  const [rawHeaders, setRawHeaders] = useState<string>("");
  const [parsedHeaders, setParsedHeaders] = useState<Record<string, string> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const parseHeaders = () => {
    setError(null);
    setCopied(false);
    
    if (!rawHeaders.trim()) {
      setParsedHeaders(null);
      return;
    }

    try {
      const lines = rawHeaders.split(/\r?\n/);
      const result: Record<string, string> = {};
      let parseCount = 0;

      lines.forEach(line => {
        // Skip empty lines or request/status lines (e.g. GET / HTTP/1.1 or HTTP/2 200)
        if (!line.trim() || line.startsWith("HTTP/") || /^[A-Z]+\s+\//.test(line)) {
          return;
        }

        const colonIndex = line.indexOf(':');
        if (colonIndex > 0) {
          const key = line.substring(0, colonIndex).trim();
          const value = line.substring(colonIndex + 1).trim();
          
          if (key) {
            // Handle duplicate headers by appending with comma, per HTTP spec
            if (result[key]) {
               result[key] = `${result[key]}, ${value}`;
            } else {
               result[key] = value;
            }
            parseCount++;
          }
        }
      });

      if (parseCount === 0) {
        setError("No valid HTTP headers found. Ensure your text contains 'Key: Value' pairs.");
        setParsedHeaders(null);
      } else {
        setParsedHeaders(result);
      }

    } catch (err) {
      setError("Failed to parse headers. Ensure the format is standard raw HTTP headers.");
      setParsedHeaders(null);
    }
  };

  const handleCopy = () => {
    if (!parsedHeaders) return;
    navigator.clipboard.writeText(JSON.stringify(parsedHeaders, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clearInputs = () => {
    setRawHeaders("");
    setParsedHeaders(null);
    setError(null);
    setCopied(false);
  };

  const loadSample = () => {
    setRawHeaders(`HTTP/2 200 OK
date: Thu, 01 Jan 2026 12:00:00 GMT
content-type: application/json; charset=utf-8
content-length: 1234
server: Vercel
cache-control: public, max-age=0, must-revalidate
strict-transport-security: max-age=63072000; includeSubDomains; preload
x-content-type-options: nosniff
x-frame-options: DENY
x-xss-protection: 1; mode=block`);
    setTimeout(parseHeaders, 50);
  };

  return (
    <div className="space-y-6">
      
      <div className="flex justify-end mb-2">
        <button
          onClick={loadSample}
          className="text-sm text-blue-600 hover:text-blue-800 font-medium"
        >
          Load Sample
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Input */}
        <div className="space-y-2 relative">
          <label className="block text-sm font-semibold text-gray-700">Raw HTTP Headers</label>
          <textarea
            value={rawHeaders}
            onChange={(e) => setRawHeaders(e.target.value)}
            placeholder={"Host: api.example.com\nAuthorization: Bearer token123\nAccept: application/json"}
            className="w-full h-80 p-4 font-mono text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none shadow-sm whitespace-pre"
            spellCheck={false}
          />
        </div>

        {/* Output */}
        <div className="space-y-2 relative">
          <label className="block text-sm font-semibold text-gray-700 flex justify-between">
            Parsed JSON Object
            {parsedHeaders && (
               <span className="text-gray-400 font-normal">
                 {Object.keys(parsedHeaders).length} keys
               </span>
            )}
          </label>
          <div className="relative">
            <textarea
              value={parsedHeaders ? JSON.stringify(parsedHeaders, null, 2) : ""}
              readOnly
              placeholder='{\n  "Host": "api.example.com",\n  "Authorization": "Bearer token123"\n}'
              className="w-full h-80 p-4 font-mono text-sm border border-gray-300 rounded-lg outline-none resize-none bg-gray-50 shadow-sm whitespace-pre"
              spellCheck={false}
            />
            {parsedHeaders && (
              <button
                onClick={handleCopy}
                className={`absolute top-4 right-4 px-3 py-1.5 rounded-md text-xs font-semibold transition-all duration-200 ${
                  copied
                    ? "bg-green-100 text-green-700 border border-green-300"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 shadow-sm"
                }`}
              >
                {copied ? "Copied JSON!" : "Copy JSON"}
              </button>
            )}
          </div>
        </div>

      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm flex items-center gap-2">
           <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
           {error}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl border border-gray-200 shadow-sm">
        <button
          onClick={clearInputs}
          className="px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded hover:bg-gray-100 font-medium transition-colors"
        >
          Clear
        </button>
        <button
          onClick={parseHeaders}
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition duration-200 shadow-sm flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" /></svg>
          Parse Headers
        </button>
      </div>

    </div>
  );
}
