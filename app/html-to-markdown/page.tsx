import React from 'react';
import ToolLayout from '@/components/ToolLayout';
import HtmlToMarkdownTool from '@/components/tools/HtmlToMarkdownTool';

export const metadata = {
  title: 'HTML to Markdown Converter | Free Online Developer Tool',
  description: 'Instantly convert raw HTML code to standard Markdown. 100% free, runs locally in your browser with zero latency. Built by developers.',
  keywords: 'html to markdown, convert html to md, html to markdown converter, markdown generator, html parser',
  openGraph: {
    title: 'HTML to Markdown Converter | Free Online Developer Tool',
    description: 'Instantly convert raw HTML code to standard Markdown. 100% free, runs locally in your browser with zero latency.',
    type: 'website',
  },
};

export default function HtmlToMarkdownPage() {
  return (
    <ToolLayout
      title="HTML to Markdown Converter"
      intro="Convert raw HTML into clean, standard Markdown structure instantly. Configure heading styles, bullet types, and code block formatting. Operates 100% in your browser for maximum security and speed."
      toolNode={<HtmlToMarkdownTool />}
      howTo={[
        "Paste your raw HTML code into the left editor.",
        "Adjust the Markdown styles (Heading format, Bullets, Code Block) from the configuration bar above the editor.",
        "The transpiled Markdown will appear instantly in the right editor.",
        "Click 'Copy Markdown' to copy the result to your clipboard."
      ]}
      examples={[
        {
          input: '<h1>Title</h1>\\n<p>Hello <strong>World</strong></p>',
          output: '# Title\\n\\nHello **World**'
        },
        {
          input: '<ul>\\n  <li>Item 1</li>\\n  <li>Item 2</li>\\n</ul>',
          output: '- Item 1\\n- Item 2'
        }
      ]}
      useCases={[
        "Migrating old blog posts from a rich-text CMS (like WordPress) to a modern static Markdown format.",
        "Extracting content from HTML documentation.",
        "Converting scraped web pages into readable Markdown notes."
      ]}
      faqs={[
        {
          question: "Does this handle complex inline styles?",
          answer: "No, Markdown is a structural language. Inline CSS styles (colors, font-sizes) are stripped during conversion, but structural elements (bold, italic, links, lists) are converted perfectly."
        },
        {
          question: "Is my HTML data sent to a server?",
          answer: "No. The entire conversion process happens locally in your browser using the Turndown engine. No data is transmitted."
        }
      ]}
      relatedTools={[
        { name: 'Markdown to HTML', url: '/markdown-to-html' },
        { name: 'HTML Minifier', url: '/html-minifier' },
        { name: 'HTML Decoder', url: '/html-entity-decoder' },
        { name: 'JSON Formatter', url: '/json-formatter' }
      ]}
      codeSnippets={[
        {
          language: 'Node.js',
          code: `// Install: npm install turndown
const TurndownService = require('turndown');

const html = '<h1>Hello World</h1>';
const turndownService = new TurndownService({ headingStyle: 'atx' });

const markdown = turndownService.turndown(html);
console.log(markdown); // # Hello World`
        },
        {
          language: 'Python',
          code: `# Install: pip install html2text
import html2text

html = '<h1>Hello World</h1>\\n<p>This is a test.</p>'
text_maker = html2text.HTML2Text()
text_maker.ignore_links = False
text_maker.bypass_tables = False

markdown = text_maker.handle(html)
print(markdown)

# Output:
# # Hello World
#
# This is a test.`
        },
        {
          language: 'PHP',
          code: `// Install: composer require league/html-to-markdown
use League\\HTMLToMarkdown\\HtmlConverter;

$html = '<h1>Hello World</h1>';
$converter = new HtmlConverter();

$markdown = $converter->convert($html);
echo $markdown; // # Hello World`
        }
      ]}
    />
  );
}
