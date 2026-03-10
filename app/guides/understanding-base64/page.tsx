import React from 'react';
import type { Metadata } from 'next';
import GuideLayout from '@/components/GuideLayout';

export const metadata: Metadata = {
  title: 'Understanding Base64 Encoding: How It Works & Why We Use It | DevToolsLabs',
  description: 'A deep dive into Base64 encoding. Learn the binary-to-text algorithm, the character set, and common use cases like data URIs and basic auth.',
};

export default function Base64GuidePage() {
  return (
    <GuideLayout
      title="Understanding Base64 Encoding: How It Works and Why We Use It"
      description="Base64 encoding is everywhere—from email attachments to JWTs and CSS background images. In this guide, we'll strip away the mystery and explain the binary-to-text logic that makes it possible."
      publishDate="March 10, 2026"
      readTime="5 min"
      relatedTools={[
        { name: "Base64 Encode & Decode", url: "/base64-encode-decode" },
        { name: "Base64 Image Decoder", url: "/base64-image-decoder" },
        { name: "JWT Validator", url: "/jwt-validator" }
      ]}
    >
      <section>
        <h2>What is Base64 Encoding?</h2>
        <p>
          <strong>Base64</strong> is a binary-to-text encoding scheme. It represents binary data in an ASCII string format by translating it into a radix-64 representation. In simpler terms: it takes "computer data" (bits and bytes) and turns it into "safe text" (letters and numbers).
        </p>
        <p>
          The primary purpose of Base64 is to ensure that data remains intact without any modification during transport through legacy systems that may not be 8-bit clean, or where certain control characters might be misinterpreted.
        </p>
      </section>

      <section>
        <h2>The 64-Character Set</h2>
        <p>
          As the name suggests, Base64 uses 64 characters to represent data. The standard character set consists of:
        </p>
        <ul>
          <li><strong>A-Z:</strong> 26 characters</li>
          <li><strong>a-z:</strong> 26 characters</li>
          <li><strong>0-9:</strong> 10 characters</li>
          <li><strong>+ and /:</strong> 2 characters</li>
        </ul>
        <p>
          This totals 64 characters. Additionally, the equals sign (<code>=</code>) is used as a <strong>padding</strong> character at the end of the string.
        </p>
      </section>

      <section>
        <h2>How the Algorithm Works (The 3-to-4 Rule)</h2>
        <p>
          The secret to Base64 is how it divides data. It takes three 8-bit bytes (24 bits total) and re-groups them into four 6-bit chunks.
        </p>
        <ol>
          <li>Take the original binary data (e.g., 'Man' → `01001101`, `01100001`, `01101110`).</li>
          <li>Concatenate the bits into a single 24-bit stream.</li>
          <li>Divide that stream into four 6-bit segments.</li>
          <li>Convert each 6-bit segment into its corresponding character from the Base64 table.</li>
        </ol>
        <p>
          This is why Base64 encoded strings are always approximately <strong>33% larger</strong> than their original binary source.
        </p>
      </section>

      <section>
        <h2>Why is it Used?</h2>
        <h3>1. Embedding Images in CSS/HTML</h3>
        <p>
          Data URIs allow you to embed small assets directly into your code. This reduces the number of HTTP requests a browser has to make.
        </p>
        <pre>{`background-image: url("data:image/png;base64,iVBORw0KGgoAAA...");`}</pre>

        <h3>2. Basic Authentication</h3>
        <p>
          In HTTP Basic Auth, the username and password are concatenated (<code>username:password</code>) and then Base64 encoded before being sent in the <code>Authorization</code> header.
        </p>
        <blockquote>
          <strong>Important:</strong> Base64 is <strong>NOT encryption</strong>. It is merely a format conversion. Anyone can decode it with one click. Never use Base64 to secure sensitive data without additional encryption (like HTTPS).
        </blockquote>
      </section>

      <section>
        <h2>Summary</h2>
        <p>
          Base64 is a fundamental tool in a web developer's arsenal. It enables the safe transport of binary data across text-based protocols and allows for creative optimizations like asset inlining. Next time you see a long string of seemingly random letters ending in <code>==</code>, you'll know exactly what's happening under the hood.
        </p>
      </section>
    </GuideLayout>
  );
}
