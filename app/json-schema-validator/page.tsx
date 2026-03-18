import React from 'react';
import ToolLayout from '@/components/ToolLayout';
import JsonSchemaValidatorTool from '@/components/tools/JsonSchemaValidatorTool';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'JSON Schema Validator | Draft-07 & Draft-2020-12 Offline Checker',
  description: 'Validate JSON payloads against JSON Schema specifications instantly. Secure, offline checking with detailed error paths and format validation (email, uuid, date-time).',
  keywords: ['json schema validator', 'ajv json syntax online', 'draft-07 schema checker', 'json schema format validation', 'offline json validation'],
  alternates: {
    canonical: 'https://www.devtoolslabs.com/json-schema-validator',
  },
};

export default function JsonSchemaValidatorPage() {
  return (
    <ToolLayout
      title="JSON Schema Validator"
      intro="JSON Schema is a powerful standard for describing the structure of JSON data. While basic JSON validators only check for missing commas or brackets, a Schema Validator ensures your data actually conforms to business rules (e.g., 'age must be an integer > 18' or 'email must be formatted correctly'). Our tool uses the industry-standard AJV engine to provide lightning-fast, secure, offline validation directly in your browser."
      toolNode={<JsonSchemaValidatorTool />}
      howTo={[
        "Paste your JSON Schema definition into the left editor.",
        "Paste the target JSON payload into the right editor.",
        "The validation engine runs automatically and instantly as you type.",
        "If the JSON is invalid, expanding error paths (like `/users/0/email`) will highlight exactly what rule was broken.",
        "Use the 'Test Invalid' and 'Test Valid' buttons to see how the validation engine catches constraint violations."
      ]}
      examples={[
        {
          input: "{\n  \"type\": \"object\",\n  \"required\": [\"id\"]\n}",
          output: "// If payload is { \"name\": \"Bob\" }\n\nValidation Failed\nroot must have required property 'id'"
        },
        {
          input: "{\n  \"properties\": {\n    \"email\": { \"format\": \"email\" }\n  }\n}",
          output: "// If payload is { \"email\": \"not-an-email\" }\n\nValidation Failed\n/email must match format \"email\""
        }
      ]}
      useCases={[
        "Backend engineers writing draft-07 schemas for API documentation (OpenAPI/Swagger).",
        "Frontend developers mocking Formik or React Hook Form validation logic against a schema.",
        "Debugging complex CI/CD pipeline failures caused by invalid configuration file structures.",
        "Testing format constraints (`uuid`, `ipv4`, `date-time`) without writing custom regex."
      ]}
      faqs={[
        {
          question: "Which JSON Schema drafts are supported?",
          answer: "Our validator is powered by AJV, which fully supports draft-07 (the most widely used industry standard) as well as draft-2019-09 and draft-2020-12."
        },
        {
          question: "Does it validate specific formats like emails or IPs?",
          answer: "Yes. By default, we include standard format validation so constraints like `{\"format\": \"email\"}`, `uuid`, `uri`, and `date-time` are strictly enforced."
        },
        {
          question: "Is my proprietary API schema secure?",
          answer: "Absolutely. The AJV validation engine runs 100% locally in your browser leveraging WebAssembly or client-side JS. We never transmit your schemas or payloads to an external server."
        },
        {
          question: "What is the difference between this and the 'JSON Validator' tool?",
          answer: "The standard JSON Validator only checks syntax (brackets, quotes). This JSON Schema Validator enforces structural constraints (types, required fields, max lengths) defined by a separate schema."
        }
      ]}
      relatedTools={[
        { name: "JSON Validator", url: "/json-validator" },
        { name: "JSON to Python Pydantic", url: "/json-to-pydantic" },
        { name: "JSON to TypeScript", url: "/json-to-typescript" }
      ]}
    />
  );
}
