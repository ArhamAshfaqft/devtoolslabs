import type { Metadata } from 'next';
import ToolLayout from '@/components/ToolLayout';
import CurlToFetchTool from '@/components/tools/CurlToFetchTool';

export const metadata: Metadata = {
  title: 'cURL to JavaScript Fetch Converter',
  description: 'Convert cURL commands into modern JavaScript fetch() code, including headers, request bodies, methods, and multipart forms.',
  alternates: { canonical: '/curl-to-fetch' },
};

export default function CurlToFetchPage() {
  return (
    <ToolLayout
      title="cURL to JavaScript Fetch Converter"
      intro="Translate cURL commands from API documentation or browser developer tools into readable JavaScript fetch() calls, including methods, headers, JSON bodies, and multipart form data."
      privacyTitle="Server-assisted conversion"
      privacyDescription="The pasted command is sent to the DevToolsLabs conversion endpoint for parsing. Remove API keys, cookies, tokens, and other secrets before using this tool. Commands are processed for the response and are not intentionally stored."
      toolNode={<CurlToFetchTool />}
      howTo={[
        "Remove authorization tokens, cookies, API keys, and other secrets from the command.",
        "Paste a valid command beginning with curl into the input editor.",
        "Review the generated fetch() call and restore secrets through environment variables in your own code.",
        "Copy the converted JavaScript."
      ]}
      examples={[
        {
          input: 'curl -X POST https://api.example.com/users -H "Content-Type: application/json" -d \'{"name":"Ada"}\'',
          output: "fetch('https://api.example.com/users', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: 'Ada' }) });"
        }
      ]}
      useCases={[
        "Translating API documentation examples into frontend code.",
        "Converting a sanitized request copied from a browser network panel.",
        "Learning how cURL flags map to the Fetch API."
      ]}
      faqs={[
        {
          question: "Should I paste a production token?",
          answer: "No. Remove credentials, session cookies, API keys, and personal data before submitting a command. Add them back securely in your own application."
        },
        {
          question: "Does it support POST bodies and headers?",
          answer: "Yes. The converter handles common methods, headers, JSON bodies, and multipart form flags. Always verify generated code before production use."
        },
        {
          question: "Why use fetch() instead of XMLHttpRequest?",
          answer: "Fetch is the modern promise-based browser API and is also available in current Node.js releases."
        }
      ]}
      relatedTools={[
        { name: "HTTP Header Parser", url: "/http-header-parser" },
        { name: "JSON Formatter", url: "/json-formatter" },
        { name: "URL Encoder & Decoder", url: "/url-encode-decode" }
      ]}
    />
  );
}
