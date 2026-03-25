import type { Metadata } from 'next';
import ToolLayout from '@/components/ToolLayout';
import Base64EncodeDecodeTool from '@/components/tools/Base64EncodeDecodeTool';

export const metadata: Metadata = {
  title: 'Base64 Encoder & Decoder (Free Online Tool) | Convert Instantly',
  description: 'Instantly encode text into Base64 format or decode Base64 strings back into readable text. 100% free, secure, and client-side processing.',
  openGraph: {
    title: 'Base64 Encoder & Decoder (Free Online Tool) | Convert Instantly',
    description: 'Instantly encode text into Base64 format or decode Base64 strings back into readable text. 100% free, secure, and client-side processing.',
    url: 'https://devtoolslabs.com/base64-encode-decode',
  },
  alternates: {
    canonical: '/base64-encode-decode',
  },
};

export default function Base64EncodeDecodePage() {
  return (
    <ToolLayout
      title="Base64 Encoder & Decoder (Convert Text to Base64 Online)"
      intro="Base64 is a standard encoding scheme used to securely transmit binary data and complex text character sets across HTTP requests, JSON payloads, and HTML attributes. This tool provides instant, bi-directional conversion. Your input is processed entirely in your web browser, guaranteeing that sensitive keys or tokens are never sent to external servers."
      toolNode={<Base64EncodeDecodeTool />}
      howTo={[
        "Click the button at the top to choose either 'Base64 Encode' or 'Base64 Decode' mode.",
        "Paste your raw string or Base64 sequence into the left input box.",
        "The converted output will instantly appear in the right box as you type.",
        "Click the Copy button to quickly save the calculated string to your clipboard."
      ]}
      examples={[
        {
          input: 'Hello World!',
          output: 'SGVsbG8gV29ybGQh'
        },
        {
          input: 'eyJhbGciOiJIUzI1NiJ9',
          output: '{"alg":"HS256"}'
        }
      ]}
      useCases={[
        "Encoding API Basic Authentication headers before injecting them into a cURL or Fetch request.",
        "Decoding the header or payload section of a JSON Web Token (JWT) to inspect the claims inside.",
        "Encoding special unicode characters (like emojis or foreign languages) to ensure they aren't corrupted during a database migration."
      ]}
      faqs={[
        {
          question: "Is my text sent to a backend server to decode?",
          answer: "No. This tool is 100% client-side. We utilize the native JavaScript `btoa()` and `atob()` engines built directly into your OS and browser. It is fully secure for proprietary source code or authentication tokens."
        },
        {
          question: "Is Base64 a form of encryption?",
          answer: "Absolutely not. Base64 is an encoding format, not an encryption cipher. It does not use cryptographic keys, which means anyone who finds your Base64 string can instantly decode it back into readable text. Never use Base64 to 'hide' passwords."
        },
        {
          question: "Why am I getting an 'Invalid sequence' error?",
          answer: "A valid Base64 string must have a length that is a multiple of 4. Furthermore, it can only contain alphanumeric characters (A-Z, a-z, 0-9), plus the '+' and '/' symbols (with '=' used for padding at the very end). If your string contains spaces or invalid characters, the native decoder will reject it."
        },
        {
          question: "Does this support Unicode and Emojis?",
          answer: "Yes, our tool employs a modern Uint8Array TextEncoder architecture that safely translates wide UTF-8 byte sequences prior to executing the Base64 conversion, perfectly supporting emojis and extended character sets."
        }
      ]}
      relatedTools={[
        { name: "JWT Decoder", url: "/jwt-validator" },
        { name: "Base64 Image Decoder", url: "/base64-image-decoder" }
      ]}
    />
  );
}
