import type { Metadata } from 'next';
import CategoryHub from '@/components/CategoryHub';

export const metadata: Metadata = {
  title: 'Free Encoding & Decoding Tools | Base64, URL & JWT',
  description: 'Encode and decode Base64, URL components, and JWT payloads with focused privacy-first developer tools.',
  alternates: { canonical: '/encoding-tools' },
};

export default function EncodingToolsHub() {
  return <CategoryHub
    title="Encoding & Decoding Tools"
    intro="Convert common web encodings without installing a desktop application. Text transformations run locally in your browser, making these utilities suitable for debugging sanitized payloads and application data."
    tools={[
      { badge: 'B64', title: 'Base64 Encoder & Decoder', href: '/base64-encode-decode', description: 'Encode UTF-8 text as Base64 or decode Base64 back into readable text.' },
      { badge: '%', title: 'URL Encoder & Decoder', href: '/url-encode-decode', description: 'Encode reserved characters for URLs or decode percent-encoded values.' },
      { badge: 'JWT', title: 'JWT Decoder & Generator', href: '/jwt-decoder', description: 'Inspect JWT headers and payloads, verify signatures, and generate test tokens locally.' },
      { badge: 'HTML', title: 'HTML to Markdown', href: '/html-to-markdown', description: 'Turn HTML structure into clean Markdown with configurable output styles.' },
    ]}
  />;
}
