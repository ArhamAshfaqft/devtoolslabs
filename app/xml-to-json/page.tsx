import React from 'react';
import type { Metadata } from 'next';
import ToolLayout from '@/components/ToolLayout';
import XmlToJsonTool from '@/components/tools/XmlToJsonTool';

export const metadata: Metadata = {
  title: 'XML to JSON Converter (Free Online Tool) | DevToolsLabs',
  description: 'Convert XML to JSON online instantly. High-performance, client-side XML parsing that supports attributes, nested tags, and complex schemas.',
};

export default function XmlToJsonPage() {
  return (
    <ToolLayout
      title="XML to JSON Converter"
      intro="Transform outdated XML data into clean, modern JSON objects. Perfect for developers migrating legacy APIs or handling enterprise data feeds."
      toolNode={<XmlToJsonTool />}
      howTo={[
        "Paste your XML string into the left input area.",
        "The tool automatically parses the XML and generates a JSON object.",
        "Toggle the 'Try Example' button to see how attributes and nested tags are handled.",
        "Copy the resulting JSON to your clipboard for use in your application."
      ]}
      examples={[
        {
          input: "<user id='1'>\n  <name>John</name>\n</user>",
          output: '{\n  "user": {\n    "@_id": 1,\n    "name": "John"\n  }\n}'
        }
      ]}
      useCases={[
        "Modernizing legacy SOAP API responses for React/Next.js frontends.",
        "Parsing configuration files from older enterprise software.",
        "Simplifying data visualization for XML-based data feeds.",
        "Debugging complex XML structures by viewing them in a readable JSON format."
      ]}
      faqs={[
        {
          question: "How are XML attributes handled?",
          answer: "By default, attributes are prefixed with `@_` (e.g., id='1' becomes '@_id': 1) to distinguish them from standard tags, ensuring no data loss during conversion."
        },
        {
          question: "Is my XML data secure?",
          answer: "Yes. All conversion happens locally in your browser using JavaScript. No data is ever uploaded to our servers, making it safe for sensitive enterprise configuration parsing."
        },
        {
          question: "Does it support nested tags and arrays?",
          answer: "Yes. The converter intelligently identifies repeating elements and groups them into JSON arrays, while maintain the hierarchy of nested tags."
        },
        {
          question: "What is the maximum file size supported?",
          answer: "Since the tool runs in your browser, it can handle several megabytes of XML data depending on your available RAM. For extremely large datasets (100MB+), specialized streaming parsers are recommended."
        },
        {
          question: "Can I convert SOAP responses to JSON?",
          answer: "Absolutely. This tool is designed to help developers modernize legacy SOAP-based services by transforming the XML-encoded body into a format easily consumable by React or Vue applications."
        },
        {
          question: "Are CDATA sections supported?",
          answer: "Yes, the parser correctly identifies and extracts content from `<![CDATA[...]]>` blocks, preserving the literal text inside without escaping."
        }
      ]}
      relatedTools={[
        { name: "JSON to XML", url: "/json-to-xml" },
        { name: "JSON Formatter", url: "/json-formatter" },
        { name: "JSON to CSV", url: "/json-to-csv" }
      ]}
    />
  );
}
