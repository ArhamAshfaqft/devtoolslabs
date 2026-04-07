import { Metadata } from 'next';
import JsonUnescapeTool from '@/components/tools/JsonUnescapeTool';
import ToolLayout from '@/components/ToolLayout';

export const metadata: Metadata = {
  title: 'JSON Unescape Tool | Unescape JSON Online Free',
  description: 'How to unescape JSON? Use our free online unescape JSON tool to clean messy backslashes and fix doubly-escaped strings for AWS, GCP, and API logs.',
  keywords: 'unescape json, json unescape online, unescape json string, how to unescape json, remove backslashes from json',
};

export default function JsonUnescapePage() {
  return (
    <ToolLayout
      title="JSON Unescape Tool"
      intro="Unescape JSON online instantly. Our expert-grade utility cleans messy backslashes and special character sequences, making your doubly-escaped JSON log lines readable and valid in seconds."
      toolNode={<JsonUnescapeTool />}
      howTo={[
        "Paste your escaped string or JSON log line into the Monaco Editor.",
        "Click 'Clean & Unescape' to recursively strip backslashes and fix escape sequences.",
        "The tool instantly formats the resulting clean JSON payload for professional review."
      ]}
      examples={[
        {
          input: '{"message": "{\\\"level\\\": \\\"info\\\"}"}',
          output: '{\n  "message": {\n    "level": "info"\n  }\n}'
        }
      ]}
      useCases={[
        "DevOps: Unescape JSON logs from cloud providers like AWS CloudWatch or Datadog.",
        "Database Review: Clean JSON strings stored inside SQL or NoSQL text fields.",
        "Security Audits: Fix incorrectly serialized API responses containing nested escaped data.",
        "Development: How to unescape JSON in Bash, Java, C#, or Golang for backend scripting."
      ]}
      faqs={[
        {
          question: "How to unescape a JSON string online?",
          answer: "By using our unescape JSON tool, you can simply paste your string containing backslashes. Our engine automatically detects and removes escape characters (\\\\, \\\", \\n, \\r) and restores the original JSON object structure."
        },
        {
          question: "Can I unescape JSON in Bash or other languages?",
          answer: "Yes. While our tool is the fastest way to do it manually, you can also use tools like 'jq' in Bash with the --raw-output flag. Our tool is optimized for developers who need a visual preview of the unescaped result."
        },
        {
          question: "Does this tool handle doubly-escaped strings?",
          answer: "Absolutely. Our 'Clean & Unescape' algorithm is recursive. For extremely nested strings, you can run the unescape operation multiple times until all backslashes are resolved."
        },
        {
          question: "Is unescape JSON online secure?",
          answer: "Yes. All unescaping and formatting operations are performed 100% client-side in your browser via WebAssembly and JavaScript. No data is ever transmitted to external servers."
        }
      ]}
      relatedTools={[
        { name: "JSON Formatter", url: "/json-formatter" },
        { name: "JSON Diff Tool", url: "/json-diff" },
        { name: "JSON to Excel", url: "/json-to-excel" }
      ]}
    />
  );
}
