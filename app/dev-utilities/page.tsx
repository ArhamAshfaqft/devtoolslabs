import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Free Developer Utility Tools | Timestamps, Regex, & Parsers',
  description: 'A suite of essential, everyday utilities for software engineers. Convert epoch timestamps, test complex regex patterns, and beautify arbitrary data schemas.',
  openGraph: {
    title: 'Free Developer Utility Tools | Timestamps, Regex, & Parsers',
    description: 'A suite of essential, everyday utilities for software engineers. Convert epoch timestamps, test complex regex patterns, and beautify arbitrary data schemas.',
    url: 'https://devtoolslabs.com/dev-utilities',
  },
  alternates: {
    canonical: '/dev-utilities',
  },
};

export default function DevUtilityToolsHub() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 md:py-20">
      <div className="max-w-3xl mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 tracking-tight">System & Developer Utilities</h1>
        <p className="text-xl text-gray-600 leading-relaxed">
          Daily workflow micro-utilities designed for speed. Solve timezone collisions, parse complicated cron orchestrations, and debug text match expressions securely without leaving your current tab.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/timestamp-converter" className="group p-6 bg-white border border-gray-200 rounded-xl hover:border-gray-900 transition-colors shadow-sm hover:shadow-md">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-900 font-bold group-hover:bg-gray-900 group-hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900">Unix Timestamp Converter</h2>
          </div>
          <p className="text-gray-600 leading-relaxed mb-4">
            Bidirectionally calculate Unix epoch integers (seconds and milliseconds) directly into localized timezones, UTC, and ISO-8601 formatting instantly.
          </p>
          <span className="text-sm font-semibold text-blue-600 group-hover:text-blue-800 flex items-center gap-1">
            Open Tool <span aria-hidden="true">&rarr;</span>
          </span>
        </Link>
        
        <Link href="/cron-parser" className="group p-6 bg-white border border-gray-200 rounded-xl hover:border-gray-900 transition-colors shadow-sm hover:shadow-md">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-900 font-bold group-hover:bg-gray-900 group-hover:text-white transition-colors">
              *
            </div>
            <h2 className="text-xl font-bold text-gray-900">Cron Schedule Parser</h2>
          </div>
          <p className="text-gray-600 leading-relaxed mb-4">
            Translate confusing, multi-asterisk Linux crontab expressions into plain English human readable schedules to ensure your background tasks execute correctly.
          </p>
          <span className="text-sm font-semibold text-blue-600 group-hover:text-blue-800 flex items-center gap-1">
            Open Tool <span aria-hidden="true">&rarr;</span>
          </span>
        </Link>
        
        <Link href="/regex-replace" className="group p-6 bg-white border border-gray-200 rounded-xl hover:border-gray-900 transition-colors shadow-sm hover:shadow-md">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-900 font-bold group-hover:bg-gray-900 group-hover:text-white transition-colors">
              /r/
            </div>
            <h2 className="text-xl font-bold text-gray-900">Regex Match & Replace</h2>
          </div>
          <p className="text-gray-600 leading-relaxed mb-4">
            Interactively validate complex Regular Expressions. Simulate flag combinations, capture group injections, and execute real-time JS `.replace()` functions.
          </p>
          <span className="text-sm font-semibold text-blue-600 group-hover:text-blue-800 flex items-center gap-1">
            Open Tool <span aria-hidden="true">&rarr;</span>
          </span>
        </Link>

        {/* Note SQL formatter fits as a utility for the time being. */}
        <Link href="/sql-formatter" className="group p-6 bg-white border border-gray-200 rounded-xl hover:border-gray-900 transition-colors shadow-sm hover:shadow-md">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-900 font-bold group-hover:bg-gray-900 group-hover:text-white transition-colors">
              SQL
            </div>
            <h2 className="text-xl font-bold text-gray-900">SQL Beautifier</h2>
          </div>
          <p className="text-gray-600 leading-relaxed mb-4">
            Execute AST-driven structural formatting to transform dumped, single-line backend database queries into pristine, beautifully indented blocks of code.
          </p>
          <span className="text-sm font-semibold text-blue-600 group-hover:text-blue-800 flex items-center gap-1">
            Open Tool <span aria-hidden="true">&rarr;</span>
          </span>
        </Link>
      </div>
    </div>
  );
}
