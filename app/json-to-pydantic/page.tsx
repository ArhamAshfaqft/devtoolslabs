import React from 'react';
import ToolLayout from '@/components/ToolLayout';
import JsonToPydanticTool from '@/components/tools/JsonToPydanticTool';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'JSON to Python Pydantic Models | Free Online Code Generator',
  description: 'Instantly generate Python Pydantic V2 models from JSON payloads. Automatic type inference, nested classes, and Field aliases for invalid identifiers.',
  keywords: ['json to pydantic', 'pydantic generator', 'json to python', 'pydantic v2', 'json schema to pydantic', 'python typing module generator'],
  alternates: {
    canonical: 'https://www.devtoolslabs.com/json-to-pydantic',
  },
  openGraph: {
    title: 'JSON to Python Pydantic Models | Free Online Code Generator',
    description: 'Instantly generate Python Pydantic V2 models from JSON payloads. Automatic type inference, nested classes, and Field aliases for invalid identifiers.',
    url: 'https://devtoolslabs.com/json-to-pydantic',
  },
};

export default function JsonToPydanticPage() {
  return (
    <ToolLayout
      title="JSON to Pydantic Model Generator"
      toolNode={<JsonToPydanticTool />}
      intro="When building modern Python APIs with frameworks like FastAPI, validating request and response payloads using Pydantic is the industry standard. However, manually transcribing large, deeply nested JSON examples into Python classes is tedious and error-prone. Our JSON to Pydantic Generator automates this process entirely in your browser. It recursively parses your JSON, infers standard Python types (str, int, float, bool, List), creates discrete sub-classes for nested objects, and automatically assigns Field(alias='...') decorators to JSON keys that are invalid Python variable names (like 'my-key' or '@id')."
      howTo={[
        "Copy your JSON payload (from an API response, Postman, or a log file).",
        "Paste the JSON into the input area on the left.",
        "Optionally change the 'Root Class' name to match your specific domain model (e.g., 'UserResponse').",
        "The generated Python code will appear instantly on the right, fully typed and ready to use.",
        "Copy the output and paste it directly into your Python / FastAPI project."
      ]}
      examples={[
        {
          input: "{\n  \"users\": [\n    {\n      \"id\": 1,\n      \"name\": \"Alice\"\n    }\n  ]\n}",
          output: "class UsersItem(BaseModel):\n    id: int\n    name: str\n\nclass RootModel(BaseModel):\n    users: List[UsersItem]"
        },
        {
          input: "{\n  \"first-name\": \"Bob\",\n  \"@id\": 1024\n}",
          output: "class RootModel(BaseModel):\n    first_name: str = Field(..., alias=\"first-name\")\n    _id: int = Field(..., alias=\"@id\")"
        }
      ]}
      useCases={[
        "Rapidly scaffolding FastAPI request/response models from third-party API documentation.",
        "Converting complex JSON configuration files into strictly validated Python settings objects.",
        "Building data ingestion pipelines that require strict schema enforcement via Python typing.",
        "Migrating unstructured Python dictionaries to structured Pydantic models for better IDE autocomplete and type safety."
      ]}
      faqs={[
        {
          question: "Does this generate Pydantic V1 or V2 code?",
          answer: "The generated code is fully compatible with Pydantic V2. It uses modern type hints from the standard `typing` module (like `List`, `Optional`, `Any`) and standard `BaseModel` inheritance."
        },
        {
          question: "How does it handle arrays of mixed types?",
          answer: "Currently, our Type Inference Engine inspects the first element of an array to determine the type (e.g., `List[str]`, `List[ItemModel]`). For highly polymorphic arrays, you may need to manually adjust the output to use `Union`."
        },
        {
          question: "What happens if a field is missing in some objects?",
          answer: "If you provide an array of objects, the generator analyzes all objects. If a key is present in some objects but missing in others, the generator automatically marks that property as `Optional[...]` with a default value of `None`."
        },
        {
          question: "Is my JSON data kept private?",
          answer: "Yes, 100%. The JSON parsing and Pydantic code generation happen entirely within your browser using JavaScript. Your JSON payloads are never transmitted to our servers."
        },
        {
          question: "Do I need any external dependencies to run this code?",
          answer: "You will need the `pydantic` package installed in your Python environment (`pip install pydantic`). The generated code also imports standard types from the built-in `typing` library."
        },
        {
          question: "Does it support nested array objects?",
          answer: "Yes. If an array contains objects, the tool generates a new BaseModel class (named dynamically based on the parent key) and assigns the type as `List[NewClassName]`."
        }
      ]}
      relatedTools={[
        { name: "JSON to TypeScript", url: "/json-to-typescript" },
        { name: "JSON to Go Structs", url: "/json-to-go" },
        { name: "JSON Schema Validator", url: "/json-validator" } // Will point to the generic validator or a new schema specific one
      ]}
    />
  );
}
