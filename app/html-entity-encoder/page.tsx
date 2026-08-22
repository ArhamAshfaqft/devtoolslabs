import type { Metadata } from 'next';
import ToolLayout from '@/components/ToolLayout';
import HtmlEntityEncoderTool from '@/components/tools/HtmlEntityEncoderTool';

export const metadata: Metadata = {
  title: 'HTML Entity Encoder – Escape HTML Characters Online',
  description: 'Encode reserved HTML characters into safe named or numeric entities directly in your browser. Free client-side HTML escaping tool.',
  alternates: { canonical: '/html-entity-encoder' },
  openGraph: {
    title: 'HTML Entity Encoder – Escape HTML Characters Online',
    description: 'Convert reserved characters into HTML entities locally in your browser.',
    url: 'https://www.devtoolslabs.com/html-entity-encoder',
  },
};

export default function HtmlEntityEncoderPage() {
  return (
    <ToolLayout
      title="HTML Entity Encoder"
      intro="Convert reserved characters such as ampersands, angle brackets, and quotation marks into HTML entities. This is useful when displaying markup as text or preparing content for an HTML context."
      toolNode={<HtmlEntityEncoderTool />}
      howTo={[
        'Paste the text or markup you want to encode.',
        'Choose the available encoding option when needed.',
        'Run the encoder and inspect the converted entity output.',
        'Copy the encoded value into the intended HTML context.',
      ]}
      examples={[{ input: '<button title="Save & close">', output: '&lt;button title=&quot;Save &amp; close&quot;&gt;' }]}
      useCases={[
        'Displaying HTML source code as visible text.',
        'Escaping reserved characters in documentation examples.',
        'Preparing text for insertion into an HTML text context.',
      ]}
      faqs={[
        { question: 'Does entity encoding make all HTML safe?', answer: 'No. Correct escaping depends on context. Attribute, URL, CSS, and JavaScript contexts can require different security controls.' },
        { question: 'Is the input sent to a server?', answer: 'No. Encoding runs locally in your browser.' },
      ]}
      relatedTools={[
        { name: 'HTML to JSX', url: '/html-to-jsx' },
        { name: 'HTML to Markdown', url: '/html-to-markdown' },
        { name: 'URL Encode/Decode', url: '/url-encode-decode' },
      ]}
    />
  );
}
