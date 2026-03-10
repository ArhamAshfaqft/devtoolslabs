"use client";

import React from "react";
import Link from "next/link";

interface GuideLayoutProps {
  title: string;
  description: string;
  publishDate: string;
  readTime: string;
  children: React.ReactNode;
  relatedTools: { name: string; url: string }[];
}

export default function GuideLayout({
  title,
  description,
  publishDate,
  readTime,
  children,
  relatedTools,
}: GuideLayoutProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 md:py-20">
      <article className="prose prose-slate prose-lg lg:prose-xl max-w-none">
        <header className="mb-12 not-prose">
          <Link
            href="/guides"
            className="text-blue-600 hover:text-blue-800 font-semibold text-sm flex items-center gap-1 mb-6 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Guides
          </Link>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 tracking-tight leading-tight mb-6">
            {title}
          </h1>
          
          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            {description}
          </p>
          
          <div className="flex items-center gap-6 text-sm font-medium text-gray-500 border-b border-gray-100 pb-8">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{publishDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{readTime} Read</span>
            </div>
          </div>
        </header>

        <main className="text-gray-800 leading-relaxed space-y-8 font-poppins">
          <style jsx global>{`
            .prose h2 { color: #111827; font-weight: 800; font-size: 1.875rem; margin-top: 3rem; margin-bottom: 1.5rem; letter-spacing: -0.025em; }
            .prose h3 { color: #111827; font-weight: 700; font-size: 1.5rem; margin-top: 2.5rem; margin-bottom: 1rem; }
            .prose p { margin-bottom: 1.5rem; line-height: 1.8; }
            .prose ul { list-style-type: disc; padding-left: 1.5rem; margin-bottom: 1.5rem; }
            .prose li { margin-bottom: 0.5rem; }
            .prose code { background: #f3f4f6; padding: 0.2rem 0.4rem; rounded: 0.25rem; font-family: monospace; font-size: 0.875em; color: #1f2937; }
            .prose pre { background: #111827; color: #e5e7eb; padding: 1.5rem; rounded: 0.75rem; overflow-x: auto; margin: 2rem 0; font-size: 0.9em; }
            .prose strong { color: #111827; font-weight: 700; }
            .prose blockquote { border-left: 4px solid #3b82f6; padding-left: 1.5rem; italic: true; color: #4b5563; font-size: 1.1em; margin: 2.5rem 0; }
          `}</style>
          {children}
        </main>

        <footer className="mt-20 pt-12 border-t border-gray-100 not-prose">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Tools & Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {relatedTools.map((tool, idx) => (
              <Link
                key={idx}
                href={tool.url}
                className="group flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl hover:border-blue-600 hover:shadow-md transition-all"
              >
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-1">Use Tool</span>
                  <span className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{tool.name}</span>
                </div>
                <svg className="w-6 h-6 text-gray-300 group-hover:text-blue-600 transform group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            ))}
          </div>
          
          <div className="mt-20 p-8 bg-blue-50 rounded-2xl border border-blue-100">
            <h3 className="text-xl font-bold text-blue-900 mb-2">Build your SaaS with DevToolsLabs?</h3>
            <p className="text-blue-800 text-sm mb-6 max-w-lg">
              We provide free, high-performance utilities for developers building the next generation of web applications. Join thousands of engineers who use us daily.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Explore All 35+ Tools
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </footer>
      </article>
    </div>
  );
}
