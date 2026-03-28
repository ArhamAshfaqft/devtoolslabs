import type { Metadata } from 'next';
import ToolLayout from '@/components/ToolLayout';
import JsonToMysqlTool from '@/components/tools/JsonToMysqlTool';

export const metadata: Metadata = {
  title: 'JSON to MySQL Schema | Create Table Generator Online',
  description: 'Instantly convert JSON objects or arrays into valid MySQL CREATE TABLE schemas. Automatically infer INT, VARCHAR, DATETIME, and JSON column types from payloads.',
  openGraph: {
    title: 'JSON to MySQL Schema | Create Table Generator Online',
    description: 'Instantly convert JSON objects or arrays into valid MySQL CREATE TABLE schemas. Automatically infer INT, VARCHAR, DATETIME, and JSON column types from payloads.',
    url: 'https://devtoolslabs.com/json-to-mysql',
  },
  alternates: {
    canonical: '/json-to-mysql',
  },
};

export default function JsonToMysqlPage() {
  return (
    <ToolLayout
      title="JSON to MySQL Schema Generator"
      intro="Architecting databases from third-party REST API payloads is tedious and error-prone. This tool automatically scans any complex JSON payload, infers the exact MySQL data types required (like VARCHAR(255), DATETIME, DECIMAL, or native JSON columns), and generates a deploy-ready `CREATE TABLE` script. 100% in your browser."
      toolNode={<JsonToMysqlTool />}
      howTo={[
        "Paste a sample JSON Array or Object into the left editor pane (or drag and drop a .json file).",
        "Configure the table name (defaults to 'users').",
        "Enable options to auto-inject Primary Keys (AUTO_INCREMENT id) or timestamps (created_at / updated_at) if needed.",
        "Adjust charset (utf8mb4 ensures modern emoji support) and DB Engine.",
        "Copy the generated SQL and execute it within your MySQL or MariaDB environment."
      ]}
      examples={[
        {
          input: '{\n  "id": 1,\n  "username": "admin",\n  "active": true,\n  "latest_login": "2026-03-15T12:00:00Z"\n}',
          output: 'CREATE TABLE `generated_table` (\n  `id` BIGINT NOT NULL AUTO_INCREMENT,\n  `username` VARCHAR(255) NULL,\n  `active` TINYINT(1) NULL,\n  `latest_login` DATETIME NULL,\n  PRIMARY KEY (`id`)\n) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;'
        }
      ]}
      useCases={[
        "Rapidly prototyping a legacy application backend by matching third-party API webhook data.",
        "Database migrations moving unstructured NoSQL document dumps into persistent Relational schemas.",
        "Creating boilerplate schema structures without manually writing out dozens of `VARCHAR` and `TIMESTAMP` columns."
      ]}
      faqs={[
        {
          question: "How does type inference work?",
          answer: "The tool analyzes JS primitive types. 'Booleans' map to TINYINT(1). 'Numbers' map to INT if whole, and DECIMAL(10,2) if floating-point. 'Strings' are tested against ISO date regexes to become DATE or DATETIME, otherwise they map to VARCHAR(255) (or TEXT if exceptionally long)."
        },
        {
          question: "Are nested objects supported?",
          answer: "Yes, modern MySQL supports NoSQL-like behavior with the native `JSON` column type. Any nested arrays or deep objects in your payload will be accurately mapped to a single JSON column definition."
        },
        {
          question: "Why default to utf8mb4?",
          answer: "utf8mb4 is the modern standard for MySQL. Unlike the legacy utf8 (which capped out at 3 bytes), utf8mb4 supports full 4-byte characters meaning it safely stores Emojis, mathematical symbols, and diverse alphabets without data corruption."
        }
      ]}
      relatedTools={[
        { name: "JSON to Go Structs", url: "/json-to-go" },
        { name: "JSON to TypeScript", url: "/json-to-typescript" },
        { name: "Mock JSON Generator", url: "/mock-json-generator" }
      ]}
    />
  );
}
