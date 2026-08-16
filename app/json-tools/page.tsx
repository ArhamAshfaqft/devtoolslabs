import type { Metadata } from 'next';
import CategoryHub from '@/components/CategoryHub';

export const metadata: Metadata = {
  title: 'JSON Tools | Format, Convert, Extract & Compare',
  description: 'Format, compare, extract, unescape, generate, and convert JSON locally with focused developer tools.',
  alternates: { canonical: '/json-tools' },
};

export default function JsonToolsHub() {
  return <CategoryHub
    title="JSON Utility Tools"
    intro="Inspect and transform JSON payloads with purpose-built utilities. Core JSON processing runs locally in your browser so application data stays on your device."
    tools={[
      { badge: '{ }', title: 'JSON Formatter', href: '/json-formatter', description: 'Beautify, validate, minify, and re-indent JSON payloads.' },
      { badge: '$.', title: 'JSON Data Extractor', href: '/json-extractor', description: 'Select deeply nested values with JSONPath and dot notation.' },
      { badge: 'DIFF', title: 'JSON Diff', href: '/json-diff', description: 'Compare two JSON documents with key-order-independent matching.' },
      { badge: 'XLSX', title: 'JSON to Excel', href: '/json-to-excel', description: 'Flatten nested JSON and export it as a native Excel workbook.' },
      { badge: 'YAML', title: 'JSON to YAML', href: '/json-to-yaml', description: 'Convert JSON into readable YAML for application configuration.' },
      { badge: 'SQL', title: 'JSON to MySQL', href: '/json-to-mysql', description: 'Infer MySQL column types and generate a CREATE TABLE schema.' },
      { badge: '\\', title: 'JSON Unescape', href: '/json-unescape', description: 'Remove escape layers from encoded JSON logs and strings.' },
      { badge: 'MOCK', title: 'Mock JSON Generator', href: '/mock-json-generator', description: 'Generate realistic test data from configurable field blueprints.' },
    ]}
  />;
}
