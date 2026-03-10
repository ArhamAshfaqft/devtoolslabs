import React from 'react';
import type { Metadata } from 'next';
import ToolLayout from '@/components/ToolLayout';
import UuidGeneratorTool from '@/components/tools/UuidGeneratorTool';

export const metadata: Metadata = {
  title: 'Random UUID Generator (Generate V4 UUIDs Online)',
  description: 'Instantly generate secure, random Version 4 UUIDs (Universally Unique Identifiers) in bulk. Run 100% inside your browser using the Web Crypto API.',
};

export default function UuidGeneratorPage() {
  return (
    <ToolLayout
      title="Random UUID Generator (Generate V4 UUIDs Online)"
      intro="Need unique identifiers for your database rows, API requests, or testing? This tool generates highly secure, random Version 4 UUIDs (Universally Unique Identifiers) using your browser's native Web Crypto API. Generate up to 100 at a time, format them with or without hyphens, and copy them all instantly."
      toolNode={<UuidGeneratorTool />}
      howTo={[
        "Select the number of UUIDs you want to generate (up to 100 at once).",
        "Choose your preferred format (standard with hyphens or no hyphens).",
        "Select the casing (lowercase or UPPERCASE).",
        "Click 'Generate UUIDs' to create a fresh batch.",
        "Click 'Copy to Clipboard' to instantly copy the entire list."
      ]}
      examples={[
        {
          input: "Standard Lowercase (V4)",
          output: "123e4567-e89b-12d3-a456-426614174000"
        },
        {
          input: "Standard Uppercase (V4)",
          output: "123E4567-E89B-12D3-A456-426614174000"
        },
        {
          input: "No Hyphens",
          output: "123e4567e89b12d3a456426614174000"
        }
      ]}
      useCases={[
        "Generating unique primary keys for SQL or NoSQL database records.",
        "Creating unique transaction IDs or idempotency keys for REST APIs.",
        "Mocking massive amounts of realistic test data.",
        "Generating obscure, non-sequential unguessable tokens."
      ]}
      faqs={[
        {
          question: "What is a UUID?",
          answer: "UUID stands for Universally Unique Identifier. It is a 128-bit label used for information in computer systems. Standard UUIDs are represented as 32 hexadecimal characters, displayed in 5 groups separated by hyphens."
        },
        {
          question: "What version of UUID does this tool generate?",
          answer: "This tool generates UUIDv4 (Version 4). Version 4 UUIDs are completely randomized, meaning they are generated primarily from cryptographic pseudo-random number generators rather than MAC addresses or timestamps. This makes them perfectly suited for almost all modern development use cases."
        },
        {
          question: "Are the UUIDs truly random and secure?",
          answer: "Yes. This tool utilizes the native window.crypto.randomUUID() Web API built directly into your internet browser. It provides cryptographically secure pseudo-randomness, ensuring the identifiers are mathematically virtually guaranteed to be unique."
        },
        {
          question: "Are these UUIDs sent to your servers?",
          answer: "No. The entire generation process happens locally in your device's memory. No identifiers are ever transmitted across a network or saved, guaranteeing 100% privacy and security for your projects."
        }
      ]}
      relatedTools={[
        {
          name: "Secure Hash Generator",
          url: "/hash-generator"
        },
        {
          name: "JSON Formatting & Utils",
          url: "/json-tools"
        }
      ]}
    />
  );
}
