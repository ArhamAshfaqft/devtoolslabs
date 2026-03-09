import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="font-bold text-xl tracking-tight text-gray-900 mb-4 inline-block">
              DevTools<span className="text-blue-600">Labs</span>
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed max-w-sm">
              A curated collection of lightning-fast, 100% client-side developer utilities. Built to run instantly in your browser without compromising your data to external servers.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wider">Top Tools</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><Link href="/curl-to-fetch" className="hover:text-gray-900 transition-colors">cURL to Fetch</Link></li>
              <li><Link href="/json-escape-unescape" className="hover:text-gray-900 transition-colors">JSON Escape</Link></li>
              <li><Link href="/jwt-validator" className="hover:text-gray-900 transition-colors">JWT Validator</Link></li>
              <li><Link href="/sql-formatter" className="hover:text-gray-900 transition-colors">SQL Formatter</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wider">Resources</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><a href="https://github.com/ArhamAshfaqft/devtoolslabs" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 transition-colors">API Documentation</a></li>
              <li><a href="https://github.com/ArhamAshfaqft/devtoolslabs" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 transition-colors">GitHub Repository</a></li>
              <li><Link href="/privacy" className="hover:text-gray-900 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-gray-900 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} DevToolsLabs. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm font-medium text-gray-400">
            Open Source Utilities
          </div>
        </div>
      </div>
    </footer>
  );
}
