import React from 'react';
import type { Metadata } from 'next';
import ToolLayout from '@/components/ToolLayout';
import JsonToXmlTool from '@/components/tools/JsonToXmlTool';

export const metadata: Metadata = {
  title: 'JSON to XML Converter (Free Online Tool) | DevToolsLabs',
  description: 'Convert JSON to XML online instantly. Generate formatted XML strings from JSON objects with support for attributes and custom namespaces.',
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
          answer: "Yes! If you prefix a JSON key with `@_` (e.g., '@_id': 123), it will be converted into an attribute (id='123') rather than a tag."
        },
        {
          question: "Is the XML output formatted?",
          answer: "Yes, the output is automatically beautified with 2-space indentation for maximum readability."
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
