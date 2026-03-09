import type { Metadata } from 'next';
import ToolLayout from '@/components/ToolLayout';
import JsonToCsvTool from '@/components/tools/JsonToCsvTool';

export const metadata: Metadata = {
  title: 'JSON to CSV Converter (Free Online Tool) | Export Arrays to Excel',
  description: 'Convert arrays of JSON objects into standard comma-separated CSV format. Features RFC-compliant internal comma escaping and direct file downloads.',
};

export default function JsonToCsvPage() {
  return (
    <ToolLayout
      title="JSON to CSV Converter"
      intro="It is incredibly common to fetch a massive payload of data from a REST API (like a user list) and need to hand it off to a marketing team strictly utilizing Microsoft Excel or Google Sheets. This offline converter takes any array of valid JSON objects, automatically maps disparate header keys, strictly comma-escapes internal strings, and outputs a perfectly formatted CSV document ready for download."
      toolNode={<JsonToCsvTool />}
      howTo={[
        "Paste an array of JSON objects (e.g., `[ { \"key\": \"value\" } ]`) directly into the dark input box.",
        "The parser will instantly iterate through all objects to collect every unique key to form the header row.",
        "The correctly formatted CSV string will generate in the right panel.",
        "Click 'Download .csv' to save the file locally for immediate import into your favorite spreadsheet tool."
      ]}
      examples={[
        {
          input: '[\n  { "name": "John", "role": "admin" },\n  { "name": "Jane", "age": 30 }\n]',
          output: 'name,role,age\nJohn,admin,\nJane,,30'
        }
      ]}
      useCases={[
        "Fulfilling a non-technical stakeholder's request for a database report by converting an API JSON payload into an Excel-friendly format.",
        "Importing user configurations into legacy CRM backend systems that only accept rigid comma-separated documents.",
        "Flattening and exporting logging metrics for use in programmatic R/Python data science charting."
      ]}
      faqs={[
        {
          question: "How does it handle an object missing certain keys?",
          answer: "The algorithm makes a preliminary pass over all objects in the array to collect an exhaustive, deduplicated set of every possible header key. If a subsequent object is missing a specific key (like the 'age' key in the second example), a blank cell is correctly rendered in the CSV to ensure the grid structure remains rectangular."
        },
        {
          question: "What happens if a JSON string value contains a comma or newline?",
          answer: "Our parser is 100% compliant with standard CSV escaping rules (RFC 4180). If a string value contains an internal comma, a double quote, or a newline, the entire string column is aggressively wrapped in explicit double quotes to protect the delimiter logic from breaking your spreadsheet."
        },
        {
          question: "Can it flatten nested JSON objects or arrays?",
          answer: "If the tool detects a nested object or array as the value of a key, it stringifies that object (e.g., `\"{\"nested\":true}\"`) rather than attempting a recursive expansion. This guarantees that your row-to-column ratio remains perfectly stable."
        },
        {
          question: "What is the maximum file size?",
          answer: "There are no arbitrary network caps because the mapping takes place entirely in the browser RAM using standard JavaScript iteration techniques. You can easily process upwards of 50,000 to 100,000 JSON rows instantaneously."
        },
        {
          question: "Is this secure for PII or encrypted payloads?",
          answer: "Yes. Due to the client-side architecture nature of this system, you could safely unplug your ethernet cable immediately before pasting the payload, and it will still parse, compute, and download the CSV successfully."
        }
      ]}
      relatedTools={[
        { name: "JSON Escape", url: "/json-escape-unescape" },
        { name: "URL Query Parser", url: "/query-parser" }
      ]}
    />
  );
}
