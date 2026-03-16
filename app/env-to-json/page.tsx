import React from 'react';
import type { Metadata } from 'next';
import ToolLayout from '@/components/ToolLayout';
import EnvToJsonTool from '@/components/tools/EnvToJsonTool';

export const metadata: Metadata = {
  title: 'Environment Variable (.env) to JSON Converter | DevToolsLabs',
  description: 'Convert .env files to JSON online instantly. Easily parse environment variable strings into structured JSON objects for CI/CD and configuration management.',
};

export default function EnvToJsonPage() {
  return (
    <ToolLayout
      title="Env Variable to JSON"
      intro="Transform flat .env configuration files into structured JSON objects. Ideal for mapping environment variables to application state or validating CI/CD secrets."
      toolNode={<EnvToJsonTool />}
      howTo={[
        "Paste the contents of your .env file into the left box.",
        "The tool will instantly parse each key-value pair, stripping comments and handling quotes.",
        "Verify the resulting JSON structure on the right.",
        "Copy the JSON output to use in your scripts or configuration managers."
      ]}
      examples={[
        {
          input: "DB_USER=admin\nDB_PASS='password123'",
          output: '{\n  "DB_USER": "admin",\n  "DB_PASS": "password123"\n}'
        }
      ]}
      useCases={[
        "Mapping raw server environment variables to frontend configuration objects.",
        "Validating .env syntax before committing to vault or secret managers.",
        "Converting local development configs for use in JSON-based CI/CD pipelines like GitHub Actions.",
        "Simplifying the injection of secrets into Kubernetes ConfigMaps."
      ]}
      faqs={[
        {
          question: "Does this tool handle comments?",
          answer: "Yes. Lines starting with `#` are automatically identified as comments and ignored during the conversion process."
        },
        {
          question: "How are quoted values handled?",
          answer: "The parser automatically detects and removes both single (') and double (\") quotes from around values, following standard .env formatting rules."
        },
        {
          question: "What happens to empty lines?",
          answer: "Empty lines or lines containing only whitespace are skipped to ensure the resulting JSON is clean and valid."
        },
        {
          question: "Can it handle complex values with '=' signs?",
          answer: "Yes. The parser only splits on the first `=` found in a line, allowing values like connection strings or URLs to contain `=` characters without breaking the parse."
        },
        {
          question: "Is it safe for secrets and API keys?",
          answer: "Yes, 100%. All processing happens in your browser's memory. No network requests are made, so your secrets never touch our infrastructure."
        },
        {
          question: "Can I convert the JSON back to .env?",
          answer: "Currently, this tool is one-way (Env to JSON). We are working on a reverse converter for an upcoming release."
        }
      ]}
      relatedTools={[
        { name: "JSON Validator", url: "/json-validator" },
        { name: "YAML to JSON", url: "/yaml-to-json" },
        { name: "Base64 Encoder", url: "/base64-encode-decode" }
      ]}
    />
  );
}
