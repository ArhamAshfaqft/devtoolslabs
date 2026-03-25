import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Free JSON Utility Tools | JSON Escape, Format, & Convert',
  description: 'A collection of free, lightning-fast client-side JSON utilities. Escape JSON strings, decode payloads, or convert massive JSON arrays to CSV spreadsheets instantly in your browser.',
  openGraph: {
    title: 'Free JSON Utility Tools | JSON Escape, Format, & Convert',
    description: 'A collection of free, lightning-fast client-side JSON utilities. Escape JSON strings, decode payloads, or convert massive JSON arrays to CSV spreadsheets instantly in your browser.',
    url: 'https://devtoolslabs.com/json-tools',
  },
  alternates: {
    canonical: '/json-tools',
  },
};

export default function JsonToolsHub() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 md:py-20">
      <div className="max-w-3xl mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 tracking-tight">JSON Utility Tools</h1>
        <p className="text-xl text-gray-600 leading-relaxed">
          JavaScript Object Notation (JSON) is the backbone of modern APIs. Whether you are debugging nested API responses, formatting configuration files, or exporting database objects to marketing teams, these highly optimized client-side tools process your sensitive payloads securely without ever leaving your browser.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/json-escape-unescape" className="group p-6 bg-white border border-gray-200 rounded-xl hover:border-gray-900 transition-colors shadow-sm hover:shadow-md">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-900 font-bold group-hover:bg-gray-900 group-hover:text-white transition-colors">
              \{"\""}
            </div>
            <h2 className="text-xl font-bold text-gray-900">JSON Escape & Unescape</h2>
          </div>
          <p className="text-gray-600 leading-relaxed mb-4">
            Safely format raw JSON into a valid escaped string format for use inside shell scripts, HTML attributes, or database columns. Process double-encoded API payloads back into readable objects instantly.
          </p>
          <span className="text-sm font-semibold text-blue-600 group-hover:text-blue-800 flex items-center gap-1">
            Open Tool <span aria-hidden="true">&rarr;</span>
          </span>
        </Link>

        <Link href="/json-to-csv" className="group p-6 bg-white border border-gray-200 rounded-xl hover:border-gray-900 transition-colors shadow-sm hover:shadow-md">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-900 font-bold group-hover:bg-gray-900 group-hover:text-white transition-colors">
              CSV
            </div>
            <h2 className="text-xl font-bold text-gray-900">JSON to CSV Converter</h2>
          </div>
          <p className="text-gray-600 leading-relaxed mb-4">
            Flatten massive arrays of deeply nested JSON objects into a downloadable, RFC-compliant Comma Separated Values (CSV) file. Perfect for migrating backend API data directly into Microsoft Excel.
          </p>
          <span className="text-sm font-semibold text-blue-600 group-hover:text-blue-800 flex items-center gap-1">
            Open Tool <span aria-hidden="true">&rarr;</span>
          </span>
        </Link>
        <Link href="/json-formatter" className="group p-6 bg-white border border-gray-200 rounded-xl hover:border-gray-900 transition-colors shadow-sm hover:shadow-md">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-900 font-bold group-hover:bg-gray-900 group-hover:text-white transition-colors">
              {'{ }'}
            </div>
            <h2 className="text-xl font-bold text-gray-900">JSON Formatter</h2>
          </div>
          <p className="text-gray-600 leading-relaxed mb-4">
            Working with minified APIs? Instantly format and beautify complex JSON payloads into perfectly legible, logically indented multi-line structures.
          </p>
          <span className="text-sm font-semibold text-blue-600 group-hover:text-blue-800 flex items-center gap-1">
            Open Tool <span aria-hidden="true">&rarr;</span>
          </span>
        </Link>
        <Link href="/json-validator" className="group p-6 bg-white border border-gray-200 rounded-xl hover:border-gray-900 transition-colors shadow-sm hover:shadow-md">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-900 font-bold group-hover:bg-gray-900 group-hover:text-white transition-colors">
              <span className="text-green-600 group-hover:text-green-400">✓</span>
            </div>
            <h2 className="text-xl font-bold text-gray-900">JSON Validator</h2>
          </div>
          <p className="text-gray-600 leading-relaxed mb-4">
            Instantly validate untrusted JSON payloads. Securely execute native architectural syntax checking to catch missing commas, unquoted keys, and JSON RFC-8259 errors completely offline.
          </p>
          <span className="text-sm font-semibold text-blue-600 group-hover:text-blue-800 flex items-center gap-1">
            Open Tool <span aria-hidden="true">&rarr;</span>
          </span>
        </Link>
      </div>
    </div>
  );
}
