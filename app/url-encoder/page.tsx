import type { Metadata } from 'next';
import ToolLayout from '@/components/ToolLayout';
import UrlEncodeDecodeTool from '@/components/tools/UrlEncodeDecodeTool';

export const metadata: Metadata = {
  title: 'URL Encoder (Free Online Percent-Encoding Tool) | ASCII Transliteration',
  description: 'Instantly convert reserve characters and emojis into RFC 3986 percent-encoded strings. Safely replace spaces with %20 and prepare URLs for API transmission.',
  openGraph: {
    title: 'URL Encoder (Free Online Percent-Encoding Tool) | ASCII Transliteration',
    description: 'Instantly convert reserve characters and emojis into RFC 3986 percent-encoded strings. Safely replace spaces with %20 and prepare URLs for API transmission.',
    url: 'https://devtoolslabs.com/url-encoder',
  },
  alternates: {
    canonical: '/url-encoder',
  },
};

export default function UrlEncoderPage() {
  return (
    <ToolLayout
      title="URL Encoder (Percent-Encode Strings Online)"
      intro="Web browsers can only process URLs using the ASCII character set. If your link contains special characters or emojis, they must be mathematically translated into a valid percent-encoded format. Use our professional-grade URL Encoder to sanitize your strings locally."
      toolNode={<UrlEncodeDecodeTool defaultMode="encode" />}
      howTo={[
        "Type or paste the raw string you want to encode into the left text area.",
        "The tool instantly applies encodeURIComponent logic to your input.",
        "Your sanitized, ASCII-safe URL string appears immediately in the right box.",
        "Click 'Copy' to use the encoded string in your code or browser address bar."
      ]}
      examples={[
        {
          input: 'hello world @ devtoolslabs',
          output: 'hello%20world%20%40%20devtoolslabs'
        }
      ]}
      useCases={[
        "Encoding tracking parameters that contain spaces or special characters for marketing campaigns.",
        "Sanitizing user-generated text to be used as a URL slug in a CMS.",
        "Preparing complex JSON strings to be passed as a query parameter in a GET request."
      ]}
      faqs={[
        {
          question: "What is URL encoding?",
          answer: "URL encoding, also known as percent-encoding, replaces non-ASCII characters with a '%' followed by their hexadecimal value. This ensures that the URL remains valid when sent over the internet."
        },
        {
          question: "Which characters are encoded?",
          answer: "Characters like spaces, ampersands (&), question marks (?), and slashes (/) are encoded because they have special meaning in URLs. Standard letters and numbers are usually left as-is."
        },
        {
            question: "Is this encoder safe for private data?",
            answer: "Yes. The encoding happens entirely on your device using native browser APIs. No data is ever sent to our servers."
        }
      ]}
      relatedTools={[
        { name: "URL Decoder", url: "/url-decoder" },
        { name: "URL Query Parser", url: "/query-parser" }
      ]}
    />
  );
}
