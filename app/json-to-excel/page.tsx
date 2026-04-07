import { Metadata } from 'next';
import JsonToExcelTool from '@/components/tools/JsonToExcelTool';
import ToolLayout from '@/components/ToolLayout';

export const metadata: Metadata = {
  title: 'JSON to Excel Converter | Convert JSON to XLSX Online Free',
  description: 'How to convert JSON to Excel? Import JSON into Excel with our free recursive flattening tool. Cleanly transform nested JSON objects into native .xlsx files locally.',
  keywords: 'json to excel, convert json to excel, how to open json file in excel, import json into excel, json to excel converter, online json to xlsx',
};

export default function JsonToExcelPage() {
  return (
    <ToolLayout
      title="JSON to Excel Converter"
      intro="Expert-grade utility to convert JSON to Excel online for free. Transform messy, hierarchical JSON payloads into professional, flattened spreadsheets (.xlsx) without writing a single line of code."
      toolNode={<JsonToExcelTool />}
      howTo={[
        "Paste your JSON array or object into the Monaco Editor above.",
        "Our engine automatically detects nested structures and applies recursive flattening.",
        "Click 'Export to Excel' to instantly download your clean, production-ready .xlsx file."
      ]}
      examples={[
        {
          input: '[{"id": 1, "profile": {"username": "dev_guru", "rank": 99}}]',
          output: 'Excel Sheet: [Column: id | 1], [Column: profile.username | dev_guru], [Column: profile.rank | 99]'
        }
      ]}
      useCases={[
        "Data Migration: Convert NoSQL exports (MongoDB/Firebase) to Excel for relational analysis.",
        "Business Intelligence: Import API JSON responses into Excel for quick reporting.",
        "Developer Productivity: How to open a JSON file in Excel effectively for debugging nested data.",
        "Log Analysis: Turn complex JSON log files into readable spreadsheets for security audits."
      ]}
      faqs={[
        {
          question: "How do I convert JSON to Excel without losing data?",
          answer: "Our tool uses advanced dot-notation flattening. Instead of ignoring nested objects, it creates new columns (e.g., 'user.address.zip') so every piece of data is preserved in your spreadsheet."
        },
        {
          question: "How to open a JSON file in Excel properly?",
          answer: "While Excel has a built-in 'Get Data' feature, it often struggles with deep nesting. Our converter manually maps every level of your JSON to a flat table, making it the easiest way to import JSON into Excel."
        },
        {
          question: "Is this JSON to Excel converter secure?",
          answer: "Yes. Unlike other online converters, 100% of the processing happens in your browser. Your data never leaves your computer, which is crucial for sensitive business CSV exports."
        },
        {
          question: "Can I convert massive JSON files to XLSX?",
          answer: "Yes, we support large datasets. For optimal performance, we recommend files up to 50MB. This tool is built specifically for high-volume conversion of JSON arrays into row-based Excel files."
        }
      ]}
      relatedTools={[
        { name: "JSON Diff Tool", url: "/json-diff" },
        { name: "XML to JSON", url: "/xml-to-json" },
        { name: "JSON Formatter", url: "/json-formatter" }
      ]}
    />
  );
}
