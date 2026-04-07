import React from 'react';
import type { Metadata } from 'next';
import ToolLayout from '@/components/ToolLayout';
import JsonFromArrayTool from '@/components/tools/JsonFromArrayTool';

export const metadata: Metadata = {
  title: 'JSON From Array Generator (Visual Table to JSON Tool)',
  description: 'Easily generate JSON arrays from a visual spreadsheet interface. Add rows and columns to build complex JSON datasets with automatic type inference for numbers and booleans.',
  keywords: 'json from array, table to json, visual json generator, spreadsheet to json, online json creator, devtoolslabs',
  openGraph: {
    title: 'JSON From Array Generator (Visual Table to JSON Tool)',
    description: 'Build JSON arrays visually using an interactive table interface. No syntax errors, just pure data.',
    url: 'https://devtoolslabs.com/json-from-array',
  },
  alternates: {
    canonical: '/json-from-array',
  },
};

export default function JsonFromArrayPage() {
  const codeSnippets = [
    {
      language: "JavaScript (JSON Array)",
      code: `[
  { "id": 1, "name": "Apple", "inStock": true },
  { "id": 2, "name": "Orange", "inStock": false }
]`
    },
    {
      language: "Python (List of Dicts)",
      code: `items = [
    {"id": 1, "name": "Apple", "inStock": True},
    {"id": 2, "name": "Orange", "inStock": False}
]`
    }
  ];

  return (
    <ToolLayout
      title="JSON From Array Generator"
      intro="Manually writing large JSON arrays is tedious and prone to syntax errors like missing commas or mismatched brackets. Our JSON From Array generator provides a familiar, spreadsheet-like interface to visually construct your data. Simply define your headers and fill in the rows—we handle the JSON formatting and type inference automatically."
      toolNode={<JsonFromArrayTool />}
      codeSnippets={codeSnippets}
      howTo={[
        "Define your JSON object keys by editing the table headers in the top row.",
        "Add rows and columns as needed using the 'Row' and 'Column' buttons.",
        "Enter your data into the cells. Numeric values and 'true/false' strings will be automatically converted to numbers and booleans.",
        "The generated JSON array updates in real-time in the editor below.",
        "Copy the JSON or download it for use in your application."
      ]}
      examples={[
        {
          input: 'Table with headers [id, name] and rows [[1, "User"], [2, "Admin"]]',
          output: '[{"id": 1, "name": "User"}, {"id": 2, "name": "Admin"}]'
        }
      ]}
      useCases={[
        "Quickly generating seed data for development databases (MongoDB, PostgreSQL).",
        "Constructing mock JSON response arrays for API testing and prototyping.",
        "Converting simple manual lists into structured JSON config files.",
        "Generating data for 'Mapping' or 'Lookup' tables in frontend applications."
      ]}
      faqs={[
        {
          question: "How does the tool handle data types?",
          answer: "Our engine performs 'Smart Inference'. If you type '123' it becomes a Number. If you type 'true' or 'false' it becomes a Boolean. Everything else remains a String. This ensures your JSON is ready for production use without manual casting."
        },
        {
          question: "Can I add nested objects or arrays?",
          answer: "This version is optimized for 'Flat' JSON arrays (collection of objects). For deeply nested structures, we recommend using our standard JSON Formatter to refine the output, or building multiple flat lists and combining them."
        },
        {
          question: "How many rows can I generate?",
          answer: "Since the tool runs 100% client-side in your memory, there is no hard limit. You can easily manage hundreds of rows for quick data mocking without any server lag."
        }
      ]}
      relatedTools={[
        { name: "JSON Formatter", url: "/json-formatter" },
        { name: "CSV to JSON", url: "/csv-to-json" },
        { name: "Mock JSON Generator", url: "/mock-json-generator" },
        { name: "JSON to TypeScript", url: "/json-to-typescript" }
      ]}
    />
  );
}
