'use client';
import React, { useState } from 'react';

export default function JsonEscapeTool() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleEscape = () => {
    try {
      if (!input.trim()) return;
      let toEscape = input;
      try {
        const parsed = JSON.parse(input);
        if (typeof parsed === 'object' && parsed !== null) {
          toEscape = JSON.stringify(parsed);
        } else if (typeof parsed === 'string') {
          toEscape = parsed;
        }
      } catch (e) {
        // Not a JSON object, treat as raw text
      }
      setOutput(JSON.stringify(toEscape));
      setError('');
      setCopied(false);
    } catch (err) {
      setError('Error escaping input. Ensure it is valid text or JSON.');
      setOutput('');
    }
  };

  const handleUnescape = () => {
    try {
      if (!input.trim()) return;
      let parsed = JSON.parse(input);
      if (typeof parsed === 'string') {
          try {
              const nested = JSON.parse(parsed);
              if (typeof nested === 'object') {
                  parsed = JSON.stringify(nested, null, 2);
              }
          } catch (e) {
               // Leave as is
          }
      } else if (typeof parsed === 'object') {
          parsed = JSON.stringify(parsed, null, 2);
      }
      
      setOutput(typeof parsed === 'string' ? parsed : JSON.stringify(parsed, null, 2));
      setError('');
      setCopied(false);
    } catch (err) {
      setError('Invalid format. Ensure your input is a valid stringified JSON (e.g., wrapped in quotes).');
      setOutput('');
    }
  };

  const copyToClipboard = () => {
    if (output) {
      navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">Input JSON or stringified text</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='{"name": "example"}'
          className="w-full h-48 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none transition-colors font-mono text-sm bg-gray-50 text-gray-900"
        ></textarea>
      </div>
      
      <div className="flex flex-wrap items-center gap-3">
        <button onClick={handleEscape} className="px-5 py-2.5 bg-gray-900 text-white font-medium text-sm rounded-lg hover:bg-gray-800 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900">
          Escape JSON
        </button>
        <button onClick={handleUnescape} className="px-5 py-2.5 bg-white text-gray-900 border border-gray-300 font-medium text-sm rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300">
          Unescape JSON
        </button>
      </div>
      
      {error && <div className="p-4 bg-red-50 text-red-700 border border-red-200 rounded-lg text-sm font-medium">{error}</div>}
      
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-semibold text-gray-900">Result Output</label>
          <button onClick={copyToClipboard} className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-1">
            {copied ? (
              <span className="text-green-600">Copied!</span>
            ) : (
              <span>Copy to Clipboard</span>
            )}
          </button>
        </div>
        <textarea
          readOnly
          value={output}
          placeholder="Result will appear here..."
          className="w-full h-48 p-4 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 font-mono text-sm outline-none"
        ></textarea>
      </div>
    </div>
  );
}

