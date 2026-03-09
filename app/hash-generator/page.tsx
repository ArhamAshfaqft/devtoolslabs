import type { Metadata } from 'next';
import ToolLayout from '@/components/ToolLayout';
import HashGeneratorTool from '@/components/tools/HashGeneratorTool';

export const metadata: Metadata = {
  title: 'Secure Hash Generator (Free Online Tool) | SHA256 & MD5',
  description: 'Instantly calculate MD5, SHA-1, SHA-256, and SHA-512 cryptographic hashes. 100% offline and strictly secure client-side generation using Web Crypto API.',
};

export default function HashGeneratorPage() {
  return (
    <ToolLayout
      title="Hash Generator (Calculate SHA256, SHA512 & MD5 Online)"
      intro="Cryptographic hashes are purely mathematically derived signatures used to verify data integrity and secure passwords. Our generator utilizes the blazing-fast native browser Web Crypto API to simultaneously calculate MD5, SHA-1, SHA-256, and SHA-512 hashes in real-time. Everything happens in your local device memory."
      toolNode={<HashGeneratorTool />}
      howTo={[
        "Type or paste your raw text string into the left input box.",
        "As you type, the tool mathematically recalculates all 4 cryptographic hashes simultaneously.",
        "Your MD5, SHA-1, SHA-256, and SHA-512 outputs will appear in the right column.",
        "Click the white 'Copy' button above the specific hash algorithm you need to use."
      ]}
      examples={[
        {
          input: 'hello world',
          output: 'MD5: 5eb63bbbe01eeed093cb22bb8f5acdc3\nSHA-256: b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9'
        }
      ]}
      useCases={[
        "Generating an MD5 string to map a user's email address to their universal Gravatar profile picture.",
        "Comparing a SHA-256 digest payload sent from a Stripe or GitHub webhook to cryptographically verify the signature matches.",
        "Hashing internal IDs before writing them to a public-facing dataset or caching layer to anonymize the records."
      ]}
      faqs={[
        {
          question: "Can these hashes be decrypted back into text?",
          answer: "No. Unlike Base64 or URL Encoders which are two-way translations, cryptographic algorithms (like SHA-256) are strictly one-way mathematical functions. It is computationally impossible to 'decrypt' a hash back into its original text."
        },
        {
          question: "Are my passwords safe here?",
          answer: "Yes. Our tool is strictly client-side. We utilize the native `crypto.subtle.digest()` API built into your browser's V8 engine. Your text stays entirely in your local RAM—no logs, no network requests, and absolutely no backend servers."
        },
        {
          question: "Is MD5 still safe to use?",
          answer: "For data integrity checks (like ensuring a file downloaded correctly) or standard identification protocols (like Gravatar), MD5 is perfectly fine. However, MD5 is considered mathematically 'broken' for cryptographic security. You should absolutely never use MD5 to hash user passwords—use bcrypt or SHA-256/512."
        },
        {
          question: "Why do the outputs look like random letters and numbers?",
          answer: "The raw output of a hashing algorithm is pure binary data. For human readability and text transmission, this tool converts that binary array into a hexadecimal (Base16) string using the numbers 0-9 and letters a-f."
        }
      ]}
      relatedTools={[
        { name: "JWT Validator", url: "/jwt-validator" },
        { name: "Base64 Encoder", url: "/base64-encode-decode" }
      ]}
    />
  );
}
