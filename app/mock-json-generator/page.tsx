import type { Metadata } from 'next';
import ToolLayout from '@/components/ToolLayout';
import MockJsonGeneratorTool from '@/components/tools/MockJsonGeneratorTool';

export const metadata: Metadata = {
  title: 'Mock JSON Generator | Fake JSON API Data Creator Online',
  description: 'Generate massive, realistic mock JSON arrays for frontend UI testing and database seeding. Uses faker.js logic client-side to instantly create user avatars, UUIDs, dates, and commerce data.',
  openGraph: {
    title: 'Mock JSON Generator | Fake JSON API Data Creator Online',
    description: 'Generate massive, realistic mock JSON arrays for frontend UI testing and database seeding. Uses faker.js logic client-side to instantly create user avatars, UUIDs, dates, and commerce data.',
    url: 'https://devtoolslabs.com/mock-json-generator',
  },
  alternates: {
    canonical: '/mock-json-generator',
  },
};

export default function MockJsonGeneratorPage() {
  return (
    <ToolLayout
      title="Mock JSON API Generator (Fake Data Architect)"
      intro="Frontend development typically grinds to a halt while waiting on backend engineers to build APIs. The Mock JSON Generator allows you to instantly architect deeply realistic data payloads directly in your browser. Powered by standard faker.js data blueprints, you can generate up to 5,000 rows of user, commerce, or technical test data in milliseconds without a server roundtrip."
      toolNode={<MockJsonGeneratorTool />}
      howTo={[
        "Use the 'Data Blueprint' sidebar to define the structure of your desired JSON object.",
        "Update the 'field_key' to precisely match your frontend interface properties (e.g., 'avatarUrl' or 'isSubscribed').",
        "Select the appropriate data type from over 25 faker.js categories, including UUIDs, Commerce Names, and IPv4 addresses.",
        "Set the desired 'Row Count' (up to 5,000 for heavy load testing).",
        "Select your output format (JSON Array or flat CSV) and click 'Generate Mock Data'."
      ]}
      examples={[
        {
          input: 'Settings: 2 Rows, JSON\nBlueprint: [{key: "id", type: "UUID"}, {key: "price", type: "Price"}]',
          output: '[\n  {\n    "id": "e4b2d1c9...",\n    "price": "49.99"\n  },\n  {\n    "id": "f5c3e2d0...",\n    "price": "12.00"\n  }\n]'
        }
      ]}
      useCases={[
        "Fleshing out a UI prototype with varying data lengths (long names, missing avatars) to test responsive design breaking points.",
        "Generating massive CSV files containing 5,000 realistic users to bulk import and test database indexing performance.",
        "Mocking endpoint responses for Jest or Cypress E2E automated testing suites.",
        "Populating Data Grid / Table components with pagination scenarios."
      ]}
      faqs={[
        {
          question: "What is faker.js?",
          answer: "Faker.js is the industry standard JavaScript library for generating massive amounts of fake data in the browser or Node.js. It powers the randomization logic behind this tool, ensuring generated names actually sound like names, and generated IP addresses are structurally valid."
        },
        {
          question: "Can I generate thousands of rows?",
          answer: "Yes. Traditional server-based mock generators restrict you to 10 or 50 rows to save backend costs. Because DevToolsLabs utilizes a 100% Client-Side architecture, your own browser's CPU generates the data. You can instantly generate arrays of up to 5,000 rows."
        },
        {
          question: "Why does it offer CSV output?",
          answer: "While JSON is perfect for frontend API mocking, Data Engineers and DevOps teams frequently require standard CSV formats to bulk-import test seed data into bare relational databases like PostgreSQL, MySQL, or cloud data warehouses."
        },
        {
          question: "Are the generated UUIDs globally unique?",
          answer: "Yes, the UUID (Universally Unique Identifier) generator outputs cryptographically sound Version 4 UUIDs, making them highly suitable as primary keys in your test database seeding operations."
        },
        {
          question: "Does my blueprint data get sent anywhere?",
          answer: "No. Your property keys, chosen data schemas, and the resulting massive JSON payloads exist entirely within your browser's memory. If you close the tab, the data is gone forever."
        }
      ]}
      relatedTools={[
        { name: "JSON to TypeScript", url: "/json-to-typescript" },
        { name: "SQL to Object/JSON", url: "/sql-to-object" },
        { name: "JSON Validator", url: "/json-validator" }
      ]}
    />
  );
}
