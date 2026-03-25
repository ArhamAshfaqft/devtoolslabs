import React from 'react';
import type { Metadata } from 'next';
import ToolLayout from '@/components/ToolLayout';
import HttpHeaderParserTool from '@/components/tools/HttpHeaderParserTool';

export const metadata: Metadata = {
  title: 'HTTP Header Parser (Convert Raw Request Headers to JSON)',
  description: 'Instantly parse raw HTTP request or response headers into a clean, formatted JSON object. Great for debugging CURL requests or API responses.',
  openGraph: {
    title: 'HTTP Header Parser (Convert Raw Request Headers to JSON)',
    description: 'Instantly parse raw HTTP request or response headers into a clean, formatted JSON object. Great for debugging CURL requests or API responses.',
    url: 'https://devtoolslabs.com/http-header-parser',
  },
  alternates: {
    canonical: '/http-header-parser',
  },
};

export default function HttpHeaderParserPage() {
  return (
    <ToolLayout
      title="HTTP Header Parser (Convert Raw Request Headers to JSON)"
      intro="When debugging server configurations or API integrations, you often have to deal with raw HTTP textual headers dumped from network logs or CURL requests. This HTTP Header Parser takes raw, messy textual headers and instantly converts them into a clean, easy-to-read JSON object for immediate use in your JavaScript, Python, or Postman environments."
      toolNode={<HttpHeaderParserTool />}
      howTo={[
        "Paste your raw HTTP request or response headers into the left text box.",
        "The tool will automatically strip out the HTTP method/status line (e.g., 'HTTP/2 200 OK').",
        "It will parse all valid 'Key: Value' pairs.",
        "Click 'Parse Headers' to generate the JSON output on the right.",
        "Click 'Copy JSON' to copy the formatted object to your clipboard."
      ]}
      examples={[
        {
          input: "Host: api.example.com\nAuthorization: Bearer token123",
          output: '{\n  "Host": "api.example.com",\n  "Authorization": "Bearer token123"\n}'
        }
      ]}
      useCases={[
        "Extracting authorization tokens or cookies from a raw browser network tab dump.",
        "Converting documentation examples of API requests into standard JSON format.",
        "Validating that a web server is returning the correct security headers (CORS, HSTS).",
        "Generating mock header objects for unit testing frontend API clients."
      ]}
      faqs={[
        {
          question: "How does it handle duplicate headers?",
          answer: "According to the HTTP specification, multiple headers with the same key (like 'Set-Cookie' or 'Accept') are valid. Our parser handles this by combining the values into a single comma-separated string, which is the standard behavior in Node.js and the browser Fetch API."
        },
        {
          question: "Does this work with both Requests and Responses?",
          answer: "Yes. The parser deliberately ignores the first line of the raw text if it looks like a request (e.g., 'GET /api HTTP/1.1') or a response (e.g., 'HTTP/2 200 OK'). This means you can paste entire raw dumps without needing to clean them up first."
        },
        {
          question: "Is this tool secure?",
          answer: "Absolutely. When dealing with authentication headers (like Bearer tokens or Session IDs), security is paramount. This parser runs 100% locally in your browser using JavaScript. No data is sent to our servers."
        }
      ]}
      relatedTools={[
        {
          name: "JSON Formatter",
          url: "/json-formatter"
        },
        {
          name: "JWT Validator",
          url: "/jwt-validator"
        },
        {
          name: "cURL to Fetch",
          url: "/curl-to-fetch"
        }
      ]}
    />
  );
}
