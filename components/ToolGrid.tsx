'use client';

import React, { useState } from 'react';
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
    id: 'regex-generator',
    name: 'Regex Generator',
    description: 'Instantly generate standard Regular Expressions for emails, IPs, and dates.',
    href: '/regex-generator',
    categories: ['Data Parsing', 'Web'],
    isHot: true,
  },
  {
    id: 'password-entropy',
    name: 'Password Entropy',
    description: 'Calculate cryptographic password strength (bits) and brute-force time.',
    href: '/password-entropy',
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
    id: 'json-to-csv',
    name: 'JSON to CSV',
    description: 'Instantly convert JSON arrays into downloadable CSV files offline.',
    href: '/json-to-csv',
    categories: ['JSON', 'Data Parsing'],
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
    href: '/url-encode-decode',
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

  const filteredTools = activeCategory === 'All' 
    ? ALL_TOOLS 
    : ALL_TOOLS.filter(tool => tool.categories.includes(activeCategory));

  return (
    <div className="w-full flex flex-col items-center">
      
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
