import React from 'react';
import type { Metadata } from 'next';
import ToolLayout from '@/components/ToolLayout';
import Base64UrlSafeTool from '@/components/tools/Base64UrlSafeTool';

export const metadata: Metadata = {
  title: 'Base64 URL-Safe Encode & Decode (Free Online Tool) | DevToolsLabs',
  description: 'Encode and decode Base64 URL-safe strings online. Automatically handles character replacement (+ to -, / to _) and padding removal for JWT and URL compatibility.',
};

export default function Base64UrlSafePage() {
  return (
    <ToolLayout
      title="Base64 URL-Safe Encoder"
      intro="Securely encode and decode data for use in URLs and JWT tokens. This variant of Base64 replaces characters that have special meanings in URLs with safe alternatives."
      toolNode={<Base64UrlSafeTool />}
      howTo={[
        "Type or paste your raw text into the 'Raw Text' field to encode it.",
        "Paste a Base64 URL-safe string into the 'Output' field to decode it back to text.",
        "The tool automatically swaps '+' with '-' and '/' with '_', and handles padding removal.",
        "Use the copy buttons to quickly grab your results for use in code or API requests."
      ]}
      examples={[
        {
          input: "Hello World!",
          output: "SGVsbG8gV29ybGQh"
        },
        {
          input: "Complex/?String+",
          output: "Q29tcGxleC8_U3RyaW5nLQ"
        }
      ]}
      useCases={[
        "Generating URL-safe payloads for deep-linking and webhooks.",
        "Encoding/decoding the header and payload sections of JSON Web Tokens (JWT).",
        "Passing binary data through URL query parameters without encoding issues.",
        "Building slug-safe identifiers from raw database strings."
      ]}
      faqs={[
        {
          question: "How is this different from standard Base64?",
          answer: "Standard Base64 uses characters (+, /, =) that are reserved in URLs and can break navigation. The URL-Safe variant uses '-' and '_' instead, and eliminates padding '=' characters."
        },
        {
          question: "Is this safe for sensitive data?",
          answer: "Yes. All encoding and decoding happens locally in your browser. No data is ever sent to our servers, ensuring your strings remain private."
        }
      ]}
      relatedTools={[
        { name: "Base64 Image Decoder", url: "/base64-image-decoder" },
        { name: "URL Encode/Decode", url: "/url-encode-decode" },
        { name: "JWT Validator", url: "/jwt-validator" }
      ]}
    />
  );
}
