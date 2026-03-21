import React from 'react';
import ToolLayout from '@/components/ToolLayout';
import JsonToGraphqlTool from '@/components/tools/JsonToGraphqlTool';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'JSON to GraphQL Schema Generator | Convert JSON to Types',
  description: 'Instantly convert deep JSON objects into strict GraphQL Schema Types (SDL). Safely generates perfectly nested Object Types, Ints, Floats, Strings, and Arrays completely offline.',
  keywords: ['json to graphql', 'graphql schema generator', 'json to sdl', 'graphql type builder', 'json schema to graphql', 'auto generate graphql types'],
  alternates: {
    canonical: 'https://www.devtoolslabs.com/json-to-graphql',
  },
};

export default function JsonToGraphqlPage() {
  return (
    <ToolLayout
      title="JSON to GraphQL Schema Generator"
      intro="Manually writing out nested `type` definitions for large GraphQL APIs is tedious and prone to human error when mapping primitive types. The JSON to GraphQL Converter completely eliminates this busywork by automatically transforming any massive JSON payload into a strict, production-ready GraphQL Schema Definition Language (SDL) architecture. It smartly maps decimal amounts to `Float`, whole numbers to `Int`, and recursively builds linked object definitions for nested data."
      toolNode={<JsonToGraphqlTool />}
      howTo={[
        "Set the 'Root Type Name' to reflect the overarching query object you are building (e.g., 'UserResponse' or 'MovieData').",
        "Paste your valid JSON payload into the left container.",
        "The GraphQL Schema generator instantly transpiles the object recursively on the right.",
        "Capitalization and data types are automatically casted: Numbers become `Int` or `Float`, arrays become `[Type]`, and nested objects spawn entirely new isolated `type` blocks.",
        "Click 'Copy Code' to safely transport the generated SDL directly to your Apollo Server, Prisma, or API codebase."
      ]}
      examples={[
        {
          input: "{\n  \"isActive\": true,\n  \"loginCount\": 12,\n  \"balance\": 12.50\n}",
          output: "type RootType {\n  isActive: Boolean\n  loginCount: Int\n  balance: Float\n}"
        },
        {
          input: "{\n  \"tags\": [\"react\", \"graphql\"]\n}",
          output: "type RootType {\n  tags: [String]\n}"
        }
      ]}
      useCases={[
        "Accelerating Backend-for-Frontend (BFF) development by generating GraphQL schemas matching a 3rd party REST API JSON response.",
        "Automatically generating strictly typed schemas when migrating a legacy MongoDB JSON database over to a strict GraphQL layer.",
        "Scaffolding Apollo Server schema code drastically faster by dumping mock JSON data into the generator."
      ]}
      faqs={[
        {
          question: "How does it know the difference between Int and Float?",
          answer: "The JavaScript engine inherently evaluates numbers in the JSON. If a parsed number cleanly passes the `Number.isInteger()` check (e.g., `42`), the generator assigns it the GraphQL `Int` scalar. If it has a decimal (e.g., `42.5`), it natively casts to the `Float` scalar."
        },
        {
          question: "How does the tool handle nested objects?",
          answer: "When it detects an internal JSON object, it takes the key name (e.g., 'profile'), capitalizes it to 'Profile' to match GraphQL's standard naming convention, and spawns a brand new `type Profile { ... }` block alongside the Root type. It then creates the linkage automatically."
        },
        {
          question: "What happens to empty arrays `[]` or null values?",
          answer: "Because GraphQL is strictly typed, it requires a fallback. If a JSON array is empty `[]` or a field is `null`, our parser defaults to safely typing them as `[String]` and `String` to prevent schema compilation errors."
        },
        {
          question: "Does my JSON data get sent to a backend server?",
          answer: "No. Your raw JSON string is securely parsed using your browser's local Virtual Machine. The data absolutely never leaves your local computer."
        }
      ]}
      relatedTools={[
        { name: "JSON to TypeScript Interfaces", url: "/json-to-typescript" },
        { name: "JSON to Go Structs", url: "/json-to-go" },
        { name: "JSON to Pydantic Models", url: "/json-to-pydantic" }
      ]}
    />
  );
}
