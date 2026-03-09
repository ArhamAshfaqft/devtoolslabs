import type { Metadata } from 'next';
import ToolLayout from '@/components/ToolLayout';
import QueryParserTool from '@/components/tools/QueryParserTool';

export const metadata: Metadata = {
  title: 'URL Query String Parser (Free Online Tool) | Decode Instantly',
  description: 'Instantly parse and decode complex URL query strings into a readable table. 100% free, client-side, and secure. Best developer tool.',
};

export default function QueryParserPage() {
  return (
    <ToolLayout
      title="URL Query String Parser"
      intro="Working with long, encoded URL parameters can be messy. Paste any URL or raw query string into this tool to instantly decode it and break it down into a clean, easy-to-read table. Process runs entirely in your browser safely."
      toolNode={<QueryParserTool />}
      howTo={[
        "Copy your full URL or just the query string part (e.g., ?utm_source=google&utm_medium=cpc).",
        "Paste it into the input area above.",
        "The tool will instantly parse the parameters and display them in a structured table below.",
        "Values are decoded automatically (e.g., %20 becomes a space)."
      ]}
      examples={[
        {
          input: 'https://example.com/shop?product_id=8821&category=shoes&sort=price_asc',
          output: 'product_id: 8821\ncategory: shoes\nsort: price_asc'
        },
        {
          input: '?utm_source=newsletter&utm_campaign=summer_sale_2026',
          output: 'utm_source: newsletter\nutm_campaign: summer_sale_2026'
        }
      ]}
      useCases={[
        "Analyzing tracking parameters (UTM tags) on marketing links.",
        "Debugging API GET request URLs to verify expected parameters are being sent.",
        "Decoding complex search filters copied from a web browser address bar.",
        "Reading heavily encoded OAuth redirect URLs."
      ]}
      faqs={[
        {
          question: "How does the parser handle repeating keys (array parameters)?",
          answer: "When a URL query string contains multiple parameters with the exact same key (e.g., ?filter=red&filter=blue), our parser detects them and displays each distinct key-value pair as a separate row in the table, perfectly mirroring how backend languages like PHP or Node.js interpret array parameters."
        },
        {
          question: "Does it decode URL-encoded characters like %20 and %40?",
          answer: "Yes. URL parameters are often heavily encoded (e.g., %20 for a space, %40 for an '@' symbol, or %2B for a plus). The parser utilizes standard JavaScript URLSearchParams to properly decode RFC 3986 percentage-encoded formats into readable plain text."
        },
        {
          question: "How do I extract UTM parameters using this tool?",
          answer: "Simply paste the entire tracking link (e.g., https://site.com/?utm_source=google&utm_medium=cpc&utm_campaign=summer_sale) into the tool. It instantly segregates the base URL from the query and isolates your utm_source, utm_medium, and other UTM tags into an easy-to-read table for analysis."
        },
        {
          question: "Why do some parameters have no value (empty output)?",
          answer: "In a query string, a parameter can exist simply as a flag. For example, in the URL '?debug=&force_refresh', the 'debug' key has an empty value, and 'force_refresh' is just a top-level key. Our tool accurately displays these as valid keys with an empty corresponding value."
        },
        {
          question: "Can this parse hash fragments (#) alongside query strings?",
          answer: "Standard query strings (?) must appear before hash fragments (#) in a valid URI. If you paste a URL like '?session=123#analytics', standard parsers will consider the # as the end of the query string. Our tool follows native URI specifications, ensuring only the exact backend-received query string is parsed."
        }
      ]}
      relatedTools={[
        { name: "JSON Escape", url: "/json-escape-unescape" },
        { name: "HTML Entity Decoder", url: "/html-entity-decoder" }
      ]}
    />
  );
}
