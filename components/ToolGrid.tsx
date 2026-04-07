'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface Tool {
  id: string;
  name: string;
  description: string;
  href: string;
  categories: string[];
  isHot?: boolean;
}

const ALL_TOOLS: Tool[] = [
  {
    id: 'html-to-elementor',
    name: 'HTML to Elementor JSON',
    description: 'Convert raw HTML snippets into perfectly formatted Elementor JSON templates for instant import.',
    href: '/html-to-elementor',
    categories: ['Frontend', 'Web'],
    isHot: true,
  },
  {
    id: 'json-to-excel',
    name: 'JSON to Excel Converter',
    description: 'Convert nested JSON arrays into professional Excel (.xlsx) spreadsheets with recursive flattening.',
    href: '/json-to-excel',
    categories: ['JSON', 'Data Parsing'],
    isHot: true,
  },
  {
    id: 'json-unescape',
    name: 'JSON Unescape Tool',
    description: 'Instantly remove backslashes and fix doubly-escaped JSON strings for clean inspection.',
    href: '/json-unescape',
    categories: ['JSON', 'Formatting'],
    isHot: true,
  },
  {
    id: 'yaml-formatter',
    name: 'YAML Formatter',
    description: 'Beautify and validate YAML configuration files with specialized indentation fixing for DevOps workflows.',
    href: '/yaml-formatter',
    categories: ['Formatting', 'Data Parsing'],
    isHot: true,
  },
  {
    id: 'json-to-yaml',
    name: 'JSON to YAML Converter',
    description: 'Transform nested JSON payloads into professional, human-readable YAML for CI/CD and config management.',
    href: '/json-to-yaml',
    categories: ['JSON', 'Data Parsing'],
    isHot: true,
  },
  {
    id: 'yaml-to-json',
    name: 'YAML to JSON Converter',
    description: 'Instantly convert complex YAML files into valid JSON with strict schema validation and safe-loading.',
    href: '/yaml-to-json',
    categories: ['JSON', 'Data Parsing'],
    isHot: true,
  },
  {
    id: 'json-from-array',
    name: 'JSON From Array',
    description: 'Visually construct JSON arrays using a spreadsheet-like table interface with dynamic type inference.',
    href: '/json-from-array',
    categories: ['JSON', 'Data Parsing'],
    isHot: true,
  },
  {
    id: 'json-diff',
    name: 'JSON Diff Tool',
    description: 'Professional side-by-side JSON comparison with Semantic (key-order agnostic) matching.',
    href: '/json-diff',
    categories: ['JSON', 'Data Parsing'],
    isHot: true,
  },
  {
    id: 'xml-to-json',
    name: 'XML to JSON Converter',
    description: 'Professional grade XML to JSON transformation with attribute preservation and array-force modes.',
    href: '/xml-to-json',
    categories: ['Data Parsing'],
    isHot: true,
  },
  {
    id: 'jwt-decoder',
    name: 'JWT Decoder & Encoder',
    description: 'Decode, verify, and generate JSON Web Tokens locally. 100% client-side privacy using the Web Crypto API.',
    href: '/jwt-decoder',
    categories: ['Security', 'Web', 'Data Parsing'],
    isHot: true,
  },
  {
    id: 'css-background-patterns',
    name: 'CSS Background Pattern Generator',
    description: 'Instantly generate professional, interactive background code using pure CSS and Canvas.',
    href: '/css-background-patterns',
    categories: ['Design', 'Frontend'],
    isHot: true,
  },
  {
    id: 'dns-lookup',
    name: 'DNS Lookup Tool',
    description: 'Query global A, MX, TXT, and CNAME records instantly via secure DNS over HTTPS.',
    href: '/dns-lookup',
    categories: ['Web', 'Data Parsing'],
    isHot: true,
  },
  {
    id: 'http-header-parser',
    name: 'HTTP Header Parser',
    description: 'Parse raw HTTP request/response headers into a clean JSON object.',
    href: '/http-header-parser',
    categories: ['Data Parsing', 'Web'],
    isHot: true,
  },
  {
    id: 'json-formatter',
    name: 'JSON Formatter',
    description: 'Beautify and indent messy JSON strings with Monaco Editor precision.',
    href: '/json-formatter',
    categories: ['JSON', 'Formatting'],
    isHot: true,
  },
  {
    id: 'mock-json-generator',
    name: 'Mock JSON API Generator',
    description: 'Instantly construct realistic, massive fake JSON datasets using faker.js blueprints.',
    href: '/mock-json-generator',
    categories: ['JSON', 'Data Parsing'],
    isHot: true,
  },
  {
    id: 'json-to-mysql',
    name: 'JSON to MySQL Schema',
    description: 'Instantly generate robust MySQL CREATE TABLE schemas by inferring data types from JSON.',
    href: '/json-to-mysql',
    categories: ['Data', 'Data Parsing'],
    isHot: true,
  },
  {
    id: 'html-to-jsx',
    name: 'HTML to JSX Converter',
    description: 'Instantly transform raw HTML into clean, production-ready React JSX components.',
    href: '/html-to-jsx',
    categories: ['Frontend', 'Web'],
    isHot: true,
  }
];

