import type { Metadata } from 'next';
import ToolLayout from '@/components/ToolLayout';
import CurlToFetchTool from '@/components/tools/CurlToFetchTool';

export const metadata: Metadata = {
  title: 'cURL to JavaScript Fetch Converter (Free Online Tool) | Convert Instantly',
  description: 'Instantly convert bash cURL commands into modern JavaScript fetch() code. Accurately translates headers, JSON data, and HTTP methods directly in your browser.',
  openGraph: {
    title: 'cURL to JavaScript Fetch Converter (Free Online Tool) | Convert Instantly',
    description: 'Instantly convert bash cURL commands into modern JavaScript fetch() code. Accurately translates headers, JSON data, and HTTP methods directly in your browser.',
    url: 'https://devtoolslabs.com/curl-to-fetch',
  },
  alternates: {
    canonical: '/curl-to-fetch',
  },
};

export default function CurlToFetchPage() {
  return (
    <ToolLayout
      title="cURL to Fetch Converter (Convert Bash Commands to JavaScript Online)"
      intro="If you are copying API examples from documentation (like Stripe or GitHub), they are almost always written in raw bash cURL. This tool instantly translates those complex cURL commands—including nested JSON data, Authorization headers, and POST methods—into modern, production-ready JavaScript `fetch()` code."
      toolNode={<CurlToFetchTool />}
      howTo={[
        "Copy a raw valid cURL command from your terminal or API documentation.",
        "Ensure the command begins with the word 'curl'.",
        "Paste the entire snippet into the dark Bash input box on the left.",
        "The tool will instantly parse the bash structure and generate equivalent JavaScript code in the right box."
      ]}
      examples={[
        {
          input: 'curl -X POST "https://api.test.com" \\\n-H "Content-Type: application/json" \\\n-d \'{"user":1}\'',
          output: `fetch('https://api.test.com', {\n  method: 'POST',\n  headers: {\n    'Content-Type': 'application/json'\n  },\n  body: JSON.stringify({\n    'user': 1\n  })\n});`
        }
      ]}
      useCases={[
        "Quickly translating Stripe or Twilio API documentation examples into React/Node.js code.",
        "Debugging an intercepted network request by copying it 'as cURL' from Chrome DevTools and pasting it here.",
        "Learning how specific cURL flags (like -H, -d, -u) translate into JavaScript Request Init dictionary objects."
      ]}
      faqs={[
        {
          question: "How does this parse complex bash escaping logic?",
          answer: "Our engine executes a true bash lexer within the browser. It splits the input string identically to a Linux shell, perfectly resolving single quote strings, escaped inner quotes (\\\"), and multi-line backslash (\\) continuations."
        },
        {
          question: "Does this support importing binary files via the -F flag?",
          answer: "Yes, when parsing a cURL command that uploads a file (using -F or --form), the tool translates it into standard JavaScript FormData syntax to ensure file blobs are transmitted natively."
        },
        {
          question: "Can I convert Chrome DevTools 'Copy as cURL' strings?",
          answer: "Absolutely. Using the Network tab inside Chrome, you can right-click any blocked request, select 'Copy as cURL', and instantly translate those massive payloads into reusable fetch definitions here."
        },
        {
          question: "Are my API keys submitted to a server?",
          answer: "Never. The bash tokenization and Abstract Syntax derivation occurs 100% inside your local V8 JavaScript engine. Your pasted Authorization Bearer tokens cannot be read by any external network."
        },
        {
          question: "Why does it output node-fetch instead of XMLHttpRequest?",
          answer: "The XMLHttpRequest (XHR) framework is largely deprecated for modern syntax. This converter strictly outputs modern ES6 `fetch()` configurations, making it instantly compatible with React, Next.js, and modern Node.js environments."
        }
      ]}
      relatedTools={[
        { name: "JSON Escape", url: "/json-escape-unescape" },
        { name: "JWT Validator", url: "/jwt-validator" }
      ]}
    />
  );
}
