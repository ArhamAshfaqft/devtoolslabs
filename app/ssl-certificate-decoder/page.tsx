import React from 'react';
import type { Metadata } from 'next';
import ToolLayout from '@/components/ToolLayout';
import SslCertificateDecoderTool from '@/components/tools/SslCertificateDecoderTool';

export const metadata: Metadata = {
  title: 'SSL Certificate Decoder (Parse PEM, CER & CRT Online) | DevToolsLabs',
  description: 'Decode SSL certificates online to view details like expiration, issuer, subject, and SANs. Supports PEM, CER, and CRT formats with 100% browser-side parsing.',
};

export default function SslCertificateDecoderPage() {
  return (
    <ToolLayout
      title="SSL Certificate Decoder"
      intro="Quickly decode SSL certificates (PEM/CER/CRT) to inspect security details, expiration dates, and domain ownership. All parsing happens locally in your browser."
      toolNode={<SslCertificateDecoderTool />}
      howTo={[
        "Retrieve your certificate file (often ending in .pem, .crt, or .cer).",
        "Open it in a text editor and copy the text between -----BEGIN CERTIFICATE----- and -----END CERTIFICATE-----.",
        "Paste the code into the decoder above.",
        "Review the Expiration Date and Subject Alternative Names to ensure validity."
      ]}
      examples={[
        {
          input: "-----BEGIN CERTIFICATE-----\nMIIDRjCCAi6gAwIBAgIUS8E6I2K4M2I4M2I4M2I4M2I4M2I4MA0GCSqGSIb3DQEB\n...",
          output: "Subject: CN=devtoolslabs.com\nIssuer: CN=devtoolslabs.com\nValid To: March 15, 2027"
        }
      ]}
      useCases={[
        "Verify SSL certificate expiration dates before production deployment.",
        "Inspect Subject Alternative Names (SANs) to confirm domain coverage.",
        "Debug 'Insecure' browser warnings by checking issuer chains.",
        "Audit development and staging certificates for security compliance."
      ]}
      faqs={[
        {
          question: "Is it safe to paste my certificate here?",
          answer: "Yes. This tool uses the `node-forge` library to parse the raw data directly in your browser. No data is sent to our servers, keeping your security information private and secure."
        },
        {
          question: "What is a PEM file?",
          answer: "PEM (Privacy Enhanced Mail) is the most common format for certificates. It is a Base64 encoded string wrapped in headers like `BEGIN CERTIFICATE`."
        },
        {
          question: "What are Subject Alternative Names (SANs)?",
          answer: "The SAN extension allows a single SSL certificate to protect multiple domains, such as `example.com` and `api.example.com`. Our decoder lists all of these for easy verification."
        }
      ]}
      relatedTools={[
        { name: "Bcrypt Generator", url: "/bcrypt-generator" },
        { name: "Advanced Password Meter", url: "/password-security-meter" },
        { name: "JWT Decoder", url: "/jwt-validator" }
      ]}
    >
      <div className="mt-12 prose prose-slate max-w-none border-t border-gray-100 pt-12">
        <h2 className="text-2xl font-black text-gray-900 mb-6">Mastering SSL Inspection</h2>
        <p className="text-gray-600 leading-relaxed mb-6">
          SSL/TLS certificates are the foundation of web security. However, identifying issues like mismatched hostnames or near-expiration dates can be tedious without proper tools. Our SSL Certificate Decoder provides an instant, secure way to visualize the metadata inside your certificates.
        </p>
      </div>
    </ToolLayout>
  );
}
