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
          <span className="font-bold text-xl tracking-tight text-gray-900">DevTools<span className="text-blue-600">Labs</span></span>
        </Link>
        <nav className="hidden sm:flex items-center gap-6 text-sm font-medium text-gray-600">
          <button 
            onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true }))}
            className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg hover:border-gray-900 hover:text-gray-900 transition-all group"
          >
            <svg className="w-4 h-4 text-gray-400 group-hover:text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span>Search</span>
            <kbd className="hidden lg:inline-block px-1.5 py-0.5 bg-white border border-gray-200 rounded text-[10px] font-bold text-gray-400">Ctrl+K</kbd>
          </button>
          <Link href="/" className="hover:text-gray-900 transition-colors">All Tools</Link>
          <Link href="/guides" className="hover:text-gray-900 transition-colors">Guides</Link>
          <a href="https://github.com/ArhamAshfaqft/devtoolslabs" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 transition-colors">GitHub</a>
        </nav>
      </div>
    </header>
  );
}
