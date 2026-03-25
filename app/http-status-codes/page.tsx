import React from 'react';
import type { Metadata } from 'next';
import ToolLayout from '@/components/ToolLayout';
import HttpStatusWizardTool from '@/components/tools/HttpStatusWizardTool';

export const metadata: Metadata = {
  title: 'HTTP Status Codes Wizard: Interactive Reference & Guide | DevToolsLabs',
  description: 'Search, filter, and understand every HTTP status code (1xx to 5xx). An interactive reference hub with detailed explanations for developers and API designers.',
  openGraph: {
    title: 'HTTP Status Codes Wizard: Interactive Reference & Guide | DevToolsLabs',
    description: 'Search, filter, and understand every HTTP status code (1xx to 5xx). An interactive reference hub with detailed explanations for developers and API designers.',
    url: 'https://devtoolslabs.com/http-status-codes',
  },
  alternates: {
    canonical: '/http-status-codes',
  },
};

export default function HttpStatusWizardPage() {
  return (
    <ToolLayout
      title="HTTP Status Codes Wizard"
      intro="Navigate the world of HTTP response codes with our interactive search and filter engine. Perfect for debugging APIs and understanding server behavior."
      toolNode={<HttpStatusWizardTool />}
      howTo={[
        "Search for a specific code or name in the search bar",
        "Use the category filters to narrow down by response type",
        "View detailed descriptions for each status code"
      ]}
      examples={[
        { input: "404", output: "Not Found - The resource could not be located." },
        { input: "201", output: "Created - A new resource has been successfully created." }
      ]}
      useCases={[
        "Designing RESTful APIs",
        "Debugging server-side response logic",
        "Learning web protocol standards"
      ]}
      faqs={[
        {
          question: "What are the 5 categories of HTTP status codes?",
          answer: "HTTP status codes are divided into: 1xx (Informational), 2xx (Success), 3xx (Redirection), 4xx (Client Error), and 5xx (Server Error)."
        },
        {
          question: "What is the difference between 401 and 403?",
          answer: "401 Unauthorized means the user is not authenticated. 403 Forbidden means the user is authenticated but does not have the necessary permissions for the resource."
        },
        {
          question: "When should I use a 204 No Content status?",
          answer: "Use 204 when the server successfully processed the request, but there is no requirement to return any data in the response body (common for DELETE or successful UPDATE operations)."
        }
      ]}
      relatedTools={[
        { name: "HTTP Header Parser", url: "/http-header-parser" },
        { name: "JSON Validator", url: "/json-validator" }
      ]}
    >
      <section className="mt-12 prose prose-slate max-w-none">
        <h2>Expert API Design Tip</h2>
        <p>
          Always choose the most specific status code possible. While a <code>400 Bad Request</code> is technically correct for many errors, using a <code>422 Unprocessable Entity</code> or <code>409 Conflict</code> provides much better context to the client developing against your API.
        </p>
      </section>
    </ToolLayout>
  );
}
