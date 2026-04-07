import React from 'react';
import type { Metadata } from 'next';
import ToolLayout from '@/components/ToolLayout';
import XmlToJsonTool from '@/components/tools/XmlToJsonTool';

export const metadata: Metadata = {
  title: 'XML to JSON Converter (Free Online Tool) | DevToolsLabs',
  description: 'Convert XML to JSON online instantly. High-performance, client-side XML parsing that supports attributes, nested tags, and complex schemas.',
  openGraph: {
    title: 'XML to JSON Converter (Free Online Tool) | DevToolsLabs',
    description: 'Convert XML to JSON online instantly. High-performance, client-side XML parsing that supports attributes, nested tags, and complex schemas.',
    url: 'https://devtoolslabs.com/xml-to-json',
  },
  alternates: {
    canonical: '/xml-to-json',
  },
};

export default function XmlToJsonPage() {
  const codeSnippets = [
    {
      language: "Node.js (fast-xml-parser)",
      code: `const { XMLParser } = require('fast-xml-parser');
const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "@_"
});
const jsonObj = parser.parse(xmlData);
console.log(JSON.stringify(jsonObj, null, 2));`
    },
    {
      language: "Python (xmltodict)",
      code: `import xmltodict
import json

with open('data.xml') as fd:
    doc = xmltodict.parse(fd.read())

print(json.dumps(doc, indent=2))`
    }
  ];

  return (
    <ToolLayout
      title="XML to JSON Converter"
      intro="Legacy XML data structures can be difficult to consume in modern frontend frameworks like React, Vue, or Next.js. Our high-performance XML to JSON converter solves this by transforming rigid XML into clean, flexible JSON objects. We support advanced parsing features including attribute preservation, CDATA extraction, and array consistency toggles—all running 100% locally in your browser for absolute privacy."
      toolNode={<XmlToJsonTool />}
      codeSnippets={codeSnippets}
      howTo={[
        "Paste your raw XML string into the input editor.",
        "Adjust settings like 'Ignore Attributes' if you only want the inner tag values.",
        "Enable 'Force Every Tag as Array' if you need a predictable structure for your code.",
        "Wait for the real-time conversion to complete in the JSON output editor.",
        "Copy the JSON or download for use in your API or frontend project."
      ]}
      examples={[
        {
          input: '<user active="true"><name>Dev</name></user>',
          output: '{\n  "user": {\n    "@_active": true,\n    "name": "Dev"\n  }\n}'
        }
      ]}
      useCases={[
        "Modernizing legacy SOAP or XML-based API responses for AJAX consumption.",
        "Converting enterprise XSD/XML configuration files into readable JSON formats.",
        "Pre-processing data for NoSQL databases like MongoDB or AWS DynamoDB.",
        "Simplifying data visualization for complex XML-based financial or legal data feeds."
      ]}
      faqs={[
        {
          question: "How are XML namespaces handled?",
          answer: "Our parser is namespace-aware. It preserves namespace prefixes (e.g., <ns:tag>) in the JSON keys, ensuring that you can still distinguish between different schemas when processing the resulting object."
        },
        {
          question: "What is the difference between 'Attribute' and 'Text' nodes?",
          answer: "In XML, an attribute is part of the tag (id='1'), while a text node is the content inside (<tag>Text</tag>). Our tool prefixes attributes with '@_' so you can easily identify them in your JSON without them colliding with child element names."
        },
        {
          question: "Is there a performance limit for large XML files?",
          answer: "Because we use a high-speed V8-optimized parser running in your browser, we can handle multi-megabyte XML files with sub-second latency. For files larger than 50MB, the browser's memory limit is the primary constraint."
        },
        {
          question: "Can I use the output in a production application?",
          answer: "Yes. The generated JSON is strictly valid RFC 8259 format. By using the 'Force Array' option, you can guarantee a predictable structure that won't break your frontend logic when a single item is returned instead of many."
        }
      ]}
      relatedTools={[
        { name: "JSON to XML", url: "/json-to-xml" },
        { name: "JSON Formatter", url: "/json-formatter" },
        { name: "JSON to CSV", url: "/json-to-csv" },
        { name: "JSON to TypeScript", url: "/json-to-typescript" }
      ]}
    />
  );
}
