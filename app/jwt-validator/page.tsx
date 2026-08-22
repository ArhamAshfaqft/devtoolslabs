import type { Metadata } from 'next';
import ToolLayout from '@/components/ToolLayout';
import JwtValidatorTool from '@/components/tools/JwtValidatorTool';

export const metadata: Metadata = {
  title: 'JWT Validator – Verify JSON Web Token Signatures',
  description: 'Inspect and validate JWT signatures in your browser. Verify token integrity without sending tokens to DevToolsLabs servers.',
  alternates: { canonical: '/jwt-validator' },
  openGraph: {
    title: 'JWT Validator – Verify JSON Web Token Signatures',
    description: 'Validate JWT structure and signatures with a privacy-first browser tool.',
    url: 'https://www.devtoolslabs.com/jwt-validator',
  },
};

export default function JwtValidatorPage() {
  return (
    <ToolLayout
      title="JWT Signature Validator"
      intro="Check whether a JSON Web Token signature matches the supplied verification material. The validator helps diagnose malformed, modified, expired, or incorrectly signed tokens while keeping the operation in your browser."
      toolNode={<JwtValidatorTool />}
      howTo={[
        'Paste the complete JWT into the token field.',
        'Select the algorithm and provide the required verification key or secret.',
        'Run validation and review the signature result and decoded claims.',
        'Never paste production credentials into a device you do not trust.',
      ]}
      useCases={[
        'Debugging authentication failures between services.',
        'Checking whether a token was changed after it was issued.',
        'Verifying test tokens while developing an API integration.',
      ]}
      faqs={[
        { question: 'Is decoding the same as validation?', answer: 'No. Anyone can decode a JWT payload. Validation checks its cryptographic signature using the appropriate secret or public key.' },
        { question: 'Are tokens sent to DevToolsLabs?', answer: 'No. Token inspection and supported signature checks run in your browser.' },
      ]}
      relatedTools={[
        { name: 'JWT Decoder & Encoder', url: '/jwt-decoder' },
        { name: 'Hash Generator', url: '/hash-generator' },
        { name: 'How to Decode JWTs', url: '/guides/how-to-decode-jwt' },
      ]}
    />
  );
}
