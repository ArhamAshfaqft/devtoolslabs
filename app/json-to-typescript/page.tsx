import type { Metadata } from 'next';
import ToolLayout from '@/components/ToolLayout';
import JsonToTypescriptTool from '@/components/tools/JsonToTypescriptTool';

export const metadata: Metadata = {
  title: 'JSON to TypeScript Interface Generator (Free Online Tool) | Pro Typings',
  description: 'Instantly convert JSON objects into clean, nested TypeScript interfaces or types. Perfect for building frontend data models from API responses securely and offline.',
};

export default function JsonToTypescriptPage() {
  return (
    <ToolLayout
      title="JSON to TypeScript Interface Generator"
      intro="Manually writing TypeScript interfaces for complex backend API responses is tedious and error-prone. Paste your sample JSON payload below to instantly generate perfectly structured, nested TypeScript interfaces or type definitions. 100% private and processed locally."
      toolNode={<JsonToTypescriptTool />}
      howTo={[
        "Paste your sample JSON data into the 'Input JSON' box.",
        "Choose your preferred output format: 'INTERFACE' or 'TYPE'.",
        "Customize the name of the 'RootObject' to match your data model.",
        "Your TypeScript definitions are automatically generated as you type.",
        "Click 'Copy Code' to bring the typings directly into your IDE."
      ]}
      examples={[
        {
          input: '{"id": 1, "status": "active"}',
          output: 'interface RootObject {\n  id: number;\n  status: string;\n}'
        }
      ]}
      useCases={[
        "Mapping Axios or Fetch API responses to strongly-typed frontend models.",
        "Quickly prototyping Redux or Context state structures from sample data.",
        "Standardizing internal data exchange formats across backend and frontend teams."
      ]}
      faqs={[
        {
          question: "How does it handle nested objects?",
          answer: "Our generator recursively traverses your JSON. Every nested object is extracted into its own interface, named based on its key in PascalCase, ensuring clean and reusable code."
        },
        {
          question: "Can it handle arrays of different types?",
          answer: "It detects the internal type of the first element in the array. For mixed-type arrays, it defaults to an 'any[]' or a union type if possible, ensuring your TypeScript project remains type-safe."
        },
        {
          question: "Does it support optional properties (Optional Chaining)?",
          answer: "Currently, it maps all keys to required properties. However, you can easily add '?' to any property in the generated output to mark them as optional if your API response is inconsistent."
        },
        {
          question: "Is my JSON data secure?",
          answer: "Absolutely. Processing is done 100% client-side in your browser. No data ever reaches our servers, making it safe for processing proprietary business logic or private API keys."
        },
        {
          question: "Can I use the output in React or Angular?",
          answer: "Yes. The generated interfaces follow standard TypeScript syntax (ES6+), making them perfect for defining State, Props, or Service response types in React, Angular, Vue, and even Node.js backends."
        }
      ]}
      relatedTools={[
        { name: "JSON Formatter", url: "/json-formatter" },
        { name: "JSON Validator", url: "/json-validator" },
        { name: "JSON to CSV", url: "/json-to-csv" }
      ]}
    />
  );
}
