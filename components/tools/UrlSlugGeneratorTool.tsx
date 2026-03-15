'use client';
import React, { useState, useEffect } from 'react';

export default function UrlSlugGeneratorTool() {
  const [input, setInput] = useState('How to Create an SEO-Friendly URL Slug in 2026!');
  const [slug, setSlug] = useState('');
  
  // Options
  const [lowercase, setLowercase] = useState(true);
  const [removeStopWords, setRemoveStopWords] = useState(false);
  const [separator, setSeparator] = useState<'-' | '_'>('-');

  const STOP_WORDS = new Set([
    'a', 'an', 'and', 'are', 'as', 'at', 'be', 'but', 'by', 'for', 'if', 'in', 'into', 'is', 'it', 'no', 'not', 'of', 'on', 'or', 'such', 'that', 'the', 'their', 'then', 'there', 'these', 'they', 'this', 'to', 'was', 'will', 'with'
  ]);

  useEffect(() => {
    let str = input;

    // 1. Lowercase (optional but standard)
    if (lowercase) {
      str = str.toLowerCase();
    }

    // 2. Remove accents/diacritics
    str = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    // 3. Remove stop words
    if (removeStopWords) {
      // Split by non-word characters
      let words = str.split(/\W+/).filter(Boolean);
      words = words.filter(w => !STOP_WORDS.has(w.toLowerCase()));
      str = words.join(' ');
    }

    // 4. Replace invalid characters with spaces
    // Only allow alphanumeric, spaces, hyphens, and underscores initially
    str = str.replace(/[^a-zA-Z0-9\s\-_]/g, ' ');

    // 5. Replace spaces/multiple separators with the chosen separator
    if (separator === '-') {
       str = str.replace(/[\s_]+/g, '-');
    } else {
       str = str.replace(/[\s-]+/g, '_');
    }

    // 6. Trim trailing/leading separators
    const regex = new RegExp(`^\\${separator}+|\\${separator}+$`, 'g');
    str = str.replace(regex, '');

    setSlug(str);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input, lowercase, removeStopWords, separator]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(slug);
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        
        {/* Input Area */}
        <div className="p-6 border-b border-gray-100 bg-gray-50 flex flex-col gap-4">
          <div>
              <label className="block text-sm font-bold text-gray-800 uppercase tracking-widest mb-2">Original Text / Blog Title</label>
              <textarea 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Enter your title here..."
                  className="w-full h-24 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-y text-lg text-gray-900"
              />
          </div>

          {/* Options */}
          <div className="flex flex-wrap gap-6 items-center bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
             <label className="flex items-center gap-2 cursor-pointer text-sm font-semibold text-gray-700">
                <input 
                  type="checkbox" 
                  checked={lowercase}
                  onChange={(e) => setLowercase(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                Force Lowercase
             </label>

             <label className="flex items-center gap-2 cursor-pointer text-sm font-semibold text-gray-700">
                <input 
                  type="checkbox" 
                  checked={removeStopWords}
                  onChange={(e) => setRemoveStopWords(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                Remove Stop Words (a, the, is)
             </label>

             <div className="flex items-center gap-3 border-l border-gray-200 pl-6 ml-auto">
                <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">Separator</span>
                <div className="flex bg-gray-100 p-1 rounded-lg">
                    <button 
                       onClick={() => setSeparator('-')}
                       className={`px-3 py-1 rounded text-sm font-bold transition-colors ${separator === '-' ? 'bg-white shadow text-blue-600' : 'text-gray-500 hover:text-gray-900'}`}
                    >
                        Hyphen (-)
                    </button>
                    <button 
                       onClick={() => setSeparator('_')}
                       className={`px-3 py-1 rounded text-sm font-bold transition-colors ${separator === '_' ? 'bg-white shadow text-blue-600' : 'text-gray-500 hover:text-gray-900'}`}
                    >
                        Underscore (_)
                    </button>
                </div>
             </div>
          </div>
        </div>

        {/* Output Area */}
        <div className="p-8 bg-white flex flex-col items-center justify-center min-h-[200px]">
           <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Generated URL Slug</span>
           
           {slug ? (
               <div className="relative group w-full text-center">
                  <div className="text-2xl md:text-4xl font-mono font-bold text-gray-900 break-all select-all selection:bg-blue-100 px-4">
                     {slug}
                  </div>
                  <div className="mt-8">
                     <button 
                        onClick={copyToClipboard}
                        className="mx-auto px-6 py-3 bg-gray-900 text-white font-bold rounded-lg shadow-sm hover:bg-gray-800 transition-colors flex items-center gap-2 focus:ring-4 focus:ring-gray-200"
                     >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                        Copy Slug to Clipboard
                     </button>
                  </div>
               </div>
           ) : (
               <div className="text-gray-400 font-medium italic">
                  Start typing to generate a slug...
               </div>
           )}
        </div>

      </div>
    </div>
  );
}
