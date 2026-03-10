import React from 'react';
import type { Metadata } from 'next';
import ToolLayout from '@/components/ToolLayout';
import HtmlEntityEncoderTool from '@/components/tools/HtmlEntityEncoderTool';

export const metadata: Metadata = {
  title: 'HTML Entity Encoder (Convert Special Characters Online)',
  description: 'Instantly convert symbols, brackets, and special characters into HTML entities (e.g., < to &lt;). Protect your site from XSS injections.',
};

export default function HtmlEntityEncoderPage() {
  return (
    <ToolLayout
      title="HTML Entity Encoder (Convert Special Characters Online)"
      intro="Need to display raw HTML tags, code snippets, or mathematical symbols on a web page? This HTML Entity Encoder converts characters like <, >, &, ' and &quot; into their corresponding safe HTML entities (&lt;, &gt;, &amp;). This ensures your text renders correctly inside the browser while protecting your application against Cross-Site Scripting (XSS) payload injection."
      toolNode={<HtmlEntityEncoderTool />}
      howTo={[
        "Type or paste your raw text, HTML snippet, or code block into the left input box.",
        "Click the 'Encode Entities' button to instantly convert the text.",
        "Watch as dangerous or reserved characters are transformed into safe HTML string literals.",
        "Click 'Copy Output' to grab the encoded string and paste it into your editor."
      ]}
      examples={[
        {
          input: "<h1>Alert</h1>",
          output: "&lt;h1&gt;Alert&lt;/h1&gt;"
        },
        {
          input: "Salt & Pepper",
          output: "Salt &amp; Pepper"
        },
        {
          input: 'const foo = "bar";',
          output: "const foo = &quot;bar&quot;;"
        }
      ]}
      useCases={[
        "Safely displaying inline code snippets `<pre><code>` on programming blogs or documentation sites.",
        "Encoding user-generated comments or markdown to prevent execution of XSS vulnerability payloads.",
        "Generating strict XML or RSS feed payloads that forbid reserved `<` and `&` characters.",
        "Creating secure templates in older server-side templating languages."
      ]}
      faqs={[
        {
          question: "What exactly is an HTML Entity?",
          answer: "An HTML entity is a piece of text (a string) that begins with an ampersand (&) and ends with a semicolon (;). They are universally used by web browsers to display reserved characters (which would otherwise be interpreted as HTML markup) or invisible characters (like non-breaking spaces)."
        },
        {
          question: "Why do I need to encode characters before putting them in HTML?",
          answer: "If you simply write <h1> in your standard HTML code, the browser thinks you are trying to create a Header element and will render large text. If you actually want the literal characters <h1> to visibly appear on the screen, you must encode the brackets as &lt;h1&gt;."
        },
        {
          question: "How does this tool process the encoding?",
          answer: "This tool utilizes the native DOM parser built directly into your web browser. This guarantees 100% accurate standard compliance because the browser engine itself is performing the translation. Absolutely no data is sent to a backend server."
        }
      ]}
      relatedTools={[
        {
          name: "HTML Entity Decoder",
          url: "/html-entity-decoder"
        },
        {
          name: "HTML Minifier",
          url: "/html-minifier"
        },
        {
          name: "Markdown Table Generator",
          url: "/markdown-table"
        }
      ]}
    />
  );
}
