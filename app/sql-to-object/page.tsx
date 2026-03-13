import type { Metadata } from 'next';
import ToolLayout from '@/components/ToolLayout';
import SqlToObjectTool from '@/components/tools/SqlToObjectTool';

export const metadata: Metadata = {
  title: 'SQL to TypeScript & JSON Generator (Free Online Tool) | Pro Backend Utility',
  description: 'Instantly convert SQL CREATE TABLE statements into TypeScript interfaces or JSON objects. Bridge the gap between your database schema and frontend data models securely.',
};

export default function SqlToObjectPage() {
  return (
    <ToolLayout
      title="SQL Schema to TypeScript & JSON Converter"
      intro="Manually mapping database tables to frontend models is a frequent pain point for full-stack developers. Paste your SQL 'CREATE TABLE' definition to instantly generate clean, type-safe TypeScript interfaces or sample JSON payloads for your API mocks."
      toolNode={<SqlToObjectTool />}
      howTo={[
        "Paste your SQL 'CREATE TABLE' statement into the left input box.",
        "Select your desired output format: 'TYPESCRIPT' or 'JSON OBJECT'.",
        "The tool parses your column names and types into the corresponding language formats.",
        "Click 'Copy' to use the generated code directly in your project."
      ]}
      examples={[
        {
          input: "CREATE TABLE users (id INT, name VARCHAR(50));",
          output: "interface SqlResult {\n  id: number;\n  name: string;\n}"
        }
      ]}
      useCases={[
        "Quickly building DTOs (Data Transfer Objects) for Node.js backends based on existing SQL schemas.",
        "Generating mock JSON data for frontend development that matches the database structure.",
        "Standardizing documentation between database administrators and frontend engineers."
      ]}
      faqs={[
        {
          question: "Which SQL dialects are supported?",
          answer: "Our parser is designed for standard SQL 'CREATE TABLE' syntax used in PostgreSQL, MySQL, SQL Server, MariaDB, and SQLite."
        },
        {
          question: "How does it determine types?",
          answer: "The engine maps SQL numeric types (INT, DECIMAL, BIGINT) to 'number', string types (VARCHAR, TEXT, CHAR) to 'string', and boolean types to 'boolean'. Any unknown types or complex BLOBs default to 'any'."
        },
        {
          question: "Can it handle primary keys and constraints?",
          answer: "The current version focuses on mapping column names and data types. Constraints like PRIMARY KEY, NOT NULL, or UNIQUE are parsed to ensure valid mapping but do not affect the basic TypeScript definition."
        },
        {
          question: "Is this tool safe for production DB schemas?",
          answer: "Yes. Like all tools on DevToolsLabs, processing is 100% client-side. Your database architecture and sensitive table names never touch our servers."
        },
        {
          question: "Does it support nested JSON columns?",
          answer: "If your SQL dialect uses JSON or JSONB types, the generator will currently map them as 'any' or an empty object. You can then use our JSON to TypeScript tool to further refine those specific sub-interfaces."
        }
      ]}
      relatedTools={[
        { name: "SQL Formatter", url: "/sql-formatter" },
        { name: "JSON to TypeScript", url: "/json-to-typescript" },
        { name: "JSON Validator", url: "/json-validator" }
      ]}
    />
  );
}
