import type { Metadata } from 'next';
import ToolLayout from '@/components/ToolLayout';
import UrlEncodeDecodeTool from '@/components/tools/UrlEncodeDecodeTool';

export const metadata: Metadata = {
  title: 'URL Percent Encoder & Decoder (Free Online Tool) | Parse URIs',
  description: 'Instantly url-encode text or decode percentage encoded HTTP strings. Safely replace spaces with %20 and parse complex query parameters locally.',
};

export default function UrlEncodeDecodePage() {
  return (
    <ToolLayout
      title="URL Percent Encoder & Decoder"
      intro="URLs can only be sent over the Internet using the ASCII character set. If your tracking link or API endpoint contains spaces, emojis, or reserved characters (like & or ?), they must be mathematically translated into a valid percent-encoded format. This tool instantly drives bi-directional URL encoding completely in your local browser."
      toolNode={<UrlEncodeDecodeTool />}
      howTo={[
        "Select your operation via the top buttons: 'URL Encode' or 'URL Decode'.",
        "Paste your raw string or fully percent-encoded URI into the left box.",
        "The tool will instantly execute standard RFC 3986 encoding on your string.",
        "The converted output automatically appears on the right side. Click Copy to use it."
      ]}
      examples={[
        {
          input: 'hello world @ 2026',
          output: 'hello%20world%20%40%202026'
        },
        {
          input: 'https%3A%2F%2Fsite.com%2F%3Fq%3Dmy%20search',
          output: 'https://site.com/?q=my search'
        }
      ]}
      useCases={[
        "Preparing a complex JSON payload string to be passed securely as a URL query parameter without breaking the HTTP router.",
        "Decoding a massive Google Analytics or Facebook Pixel tracking URI to read the hidden UTM marketing tags.",
        "Sanitizing user input text (like a blog post title) to construct a safe, clickable URL slug parameter."
      ]}
      faqs={[
        {
          question: "Is this secure for API keys?",
          answer: "Yes. The encoding logic runs entirely via your browser's native JavaScript `encodeURIComponent()` engine. No data is sent over the network. Your sensitive tokens remain exclusively in your local device memory."
        },
        {
          question: "What is Percent (%) Encoding?",
          answer: "Percent-encoding is a mechanism defined in RFC 3986 for encoding information in a Uniform Resource Identifier (URI). When a character isn't allowed in a URL (like a space or an emoji), it's replaced by a '%' followed by its two-digit hexadecimal equivalent (e.g., a space becomes '%20')."
        },
        {
          question: "Why does it convert the + sign to a space during decoding?",
          answer: "In legacy HTML form submissions (application/x-www-form-urlencoded), spaces are historically converted into the '+' symbol instead of '%20'. Our decoder intelligently detects the '+' symbol and parses it back into a standard space character to ensure maximum compatibility."
        },
        {
          question: "Does it encode ALL characters?",
          answer: "Standard URL encoding ignores unreserved characters: alphabetic characters, decimal digits, hyphens, periods, underscores, and tildes. Everything else, including reserved delimiter characters like ':' and '/', is strictly percent-encoded."
        }
      ]}
      relatedTools={[
        { name: "URL Query Parser", url: "/query-parser" },
        { name: "HTML Entity Decoder", url: "/html-entity-decoder" }
      ]}
    />
  );
}
