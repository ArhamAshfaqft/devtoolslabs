"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";

interface SearchItem {
  id: string;
  name: string;
  description: string;
  href: string;
  type: "tool" | "guide";
  category?: string;
}

const ITEMS: SearchItem[] = [
  // Tools
  { id: 'http-header-parser', name: 'HTTP Header Parser', description: 'Parse raw HTTP request/response headers into JSON.', href: '/http-header-parser', type: 'tool', category: 'Data Parsing' },
  { id: 'color-palette', name: 'Color Palette Generator', description: 'Generate beautiful 5-color palettes with hex codes.', href: '/color-palette-generator', type: 'tool', category: 'Design' },
  { id: 'regex-generator', name: 'Regex Generator', description: 'Generate Regular Expressions for emails, IPs, and more.', href: '/regex-generator', type: 'tool', category: 'Data Parsing' },
  { id: 'regex-reference', name: 'Regex Searchable Reference', description: 'Search and copy common regex patterns.', href: '/regex-reference', type: 'tool', category: 'Data Parsing' },
  { id: 'regex-generator', name: 'Regex Generator', description: 'Generate common regular expressions.', href: '/regex-generator', type: 'tool', category: 'String' },
  { id: 'bcrypt-generator', name: 'Bcrypt Hash Generator', description: 'Generate and verify Bcrypt password hashes.', href: '/bcrypt-generator', type: 'tool', category: 'Security' },
  { id: 'password-security-meter', name: 'Advanced Password Meter', description: 'Entropy and crack-time simulation.', href: '/password-security-meter', type: 'tool', category: 'Security' },
  { id: 'password-entropy', name: 'Password Strength', description: 'Calculate password strength and crack time.', href: '/password-entropy', type: 'tool', category: 'Security' },
  { id: 'html-encoder', name: 'HTML Entity Encoder', description: 'Encode reserved characters to prevent XSS.', href: '/html-entity-encoder', type: 'tool', category: 'Encoding' },
  { id: 'html-to-jsx', name: 'HTML to JSX Converter', description: 'Transform raw HTML into clean React JSX.', href: '/html-to-jsx', type: 'tool', category: 'Web' },
  { id: 'ssl-decoder', name: 'SSL Certificate Decoder', description: 'Parse PEM certificates for expiry and SAN info.', href: '/ssl-certificate-decoder', type: 'tool', category: 'Security' },
  { id: 'jwt-expiry', name: 'JWT Expiry Checker', description: 'Check if a JWT is valid, expired, or active.', href: '/jwt-expiry-checker', type: 'tool', category: 'Security' },
  { id: 'csv-to-json', name: 'CSV to JSON', description: 'Convert CSV spreadsheets to JSON arrays.', href: '/csv-to-json', type: 'tool', category: 'JSON' },
  { id: 'json-diff', name: 'JSON Diff Tool', description: 'Compare two JSON payloads for differences.', href: '/json-diff', type: 'tool', category: 'JSON' },
  { id: 'uuid-generator', name: 'UUID Generator', description: 'Bulk generate secure Version 4 UUIDs.', href: '/uuid-generator', type: 'tool', category: 'Security' },
  { id: 'json-escape-unescape', name: 'JSON Escape / Unescape', description: 'Escape or unescape JSON strings.', href: '/json-escape-unescape', type: 'tool', category: 'JSON' },
  { id: 'mock-json-generator', name: 'Mock JSON Generator', description: 'Construct realistic fake JSON/CSV data.', href: '/mock-json-generator', type: 'tool', category: 'JSON' },
  { id: 'json-formatter', name: 'JSON Formatter', description: 'Beautify and indent minified JSON.', href: '/json-formatter', type: 'tool', category: 'JSON' },
  { id: 'json-validator', name: 'JSON Validator', description: 'Validate strict JSON syntax logic.', href: '/json-validator', type: 'tool', category: 'JSON' },
  { id: 'json-to-csv', name: 'JSON to CSV', description: 'Convert JSON arrays into CSV files.', href: '/json-to-csv', type: 'tool', category: 'JSON' },
  { id: 'json-to-typescript', name: 'JSON to TypeScript', description: 'Convert JSON to fully typed TypeScript interfaces.', href: '/json-to-typescript', type: 'tool', category: 'Data Parsing' },
  { id: 'json-to-pydantic', name: 'JSON to Pydantic', description: 'Convert JSON to robust Python Pydantic models.', href: '/json-to-pydantic', type: 'tool', category: 'Data Parsing' },
  { id: 'json-to-graphql', name: 'JSON to GraphQL', description: 'Convert JSON objects to strict GraphQL Schemas.', href: '/json-to-graphql', type: 'tool', category: 'Data Parsing' },
  { id: 'json-to-go', name: 'JSON to Go struct', description: 'Convert JSON to nested Go struct definitions.', href: '/json-to-go', type: 'tool', category: 'Data Parsing' },
  { id: 'xml-to-json', name: 'XML to JSON Converter', description: 'Convert legacy XML to modern JSON datasets.', href: '/xml-to-json', type: 'tool', category: 'Data Parsing' },
  { id: 'json-to-xml', name: 'JSON to XML Converter', description: 'Transform JSON objects into structured XML.', href: '/json-to-xml', type: 'tool', category: 'Data Parsing' },
  { id: 'yaml-to-json', name: 'YAML to JSON', description: 'Convert Kubernetes/Docker YAML to JSON.', href: '/yaml-to-json', type: 'tool', category: 'Data Parsing' },
  { id: 'yaml-validator', name: 'YAML Validator & Linter', description: 'Validate Kubernetes/Docker YAML syntax.', href: '/yaml-validator', type: 'tool', category: 'Data Parsing' },
  { id: 'json-to-yaml', name: 'JSON to YAML', description: 'Convert JSON to human-readable YAML configs.', href: '/json-to-yaml', type: 'tool', category: 'Data Parsing' },
  { id: 'jwt-validator', name: 'JWT Signature Validator', description: 'Validate JSON Web Token signatures securely.', href: '/jwt-validator', type: 'tool', category: 'Security' },
  { id: 'jwt-generator', name: 'JWT Generator', description: 'Create and sign custom JSON Web Tokens.', href: '/jwt-generator', type: 'tool', category: 'Security' },
  { id: 'jwt-decoder', name: 'JWT Decoder', description: 'Decode JWT Header and Payload data instantly.', href: '/jwt-decoder', type: 'tool', category: 'Security' },
  { id: 'chmod-calculator', name: 'Chmod Calculator', description: 'Calculate Linux server file permissions visually.', href: '/chmod-calculator', type: 'tool', category: 'Security' },
  { id: 'htpasswd-generator', name: 'Htpasswd Generator', description: 'Generate Apache/Nginx .htpasswd basic auth strings.', href: '/htpasswd-generator', type: 'tool', category: 'Security' },
  { id: 'base64-encode-decode', name: 'Base64 Encode/Decode', description: 'Convert text to and from Base64 encoding.', href: '/base64-encode-decode', type: 'tool', category: 'Encoding' },
  { id: 'base64-image', name: 'Base64 to Image', description: 'Decode base64 strings into viewable images.', href: '/base64-image-decoder', type: 'tool', category: 'Encoding' },
  { id: 'base64-url-safe', name: 'Base64 URL-Safe', description: 'Specialized Base64 encoding for JWTs and URLs.', href: '/base64-url-safe', type: 'tool', category: 'Encoding' },
  { id: 'url-encoder', name: 'URL Encoder', description: 'Percent-encode strings for safe URL usage.', href: '/url-encoder', type: 'tool', category: 'Encoding' },
  { id: 'url-decoder', name: 'URL Decoder', description: 'Reverse percent-encoding and decode messy tracking URLs.', href: '/url-decoder', type: 'tool', category: 'Encoding' },
  { id: 'html-entity', name: 'HTML Entity Decoder', description: 'Convert encoded HTML entities back.', href: '/html-entity-decoder', type: 'tool', category: 'Encoding' },
  { id: 'hash-generator', name: 'Hash Generator', description: 'Calculate MD5, SHA-256, and SHA-512 hashes.', href: '/hash-generator', type: 'tool', category: 'Security' },
  { id: 'csp-generator', name: 'CSP Generator', description: 'Build secure Content Security Policy headers.', href: '/csp-generator', type: 'tool', category: 'Security' },
  { id: 'header-hub', name: 'MIME & Header Hub', description: 'Quick reference for Security Headers and MIME Types.', href: '/header-mime-hub', type: 'tool', category: 'Security' },
  { id: 'curl-to-fetch', name: 'cURL to Fetch', description: 'Convert cURL commands to JS fetch() snippets.', href: '/curl-to-fetch', type: 'tool', category: 'Web' },
  { id: 'query-parser', name: 'URL Query Parser', description: 'Decode and parse URL query strings.', href: '/query-parser', type: 'tool', category: 'Web' },
  { id: 'env-to-json', name: 'Env to JSON Parser', description: 'Convert .env config files to structured JSON objects.', href: '/env-to-json', type: 'tool', category: 'Data Parsing' },
  { id: 'timestamp-converter', name: 'Unix Timestamp', description: 'Convert epoch integers to readable dates.', href: '/timestamp-converter', type: 'tool', category: 'Data Parsing' },
  { id: 'json-schema-validator', name: 'JSON Schema Validator', description: 'Validate JSON against draft-07 schemas via AJV.', href: '/json-schema-validator', type: 'tool', category: 'Data Parsing' },
  { id: 'git-command-generator', name: 'Git Command Generator', description: 'Visually generate complex Git commands safely.', href: '/git-command-generator', type: 'tool', category: 'Development' },
  { id: 'cron-parser', name: 'Cron Explainer', description: 'Translate cron schedules into easy text.', href: '/cron-parser', type: 'tool', category: 'Data Parsing' },
  { id: 'crontab-builder', name: 'Crontab GUI Builder', description: 'Visually construct and parse Linux cron schedules.', href: '/crontab-builder', type: 'tool', category: 'Data Parsing' },
  { id: 'regex-tester', name: 'Regex Replace Tester', description: 'Simulate JavaScript String.replace().', href: '/regex-replace', type: 'tool', category: 'Data Parsing' },
  { id: 'http-status', name: 'HTTP Status Codes', description: 'Interactive reference for all HTTP response codes.', href: '/http-status-codes', type: 'tool', category: 'Web' },
  { id: 'markdown-table', name: 'Markdown Table', description: 'Generate formatted markdown tables.', href: '/markdown-table', type: 'tool', category: 'Formatting' },
  { id: 'sql-formatter', name: 'SQL Formatter', description: 'Beautify minified SQL for various dialects.', href: '/sql-formatter', type: 'tool', category: 'Formatting' },
  { id: 'sql-to-object', name: 'SQL to Object', description: 'Convert SQL CREATE TABLE to TS interfaces or JSON.', href: '/sql-to-object', type: 'tool', category: 'Formatting' },
  { id: 'html-minifier', name: 'HTML Minifier', description: 'Compress raw HTML payload sizes.', href: '/html-minifier', type: 'tool', category: 'Formatting' },
  { id: 'css-minifier', name: 'CSS Minifier', description: 'Shave bytes off raw CSS stylesheets.', href: '/css-minifier', type: 'tool', category: 'Formatting' },
  { id: 'url-slug-generator', name: 'URL Slug Generator', description: 'Create SEO friendly URL slugs.', href: '/url-slug-generator', type: 'tool', category: 'Formatting' },
  { id: 'css-clamp', name: 'CSS Clamp Generator', description: 'Generate responsive CSS clamp() functions.', href: '/css-clamp-generator', type: 'tool', category: 'Design' },
  { id: 'css-keyframes', name: 'CSS Keyframer', description: 'Visually build @keyframes animations.', href: '/css-keyframes', type: 'tool', category: 'Design' },
  { id: 'diagram', name: 'Mermaid Diagram Builder', description: 'Text-to-diagram playground for architects.', href: '/diagram-playground', type: 'tool', category: 'Design' },
  { id: 'color-contrast', name: 'WCAG Contrast Checker', description: 'Calculate luminance for UX contrast.', href: '/color-contrast-checker', type: 'tool', category: 'Design' },
  { id: 'svg-path', name: 'SVG Path Visualizer', description: 'Visualize and debug SVG path definitions.', href: '/svg-path-visualizer', type: 'tool', category: 'Design' },
  { id: 'svg-shape-divider', name: 'SVG Shape Divider Generator', description: 'Generate wavy website section transitions.', href: '/svg-shape-divider', type: 'tool', category: 'Design' },
  { id: 'css-triangle-generator', name: 'CSS Triangle Generator', description: 'Visually generate pure CSS directional arrows.', href: '/css-triangle-generator', type: 'tool', category: 'Design' },
  { id: 'css-gradient-generator', name: 'CSS Gradient Generator', description: 'Interactive visual linear and radial gradient builder.', href: '/css-gradient-generator', type: 'tool', category: 'Design' },
  { id: 'flexbox-generator', name: 'CSS Flexbox Generator', description: 'Interactive layout and alignment sandbox.', href: '/flexbox-generator', type: 'tool', category: 'Design' },
  { id: 'grid-generator', name: 'CSS Grid Generator', description: 'Interactive visual 2D grid builder.', href: '/grid-generator', type: 'tool', category: 'Design' },
  { id: 'glassmorphism-generator', name: 'Glassmorphism CSS Generator', description: 'Build frosted glass UI blocks instantly.', href: '/glassmorphism-generator', type: 'tool', category: 'Design' },
  { id: 'box-shadow-generator', name: 'Advanced Box-Shadow Generator', description: 'Visually generate smooth CSS elevation shadows.', href: '/box-shadow-generator', type: 'tool', category: 'Design' },
  { id: 'json-to-pydantic', name: 'JSON to Python Pydantic Models', description: 'Generate Pydantic V2 models from JSON.', href: '/json-to-pydantic', type: 'tool', category: 'Formatting' },
  // Guides
  { id: 'guide-contrast', name: 'WCAG & ADA Contrast Guide', description: 'Master accessibility compliance.', href: '/guides/wcag-contrast-guide', type: 'guide', category: 'Security' },
  { id: 'guide-sql', name: 'SQL Best Practices & Optimization', description: 'Write performant, clean SQL.', href: '/guides/sql-best-practices', type: 'guide', category: 'Development' },
  { id: 'guide-curl', name: 'Ultimate Guide to cURL', description: 'Master API testing and data transfer.', href: '/guides/ultimate-curl-guide', type: 'guide', category: 'Development' },
  { id: 'guide-cors', name: 'Understanding CORS', description: 'Fix cross-origin errors securely.', href: '/guides/understanding-cors', type: 'guide', category: 'Security' },
  { id: 'guide-jwt', name: 'How to Decode JWT Tokens', description: 'Step-by-step guide to token anatomy.', href: '/guides/how-to-decode-jwt', type: 'guide', category: 'Security' },
  { id: 'guide-base64', name: 'Understanding Base64 Encoding', description: 'How binary-to-text works and why.', href: '/guides/understanding-base64', type: 'guide', category: 'Encoding' },
  { id: 'guide-regex', name: 'Regex Explained for Beginners', description: 'Friendly guide to regular expressions.', href: '/guides/regex-explained', type: 'guide', category: 'Development' },
  { id: 'guide-unix', name: 'How Unix Timestamps Work', description: 'Epoch time, timezones, and Y2K38.', href: '/guides/unix-timestamps', type: 'guide', category: 'Data' },
  { id: 'guide-react', name: 'Advanced React & JSX Best Practices', description: 'Master component architecture and JSX mapping.', href: '/guides/react-jsx-patterns', type: 'guide', category: 'Frontend' },
  { id: 'guide-go', name: 'Go Service Architecture', description: 'Strongly-typed backend design and JSON mapping.', href: '/guides/go-service-architecture', type: 'guide', category: 'Backend' },
  { id: 'guide-password', name: 'Enterprise Password Security Standards', description: 'Learn NIST 800-63B and modern hashing patterns.', href: '/guides/password-security-standards', type: 'guide', category: 'Security' },
  { id: 'guide-k8s', name: 'DevOps Kubernetes YAML Blueprint', description: 'Master manifest design and production patterns.', href: '/guides/devops-kubernetes-yaml', type: 'guide', category: 'DevOps' },
];

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredItems = ITEMS.filter(item => 
    item.name.toLowerCase().includes(query.toLowerCase()) ||
    item.description.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 8);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
    setActiveIndex(0);
    setQuery("");
    // Delay focus to ensure DOM is ready
    setTimeout(() => inputRef.current?.focus(), 100);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setQuery("");
  }, []);

  const handleSelect = useCallback((href: string) => {
    router.push(href);
    handleClose();
  }, [router, handleClose]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        handleOpen();
      }
      if (e.key === "Escape") {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleOpen, handleClose]);

  useEffect(() => {
    if (!isOpen) return;

    const handleNav = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex(prev => (prev + 1) % filteredItems.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex(prev => (prev - 1 + filteredItems.length) % filteredItems.length);
      } else if (e.key === "Enter" && filteredItems[activeIndex]) {
        e.preventDefault();
        handleSelect(filteredItems[activeIndex].href);
      }
    };

    window.addEventListener("keydown", handleNav);
    return () => window.removeEventListener("keydown", handleNav);
  }, [isOpen, filteredItems, activeIndex, handleSelect]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-24 sm:pt-40 px-4 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden animate-in slide-in-from-top-4 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="flex items-center px-6 py-4 border-b border-gray-100 bg-gray-50/50">
          <svg className="w-6 h-6 text-gray-400 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            className="flex-1 bg-transparent border-none outline-none text-xl text-gray-900 placeholder-gray-400 font-poppins"
            placeholder="Type tool name or command..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActiveIndex(0);
            }}
          />
          <div className="flex items-center gap-1">
            <kbd className="px-2 py-1 bg-white border border-gray-200 rounded text-[10px] font-bold text-gray-400 shadow-sm">ESC</kbd>
          </div>
        </div>

        {/* Results */}
        <div className="p-2 max-h-[60vh] overflow-y-auto">
          {filteredItems.length > 0 ? (
            <div className="space-y-1">
              {filteredItems.map((item, idx) => (
                <button
                  key={item.id}
                  onMouseEnter={() => setActiveIndex(idx)}
                  onClick={() => handleSelect(item.href)}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl text-left transition-all ${
                    activeIndex === idx ? "bg-blue-600 text-white shadow-md" : "hover:bg-gray-50 text-gray-700"
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                    activeIndex === idx ? "bg-white/20" : "bg-gray-100"
                  }`}>
                    {item.type === "tool" ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 11-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-bold text-sm tracking-tight">{item.name}</span>
                      <span className={`text-[9px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded ${
                        activeIndex === idx ? "bg-white/30 text-white" : "bg-gray-200 text-gray-500"
                      }`}>
                        {item.type}
                      </span>
                    </div>
                    <p className={`text-xs ${activeIndex === idx ? "text-blue-100" : "text-gray-500"}`}>{item.description}</p>
                  </div>
                  {activeIndex === idx && (
                    <svg className="w-5 h-5 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center">
              <p className="text-gray-400 font-medium">No results found for "{query}"</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          <div className="flex gap-4">
            <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 bg-white border border-gray-200 rounded shadow-xs">↑↓</kbd> Navigate</span>
            <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 bg-white border border-gray-200 rounded shadow-xs">⏎</kbd> Select</span>
          </div>
          <div>DevToolsLabs Search</div>
        </div>
      </div>
      
      {/* Backdrop Close Overlay */}
      <div className="absolute inset-0 z-[-1]" onClick={handleClose}></div>
    </div>
  );
}
