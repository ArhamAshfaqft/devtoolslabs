import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Free Encoding & Decoding Tools | Base64, URL, JWT & Entities',
  description: 'Securely decode JWT tokens, render Base64 images, parse URL query strings, and translate HTML entities 100% locally in your web browser.',
  openGraph: {
    title: 'Free Encoding & Decoding Tools | Base64, URL, JWT & Entities',
    description: 'Securely decode JWT tokens, render Base64 images, parse URL query strings, and translate HTML entities 100% locally in your web browser.',
    url: 'https://devtoolslabs.com/encoding-tools',
  },
  alternates: {
    canonical: '/encoding-tools',
  },
};

export default function EncodingToolsHub() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 md:py-20">
      <div className="max-w-3xl mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 tracking-tight">Encoding & Decoding Tools</h1>
        <p className="text-xl text-gray-600 leading-relaxed">
          Translating data between HTTP-safe formats (like URL percent-encoding) and secure transmission layers (like Base64 and JWTs) is a daily chore for full-stack developers. Our completely offline decoding toolkit allows you to inspect complex tokens and payloads securely on your local machine.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/jwt-validator" className="group p-6 bg-white border border-gray-200 rounded-xl hover:border-gray-900 transition-colors shadow-sm hover:shadow-md">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-900 font-bold group-hover:bg-gray-900 group-hover:text-white transition-colors">
              JWT
            </div>
            <h2 className="text-xl font-bold text-gray-900">JWT Decoder & Validator</h2>
          </div>
          <p className="text-gray-600 leading-relaxed mb-4">
            Safely parse Base64Url encoded JSON Web Tokens into their readable header and payload objects. Never paste your production auth tokens into a server-backed tool—our decoder runs entirely isolated in your DOM.
          </p>
          <span className="text-sm font-semibold text-blue-600 group-hover:text-blue-800 flex items-center gap-1">
            Open Tool <span aria-hidden="true">&rarr;</span>
          </span>
        </Link>

        <Link href="/jwt-generator" className="group p-6 bg-white border border-gray-200 rounded-xl hover:border-gray-900 transition-colors shadow-sm hover:shadow-md">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-900 font-bold group-hover:bg-gray-900 group-hover:text-white transition-colors">
              +
            </div>
            <h2 className="text-xl font-bold text-gray-900">JWT Encoder & Generator</h2>
          </div>
          <p className="text-gray-600 leading-relaxed mb-4">
            Manually construct strictly formatted JSON headers and claim payloads to completely customize and sign an HS256 secure JWT token locally.
          </p>
          <span className="text-sm font-semibold text-blue-600 group-hover:text-blue-800 flex items-center gap-1">
            Open Tool <span aria-hidden="true">&rarr;</span>
          </span>
        </Link>

        <Link href="/base64-image-decoder" className="group p-6 bg-white border border-gray-200 rounded-xl hover:border-gray-900 transition-colors shadow-sm hover:shadow-md">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-900 font-bold group-hover:bg-gray-900 group-hover:text-white transition-colors">
              IMG
            </div>
            <h2 className="text-xl font-bold text-gray-900">Base64 Image Decoder</h2>
          </div>
          <p className="text-gray-600 leading-relaxed mb-4">
            Extract raw Base64 data chunks from JSON configs or compiled CSS files and instantaneously render them back into viewable PNG, JPEG, or SVG image files directly to your screen.
          </p>
          <span className="text-sm font-semibold text-blue-600 group-hover:text-blue-800 flex items-center gap-1">
            Open Tool <span aria-hidden="true">&rarr;</span>
          </span>
        </Link>
        
        <Link href="/query-parser" className="group p-6 bg-white border border-gray-200 rounded-xl hover:border-gray-900 transition-colors shadow-sm hover:shadow-md">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-900 font-bold group-hover:bg-gray-900 group-hover:text-white transition-colors">
              URL
            </div>
            <h2 className="text-xl font-bold text-gray-900">URL Query String Parser</h2>
          </div>
          <p className="text-gray-600 leading-relaxed mb-4">
            Process massive, heavily percent-encoded tracking URIs and API endpoint addresses back into clear, structured, and tabulated key-value pairs for immediate analysis.
          </p>
          <span className="text-sm font-semibold text-blue-600 group-hover:text-blue-800 flex items-center gap-1">
            Open Tool <span aria-hidden="true">&rarr;</span>
          </span>
        </Link>
        
        <Link href="/html-entity-decoder" className="group p-6 bg-white border border-gray-200 rounded-xl hover:border-gray-900 transition-colors shadow-sm hover:shadow-md">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-900 font-bold group-hover:bg-gray-900 group-hover:text-white transition-colors">
              &lt;/&gt;
            </div>
            <h2 className="text-xl font-bold text-gray-900">HTML Entity Encoder</h2>
          </div>
          <p className="text-gray-600 leading-relaxed mb-4">
            Sanitize untrusted user inputs to prevent XSS attacks by encoding mathematical symbols into safe HTML entities, or parse heavily encoded source logs back into raw readable HTML structure.
          </p>
          <span className="text-sm font-semibold text-blue-600 group-hover:text-blue-800 flex items-center gap-1">
            Open Tool <span aria-hidden="true">&rarr;</span>
          </span>
        </Link>
        
        <Link href="/base64-encode-decode" className="group p-6 bg-white border border-gray-200 rounded-xl hover:border-gray-900 transition-colors shadow-sm hover:shadow-md">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-900 font-bold group-hover:bg-gray-900 group-hover:text-white transition-colors">
              ab
            </div>
            <h2 className="text-xl font-bold text-gray-900">Base64 Text Encoder</h2>
          </div>
          <p className="text-gray-600 leading-relaxed mb-4">
            Instantly encode arbitrary text or API keys into strict Base64 format, or cleanly decode Base64 strings back into their original Unicode format.
          </p>
          <span className="text-sm font-semibold text-blue-600 group-hover:text-blue-800 flex items-center gap-1">
            Open Tool <span aria-hidden="true">&rarr;</span>
          </span>
        </Link>

        <Link href="/url-encode-decode" className="group p-6 bg-white border border-gray-200 rounded-xl hover:border-gray-900 transition-colors shadow-sm hover:shadow-md">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-900 font-bold group-hover:bg-gray-900 group-hover:text-white transition-colors">
              %
            </div>
            <h2 className="text-xl font-bold text-gray-900">URL Percent Encoder</h2>
          </div>
          <p className="text-gray-600 leading-relaxed mb-4">
            Safely percent-encode reserved characters, emojis, and query strings specifically meant for HTTP transmission using the native browser URL conversion utility.
          </p>
          <span className="text-sm font-semibold text-blue-600 group-hover:text-blue-800 flex items-center gap-1">
            Open Tool <span aria-hidden="true">&rarr;</span>
          </span>
        </Link>
      </div>
    </div>
  );
}
