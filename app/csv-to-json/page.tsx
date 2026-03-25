import React from 'react';
import type { Metadata } from 'next';
import ToolLayout from '@/components/ToolLayout';
import CsvToJsonTool from '@/components/tools/CsvToJsonTool';

export const metadata: Metadata = {
  title: 'CSV to JSON Converter (Parse Excel to JSON Array Online)',
  description: 'Instantly convert CSV spreadsheets or Excel data into a clean, formatted JSON array. Supports custom delimiters, headers, and automatic type inference.',
  openGraph: {
    title: 'CSV to JSON Converter (Parse Excel to JSON Array Online)',
    description: 'Instantly convert CSV spreadsheets or Excel data into a clean, formatted JSON array. Supports custom delimiters, headers, and automatic type inference.',
    url: 'https://devtoolslabs.com/csv-to-json',
  },
  alternates: {
    canonical: '/csv-to-json',
  },
};

export default function CsvToJsonPage() {
  return (
    <ToolLayout
      title="CSV to JSON Converter (Parse Excel to JSON Array Online)"
      intro="It is incredibly common to receive a massive payload of data from a marketing team strictly utilizing Microsoft Excel or Google Sheets and need to import it into a NoSQL database or REST API. This offline converter takes any structured CSV data, automatically infers numbers and booleans, supports custom delimiters, and outputs a perfectly formatted JSON array ready for your codebase."
      toolNode={<CsvToJsonTool />}
      howTo={[
        "Paste your raw CSV data into the left input box.",
        "Check or uncheck 'First row is Header' depending on your data structure.",
        "Select your delimiter (Comma is standard, but Tabs are useful for pasting directly from Excel).",
        "Click the 'Convert to JSON' button.",
        "Copy the instantly generated, cleanly formatted JSON array from the right box."
      ]}
      examples={[
        {
          input: "id,name,active\n1,John,true\n2,Jane,false",
          output: '[\n  {\n    "id": 1,\n    "name": "John",\n    "active": true\n  },\n  {\n    "id": 2,\n    "name": "Jane",\n    "active": false\n  }\n]'
        }
      ]}
      useCases={[
        "Converting marketing or sales Excel exports into JSON for API seeding.",
        "Migrating legacy database CSV dumps into MongoDB or Firebase.",
        "Translating tabular data into a format easily consumable by frontend charting libraries like Chart.js.",
        "Quickly generating mock JSON arrays from simple spreadsheet planning."
      ]}
      faqs={[
        {
          question: "How does the tool handle data types?",
          answer: "Our intelligent parser automatically attempts type inference. If a CSV cell contains 'true' or 'false', it is cast to a native JSON boolean. If it contains purely numerical data, it is cast to a native JSON number. Everything else is treated as a string."
        },
        {
          question: "What happens if my CSV has quotes inside the data?",
          answer: "The parser fully supports standard CSV quote-escaping. If your cell data contains commas (e.g., \"Smith, Jane\"), simply wrap the cell in double quotes and the parser will treat the internal comma as part of the string, not a delimiter."
        },
        {
          question: "Is my corporate data sent to your servers?",
          answer: "Absolutely not. This conversion tool runs entirely within the Javascript sandbox of your local browser. You can safely convert massive files containing proprietary user data or PII—none of it will ever leave your machine."
        }
      ]}
      relatedTools={[
        {
          name: "JSON to CSV",
          url: "/json-to-csv"
        },
        {
          name: "JSON Formatter",
          url: "/json-formatter"
        },
        {
          name: "Markdown Table Generator",
          url: "/markdown-table"
        }
      ]}
    />
  );
}
