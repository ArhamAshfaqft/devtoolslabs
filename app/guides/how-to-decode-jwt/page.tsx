import React from 'react';
import type { Metadata } from 'next';
import GuideLayout from '@/components/GuideLayout';

export const metadata: Metadata = {
  title: 'How to Decode JWT Tokens (Step-by-Step Tutorial) | DevToolsLabs',
  description: 'A comprehensive guide on decoding JSON Web Tokens. Learn the anatomy of a JWT, how Base64Url encoding works, and how to safely inspect payloads.',
};

export default function JwtGuidePage() {
  return (
    <GuideLayout
      title="How to Decode JWT Tokens: A Comprehensive Step-by-Step Guide"
      description="JSON Web Tokens (JWT) are the backbone of modern web authentication. In this guide, we'll break down their anatomy, explain how they're encoded, and show you how to safely decode them manually or with code."
      publishDate="March 10, 2026"
      readTime="6 min"
      relatedTools={[
        { name: "JWT Validator & Decoder", url: "/jwt-validator" },
        { name: "JWT Expiry Checker", url: "/jwt-expiry-checker" },
        { name: "Base64 Decode", url: "/base64-encode-decode" }
      ]}
    >
      <section>
        <h2>What Exactly is a JWT?</h2>
        <p>
          At its core, a <strong>JSON Web Token (JWT)</strong> is a compact, URL-safe means of representing claims to be transferred between two parties. The claims in a JWT are encoded as a JSON object that is used as the payload of a JSON Web Signature (JWS) structure or as the plaintext of a JSON Web Encryption (JWE) structure, enabling the claims to be digitally signed or integrity protected with a Message Authentication Code (MAC) and/or encrypted.
        </p>
        <p>
          JWTs are most commonly used for **Authentication** and **Information Exchange**. Once a user is logged in, each subsequent request will include the JWT, allowing the user to access routes, services, and resources that are permitted with that token.
        </p>
      </section>

      <section>
        <h2>The Anatomy of a JWT</h2>
        <p>
          A single JWT string is always composed of three distinct parts separated by dots (<code>.</code>):
        </p>
        <ol>
          <li><strong>Header:</strong> Contains the type of the token and the signing algorithm being used (e.g., HS256).</li>
          <li><strong>Payload:</strong> Contains the actual "claims" (data) about the user and any additional metadata like expiration time (<code>exp</code>).</li>
          <li><strong>Signature:</strong> Used to verify that the sender of the JWT is who it says it is and to ensure that the message was't changed along the way.</li>
        </ol>
        <pre>{`header.payload.signature`}</pre>
      </section>

      <section>
        <h2>Step 1: Decoding the Header</h2>
        <p>
          The header typically consists of two parts: the type of the token, which is JWT, and the signing algorithm being used, such as HMAC SHA256 or RSA. 
        </p>
        <p>
          To decode it, you simply take the first part of the token (before the first dot) and use a <strong>Base64Url decoder</strong>. Since it is not encrypted (only encoded), anyone who can see the token can decode it.
        </p>
      </section>

      <section>
        <h2>Step 2: Inspecting the Payload</h2>
        <p>
          The payload is the middle part of the token. It contains the claims, which are statements about an entity (typically, the user) and additional data. There are three types of claims: <strong>registered</strong>, <strong>public</strong>, and <strong>private</strong> claims.
        </p>
        <blockquote>
          <strong>Crucial Security Tip:</strong> Never store sensitive information (like passwords or private keys) in the JWT payload, as it is easily decoded by anyone who has the token string.
        </blockquote>
      </section>

      <section>
        <h2>Step 3: Verifying the Signature</h2>
        <p>
          While decoding is easy, <strong>Verifying</strong> is critical. The signature is created by taking the encoded header, the encoded payload, a secret, the algorithm specified in the header, and signing that.
        </p>
        <p>
          If you change even a single character in the header or payload, the signature will no longer match, allowing your backend to reject the tampered token immediately.
        </p>
      </section>

      <section>
        <h2>Summary</h2>
        <p>
          Decoding a JWT is as simple as splitting the string by dots and running the segments through a Base64Url decoder. However, real-world applications must always use a trusted library to verify the digital signature before trusting the data inside the payload.
        </p>
      </section>
    </GuideLayout>
  );
}
