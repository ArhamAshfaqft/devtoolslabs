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

export interface CodeSnippet {
  language: string;
  code: string;
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
  codeSnippets?: CodeSnippet[];
  children?: ReactNode;
}

const ToolLayout = ({
  title,
  intro,
  toolNode,
  howTo,
  examples,
  useCases,
  faqs,
  relatedTools,
  codeSnippets,
  children,
}: ToolLayoutProps) => {
  const [currentUrl, setCurrentUrl] = useState('');
  const [copiedBadge, setCopiedBadge] = useState(false);
  const [copiedSnippet, setCopiedSnippet] = useState(false);
  const [activeSnippetIdx, setActiveSnippetIdx] = useState(0);
  const [isFav, setIsFav] = useState(false);
  
  // Use a local state for fav to avoid hydration mismatch if needed, 
  // though we'll sync with helper
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href);
      const favs = JSON.parse(localStorage.getItem("devtoolslabs_favorites") || "[]");
      const path = window.location.pathname;
      setIsFav(favs.includes(path));
    }
  }, [title]);

  const toggleFav = () => {
    const favs = JSON.parse(localStorage.getItem("devtoolslabs_favorites") || "[]");
    const path = window.location.pathname;
    let newFavs;
    if (favs.includes(path)) {
      newFavs = favs.filter((p: string) => p !== path);
      setIsFav(false);
    } else {
      newFavs = [...favs, path];
      setIsFav(true);
    }
    localStorage.setItem("devtoolslabs_favorites", JSON.stringify(newFavs));
    window.dispatchEvent(new Event('storage')); // Notify other components
  };

  // Log recent usage
  useEffect(() => {
    if (typeof window !== 'undefined') {
       const recent = JSON.parse(localStorage.getItem("devtoolslabs_recent") || "[]");
       const path = window.location.pathname;
       const filtered = recent.filter((p: string) => p !== path);
       const newRecent = [path, ...filtered].slice(0, 5);
       localStorage.setItem("devtoolslabs_recent", JSON.stringify(newRecent));
       window.dispatchEvent(new Event('storage'));
    }
  }, [title]);

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
    "author": {
      "@type": "Organization",
      "name": "DevToolsLabs",
      "url": "https://devtoolslabs.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "DevToolsLabs",
      "logo": {
        "@type": "ImageObject",
        "url": "https://devtoolslabs.com/logo.png"
      }
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  // Generate Breadcrumb Schema for Site Structure
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Tools",
        "item": "https://devtoolslabs.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": title,
        "item": currentUrl || "https://devtoolslabs.com"
      }
    ]
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      
      {/* Back navigation */}
      <div className="max-w-5xl mx-auto px-6 pt-8 pb-4">
        <a href="/" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
          <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          Back to all tools
        </a>
      </div>

      <main className="max-w-5xl mx-auto px-6 py-6">
        {/* Header & Intro */}
        <header className="mb-10 border-b border-gray-100 pb-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6 mb-4">
             <div className="flex-1">
               <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 leading-tight mb-2">{title}</h1>
               <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full w-fit">
                 <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                 </svg>
                 Expert Reviewed & Verified • March 2026
               </div>
             </div>
             
             <div className="flex items-center gap-2 shrink-0">
                {/* Favorite Button */}
                <button 
                  onClick={toggleFav}
                  className={`w-10 h-10 flex items-center justify-center rounded-xl border transition-all ${
                    isFav 
                      ? "bg-yellow-50 border-yellow-200 text-yellow-500 shadow-sm" 
                      : "bg-white border-gray-200 text-gray-400 hover:border-yellow-200 hover:text-yellow-500 shadow-sm"
                  }`}
                  title={isFav ? "Remove from Favorites" : "Add to Favorites"}
                >
                  <svg className="w-5 h-5" fill={isFav ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.382-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </button>

                {/* Social Sharing Buttons */}
                {currentUrl && (
                  <div className="flex gap-2">
                    <a 
                      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(`Check out this free developer tool: ${title}`)}`}
                      target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center h-10 px-4 text-[10px] font-black uppercase tracking-widest bg-black text-white rounded-xl hover:bg-gray-800 transition-all shadow-sm"
                    >
                      Share on X
                    </a>
                    <a 
                      href={`https://reddit.com/submit?url=${encodeURIComponent(currentUrl)}&title=${encodeURIComponent(`A free browser-based ${title} for developers`)}`}
                      target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center h-10 px-4 text-[10px] font-black uppercase tracking-widest bg-[#FF4500] text-white rounded-xl hover:bg-[#e03d00] transition-all shadow-sm"
                    >
                      Reddit
                    </a>
                  </div>
                )}
             </div>
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

        {/* The Interactive Tool Component (Flush Dashboard Style) */}
        <section className="mb-20 border border-gray-200 rounded-xl bg-white shadow-sm w-full overflow-hidden">
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

          {/* Code Snippets Engine */}
          {codeSnippets && codeSnippets.length > 0 && (
            <section className="mt-16">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-1">How to do this in Code</h2>
                  <p className="text-sm text-gray-500">Native implementations for your backend or scripts</p>
                </div>
              </div>
              <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 shadow-xl">
                <div className="flex items-center justify-between bg-black/50 px-2 sm:px-4 py-2 border-b border-gray-800 overflow-x-auto custom-scrollbar">
                  <div className="flex gap-1 min-w-max">
                    {codeSnippets.map((snippet, idx) => (
                      <button
                        suppressHydrationWarning
                        key={idx}
                        onClick={() => setActiveSnippetIdx(idx)}
                        className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                          activeSnippetIdx === idx 
                            ? 'bg-gray-800 text-white shadow-sm ring-1 ring-white/10' 
                            : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                        }`}
                      >
                        {snippet.language}
                      </button>
                    ))}
                  </div>
                  <button
                    suppressHydrationWarning
                    onClick={() => {
                      navigator.clipboard.writeText(codeSnippets[activeSnippetIdx].code);
                      setCopiedSnippet(true);
                      setTimeout(() => setCopiedSnippet(false), 2000);
                    }}
                    className="ml-4 shrink-0 px-3 py-1.5 rounded-md text-xs font-semibold text-gray-300 bg-gray-800 hover:bg-gray-700 hover:text-white transition-all border border-gray-700 flex items-center gap-1.5"
                  >
                    {copiedSnippet ? '✓ Copied' : '⎘ Copy'}
                  </button>
                </div>
                <div className="p-4 sm:p-5 overflow-x-auto">
                  <pre className="text-[13px] text-gray-300 font-mono leading-relaxed">
                    <code>{codeSnippets[activeSnippetIdx] ? codeSnippets[activeSnippetIdx].code : ''}</code>
                  </pre>
                </div>
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

          {/* E-E-A-T Author / Expertise Block */}
          <section className="mt-16 p-6 sm:p-8 bg-blue-50/50 border border-blue-100 rounded-2xl flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center shrink-0 shadow-sm border-4 border-white">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Built by Developers, For Developers</h3>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                DevToolsLabs is engineered by a team of full-stack developers who were tired of spammy, ad-filled, server-side tools parsing our sensitive data. 
                Every utility on this site is rigorously tested, strictly client-side (<strong className="font-semibold text-gray-900">your data never leaves your browser</strong>), 
                and built to solve real-world software engineering challenges.
              </p>
            </div>
          </section>

          {/* Internal Linking Area (SEO cluster building) */}
          {relatedTools.length > 0 && (
            <section className="mt-16 pt-10 border-t border-gray-200">
              <h2 className="text-2xl font-semibold mb-6 text-gray-900">More Developer Tools</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {relatedTools.map((tool, idx) => (
                  <a key={idx} href={tool.url} className="group p-5 bg-white border border-gray-200 hover:border-blue-500 hover:shadow-md rounded-xl transition-all block">
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 mb-1">{tool.name}</h3>
                    <p className="text-xs text-gray-500">Free client-side utility</p>
                  </a>
                ))}
              </div>
            </section>
          )}

          {children && (
            <div className="mt-12">
              {children}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ToolLayout;
