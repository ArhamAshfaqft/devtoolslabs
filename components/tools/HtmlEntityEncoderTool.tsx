"use client";

import React, { useState } from "react";

export default function HtmlEntityEncoderTool() {
  const [inputText, setInputText] = useState<string>("");
  const [outputText, setOutputText] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

  // Use the native browser DOM to safely encode all HTML entities
  const encodeHtmlEntities = (str: string) => {
    if (typeof window === "undefined") return str; // SSR guard
    const textarea = document.createElement("textarea");
    textarea.innerText = str;
    return textarea.innerHTML.replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  };

  const handleEncode = () => {
    setOutputText(encodeHtmlEntities(inputText));
    setCopied(false); // Reset copy state on new encode
  };

  const handleCopy = () => {
    if (!outputText) return;
    navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clearInputs = () => {
    setInputText("");
    setOutputText("");
    setCopied(false);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Input Text Area */}
        <div className="space-y-2">
           <label className="block text-sm font-semibold text-gray-700">Raw Text / HTML</label>
           <textarea
             value={inputText}
             onChange={(e) => setInputText(e.target.value)}
             placeholder='<h1>Hello & Welcome!</h1>'
             className="w-full h-64 p-4 font-mono text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-y shadow-sm"
             spellCheck="false"
           />
        </div>

        {/* Output Text Area */}
        <div className="space-y-2 relative">
           <label className="block text-sm font-semibold text-gray-700">Encoded HTML Entities</label>
           <div className="relative">
             <textarea
               value={outputText}
               readOnly
               placeholder='&lt;h1&gt;Hello &amp; Welcome!&lt;/h1&gt;'
               className="w-full h-64 p-4 font-mono text-sm bg-gray-50 border border-gray-300 rounded-lg outline-none resize-y shadow-sm"
               spellCheck="false"
             />
             {outputText && (
               <button
                 onClick={handleCopy}
                 className={`absolute top-4 right-4 px-3 py-1.5 rounded-md text-sm font-semibold transition-all duration-200 ${
                   copied
                     ? "bg-green-100 text-green-700 border border-green-300 shadow-sm"
                     : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 shadow-sm"
                 }`}
               >
                 {copied ? "Copied!" : "Copy Output"}
               </button>
             )}
           </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl border border-gray-200 shadow-sm">
        <button
          onClick={clearInputs}
          className="px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded hover:bg-gray-100 font-medium transition-colors"
        >
          Clear
        </button>
        <button
          onClick={handleEncode}
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition duration-200 shadow-sm flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
          Encode Entities
        </button>
      </div>
    </div>
  );
}
