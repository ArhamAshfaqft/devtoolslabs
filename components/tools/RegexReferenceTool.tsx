'use client';
import React, { useState, useMemo } from 'react';

interface RegexPattern {
  id: string;
  name: string;
  pattern: string;
  description: string;
  category: 'Validation' | 'Data Extraction' | 'Frontend' | 'System';
}

const REGEX_LIBRARY: RegexPattern[] = [
  { id: 'email', name: 'Email Address', pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$', description: 'Standard RFC 5322 compliant email validation.', category: 'Validation' },
  { id: 'ipv4', name: 'IPv4 Address', pattern: '^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$', description: 'Validates standard 32-bit IP addresses.', category: 'System' },
  { id: 'url', name: 'URL (HTTP/HTTPS)', pattern: '^(https?:\\/\\/)?([\\da-z\\.-]+)\\.([a-z\\.]{2,6})([\\/\\w \\.-]*)*\\/?$', description: 'Matches standard web addresses with optional protocol.', category: 'Frontend' },
  { id: 'date-iso', name: 'ISO Date (YYYY-MM-DD)', pattern: '^\\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$', description: 'Matches the standard ISO 8601 date format.', category: 'Data Extraction' },
  { id: 'phone-us', name: 'Phone Number (US)', pattern: '^\\+?\\d{1,4}?[-.\\s]?\\(?\\d{1,3}?\\)?[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,9}$', description: 'Flexible US and international phone formats.', category: 'Validation' },
  { id: 'credit-card', name: 'Credit Card (General)', pattern: '^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\\d{3})\\d{11})$', description: 'Matches Visa, Mastercard, Amex, and more.', category: 'Validation' },
  { id: 'password-strong', name: 'Strong Password', pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{12,}$', description: 'Min 12 chars, 1 uppercase, 1 number, 1 special char.', category: 'Validation' },
  { id: 'html-tag', name: 'HTML Tag', pattern: '<(\\/?[a-zA-Z0-9]+)(\\s+[^>]*?)?>', description: 'Extracts opening and closing HTML tags.', category: 'Data Extraction' },
  { id: 'color-hex', name: 'Hex Color Code', pattern: '^#?([a-fA-G0-9]{3}|[a-fA-G0-9]{6})$', description: 'Validates 3 or 6 digit hex color strings.', category: 'Frontend' },
  { id: 'username', name: 'Username (Alphanumeric)', pattern: '^[a-zA-Z0-9_]{3,16}$', description: '3-16 chars, alphanumeric and underscores.', category: 'Validation' },
  { id: 'uuid', name: 'UUID (Version 4)', pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$', description: 'Strict validation for v4 UUID strings.', category: 'System' },
  { id: 'slug', name: 'URL Slug', pattern: '^[a-z0-9]+(?:-[a-z0-9]+)*$', description: 'Lowercase, hyphen-separated permalinks.', category: 'Frontend' },
];

export default function RegexReferenceTool() {
  const [query, setQuery] = useState('');
  const [copyingId, setCopyingId] = useState<string | null>(null);

  const filteredPatterns = useMemo(() => {
    return REGEX_LIBRARY.filter(p => 
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase()) ||
      p.category.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  const handleCopy = (pattern: string, id: string) => {
    navigator.clipboard.writeText(pattern);
    setCopyingId(id);
    setTimeout(() => setCopyingId(null), 2000);
  };

  return (
    <div className="flex flex-col gap-10 w-full max-w-5xl mx-auto">
      
      {/* Search Header */}
      <div className="relative group max-w-2xl mx-auto w-full">
         <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
         </div>
         <input 
            type="text" 
            placeholder="Search email, IP, password patterns..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-14 pr-6 py-5 bg-white border border-gray-200 rounded-2xl text-lg font-poppins focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 outline-none transition-all shadow-sm"
         />
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         {filteredPatterns.length > 0 ? filteredPatterns.map((p) => (
            <div key={p.id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-md transition-all group">
               <div className="p-6 flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                     <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500 bg-blue-50 px-2 py-1 rounded">
                        {p.category}
                     </span>
                     <h4 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{p.name}</h4>
                  </div>
                  
                  <div className="relative">
                      <div className="w-full bg-gray-900 text-blue-300 font-mono text-sm p-4 rounded-xl overflow-x-auto whitespace-nowrap scrollbar-hide">
                         <code>{p.pattern}</code>
                      </div>
                      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-gray-900 pointer-events-none"></div>
                  </div>

                  <p className="text-xs text-gray-500 leading-relaxed min-h-[32px]">
                     {p.description}
                  </p>

                  <div className="pt-2">
                     <button 
                        onClick={() => handleCopy(p.pattern, p.id)}
                        className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                           copyingId === p.id ? 'bg-green-100 text-green-700' : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200'
                        }`}
                     >
                        {copyingId === p.id ? (
                           <>
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                              Copied Pattern
                           </>
                        ) : (
                           <>
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                              Copy Pattern
                           </>
                        )}
                     </button>
                  </div>
               </div>
            </div>
         )) : (
            <div className="col-span-full py-20 text-center text-gray-400 font-medium">
               No matching regex patterns found found. Try "Password" or "System".
            </div>
         )}
      </div>

      {/* SEO Footer */}
      <div className="bg-blue-50/50 border border-blue-100 rounded-3xl p-10 flex flex-col gap-6">
         <h5 className="text-sm font-black text-gray-900 uppercase tracking-widest text-center">Mastering Regular Expressions</h5>
         <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-xs text-gray-600 leading-relaxed font-medium">
            <div className="flex flex-col gap-2">
               <span className="text-blue-600 font-bold uppercase tracking-wider text-[10px]">What is ^ and $?</span>
               <p>These are 'anchors'. ^ matches the beginning of a string, and $ matches the end. Together, they ensure the entire string matches your pattern exactly.</p>
            </div>
            <div className="flex flex-col gap-2">
               <span className="text-blue-600 font-bold uppercase tracking-wider text-[10px]">The Power of + and *</span>
               <p>Quantifiers! + means 'one or more' of the preceding character, while * means 'zero or more'. Use ? to make a search 'lazy' or optional.</p>
            </div>
            <div className="flex flex-col gap-2">
               <span className="text-blue-600 font-bold uppercase tracking-wider text-[10px]">What are [ ] brackets?</span>
               <p>Character sets. [a-z] matches any lowercase letter. [^0-9] matches anything that IS NOT a number. Very useful for strict filtering.</p>
            </div>
         </div>
      </div>
    </div>
  );
}