const CATEGORIES = [
  'All',
  'JSON',
  'Encoding',
  'Security',
  'Formatting',
  'Data Parsing',
  'Web',
  'Design',
];

export default function ToolGrid() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("devtoolslabs_favorites");
    if (stored) setFavorites(JSON.parse(stored));

    const handleStorage = () => {
      const updated = localStorage.getItem("devtoolslabs_favorites");
      if (updated) setFavorites(JSON.parse(updated));
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const favTools = ALL_TOOLS.filter(t => favorites.includes(t.href));
  
  const filteredTools = ALL_TOOLS.filter(tool => {
    const matchesCategory = activeCategory === 'All' || tool.categories.includes(activeCategory);
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
    
  return (
    <div className="w-full flex flex-col items-center">
      
      {/* Search Bar */}
      <div className="w-full max-w-2xl mb-10 relative group">
        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search 35+ developer tools..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="block w-full pl-14 pr-12 py-5 bg-white border border-gray-200 rounded-2xl text-lg font-poppins text-gray-900 placeholder-gray-400 shadow-sm focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all outline-none"
        />
        <div className="absolute inset-y-0 right-0 pr-5 flex items-center">
            <kbd className="hidden sm:inline-block px-2 py-1 bg-gray-50 border border-gray-200 rounded text-[10px] font-bold text-gray-400 shadow-xs uppercase tracking-widest">
                Ctrl+K
            </kbd>
        </div>
      </div>
      
      {/* Favorites / Pinned Section */}
      {favTools.length > 0 && activeCategory === 'All' && (
        <div className="w-full mb-12">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">Pinned Favorites</h2>
            <div className="flex-1 h-px bg-gray-100"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favTools.map((tool) => (
              <Link href={tool.href} key={tool.id} className="block p-5 border border-blue-100 rounded-xl hover:border-blue-400 bg-blue-50/30 transition-all relative group shadow-sm hover:shadow-md">
                <div className="absolute top-3 right-3 text-yellow-500">
                  <svg className="w-4 h-4" fill="currentColor" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.382-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-1 text-gray-900 group-hover:text-blue-600">{tool.name}</h3>
                <p className="text-xs text-gray-500 line-clamp-2">{tool.description}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Filter Pills */}
      <div className="flex flex-wrap justify-center gap-2 mb-10 w-full max-w-4xl">
        {CATEGORIES.map(category => {
          const isActive = activeCategory === category;
          return (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all shadow-sm ${
                isActive 
                  ? 'bg-gray-900 text-white shadow-md' 
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-900 hover:text-gray-900'
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {filteredTools.map((tool) => (
          <Link href={tool.href} key={tool.id} className="block p-6 border border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-sm transition-all bg-white relative overflow-hidden group">
            {tool.isHot && (
              <div className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 text-[10px] font-bold px-2 py-1 rounded-bl-lg tracking-wider uppercase shadow-sm">Hot</div>
            )}
            <h2 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-blue-600 transition-colors duration-200">{tool.name}</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-4 min-h-[40px]">{tool.description}</p>
            
            <div className="flex flex-wrap gap-2">
              {tool.categories.map(cat => (
                <span key={cat} className="text-[10px] uppercase tracking-widest font-bold bg-gray-100 text-gray-500 px-2 py-1 rounded">
                  {cat}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
      
      {filteredTools.length === 0 && (
         <div className="py-20 text-center w-full text-gray-500 font-medium">
             No tools found in this category.
         </div>
      )}

    </div>
  );
}
