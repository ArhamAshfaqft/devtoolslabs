import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Free Security Developer Tools | SHA256 Hashes, SSL & Crypto',
  description: 'A suite of completely offline security and cryptography tools for developers. Generate MD5 or SHA256 hashes safely in your web browser with zero server data tracking.',
};

export default function SecurityToolsHub() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 md:py-20">
      <div className="max-w-3xl mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 tracking-tight">Security & Cryptography Tools</h1>
        <p className="text-xl text-gray-600 leading-relaxed">
          Pasting sensitive PII, passwords, or company secrets into random web tools is a massive liability. Our security utilities completely isolate computation to your local machine using the native Web Crypto API. Calculate cryptographic signatures securely with zero network transmission.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/hash-generator" className="group p-6 bg-white border border-gray-200 rounded-xl hover:border-gray-900 transition-colors shadow-sm hover:shadow-md">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-900 font-bold group-hover:bg-gray-900 group-hover:text-white transition-colors">
              #
            </div>
            <h2 className="text-xl font-bold text-gray-900">Secure Hash Generator</h2>
          </div>
          <p className="text-gray-600 leading-relaxed mb-4">
            Simultaneously calculate MD5, SHA-1, SHA-256, and SHA-512 cryptographic hashes. Verify file integrities and matching webhook signatures completely offline.
          </p>
          <span className="text-sm font-semibold text-blue-600 group-hover:text-blue-800 flex items-center gap-1">
            Open Tool <span aria-hidden="true">&rarr;</span>
          </span>
        </Link>
      </div>
      
      {/* Planned tools placeholder */}
      <div className="mt-16 pt-12 border-t border-gray-200">
        <h3 className="tracking-widest text-sm title-font font-semibold text-gray-400 mb-6 uppercase">Coming Soon</h3>
        <p className="text-gray-600">We are currently building localized tooling for <strong>HMAC Signature Verification</strong> and simple <strong>Bcrypt Generaton</strong>. Check back soon for updates!</p>
      </div>
    </div>
  );
}
