import Link from 'next/link';
import type { Metadata } from 'next';
import ToolGrid from '@/components/ToolGrid';

export const metadata: Metadata = {
  title: 'DevToolsLabs - Free Client-Side Developer Utilities',
  description: '100% offline, privacy-first web utilities for developers. Format JSON, decode Base64, validate JWTs, and compress CSS natively in your browser.',
};

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <main className="max-w-5xl mx-auto py-20 px-6">
        <h1 className="text-4xl font-bold mb-6 text-center tracking-tight">Free Online Developer Tools (100% Client-Side)</h1>
        <p className="text-lg text-gray-600 text-center mb-6 max-w-2xl mx-auto">
          A collection of free, lightning-fast, client-side tools for developers. No server side tracking, pure speed.
        </p>

        {/* Privacy Trust Badge */}
        <div className="flex items-center justify-center gap-2 mb-16 px-4 py-3 bg-green-50 border border-green-200 rounded-full w-fit mx-auto">
          <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <span className="text-sm font-semibold text-green-800">All tools run 100% in your browser. No data is sent to our servers.</span>
        </div>
        
        <div className="w-full mt-10">
          <ToolGrid />
        </div>

        {/* SEO Explanatory Content Section */}
        <section className="mt-20 pt-16 border-t border-gray-200">
          <div className="max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 tracking-tight">What are Client-Side Developer Tools?</h2>
            <p className="text-gray-600 mb-6 leading-relaxed text-lg">
              As developers, we constantly rely on micro-utilities to format JSON, decode JWTs, test regular expressions, and optimize code. However, pasting sensitive production API payloads or private database connection strings into random internet utilities poses a massive security risk. We built DevToolsLabs to solve this.
            </p>
            <p className="text-gray-600 mb-6 leading-relaxed text-lg">
              Every single application on this platform is engineered using a <strong>100% client-side architecture</strong>. That means when you use our SQL Formatter, cURL to Fetch converter, or JSON Escape tools, the processing mathematically executes entirely within the V8 engine of your local web browser. Absolutely zero data is transmitted over the network to external backend servers, ensuring your proprietary code remains strictly on your machine.
            </p>

            <h3 className="text-xl font-bold mb-3 text-gray-900">Why Client-Side Processing Matters</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Most free tool websites on the internet secretly send your input data to their backend servers for processing. This means your private API keys, database queries, JWT tokens, and source code pass through someone else&apos;s infrastructure where it could be logged, cached, or intercepted. Client-side tools eliminate this risk entirely. When you paste a JSON payload into our formatter, the JavaScript engine inside Chrome, Firefox, or Safari processes the transformation locally. The network tab in your browser&apos;s DevTools will confirm: zero outbound requests are made.
            </p>

            <h3 className="text-xl font-bold mb-3 text-gray-900">Who Uses DevToolsLabs?</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Our tools are designed for frontend engineers, backend developers, DevOps engineers, QA testers, security researchers, and technical writers. Whether you are debugging a minified SQL query from a production database log, converting a cURL command from API documentation into JavaScript fetch() code, generating SHA-256 hashes for file verification, or building CSS animations visually, DevToolsLabs provides instant, privacy-first utilities that work completely offline once the page loads.
            </p>

            <h3 className="text-xl font-bold mb-3 text-gray-900">Built with Modern Web Standards</h3>
            <p className="text-gray-600 mb-8 leading-relaxed">
              DevToolsLabs is built with Next.js and leverages native Web APIs like the Web Crypto API for hash generation, TextEncoder/TextDecoder for Base64 conversions, and the URL API for query string parsing. This means our tools are not only private but also blazing fast, with sub-millisecond processing times for most operations. Every tool is statically generated for instant page loads and optimized for Core Web Vitals to ensure the best possible user experience.
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
               <a href="/accessibility-tools" className="p-4 bg-gray-50 rounded-lg border border-gray-100 hover:border-blue-200 transition-colors">
                 <h4 className="font-semibold text-gray-900 mb-1">Accessibility (WCAG)</h4>
                 <p className="text-sm text-gray-500">Color contrast checkers and ADA compliance audits.</p>
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
