import { Metadata } from 'next';
import JsonExtractorTool from '@/components/tools/JsonExtractorTool';
import ToolLayout from '@/components/ToolLayout';

export const metadata: Metadata = {
  title: 'JSON Data Extractor | Online JSONPath Tester & Parser',
  description: 'Free, 100% client-side JSON extraction tool. Use JSONPath or Dot Notation to filter, extract, and parse specific values from large JSON blobs instantly.',
  keywords: 'json extractor, jsonpath tester, extract json data, json data parser, teams to json, json transcription online, json path extractor',
  alternates: { canonical: '/json-extractor' },
};

export default function JsonExtractorPage() {
  return (
    <ToolLayout
      title="JSON Data Extractor"
      intro="Effortlessly navigate and extract precise data from complex JSON structures. Whether you're debugging an API response or trying to parse deep objects, our JSONPath-powered extractor works 100% in your browser—no data ever leaves your device."
      toolNode={<JsonExtractorTool />}
      howTo={[
        "Paste your source JSON data into the 'Source JSON' editor on the left.",
        "Enter a JSONPath expression or Dot Notation in the top search bar (e.g., $.users[*].id).",
        "View the extracted results instantly in the right-hand panel.",
        "Use the quick examples above the search bar to learn common extraction patterns like filtering by price or selecting specific array indexes."
      ]}
      useCases={[
        "API Debugging: Extract deep properties from giant nested JSON responses without scrolling.",
        "Data Transformation: Quickly filter arrays of objects to obtain only the specific keys you need.",
        "Log Analysis: Use the recursive descent operator (..) to find all occurrences of a specific key (like 'error' or 'id') across an entire log file.",
        "Teams & Transcription Cleaning: Reformat complex data exports into flat, readable JSON arrays."
      ]}
      faqs={[
        {
          question: "What is JSONPath?",
          answer: "JSONPath is a query language for JSON, similar to how XPath is used for XML. It allows you to select and filter data within a JSON object using a standardized syntax starting with '$' for the root."
        },
        {
          question: "Can I filter data by value?",
          answer: "Yes! This tool supports filter expressions. For example, using '$.items[?(@.price > 100)]' will extract only the items from an array where the price property is greater than 100."
        },
        {
          question: "Is my data secure?",
          answer: "Absolutely. DevToolsLabs processes everything locally using your browser's JavaScript engine. Your JSON data and secret keys are never uploaded to any server."
        },
        {
          question: "Does it support dot notation?",
          answer: "Yes, you can use standard object dot notation like '$.user.profile.name' for simple extractions or bracket notation for arrays."
        }
      ]}
      relatedTools={[
        { name: "JSON Formatter", url: "/json-formatter" },
        { name: "JSON Diff", url: "/json-diff" },
        { name: "JSON Unescape", url: "/json-unescape" }
      ]}
      examples={[
        {
          input: '{"user": {"name": "Alice", "tags": ["admin", "dev"]}}',
          output: '["admin", "dev"] (using path: $.user.tags)'
        }
      ]}
    />
  );
}
