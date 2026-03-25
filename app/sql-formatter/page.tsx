import type { Metadata } from 'next';
import ToolLayout from '@/components/ToolLayout';
import SqlFormatterTool from '@/components/tools/SqlFormatterTool';

export const metadata: Metadata = {
  title: 'MySQL Beautifier & SQL Formatter (Free Online tool) | Minify SQL',
  description: 'The definitive online SQL beautifier. Format MySQL, PostgreSQL, and T-SQL in seconds. Supports SQL minification, keyword capitalization, and dialect optimization.',
  openGraph: {
    title: 'MySQL Beautifier & SQL Formatter (Free Online tool) | Minify SQL',
    description: 'The definitive online SQL beautifier. Format MySQL, PostgreSQL, and T-SQL in seconds. Supports SQL minification, keyword capitalization, and dialect optimization.',
    url: 'https://devtoolslabs.com/sql-formatter',
  },
  alternates: {
    canonical: '/sql-formatter',
  },
};

export default function SqlFormatterPage() {
  return (
    <ToolLayout
      title="MySQL Beautifier & SQL Formatter (Pro Database Utilities)"
      intro="Whether you are debugging complex JOINs or preparing a pull request, clean SQL is non-negotiable. Our Pro-grade SQL Formatter (and MySQL Beautifier) translates messy db logs into perfectly indented, standardized code. Now featuring built-in SQL Minification for production-ready query strings."
      toolNode={<SqlFormatterTool />}
      howTo={[
        "Choose your database engine (MySQL, Postgres, etc.) for dialect-aware parsing.",
        "Set your preferred casing (Industry standard is UPPERCASE keywords).",
        "Toggle 'Minify SQL' if you want to strip all comments and whitespace for production.",
        "Paste your raw query and instantly get the optimized result on the right."
      ]}
      examples={[
        {
          input: 'SELECT * FROM orders WHERE status=\'pending\' and total > 100 LIMIT 10;',
          output: 'SELECT\n  *\nFROM\n  orders\nWHERE\n  status = \'pending\'\n  AND total > 100\nLIMIT\n  10;'
        }
      ]}
      useCases={[
        "Beautifying massive MySQL queries extracted from slow-query logs.",
        "Minifying SQL strings to save bytes in backend configuration files.",
        "Fixing messy ORM-generated queries for better developer code reviews."
      ]}
      faqs={[
        {
          question: "Is this the best MySQL beautifier for large queries?",
          answer: "Yes. Our tool uses a recursive-descent parser that handles thousands of lines of SQL without freezing your browser. It specifically understands MySQL-exclusive backticks and comment styles."
        },
        {
          question: "How do I minify my SQL for production?",
          answer: "Simply paste your code and check the 'Minify SQL' box in the toolbar. Our engine will strip all single-line and block comments, collapse whitespace, and return a compact string optimized for performance."
        },
        {
          question: "Will formatting my SQL improve database performance?",
          answer: "While formatting itself doesn't change query execution time, beautified SQL is significantly easier to optimize. It helps you quickly spot missing indexes, redundant JOINs, or inefficient WHERE clauses that slow down your database."
        },
        {
            question: "Is my database schema safe?",
            answer: "Absolutely. 100% of the formatting logic happens locally in your browser. No SQL code, table names, or sensitive data ever leaves your device or touches our server."
        }
      ]}
      relatedTools={[
        { name: "JSON Formatter", url: "/json-formatter" },
        { name: "HTTP Header Parser", url: "/http-header-parser" }
      ]}
    >
        <section className="mt-12 prose prose-slate max-w-none border-t border-gray-100 pt-12">
            <h2>Why Professional Developers Use a SQL Beautifier</h2>
            <p>
                Database queries are the heart of most web applications, yet they are often the messiest part of the codebase. A <strong>SQL Formatter</strong> is not just about aesthetics; it is about maintainability and bug prevention.
            </p>
            <h3>1. MySQL & PostgreSQL Dialect Awareness</h3>
            <p>
                Generic formatters often break on dialect-specific syntax. Our <strong>MySQL Beautifier</strong> understands backticks, while our PostgreSQL mode correctly handles window functions and JSONB operators. Choosing the right dialect ensures your query remains valid after formatting.
            </p>
            <h3>2. Keyword Capitalization Standards</h3>
            <p>
                In a shared codebase, consistency is king. Standardizing keywords like <code>SELECT</code>, <code>FROM</code>, and <code>GROUP BY</code> into uppercase makes the query structure jump out at the reader, separating the SQL logic from your specific table and column names.
            </p>
            <h3>3. Identifying Inefficiencies</h3>
            <p>
                Minified, one-line SQL hides performance bottlenecks. By beautifying your query, you can easily trace the <strong>JOIN</strong> hierarchy and ensure your <strong>WHERE</strong> clauses are as restrictive as possible, preventing slow-query issues in high-traffic production environments.
            </p>
        </section>
    </ToolLayout>
  );
}
