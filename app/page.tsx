import Link from 'next/link';
import type { Metadata } from 'next';
import ToolGrid from '@/components/ToolGrid';

export const metadata: Metadata = {
  title: 'DevToolsHub - Free Client-Side Developer Utilities',
  description: '100% offline, privacy-first web utilities for developers. Format JSON, decode Base64, validate JWTs, and compress CSS natively in your browser.',
};

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <main className="max-w-5xl mx-auto py-20 px-6">
        <h1 className="text-4xl font-bold mb-6 text-center tracking-tight">Developer Utilities</h1>
        <p className="text-lg text-gray-600 text-center mb-16 max-w-2xl mx-auto">
          A collection of free, lightning-fast, client-side tools for developers. No server side tracking, pure speed.
        </p>
        
        <div className="w-full mt-10">
          <ToolGrid />
        </div>

        {/* SEO Explanatory Content Section */}
        <section className="mt-20 pt-16 border-t border-gray-200">
          <div className="max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 tracking-tight">What are Client-Side Developer Tools?</h2>
            <p className="text-gray-600 mb-6 leading-relaxed text-lg">
              As developers, we constantly rely on micro-utilities to format JSON, decode JWTs, test regular expressions, and optimize code imagery. However, pasting sensitive production API payloads or private database connection strings into random internet utilities poses a massive security risk. We built DevToolsHub to solve this.
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed text-lg">
              Every single application on this platform is engineered using a <strong>100% client-side architecture</strong>. That means when you use our SQL Formatter, cURL to Fetch converter, or JSON Escape tools, the processing mathematically executes entirely within the V8 engine of your local web browser. Absolutely zero data is transmitted over the network to external backend servers, ensuring your proprietary code remains strictly on your machine.
            </p>
            
            <h3 className="text-xl font-bold mb-4 text-gray-900">Developer Tool Categories</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
               {/* Placeholders for upcoming Phase 4 Hub Pages */}
               <a href="/json-tools" className="p-4 bg-gray-50 rounded-lg border border-gray-100 hover:border-blue-200 transition-colors">
                 <h4 className="font-semibold text-gray-900 mb-1">JSON Utility Tools</h4>
                 <p className="text-sm text-gray-500">Formatters, validators, and CSV converters.</p>
               </a>
               <a href="/encoding-tools" className="p-4 bg-gray-50 rounded-lg border border-gray-100 hover:border-blue-200 transition-colors">
                 <h4 className="font-semibold text-gray-900 mb-1">Encoding & Decoding</h4>
                 <p className="text-sm text-gray-500">Base64, URL payloads, and HTML entities.</p>
               </a>
               <a href="/frontend-tools" className="p-4 bg-gray-50 rounded-lg border border-gray-100 hover:border-blue-200 transition-colors">
                 <h4 className="font-semibold text-gray-900 mb-1">Frontend Design</h4>
                 <p className="text-sm text-gray-500">CSS Clamp math, keyframes, and SVG visualizers.</p>
               </a>
               <a href="/security-tools" className="p-4 bg-gray-50 rounded-lg border border-gray-100 hover:border-blue-200 transition-colors">
                 <h4 className="font-semibold text-gray-900 mb-1">Security & Crypto</h4>
                 <p className="text-sm text-gray-500">MD5, SHA256 hashes, and local cryptographic algorithms.</p>
               </a>
               <a href="/dev-utilities" className="p-4 bg-gray-50 rounded-lg border border-gray-100 hover:border-blue-200 transition-colors">
                 <h4 className="font-semibold text-gray-900 mb-1">System Utilities</h4>
                 <p className="text-sm text-gray-500">Epoch timestamps, cron logic, and generic parsers.</p>
               </a>
             </div>
          </div>
        </section>
      </main>
    </div>
  );
}
