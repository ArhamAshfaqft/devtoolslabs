import type { Metadata } from 'next';
import ToolLayout from '@/components/ToolLayout';
import JsonFormatterTool from '@/components/tools/JsonFormatterTool';

export const metadata: Metadata = {
  title: 'JSON Formatter & Beautifier (Free Online Tool) | Format Instantly',
  description: 'Instantly format, beautify, and strictly indent raw, unformatted, or minified JSON arrays and objects. 100% client side and secure.',
};

export default function JsonFormatterPage() {
  return (
    <ToolLayout
      title="JSON Formatter & Beautifier (Pretty Print JSON Online)"
      intro="Working with minified, un-indented JSON data dumps from a REST API or database log is a massive headache. This tool instantly formats and beautifies complex JSON payloads into perfectly legible, multi-line structures. You can pick your indentation (Spaces or Tabs) or minify an already-large payload down to zero spaces to save bytes."
      toolNode={<JsonFormatterTool />}
      howTo={[
        "Select your preferred indentation formatting level from the dropdown at the top left (e.g., 2 Spaces, 4 Spaces, or Tabs).",
        "Paste your messy or minified JSON object or array into the left 'Input JSON' box.",
        "Click the black 'Format JSON' button.",
        "If your JSON is valid, it will be instantly reformatted and beautified into the right output box, ready to copy."
      ]}
      examples={[
        {
          input: '{"user":{"id":8841,"active":true,"roles":["admin","editor"]},"status":"ok"}',
          output: '{\n  "user": {\n    "id": 8841,\n    "active": true,\n    "roles": [\n      "admin",\n      "editor"\n    ]\n  },\n  "status": "ok"\n}'
        }
      ]}
      useCases={[
        "Beautifying a massive, single-line unformatted JSON payload copied from a log aggregation tool (like Datadog or Kibana).",
        "Converting complex configuration files (like package.json or tsconfig.json) from 4 spaces down to 2 spaces.",
        "Minifying a massive JSON file strictly to save file size before sending it over an internal network."
      ]}
      faqs={[
        {
          question: "Is it completely safe to paste proprietary API payloads here?",
          answer: "Absolutely. Our JSON Formatter utilizes the native ECMAScript JSON engine built directly into your local browser. There are no web-sockets, backend processors, or server logs. Your proprietary data never touches our servers."
        },
        {
          question: "How does the 'Minifier' option work?",
          answer: "The 'Minify' setting runs the native JSON stringifier algorithm but injects a mathematical '0' for the spacing parameter. This explicitly forces the JavaScript engine to strip out all non-essential commas, tabs, and line-breaks. It yields the smallest possible valid JSON byte footprint."
        },
        {
          question: "Why do I get a 'Parse Error' on my JSON string?",
          answer: "The ECMAScript JSON parser is strictly compliant with the RFC 8259 syntax specifications. If a single character violates the spec, the parse fails. Common errors include: single quotes ('') instead of double quotes (\"\") on keys, trailing commas at the end of lists, or unescaped inner double quotes."
        },
        {
          question: "What is the difference between JSON and a JavaScript Object?",
          answer: "While their syntax looks incredibly similar, JSON (JavaScript Object Notation) is purely a text-string transport format. Every single key in JSON must be wrapped in double quotes. A Javascript Object is a true programmatic memory structure that does not require quoted keys."
        },
        {
          question: "Can this tool handle trailing commas?",
          answer: "No. Unlike Python dictionaries or loose Javascript Objects, the strict JSON standard natively outlaws trailing commas (e.g., [\"a\", \"b\",] ). You must remove trailing commas before the parser will allow formatting."
        }
      ]}
      relatedTools={[
        { name: "JSON Escape", url: "/json-escape-unescape" },
        { name: "JSON to CSV Converter", url: "/json-to-csv" }
      ]}
    />
  );
}
