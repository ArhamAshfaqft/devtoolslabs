import React from 'react';
import ToolLayout from '@/components/ToolLayout';
import JwtDecoderTool from '@/components/tools/JwtDecoderTool';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'JWT Decoder | Decode JSON Web Tokens (Header, Payload, Signature)',
  description: 'Instantly decode JSON Web Tokens (JWT) directly in your browser. Safely parse and view the decoded JWT Header, Payload (Claims), and Signature string without sending data to a server.',
  keywords: ['jwt decoder', 'decode jwt online', 'jwt parser', 'json web token decoder', 'read jwt token', 'jwt payload decoder'],
  alternates: {
    canonical: 'https://www.devtoolslabs.com/jwt-decoder',
  },
};

export default function JwtDecoderPage() {
  return (
    <ToolLayout
      title="JWT Decoder"
      intro="JSON Web Tokens (JWT) are heavily used in modern web authentication, but reading them raw is impossible because they are Base64Url encoded. The JWT Decoder instantly splits your token into its three distinct parts (Header, Payload, and Signature) and formats the JSON data so you can easily verify the claims, tokens scopes, and algorithm types. This parser runs 100% locally in your browser to guarantee the security of your unencrypted identity tokens."
      toolNode={<JwtDecoderTool />}
      howTo={[
        "Copy your raw JSON Web Token (it should look like a long string of random characters separated by two periods).",
        "Paste the token into the 'Encoded JWT' textarea on the left.",
        "The tool will instantly detect the dot (.) separators and split the token.",
        "The red box displays the decoded Header, revealing the algorithm ('alg').",
        "The purple box displays the decoded Payload, revealing the user claims (like 'sub', 'exp', or 'roles')."
      ]}
      examples={[
        {
          input: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.xxxxxx",
          output: "Header: { \"alg\": \"HS256\", \"typ\": \"JWT\" }\nPayload: { \"sub\": \"1234567890\", \"name\": \"John Doe\", \"iat\": 1516239022 }"
        }
      ]}
      useCases={[
        "Debugging frontend authentication flows to ensure the backend is passing the correct User ID (`sub`) in the token.",
        "Verifying that the token expiration claim (`exp`) is set correctly so users aren't logged out prematurely.",
        "Checking what OAuth scopes or RBAC (Role-Based Access Control) permissions are embedded in the JWT payload."
      ]}
      faqs={[
        {
          question: "Is it safe to paste my JWT here?",
          answer: "Yes. This tool is a 100% Client-Side application. The token decoding happens entirely within your browser using JavaScript's native `atob()` function. Your token is never transmitted over a network or saved to any server log."
        },
        {
          question: "Does this tool verify or validate the token signature?",
          answer: "No, this specific tool is purely a 'Decoder'—it only reads the public information inside the token. To mathematically verify that a token has not been tampered with, you need the secret signing key. You can use our JWT Signature Validator tool for that purpose."
        },
        {
          question: "Can anyone read the payload of my JWT?",
          answer: "Yes! A standard JWT is only Base64 encoded, not encrypted. Anyone who has the token string can decode the header and payload. You should NEVER put sensitive information like passwords, credit card numbers, or Social Security Numbers inside a JWT payload."
        },
        {
          question: "What do the three parts of the JWT mean?",
          answer: "1. The Header identifies the signing algorithm used (like HS256 or RS256).\n2. The Payload contains the 'claims' (the actual data payload, such as User ID).\n3. The Signature is a secure cryptographic hash used by the server to verify the token hasn't been altered."
        }
      ]}
      relatedTools={[
        { name: "JWT Signature Validator", url: "/jwt-validator" },
        { name: "JWT Expiry Checker", url: "/jwt-expiry-checker" },
        { name: "JWT Generator", url: "/jwt-generator" }
      ]}
    />
  );
}
