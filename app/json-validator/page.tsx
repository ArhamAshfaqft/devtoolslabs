import type { Metadata } from 'next';
import ToolLayout from '@/components/ToolLayout';
import JsonValidatorTool from '@/components/tools/JsonValidatorTool';

export const metadata: Metadata = {
  title: 'JSON Validator & Syntax Checker (Free Online Tool) | Verify Valid JSON',
  description: 'Instantly validate your JSON payloads. Catch missing commas, unquoted keys, and syntax errors. 100% free, secure, and client-side processing.',
};

export default function JsonValidatorPage() {
  return (
    <ToolLayout
      title="JSON Schema Syntax Validator"
      intro="A single missing comma or unescaped quote can bring down an entire production API. Paste your JSON payload into this validator to instantly catch and diagnose RFC-8259 syntax errors. It securely runs in your browser, providing exact line-number error tracing when possible."
      toolNode={<JsonValidatorTool />}
      howTo={[
        "Paste your expected JSON code into the large text area.",
        "Click the blue 'Validate JSON' button on the top left.",
        "The status bar will turn Green if the JSON is perfectly valid and ready to deploy.",
        "If it turns Red, the error message will attempt to isolate the exact character position or line where the syntax broke."
      ]}
      examples={[
        {
          input: '{\n  "name": "Jane",\n  "age": 28,\n}',
          output: '❌ Invalid JSON (Unexpected token } in JSON at position 35). This is caused by the illegal trailing comma after 28.'
        },
        {
          input: '{\n  "name": "John",\n  "age": 30\n}',
          output: '✅ Valid JSON. No syntax errors detected.'
        }
      ]}
      useCases={[
        "Debugging a '500 Internal Server Error' caused by an application sending malformed JSON hidden deep in a request body.",
        "Checking configuration files (like appsettings.json or package.json) for invisible typos before committing them to Git.",
        "Validating heavily escaped, deeply nested API responses from third-party webhook integrations."
      ]}
      faqs={[
        {
          question: "What makes JSON invalid?",
          answer: "The JSON specification is incredibly strict. The most common errors are: 1) Trailing commas at the end of lists or objects, 2) Using single quotes ('text') instead of double quotes (\"text\"), 3) Forgetting to wrap keys in quotes, and 4) Mismatched curly braces."
        },
        {
          question: "Is my payload sent to a server for validation?",
          answer: "No. The validation logic relies strictly on your local browser's native JavaScript execution engine. It is entirely offline. No networks requests are made containing your proprietary data."
        },
        {
          question: "Why does it say 'Unexpected end of JSON input'?",
          answer: "This error means the parser reached the end of the file but an object or array was never closed. It usually means you are missing a closing curly brace `}` or square bracket `]` at the very bottom of your text."
        },
        {
          question: "Can this check against a Custom JSON Schema?",
          answer: "Currently, this validator strictly checks for architectural syntax validity (RFC-8259 compliance). Advanced logic-based validation against specific custom JSON Schemas (e.g., verifying a field is an integer between 1-10) is a feature planned for a future update."
        },
        {
          question: "Will it fix my errors automatically?",
          answer: "No, a validator's job is solely to flag the structural break so you can safely fix it without introducing unintended data mutations. However, if your JSON is valid but messy, you can use our JSON Formatter tool to logically clean it up."
        }
      ]}
      relatedTools={[
        { name: "JSON Formatter", url: "/json-formatter" },
        { name: "JSON to CSV", url: "/json-to-csv" }
      ]}
    />
  );
}
