'use client';
import React, { useState } from 'react';

export default function HtmlEntityDecoderTool() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const handleDecode = () => {
    if (!input) return;
    try {
      const textarea = document.createElement("textarea");
      textarea.innerHTML = input;
      setOutput(textarea.value);
      setCopied(false);
    } catch (e) {
      setOutput("Error decoding input.");
    }
  };

  const handleEncode = () => {
    if (!input) return;
    try {
      const textarea = document.createElement("textarea");
      textarea.textContent = input;
      setOutput(textarea.innerHTML);
      setCopied(false);
    } catch (e) {
      setOutput("Error encoding input.");
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
        <label className="block text-sm font-semibold text-gray-900 mb-2">Input Text or HTML Entities</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="&lt;div class=&quot;test&quot;&gt;Hello&lt;/div&gt;"
          className="w-full h-40 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none transition-colors font-mono text-sm bg-gray-50 text-gray-900"
        ></textarea>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button onClick={handleDecode} className="px-5 py-2.5 bg-gray-900 text-white font-medium text-sm rounded-lg hover:bg-gray-800 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900">
          Decode Entities
        </button>
        <button onClick={handleEncode} className="px-5 py-2.5 bg-white text-gray-900 border border-gray-300 font-medium text-sm rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300">
          Encode to Entities
        </button>
      </div>

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
          className="w-full h-40 p-4 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 font-mono text-sm outline-none"
        ></textarea>
      </div>
    </div>
  );
}

