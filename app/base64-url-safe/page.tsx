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
          answer: "Standard Base64 uses characters (+, /, =) that are reserved in URLs and can break navigation or tracking. The URL-Safe variant swaps them for '-' and '_' respectively, and removes trailing padding '='."
        },
        {
          question: "Is this safe for sensitive data?",
          answer: "Yes. All encoding and decoding happens locally in your browser. No data is ever sent to our servers, ensuring your strings remain private."
        },
        {
          question: "Why remove the padding (=)?",
          answer: "URL-safe Base64 often omits padding because the `=` character is used to separate query parameters in URLs. Most modern decoders can handle strings without padding automatically."
        },
        {
          question: "Is this the same as 'base64url' in Node.js?",
          answer: "Yes. This tool implements the exact RFC 4648 'base64url' standard used in modern web APIs and authentication frameworks."
        },
        {
          question: "Can I use this for JWT troubleshooting?",
          answer: "Absolutely. JWT headers and payloads are almost always encoded using Base64 URL-safe. This tool helps you manually decode those segments to verify data."
        },
        {
          question: "Does it support binary data?",
          answer: "This web version supports UTF-8 text strings. For raw binary data (like images), we recommend our specialized 'Base64 to Image' tool."
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
