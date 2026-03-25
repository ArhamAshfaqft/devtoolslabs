import React from 'react';
import type { Metadata } from 'next';
import ToolLayout from '@/components/ToolLayout';
import JsonToXmlTool from '@/components/tools/JsonToXmlTool';

export const metadata: Metadata = {
  title: 'JSON to XML Converter (Free Online Tool) | DevToolsLabs',
  description: 'Convert JSON to XML online instantly. Generate formatted XML strings from JSON objects with support for attributes and custom namespaces.',
  openGraph: {
    title: 'JSON to XML Converter (Free Online Tool) | DevToolsLabs',
    description: 'Convert JSON to XML online instantly. Generate formatted XML strings from JSON objects with support for attributes and custom namespaces.',
    url: 'https://devtoolslabs.com/json-to-xml',
  },
  alternates: {
    canonical: '/json-to-xml',
  },
};

export default function JsonToXmlPage() {
  return (
    <ToolLayout
      title="JSON to XML Converter"
      intro="Convert modern JSON datasets into structured XML manifests. Essential for integrating with legacy systems, enterprise middleware, or specialized hardware APIs."
      toolNode={<JsonToXmlTool />}
      howTo={[
        "Paste your JSON object into the input field.",
        "The tool will instantly generate a beautified XML string.",
        "Use the '@_' prefix for keys in your JSON if you want them treated as XML attributes.",
        "Copy your generated XML for use in your backend or API requests."
      ]}
      examples={[
        {
          input: '{\n  "note": {\n    "to": "Tove",\n    "from": "Jani"\n  }\n}',
          output: '<?xml version="1.0" encoding="UTF-8"?>\n<note>\n  <to>Tove</to>\n  <from>Jani</from>\n</note>'
        }
      ]}
      useCases={[
        "Generating XML payloads for legacy SOAP web services.",
        "Exporting application data for use in older enterprise ERP systems.",
        "Creating XML-based configuration files from dynamic JSON state.",
        "Ensuring compatibility with hardware APIs that only accept XML input."
      ]}
      faqs={[
        {
          question: "Can I generate XML attributes?",
          answer: "Yes! If you prefix a JSON key with `@_` (e.g., '@_id': 123), it will be converted into an attribute (id='123') rather than a nested tag."
        },
        {
          question: "Is the XML output formatted?",
          answer: "Yes, the output is automatically beautified with 2-space indentation and line breaks for maximum readability."
        },
        {
          question: "Does it support custom root nodes?",
          answer: "The resulting XML structure mirrors your JSON object. To define a root node, simply wrap your data in a single top-level JSON key."
        },
        {
          question: "How are JSON arrays converted to XML?",
          answer: "Arrays are converted into repeating XML elements. For example, `{ 'item': [1, 2] }` becomes `<item>1</item><item>2</item>`."
        },
        {
          question: "Is there a limit to nesting depth?",
          answer: "No. The converter handles deep recursion, making it suitable for generating complex XML schemas used in enterprise middleware."
        },
        {
          question: "Is my JSON data kept private?",
          answer: "Yes. Like all tools on DevToolsLabs, the conversion is performed client-side. Your data never leaves your machine."
        }
      ]}
      relatedTools={[
        { name: "XML to JSON", url: "/xml-to-json" },
        { name: "JSON Validator", url: "/json-validator" },
        { name: "YAML to JSON", url: "/yaml-to-json" }
      ]}
    />
  );
}
