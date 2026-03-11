import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'Developer Guides & Tutorials | DevToolsLabs',
  description: 'In-depth technical guides, tutorials, and explanations for modern developers. Learn about JWT, Base64, Regex, and more.',
};

const GUIDES = [
  {
    title: 'The Ultimate Guide to cURL Commands: Examples & Best Practices',
    slug: 'ultimate-curl-guide',
    description: 'Master cURL for API testing, file downloads, and server debugging. A comprehensive guide with real-world examples for developers and DevOps engineers.',
    date: 'March 12, 2026',
    readTime: '8 min',
    category: 'Development'
  },
  {
    title: 'Understanding CORS: The Definitive Guide for Developers',
    slug: 'understanding-cors',
    description: 'Master Cross-Origin Resource Sharing. Learn how preflight requests, Access-Control headers, and security policies work to protect your web applications.',
    date: 'March 12, 2026',
    readTime: '10 min',
    category: 'Security'
  },
  {
    title: 'How to Decode JWT Tokens (Step-by-Step Guide)',
    slug: 'how-to-decode-jwt',
    description: 'Learn the internal structure of JSON Web Tokens and how to safely decode them in your frontend or backend applications.',
    date: 'March 10, 2026',
    readTime: '6 min',
    category: 'Security'
  },
  {
    title: 'Understanding Base64 Encoding: How It Works & Why We Use It',
    slug: 'understanding-base64',
    description: 'Learn the binary-to-text algorithm behind Base64, its character set, and common use cases in web development.',
    date: 'March 10, 2026',
    readTime: '5 min',
    category: 'Encoding'
  },
  {
    title: 'Regex Explained for Beginners: A Friendly Guide to Regular Expressions',
    slug: 'regex-explained',
    description: 'Master the basics of Regular Expressions. Learn about character classes, quantifiers, and flags with real-world examples.',
    date: 'March 10, 2026',
    readTime: '8 min',
    category: 'Development'
  },
  {
    title: 'How Unix Timestamps Work: The Developer Guide to Epoch Time',
    slug: 'unix-timestamps',
    description: 'Learn about the Unix epoch, seconds vs milliseconds, and how to handle timezones in your web applications.',
    date: 'March 10, 2026',
    readTime: '6 min',
    category: 'Data'
  },
  // Upcoming guides placeholders
];

export default function GuidesPage() {
  return (
    <div className={`${poppins.variable} font-poppins bg-white min-h-screen`}>
      <div className="max-w-6xl mx-auto px-4 py-16 md:py-24">
        <div className="max-w-3xl mb-16">
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 tracking-tight leading-tight mb-6">
            Developer <span className="text-blue-600">Guides</span>
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Master the technical foundations of modern web development. Our guides provide deep dives into the tools you use every day, from security best practices to data encoding.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {GUIDES.map((guide) => (
            <Link 
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className="group flex flex-col bg-white border border-gray-200 rounded-2xl p-8 hover:border-blue-600 hover:shadow-xl transition-all h-full"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-widest rounded-full">
                  {guide.category}
                </span>
                <span className="text-gray-400 text-xs font-medium">
                  {guide.readTime}
                </span>
              </div>
              
              <h2 className="text-2xl font-extrabold text-gray-900 group-hover:text-blue-600 transition-colors mb-4 line-clamp-2 leading-tight">
                {guide.title}
              </h2>
              
              <p className="text-gray-600 text-sm leading-relaxed mb-8 line-clamp-3">
                {guide.description}
              </p>
              
              <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
                <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider">{guide.date}</span>
                <svg className="w-5 h-5 text-gray-300 group-hover:text-blue-600 transform group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </Link>
          ))}
          
          <div className="flex flex-col items-center justify-center p-8 bg-gray-50 border border-dashed border-gray-300 rounded-2xl text-center aspect-square md:aspect-auto">
            <svg className="w-12 h-12 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <h3 className="text-lg font-bold text-gray-400">More Coming Soon</h3>
            <p className="text-gray-400 text-sm mt-2 font-medium">We're writing new technical deep-dives every week.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
