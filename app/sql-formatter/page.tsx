import type { Metadata } from 'next';
import ToolLayout from '@/components/ToolLayout';
import SqlFormatterTool from '@/components/tools/SqlFormatterTool';

export const metadata: Metadata = {
  title: 'SQL Formatter – Beautify SQL Queries Online',
  description: 'Format and indent SQL queries for easier reading and debugging. Free client-side SQL beautifier with support for common dialects.',
  alternates: { canonical: '/sql-formatter' },
  openGraph: {
    title: 'SQL Formatter – Beautify SQL Queries Online',
    description: 'Format minified SQL into clean, readable queries directly in your browser.',
    url: 'https://www.devtoolslabs.com/sql-formatter',
  },
};

export default function SqlFormatterPage() {
  return (
    <ToolLayout
      title="SQL Formatter"
      intro="Turn compressed or inconsistently indented SQL into a readable query structure. Select the appropriate SQL dialect, format the query, and copy the result for reviews, debugging, or documentation."
      toolNode={<SqlFormatterTool />}
      howTo={[
        'Paste the SQL query into the input editor.',
        'Choose the SQL dialect that best matches your database.',
        'Format the query and review its clauses and indentation.',
        'Copy the formatted SQL back into your editor or documentation.',
      ]}
      examples={[{ input: 'select id,name from users where active=1 order by name;', output: 'SELECT\n  id,\n  name\nFROM users\nWHERE active = 1\nORDER BY name;' }]}
      useCases={[
        'Reviewing long SQL statements copied from application logs.',
        'Making queries easier to inspect during code review.',
        'Preparing readable SQL examples for documentation.',
      ]}
      faqs={[
        { question: 'Is my SQL uploaded?', answer: 'No. Formatting runs locally in your browser.' },
        { question: 'Does formatting change query behavior?', answer: 'Formatting is intended to change whitespace and presentation only, but you should still review the result before executing it.' },
      ]}
      relatedTools={[
        { name: 'JSON to MySQL Schema', url: '/json-to-mysql' },
        { name: 'JSON Formatter', url: '/json-formatter' },
        { name: 'SQL Best Practices', url: '/guides/sql-best-practices' },
      ]}
    />
  );
}
