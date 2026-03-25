import type { Metadata } from 'next';
import ToolLayout from '@/components/ToolLayout';
import JwtGeneratorTool from '@/components/tools/JwtGeneratorTool';

export const metadata: Metadata = {
  title: 'JWT Encoder & Generator (Free Online Tool) | Local Token Signer',
  description: 'Instantly generate securely signed HS256 JSON Web Tokens. Construct structured headers and claims payloads. 100% free, secure, and offline.',
  openGraph: {
    title: 'JWT Encoder & Generator (Free Online Tool) | Local Token Signer',
    description: 'Instantly generate securely signed HS256 JSON Web Tokens. Construct structured headers and claims payloads. 100% free, secure, and offline.',
    url: 'https://devtoolslabs.com/jwt-generator',
  },
  alternates: {
    canonical: '/jwt-generator',
  },
};

export default function JwtGeneratorPage() {
  return (
    <ToolLayout
      title="JWT Generator & Encoder (Create JSON Web Tokens Online)"
      intro="JSON Web Tokens (JWT) are an open, industry standard (RFC 7519) method for representing authentication claims securely between two parties. Generate and simulate complete signed tokens manually using this tool. Your raw secret keys and PII payloads are natively signed client-side using WebCrypto, bypassing network vulnerabilities."
      toolNode={<JwtGeneratorTool />}
      howTo={[
        "Structure your JSON Header on the left. Make sure the algorithm (alg) is set to 'HS256'.",
        "Structure your intended Payload. You can add arbitrary JSON claims, such as 'role': 'admin' or 'sub': '1234'.",
        "Type your signing secret into the blue input box at the bottom.",
        "The generated cryptographic Base64Url JWT token automatically assembles on the right whenever the JSON edits are valid."
      ]}
      examples={[
        {
          input: 'Header: {"alg":"none"}\nPayload: {"user":"guest"}\nSecret: [Empty]',
          output: 'eyJhbGciOiJub25lIn0.eyJ1c2VyIjoiZ3Vlc3QifQ.'
        }
      ]}
      useCases={[
        "Crafting highly customized administrator access tokens for testing backend protected authorization routes without logging in via the frontend.",
        "Simulating expired tokens by injecting a custom historical `exp` integer claim (Unix Epoch).",
        "Generating internal system-to-system microservice handshake tokens signed with a shared vault key."
      ]}
      faqs={[
        {
          question: "Is my signing secret ever sent to a server?",
          answer: "Never. By design, our suite ensures local execution of the `crypto.subtle` API. This mathematically signs your data offline using the processing power of your native web browser. No network payloads ever contain your secret keys."
        },
        {
          question: "Which cryptographic algorithms are supported?",
          answer: "Currently, this offline JWT generator supports HMAC SHA256 (HS256) and Unsecured 'none' algorithms. RS256 (RSA Signature with SHA-256) which relies on separate Public and Private PEM keys is significantly more complex to support client-side and is slated for an upcoming system update."
        },
        {
          question: "Why am I getting a 'Generation Failed' syntax error?",
          answer: "Both the JWT Header and the JWT Payload must evaluate to strictly formatted, completely valid JSON. Ensure that all string keys and values are surrounded by double quotes (\"\"), there are no trailing commas, and curly braces remain matched."
        },
        {
          question: "Why does the token change color on the right?",
          answer: "A JWT is actually 3 distinct Base64Url encoded segments separated by tiny periods (.). We color code them to match your input: Red represents the Header, Purple represents the Payload, and Blue represents the generated Cryptographic Signature."
        }
      ]}
      relatedTools={[
        { name: "JWT Validator", url: "/jwt-validator" },
        { name: "Unix Timestamp", url: "/timestamp-converter" }
      ]}
    />
  );
}
