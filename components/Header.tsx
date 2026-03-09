import React from 'react';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-gray-900 text-white flex items-center justify-center rounded-md font-bold text-lg group-hover:bg-blue-600 transition-colors">
            {'{ }'}
          </div>
          <span className="font-bold text-xl tracking-tight text-gray-900">DevTools<span className="text-gray-400">Hub</span></span>
        </Link>
        <nav className="hidden sm:flex items-center gap-6 text-sm font-medium text-gray-600">
          <Link href="/" className="hover:text-gray-900 transition-colors">All Tools</Link>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 transition-colors">GitHub</a>
        </nav>
      </div>
    </header>
  );
}
