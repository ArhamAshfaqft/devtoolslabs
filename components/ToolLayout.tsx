'use client';
import React, { ReactNode, useState, useEffect } from 'react';
import FAQAccordion from './FAQAccordion';
import PrivacyBadge from './PrivacyBadge';

export interface FAQ {
  question: string;
  answer: string;
}

export interface Example {
  input: string;
  output: string;
}

interface ToolLayoutProps {
  title: string;
  intro: string;
  toolNode: ReactNode;
  howTo: string[];
  examples: Example[];
  useCases: string[];
  faqs: FAQ[];
  relatedTools: { name: string; url: string }[];
}

export default function ToolLayout({
  title,
  intro,
  toolNode,
  howTo,
  examples,
  useCases,
  faqs,
  relatedTools,
}: ToolLayoutProps) {
  const [currentUrl, setCurrentUrl] = useState('');
  const [copiedBadge, setCopiedBadge] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href);
    }
  }, []);

  const handleCopyBadge = () => {
    try {
      const url = new URL(window.location.href);
      const urlHost = url.origin;
      const cleanTitle = title.replace(/\s+/g, '%20');
      // Fallback simple shield badge
      const badgeImage = `https://img.shields.io/badge/Tool-${cleanTitle}-blue?style=flat-square`;
      const badgeMarkdown = `[![${title}](${badgeImage})](${currentUrl})`;
      
      navigator.clipboard.writeText(badgeMarkdown);
      setCopiedBadge(true);
      setTimeout(() => setCopiedBadge(false), 2000);
    } catch(e) {}
  };
  // Generate FAQ Schema for Google Rich Snippets
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };

  // Generate WebApplication Schema for maximum Google Tool ranking
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": title,
    "description": intro,
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  return (
    <div className="bg-white text-gray-900 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      
      {/* Back navigation */}
      <div className="max-w-4xl mx-auto px-6 pt-8 pb-4">
        <a href="/" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
          <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          Back to all tools
        </a>
      </div>

      <main className="max-w-4xl mx-auto px-6 py-6">
        {/* Header & Intro */}
        <header className="mb-6 border-b border-gray-100 pb-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
             <h1 className="text-3xl font-bold tracking-tight text-gray-900">{title}</h1>
             
             {/* Social Sharing Buttons */}
             {currentUrl && (
               <div className="flex gap-2">
                 <a 
                   href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(`Check out this free developer tool: ${title}`)}`}
                   target="_blank" rel="noopener noreferrer"
                   className="inline-flex items-center px-3 py-1.5 text-xs font-semibold bg-[#000000] text-white rounded hover:bg-gray-800 transition-colors"
                 >
                   Share on X
                 </a>
                 <a 
                   href={`https://reddit.com/submit?url=${encodeURIComponent(currentUrl)}&title=${encodeURIComponent(`A free browser-based ${title} for developers`)}`}
                   target="_blank" rel="noopener noreferrer"
                   className="inline-flex items-center px-3 py-1.5 text-xs font-semibold bg-[#FF4500] text-white rounded hover:bg-[#e03d00] transition-colors"
                 >
                   Reddit
                 </a>
               </div>
             )}
          </div>
          <p className="text-lg text-gray-600 leading-relaxed max-w-3xl">{intro}</p>
          <div className="mt-4">
            <PrivacyBadge />
          </div>
          
          {/* GitHub Markdown Embed Badge */}
          {currentUrl && (
            <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg max-w-fit">
              <span className="text-xs font-bold text-gray-600 uppercase tracking-wide">Embed in GitHub README</span>
              <button 
                onClick={handleCopyBadge}
                className="inline-flex items-center px-3 py-1.5 text-xs font-semibold bg-gray-200 text-gray-800 border border-gray-300 rounded hover:bg-gray-300 transition-colors"
              >
                {copiedBadge ? "✓ Copied Markdown!" : "</> Copy Badge Code"}
              </button>
            </div>
          )}
        </header>

        {/* The Interactive Tool Component */}
        <section className="mb-16 p-6 sm:p-8 border border-gray-200 rounded-xl bg-white shadow-sm">
          {toolNode}
        </section>

        {/* SEO Structured Content */}
        <div className="space-y-16">
          
          {/* How To Use */}
          {howTo.length > 0 && (
            <section>
              <h2 className="text-2xl font-semibold mb-6 text-gray-900">How to use this tool</h2>
              <ol className="list-decimal list-outside ml-5 space-y-3 text-gray-700 marker:text-gray-400 marker:font-medium">
                {howTo.map((step, idx) => (
                  <li key={idx} className="leading-relaxed pl-2">{step}</li>
                ))}
              </ol>
            </section>
          )}

          {/* Example Usage */}
          {examples.length > 0 && (
            <section>
              <h2 className="text-2xl font-semibold mb-6 text-gray-900">Example Usage</h2>
              <div className="grid gap-6">
                {examples.map((ex, idx) => (
                  <div key={idx} className="p-5 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="mb-4">
                      <span className="font-semibold text-xs text-gray-500 uppercase tracking-wider mb-2 block">Input</span>
                      <pre className="text-sm bg-white p-4 rounded border border-gray-200 overflow-x-auto text-gray-800 font-mono">{ex.input}</pre>
                    </div>
                    <div>
                      <span className="font-semibold text-xs text-gray-500 uppercase tracking-wider mb-2 block">Output</span>
                      <pre className="text-sm bg-white p-4 rounded border border-gray-200 overflow-x-auto text-gray-800 font-mono">{ex.output}</pre>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* When to use */}
          {useCases.length > 0 && (
            <section>
              <h2 className="text-2xl font-semibold mb-6 text-gray-900">When to use this tool</h2>
              <ul className="list-disc list-outside ml-5 space-y-2 text-gray-700 marker:text-gray-300">
                {useCases.map((useCase, idx) => (
                  <li key={idx} className="leading-relaxed pl-2">{useCase}</li>
                ))}
              </ul>
            </section>
          )}

          {/* FAQ */}
          {faqs.length > 0 && (
            <section>
              <h2 className="text-2xl font-semibold mb-6 text-gray-900">Frequently Asked Questions</h2>
              <div className="divide-y divide-gray-200 border-y border-gray-200">
                {faqs.map((faq, idx) => (
                  <FAQAccordion key={idx} question={faq.question} answer={faq.answer} />
                ))}
              </div>
            </section>
          )}

          {/* Internal Linking Area (SEO cluster building) */}
          {relatedTools.length > 0 && (
            <section className="bg-gray-50 p-6 md:p-8 rounded-xl border border-gray-200 mt-12">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">More Developer Tools</h2>
              <div className="flex flex-wrap gap-3">
                {relatedTools.map((tool, idx) => (
                  <a key={idx} href={tool.url} className="px-4 py-2 bg-white border border-gray-200 hover:border-gray-400 rounded-lg text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors shadow-sm">
                    {tool.name}
                  </a>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}
