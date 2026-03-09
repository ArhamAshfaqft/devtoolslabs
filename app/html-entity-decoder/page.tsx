import type { Metadata } from 'next';
import ToolLayout from '@/components/ToolLayout';
import HtmlEntityDecoderTool from '@/components/tools/HtmlEntityDecoderTool';

export const metadata: Metadata = {
  title: 'HTML Entity Encoder & Decoder (Free Online Tool) | Convert Instantly',
  description: 'Convert safe HTML entities back to characters, or encode characters into HTML entities safely and instantly in your browser.',
};

export default function HtmlEntityDecoderPage() {
  return (
    <ToolLayout
      title="HTML Entity Encoder & Decoder"
      intro="Easily translate confusing HTML entities (like &amp;lt; or &amp;quot;) back into their actual readable characters, or secure your text by converting standard characters into HTML entities to prevent XSS (Cross-Site Scripting) attacks."
      toolNode={<HtmlEntityDecoderTool />}
      howTo={[
        "Type or paste your text into the input field above.",
        "Click 'Decode Entities' to translate entities like '&lt;div&gt;' back into '<div>'.",
        "Click 'Encode to Entities' to convert regular HTML tags into their safe entity representation.",
        "Click the copy button to copy the transformed output to your clipboard."
      ]}
      examples={[
        {
          input: '&lt;script&gt;alert(1)&lt;/script&gt;',
          output: '<script>alert(1)</script>'
        },
        {
          input: 'John & Doe "The Brothers"',
          output: 'John &amp; Doe &quot;The Brothers&quot;'
        }
      ]}
      useCases={[
        "Sanitizing user input to prevent XSS vulnerabilities before saving to a database.",
        "Reading raw HTML source code that has been escaped in JSON payloads.",
        "Displaying raw HTML or XML code snippets safely on a webpage via encoding.",
        "Extracting readable text from a scraped web page."
      ]}
      faqs={[
        {
          question: "What is the difference between HTML escaping and URL encoding?",
          answer: "HTML escaping converts special characters into Entities (like &lt; for <) specifically so the browser doesn't execute them as HTML tags. URL encoding (or percent-encoding) converts unsafe characters into hex codes (like %20 for space) specifically so they can be safely transmitted over HTTP inside a web address."
        },
        {
          question: "Which characters are absolutely necessary to encode for security?",
          answer: "To prevent XSS (Cross-Site Scripting), you must encode at least five critical characters before injecting user input into an HTML document: the ampersand (& → &amp;), less-than (< → &lt;), greater-than (> → &gt;), double quote (\" → &quot;), and single quote (' → &#x27;)."
        },
        {
          question: "How does the browser natively decode HTML entities?",
          answer: "Our tool utilizes an ultra-safe native browser technique: it creates an invisible text node in memory, assigns the encoded text to its innerHTML, and then safely extracts the textContent. This ensures 100% accuracy with every single esoteric named or numeric HTML entity recognized by modern browsers."
        },
        {
          question: "What is the difference between named, decimal, and hex entities?",
          answer: "A single character can be encoded three ways. For the copyright symbol (©), the named entity is &copy;, the decimal numeric reference is &#169;, and the hexadecimal reference is &#xA9;. All three methods are valid and perfectly decoded by this tool."
        },
        {
          question: "Will decoding HTML entities execute external scripts?",
          answer: "No. Our decoder processes the text within an inert sandbox, completely detached from the live DOM (Document Object Model). Even if you decode an entity representing a malicious <script> tag, it is treated strictly as plain text, ensuring your browser remains completely secure."
        }
      ]}
      relatedTools={[
        { name: "JSON Escape", url: "/json-escape-unescape" },
        { name: "Markdown Table Generator", url: "/markdown-table" }
      ]}
    />
  );
}
