'use client';
import React from 'react';
import Link from 'next/link';

export default function Header() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const openSearch = () => {
    setMobileOpen(false);
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true }));
  };

  return (
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between relative">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-gray-900 text-white flex items-center justify-center rounded-md font-bold text-lg group-hover:bg-blue-600 transition-colors">
            {'{ }'}
          </div>
          <span className="font-bold text-xl tracking-tight text-gray-900">DevTools<span className="text-blue-600">Labs</span></span>
        </Link>
        <nav className="hidden sm:flex items-center gap-6 text-sm font-medium text-gray-600">
          <button 
            suppressHydrationWarning
            onClick={openSearch}
            className="flex items-center gap-3 px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl hover:border-blue-500 hover:bg-white text-gray-400 hover:text-gray-900 transition-all group w-48 shadow-xs"
          >
            <svg className="w-4 h-4 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="text-sm font-medium">Search tools...</span>
            <kbd className="hidden lg:inline-block px-1.5 py-0.5 bg-white border border-gray-200 rounded text-[10px] font-bold text-gray-400 shadow-xs">K</kbd>
          </button>
          <Link href="/" className="hover:text-gray-900 transition-colors">All Tools</Link>
          <Link href="/guides" className="hover:text-gray-900 transition-colors">Guides</Link>
          <a href="https://github.com/ArhamAshfaqft/devtoolslabs" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 transition-colors">GitHub</a>
        </nav>

        <button
          type="button"
          className="sm:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-gray-200 text-gray-700"
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((open) => !open)}
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
            {mobileOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>

        {mobileOpen && (
          <nav className="sm:hidden absolute top-16 left-4 right-4 bg-white border border-gray-200 rounded-xl shadow-lg p-3 flex flex-col text-sm font-medium text-gray-700">
            <button type="button" onClick={openSearch} className="text-left px-3 py-3 rounded-lg hover:bg-gray-50">Search tools</button>
            <Link href="/" onClick={() => setMobileOpen(false)} className="px-3 py-3 rounded-lg hover:bg-gray-50">All Tools</Link>
            <Link href="/guides" onClick={() => setMobileOpen(false)} className="px-3 py-3 rounded-lg hover:bg-gray-50">Guides</Link>
            <a href="https://github.com/ArhamAshfaqft/devtoolslabs" target="_blank" rel="noopener noreferrer" onClick={() => setMobileOpen(false)} className="px-3 py-3 rounded-lg hover:bg-gray-50">GitHub</a>
          </nav>
        )}
      </div>
    </header>
  );
}
