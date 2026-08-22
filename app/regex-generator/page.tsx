import type { Metadata } from 'next';
import ToolLayout from '@/components/ToolLayout';
import RegexGeneratorTool from '@/components/tools/RegexGeneratorTool';

export const metadata: Metadata = {
  title: 'Regex Generator – Build Regular Expressions Online',
  description: 'Build and copy regular expressions for common validation and text-matching tasks with an interactive, client-side regex generator.',
  alternates: { canonical: '/regex-generator' },
  openGraph: {
    title: 'Regex Generator – Build Regular Expressions Online',
    description: 'Create regular expressions interactively for common validation and matching tasks.',
    url: 'https://www.devtoolslabs.com/regex-generator',
  },
};

export default function RegexGeneratorPage() {
  return (
    <ToolLayout
      title="Regex Generator"
      intro="Build a regular expression without assembling every token by hand. Choose a common pattern, adjust flags and options, then copy the generated expression for use in JavaScript, forms, logs, and validation code."
      toolNode={<RegexGeneratorTool />}
      howTo={[
        'Choose the type of text or value you want to match.',
        'Adjust the available pattern settings and regular-expression flags.',
        'Review the generated expression and copy it into your application.',
        'Test it against representative valid and invalid inputs before production use.',
      ]}
      examples={[{ input: 'Match a basic email address', output: '/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/i' }]}
      useCases={[
        'Creating client-side validation patterns for forms.',
        'Generating starter expressions for log parsing and data cleanup.',
        'Learning how flags and common regex tokens affect a pattern.',
      ]}
      faqs={[
        { question: 'Does the generator send my text to a server?', answer: 'No. Pattern generation runs locally in your browser.' },
        { question: 'Should generated regexes be tested?', answer: 'Yes. Always test a pattern with realistic positive, negative, and edge-case inputs before relying on it.' },
      ]}
      relatedTools={[
        { name: 'JSON Formatter', url: '/json-formatter' },
        { name: 'HTTP Header Parser', url: '/http-header-parser' },
        { name: 'Regex Guide', url: '/guides/regex-explained' },
      ]}
    />
  );
}
