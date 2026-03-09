import type { Metadata } from 'next';
import ToolLayout from '@/components/ToolLayout';
import JsonEscapeTool from '@/components/tools/JsonEscapeTool';

export const metadata: Metadata = {
  title: 'JSON Escape & Unescape (Free Online Tool) | Format Instantly',
  description: 'Fast, secure, and client-side tool to easily escape or unescape JSON strings online. No server tracking or limits.',
};

export default function JsonEscapePage() {
  return (
    <ToolLayout
      title="JSON Escape & Unescape (Format JSON Strings Online)"
      intro="Safely convert raw JSON into a valid escaped string format for use in code, databases, or API requests. You can also reverse the process by unescaping stringified JSON back into readable format. This tool processes everything locally in your browser so your data never leaves your computer."
      toolNode={<JsonEscapeTool />}
      howTo={[
        "Paste your raw JSON object or string into the 'Input' text area.",
        "Click the black 'Escape JSON' button to add backslashes and wrap it in quotes.",
        "To reverse the process, paste escaped JSON (e.g., from an API response) and click 'Unescape JSON'.",
        "Use the 'Copy to Clipboard' button to grab the result instantly."
      ]}
      examples={[
        {
          input: '{"name": "arham", "age": 25}',
          output: '"{\\"name\\":\\"arham\\",\\"age\\":25}"'
        },
        {
          input: '"{\\"status\\":\\"success\\"}"',
          output: '{\n  "status": "success"\n}'
        }
      ]}
      useCases={[
        "Embedding JSON configurations inside HTML attributes (like data-* attributes).",
        "Passing complex JSON strings as variables inside shell scripts or curl commands.",
        "Storing JSON data inside a single database column that requires stringified format.",
        "Debugging API responses that double-encode their JSON payloads."
      ]}
      faqs={[
        {
          question: "When should I safely escape JSON strings?",
          answer: "Escaping JSON is strictly required when you need to embed a JSON string inside another data structure without breaking the syntax. Common scenarios include injecting JSON inside an HTML attribute (like data-options=\"{...}\"), passing a JSON payload as an environment variable in a CI/CD pipeline, or sending nested JSON as a string inside a GraphQL query."
        },
        {
          question: "How do you handle double quotes and backslashes in JSON?",
          answer: "In a properly escaped JSON string, double quotes (\") must be converted into backslash-quote (\\\"). If your text already contains literal backslashes, those backslashes must also be escaped by turning single backslashes into double backslashes (\\\\)."
        },
        {
          question: "Why am I seeing 'Unexpected token' when parsing JSON?",
          answer: "The 'Unexpected token' (or SyntaxError) typically occurs when your JSON string is improperly formatted or incorrectly escaped. A common cause is trying to parse an unescaped string containing raw un-escaped double quotes, or trailing commas at the end of an array or object, which is invalid in strictly compliant JSON."
        },
        {
          question: "What is the difference between stringifying and escaping?",
          answer: "JSON.stringify() converts a JavaScript object into a JSON-formatted text string. Escaping specifically refers to modifying a text string so it can be safely nested inside code without confusing the JavaScript engine. When you stringify an already-stringified JSON payload, Javascript inherently escapes the internal characters."
        },
        {
          question: "Can I use this tool to fix double-encoded API responses?",
          answer: "Yes. Many misconfigured REST APIs accidentally encode JSON payloads multiple times, resulting in a string that looks like '\\\"{\\\\\\\"data\\\\\\\"...'. Using our 'Unescape JSON' button will strip the redundant escape characters and return the payload to a readable object format."
        },
        {
          question: "Does this tool use eval() to format the JSON?",
          answer: "No. Using eval() on raw JSON input is a massive security risk as it can execute malicious JavaScript. Our tool strictly utilizes the secure, native browser JSON.parse() and JSON.stringify() APIs to safely format and escape strings."
        }
      ]}
      relatedTools={[
        { name: "URL Query Parser", url: "/query-parser" },
        { name: "HTML Entity Decoder", url: "/html-entity-decoder" }
      ]}
    />
  );
}
