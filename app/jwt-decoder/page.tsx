import { Metadata } from 'next';
import JwtDecoderTool from '@/components/tools/JwtDecoderTool';
import ToolLayout from '@/components/ToolLayout';

export const metadata: Metadata = {
  title: 'JWT Token Generator & Decoder | Parse JWT Online Securely',
  description: 'Free, 100% client-side JWT decoder and encoder. Parse JWT headers, payloads, and verify signatures locally without risking your secret keys.',
  keywords: 'jwt decoder, jwt token generator, parse jwt, jwt encoder, decode jwt online, jwt signature verifier',
};

export default function JwtDecoderPage() {
  return (
    <ToolLayout
      title="JWT Decoder & Token Generator"
      intro="Decode, verify, and generate JSON Web Tokens (JWT) instantly entirely within your browser. Prevent data leaks by using our 100% client-side Web Crypto API implementation—your tokens and secret keys never leave your device."
      toolNode={<JwtDecoderTool />}
      examples={[
        {
          input: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
          output: 'Header: { "alg": "HS256", "typ": "JWT" }\nPayload: { "sub": "1234567890", "name": "John Doe", "iat": 1516239022 }'
        }
      ]}
      howTo={[
        "Paste your encoded JSON Web Token (JWT) into the left pane to decode it instantly.",
        "The Header and Payload will automatically unfold in the right editor panes as formatted JSON.",
        "To verify the signature, enter your 256-bit HS256 secret key in the verification box.",
        "To use as a Generator/Encoder: Simply modify the decoded JSON. The encoded JWT in the left pane will rebuild and re-sign in real-time."
      ]}
      useCases={[
        "Backend Debugging: Safely parsing JWTs issued by Auth0, Firebase, or Supabase during local API development.",
        "Token Forging (Pen-Testing): Modifying the 'sub' or 'roles' claims to test your backend's zero-trust authorization logic.",
        "Security Auditing: Ensuring your application isn't leaking PII (Personally Identifiable Information) inside unencrypted JWT payloads.",
        "Client-Side Simulation: Generating valid JWTs for frontend state testing without mocking a full authentication backend."
      ]}
      faqs={[
        {
          question: "Is this JWT Decoder safe to use?",
          answer: "Yes, it is fundamentally safer than server-side decoders. The parsing and HMCA-SHA256 signature generation are done using your browser's native Web Crypto API. No network requests are made, and your secret keys never touch our servers."
        },
        {
          question: "Can I use this as a JWT Encoder or Generator?",
          answer: "Absolutely. When you edit the JSON in the Header or Payload boxes, the left panel automatically regenerates the base64url-encoded token array. If you provide a secret, it will properly secure it with a new cryptographic signature."
        },
        {
          question: "What is the difference between JWT and OAuth?",
          answer: "OAuth is an authorization framework (the protocol for exchanging credentials), whereas JWT is a specific, stateless token format. An OAuth server will often grant a JWT to a client to be used as a Bearer Token."
        },
        {
          question: "Why is 'audiences in jwt are not allowed' happening?",
          answer: "If you see audience (aud) errors, it means the API explicitly requires the JWT to declare who it is intended for, and yours doesn't match. You can use our tool to manually inject an 'aud' claim into the payload and re-sign it to test this behavior."
        }
      ]}
      relatedTools={[
        { name: "Base64 Encode/Decode", url: "/base64-encode-decode" },
        { name: "JSON Formatter", url: "/json-formatter" },
        { name: "URL Decoder", url: "/url-decode" }
      ]}
    />
  );
}
