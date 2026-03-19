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
    id: 'color-palette',
    name: 'Color Palette Generator',
    description: 'Generate beautiful 5-color palettes with hex codes for your designs.',
    href: '/color-palette-generator',
    categories: ['Design', 'Frontend'],
    isHot: true,
  },
  {
    id: 'regex-replace',
    name: 'Regex Replace',
    description: 'Test complex Regular Expression find and replace operations instantly.',
    href: '/regex-replace',
    categories: ['String', 'Web'],
  },
  {
    id: 'regex-tester',
    name: 'Regex Match & Extract',
    description: 'Debug standard regex patterns and extract named capture groups visually.',
    href: '/regex-tester',
    categories: ['String', 'Web'],
    isHot: true,
  },
  {
    id: 'regex-generator',
    name: 'Regex Generator',
    description: 'Instantly generate standard Regular Expressions for emails, IPs, and dates.',
    href: '/regex-generator',
    categories: ['Data Parsing', 'Web'],
    isHot: true,
  },
  {
    id: 'regex-reference',
    name: 'Regex Searchable Reference',
    description: 'A searchable library of production-ready Regex patterns for common validation tasks.',
    href: '/regex-reference',
    categories: ['Data Parsing', 'Web'],
    isHot: true,
  },
  {
    id: 'password-entropy',
    name: 'Password Entropy Calculator',
    description: 'Calculate cryptographic password strength, character sets, and brute-force time.',
    href: '/password-entropy',
    categories: ['Security', 'String'],
  },
  {
    id: 'bcrypt-generator',
    name: 'Bcrypt Hash Generator',
    description: 'Securely generate and verify Bcrypt password hashes with custom salt rounds.',
    href: '/bcrypt-generator',
    categories: ['Security', 'Encoding'],
    isHot: true,
  },
  {
    id: 'password-security-meter',
    name: 'Advanced Password Meter',
    description: 'Calculate cryptographic entropy and estimate "Time to Crack" for any password.',
    href: '/password-security-meter',
    categories: ['Security'],
    isHot: true,
  },
  {
    id: 'html-encoder',
    name: 'HTML Entity Encoder',
    description: 'Safely encode reserved characters to prevent XSS string injection.',
    href: '/html-entity-encoder',
    categories: ['Encoding', 'Security'],
  },
  {
    id: 'jwt-expiry',
    name: 'JWT Expiry Checker',
    description: 'Instantly check if a JSON Web Token (JWT) is valid, expired, or active.',
    href: '/jwt-expiry-checker',
    categories: ['Security', 'Data Parsing'],
    isHot: true,
  },
  {
    id: 'csv-to-json',
    name: 'CSV to JSON',
    description: 'Convert CSV spreadsheets to JSON arrays with automatic type inference.',
    href: '/csv-to-json',
    categories: ['JSON', 'Data Parsing'],
    isHot: true,
  },
  {
    id: 'json-diff',
    name: 'JSON Diff Tool',
    description: 'Instantly compare two JSON payloads to find deep structural differences.',
    href: '/json-diff',
    categories: ['JSON', 'Data Parsing'],
    isHot: true,
  },
  {
    id: 'uuid-generator',
    name: 'UUID Generator',
    description: 'Bulk generate secure Version 4 UUIDs natively in your browser.',
    href: '/uuid-generator',
    categories: ['Security', 'Data Parsing'],
    isHot: true,
  },
  {
    id: 'json-escape',
    name: 'JSON Escape',
    description: 'Safely escape or unescape JSON strings for embedded configurations.',
    href: '/json-escape-unescape',
    categories: ['JSON', 'Formatting'],
  },
  {
    id: 'json-formatter',
    name: 'JSON Formatter',
    description: 'Beautify and indent messy, minified JSON strings instantly in your browser.',
    href: '/json-formatter',
    categories: ['JSON', 'Formatting'],
  },
  {
    id: 'json-validator',
    name: 'JSON Validator',
    description: 'Validate strict JSON syntax logic and securely catch formatting errors.',
    href: '/json-validator',
    categories: ['JSON'],
  },
  {
    id: 'json-schema-validator',
    name: 'JSON Schema Validator',
    description: 'Enforce structured data rules by validating JSON against draft-07/2020-12 schemas.',
    href: '/json-schema-validator',
    categories: ['JSON', 'Data Parsing'],
    isHot: true,
  },
  {
    id: 'ssl-certificate-decoder',
    name: 'SSL Certificate Decoder',
    description: 'Decode SSL certificates to view expiration, issuer, and SAN details.',
    href: '/ssl-certificate-decoder',
    categories: ['Security'],
  },
  {
    id: 'xml-to-json',
    name: 'XML to JSON Converter',
    description: 'Convert XML data to JSON instantly with attribute support.',
    href: '/xml-to-json',
    categories: ['Data Parsing'],
  },
  {
    id: 'json-to-xml',
    name: 'JSON to XML Converter',
    description: 'Convert JSON objects into structured, formatted XML.',
    href: '/json-to-xml',
    categories: ['Data Parsing'],
  },
  {
    id: 'env-to-json',
    name: 'Env to JSON Parser',
    description: 'Transform .env config files into structured JSON objects.',
    href: '/env-to-json',
    categories: ['Data Parsing'],
  },
  {
    id: 'git-command-generator',
    name: 'Git Command Generator',
    description: 'Stop guessing syntax. Interactively generate complex, safe Git commands like reset, squash, and rebase.',
    href: '/git-command-generator',
    categories: ['Web', 'Formatting'],
    isHot: true,
  },
  {
    id: 'crontab-builder',
    name: 'Crontab GUI Builder',
    description: 'Interactive, visual generator and parser for complex Linux cron schedules.',
    href: '/crontab-builder',
    categories: ['Data Parsing'],
    isHot: true,
  },
  {
    id: 'url-slug-generator',
    name: 'URL Slug Generator',
    description: 'Instantly generate clean, SEO-optimized URL slugs. Removes stop-words and diacritics.',
    href: '/url-slug-generator',
    categories: ['Formatting'],
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
    id: 'json-to-typescript',
    name: 'JSON to TypeScript',
    description: 'Instantly generate clean TypeScript interfaces and types from JSON payloads.',
    href: '/json-to-typescript',
    categories: ['JSON', 'Data Parsing'],
    isHot: true,
  },
  {
    id: 'json-to-pydantic',
    name: 'JSON to Python Pydantic',
    description: 'Instantly generate production-ready Pydantic V2 models from JSON.',
    href: '/json-to-pydantic',
    categories: ['JSON', 'Data Parsing'],
    isHot: true,
  },
  {
    id: 'svg-shape-divider',
    name: 'SVG Shape Divider Generator',
    description: 'Design beautiful, responsive SVG waves and slanted section transitions.',
    href: '/svg-shape-divider',
    categories: ['Design', 'Web'],
    isHot: true,
  },
  {
    id: 'glassmorphism-generator',
    name: 'Glassmorphism Generator',
    description: 'Design beautiful, frosted glass UI components and grab the CSS output instantly.',
    href: '/glassmorphism-generator',
    categories: ['Design', 'Formatting'],
    isHot: true,
  },
  {
    id: 'box-shadow-generator',
    name: 'Advanced Box-Shadow',
    description: 'Visually construct smooth drop shadows and neumorphic inset elevations.',
    href: '/box-shadow-generator',
    categories: ['Design', 'Formatting'],
  },
  {
    id: 'json-to-go',
    name: 'JSON to Go Struct',
    description: 'Instantly generate strongly-typed Golang structs from JSON payloads.',
    href: '/json-to-go',
    categories: ['JSON', 'Data Parsing'],
    isHot: true,
  },
  {
    id: 'yaml-to-json',
    name: 'YAML to JSON',
    description: 'Convert Kubernetes manifests or Docker YAML to JSON objects instantly.',
    href: '/yaml-to-json',
    categories: ['Data Parsing', 'Web'],
    isHot: true,
  },
  {
    id: 'yaml-validator',
    name: 'YAML Validator & Linter',
    description: 'Instantly validate Kubernetes manifests and Docker configs for indentation errors.',
    href: '/yaml-validator',
    categories: ['Data Parsing', 'Web'],
    isHot: true,
  },
  {
    id: 'json-to-yaml',
    name: 'JSON to YAML',
    description: 'Transform JSON data into clean, human-readable YAML for cloud configs.',
    href: '/json-to-yaml',
    categories: ['Data Parsing', 'Web'],
  },
  {
    id: 'jwt-validator',
    name: 'JWT Decoder',
    description: 'Offline JWT header and payload inspection via Base64Url decoding.',
    href: '/jwt-validator',
    categories: ['Encoding', 'Security'],
  },
  {
    id: 'jwt-generator',
    name: 'JWT Generator',
    description: 'Securely sign custom Payload sets into Base64Url JWTs via HS256 logic.',
    href: '/jwt-generator',
    categories: ['Encoding', 'Security'],
  },
  {
    id: 'base64-encode',
    name: 'Base64 Encoder',
    description: 'Bi-directional Base64 string encoding and decoding. 100% offline.',
    href: '/base64-encode-decode',
    categories: ['Encoding'],
  },
  {
    id: 'base64-url-safe',
    name: 'Base64 URL-Safe',
    description: 'Encode/decode Base64 strings for use in URLs and JWTs.',
    href: '/base64-url-safe',
    categories: ['Encoding'],
  },
  {
    id: 'base64-image',
    name: 'Base64 Image Decoder',
    description: 'Directly view and download images from encoded Base64 strings.',
    href: '/base64-image-decoder',
    categories: ['Encoding', 'Media'],
  },
  {
    id: 'url-encoder',
    name: 'URL Encoder',
    description: 'Percent-encode reserved characters and URLs for safe API transmission.',
    href: '/url-encoder',
    categories: ['Encoding', 'Web'],
  },
  {
    id: 'url-decoder',
    name: 'URL Decoder',
    description: 'Reverse percent-encoding and decode messy tracking URLs into readable text.',
    href: '/url-decoder',
    categories: ['Encoding', 'Web'],
  },
  {
    id: 'html-entity',
    name: 'HTML Entity Decoder',
    description: 'Convert encoded HTML entities back to their original characters.',
    href: '/html-entity-decoder',
    categories: ['Encoding', 'Web'],
  },
  {
    id: 'html-to-jsx',
    name: 'HTML to JSX Converter',
    description: 'Instantly transform raw HTML into clean, production-ready React JSX components.',
    href: '/html-to-jsx',
    categories: ['Frontend', 'Web'],
    isHot: true,
  },
  {
    id: 'csp-generator',
    name: 'CSP Header Generator',
    description: 'Build robust Content Security Policy (CSP) headers to prevent XSS attacks.',
    href: '/csp-generator',
    categories: ['Security', 'Web'],
    isHot: true,
  },
  {
    id: 'hash-generator',
    name: 'Hash Generator',
    description: 'Simultaneously calculate secure MD5, SHA-256, and SHA-512 hashes.',
    href: '/hash-generator',
    categories: ['Security'],
  },
  {
    id: 'curl-to-fetch',
    name: 'cURL to Fetch',
    description: 'Convert raw bash cURL commands into JavaScript fetch() snippets.',
    href: '/curl-to-fetch',
    categories: ['Web', 'Data Parsing'],
    isHot: true,
  },
  {
    id: 'query-parser',
    name: 'URL Query Parser',
    description: 'Instantly decode and parse URL query strings into readable formats.',
    href: '/query-parser',
    categories: ['Web', 'Data Parsing'],
  },
  {
    id: 'timestamp-converter',
    name: 'Unix Timestamp',
    description: 'Instantly convert epoch integers into readable timezones and ISO strings.',
    href: '/timestamp-converter',
    categories: ['Data Parsing'],
  },
  {
    id: 'cron-parser',
    name: 'Cron Explainer',
    description: 'Translate complex Linux cron schedules into easy-to-read text.',
    href: '/cron-parser',
    categories: ['Data Parsing'],
  },
  {
    id: 'regex-tester',
    name: 'Regex Replace Tester',
    description: 'Simulate JavaScript String.replace() matching and capture groups.',
    href: '/regex-replace',
    categories: ['Data Parsing'],
  },
  {
    id: 'markdown-table',
    name: 'Markdown Table',
    description: 'Quickly generate formatted markdown tables from raw text or CSV.',
    href: '/markdown-table',
    categories: ['Formatting'],
  },
  {
    id: 'sql-formatter',
    name: 'SQL Formatter',
    description: 'Beautify minified SQL for PostgreSQL, MySQL, T-SQL and more.',
    href: '/sql-formatter',
    categories: ['Formatting'],
  },
  {
    id: 'sql-to-object',
    name: 'SQL Schema to Code',
    description: 'Transform SQL CREATE TABLE statements into TypeScript interfaces or JSON.',
    href: '/sql-to-object',
    categories: ['Data Parsing', 'Web'],
    isHot: true,
  },
  {
    id: 'html-minifier',
    name: 'HTML Minifier',
    description: 'Strip whitespace and developer comments to compress raw HTML payload sizes.',
    href: '/html-minifier',
    categories: ['Formatting', 'Web'],
  },
  {
    id: 'css-minifier',
    name: 'CSS Minifier',
    description: 'Instantly shave bytes off your raw cascading stylesheets. 100% offline.',
    href: '/css-minifier',
    categories: ['Formatting', 'Design'],
  },
  {
    id: 'css-clamp',
    name: 'CSS Clamp Generator',
    description: 'Generate responsive CSS clamp() functions for fluid typography.',
    href: '/css-clamp-generator',
    categories: ['Design'],
  },
  {
    id: 'css-keyframes',
    name: 'CSS Keyframer',
    description: 'Visually build, preview, and generate @keyframes animations.',
    href: '/css-keyframes',
    categories: ['Design'],
  },
  {
    id: 'color-contrast',
    name: 'WCAG Contrast Checker',
    description: 'Calculate relative luminance for a11y UI/UX contrast validation.',
    href: '/color-contrast-checker',
    categories: ['Design'],
  },
  {
    id: 'svg-path',
    name: 'SVG Path Visualizer',
    description: 'Instantly visualize and debug SVG path definitions (d="...") online.',
    href: '/svg-path-visualizer',
    categories: ['Design', 'Media'],
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
