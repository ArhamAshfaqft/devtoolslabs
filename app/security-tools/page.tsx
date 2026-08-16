import type { Metadata } from 'next';
import CategoryHub from '@/components/CategoryHub';

export const metadata: Metadata = {
  title: 'Security Developer Tools | Hashes, JWT & Headers',
  description: 'Generate hashes, inspect JWTs, and reference security-related HTTP headers with privacy-first developer utilities.',
  alternates: { canonical: '/security-tools' },
};

export default function SecurityToolsHub() {
  return <CategoryHub
    title="Security & Cryptography Tools"
    intro="Inspect authentication data and calculate hashes with transparent, browser-based utilities. Never treat encoded data as encrypted, and avoid pasting production secrets into any online service."
    tools={[
      { badge: '#', title: 'Hash Generator', href: '/hash-generator', description: 'Calculate MD5, SHA-1, SHA-256, and SHA-512 digests locally.' },
      { badge: 'JWT', title: 'JWT Decoder & Generator', href: '/jwt-decoder', description: 'Inspect JWT claims and test signatures without uploading tokens.' },
      { badge: 'HDR', title: 'HTTP Header & MIME Hub', href: '/header-mime-hub', description: 'Reference security headers, MIME types, and common HTTP behavior.' },
      { badge: 'HTTP', title: 'HTTP Header Parser', href: '/http-header-parser', description: 'Parse authorization and response headers locally for safer debugging.' },
    ]}
  />;
}
