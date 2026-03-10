import React from 'react';
import type { Metadata } from 'next';
import ToolLayout from '@/components/ToolLayout';
import JsonDiffTool from '@/components/tools/JsonDiffTool';

export const metadata: Metadata = {
  title: 'JSON Diff Tool (Compare JSON Files Online)',
  description: 'Instantly compare two JSON objects side-by-side to find differences, added keys, and removed values. 100% offline, privacy-first JSON comparison.',
};

export default function JsonDiffPage() {
  return (
    <ToolLayout
      title="JSON Diff Tool (Compare JSON Files Online)"
      intro="Debugging massive API payloads or configuration files? This JSON Diff Tool allows you to instantly compare two JSON objects to highlight exactly what was added, removed, or changed. Your JSON data is parsed and compared securely inside your browser's local memory—no data is ever sent to a server."
      toolNode={<JsonDiffTool />}
      howTo={[
        "Paste your original JSON data into the left input box.",
        "Paste your modified/updated JSON data into the right input box.",
        "Click the 'Compare JSON' button.",
        "Scroll down to see the color-coded difference output (Green = Added, Red = Removed, Gray = Unchanged)."
      ]}
      examples={[
        {
          input: '{"id": 1, "name": "John"}',
          output: '{"id": 1, "name": "John Doe", "active": true}'
        }
      ]}
      useCases={[
        "Debugging unexpected changes in REST API responses.",
        "Comparing local `package.json` or configuration files against remote versions.",
        "Tracking down deeply nested state mutations in React/Redux debugging.",
        "Verifying data migrations in NoSQL databases like MongoDB."
      ]}
      faqs={[
        {
          question: "Why does the tool say 'Invalid JSON format'?",
          answer: "The diff algorithm requires both inputs to be strictly valid JSON. This means all keys must be wrapped in double quotes, and there can be no trailing commas. If you have a trailing comma, the parser will fail."
        },
        {
          question: "Does the output ignore structural ordering?",
          answer: "The tool works by strictly formatting (pretty-printing) both JSON objects with standard 2-space indentation before comparing them line-by-line. If keys are in a completely different order, they will be marked as removed from the old location and added to the new location."
        },
        {
          question: "Is there a size limit for the JSON files?",
          answer: "Because the comparison algorithm runs entirely on your local machine using your browser's CPU and memory, the only limit is what your browser tab can handle. For most modern devices, comparing JSON files up to thousands of lines will be virtually instantaneous."
        }
      ]}
      relatedTools={[
        {
          name: "JSON Formatter",
          url: "/json-formatter"
        },
        {
          name: "JSON Validator",
          url: "/json-validator"
        },
        {
          name: "JSON to CSV",
          url: "/json-to-csv"
        }
      ]}
    />
  );
}
