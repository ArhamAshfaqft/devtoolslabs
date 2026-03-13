import type { Metadata } from 'next';
import ToolLayout from '@/components/ToolLayout';
import UrlEncodeDecodeTool from '@/components/tools/UrlEncodeDecodeTool';

export const metadata: Metadata = {
  title: 'URL Decoder (Free Online Percent-Decoding Tool) | RFC 3986',
  description: 'Instantly decode percent-encoded URLs and percentage strings. Convert %20 back to spaces and parse complex tracking URIs safely in your browser.',
};

export default function UrlDecoderPage() {
  return (
    <ToolLayout
      title="URL Decoder (Decode Percent-Encoded Strings)"
      intro="Ever wondered what those messy %20 and %3F characters in your address bar actually mean? Our URL Decoder translates percent-encoded strings back into readable human text. Essential for debugging tracking pixels, marketing URLs, and API responses."
      toolNode={<UrlEncodeDecodeTool defaultMode="decode" />}
      howTo={[
        "Paste your percent-encoded URL or string into the left input box.",
        "The tool automatically detects and reverses RFC 3986 encoding.",
        "Intelligent logic detects '+' symbols and converts them to standard spaces.",
        "Your clear, readable output is generated instantly on the right."
      ]}
      examples={[
        {
          input: 'https%3A%2F%2Fsite.com%2F%3Fq%3Dmy%20search',
          output: 'https://site.com/?q=my search'
        }
      ]}
      useCases={[
        "Decoding massive Google Analytics or Facebook Pixel tracking URIs to audit marketing tags.",
        "Debugging API error logs that contain encoded request payloads.",
        "Converting legacy form-submit data (where spaces are '+') back into standard text."
      ]}
      faqs={[
        {
          question: "Why does my URL have %20 in it?",
          answer: "URLs cannot contain literal spaces. The '%20' is the hexadecimal code for a space character. Decoding it returns the original space."
        },
        {
          question: "Can this decode malformed URLs?",
          answer: "If the URL is significantly corrupted, the browser's decoding engine might throw an error. Our tool identifies these issues and alerts you if the string cannot be safely parsed."
        },
        {
            question: "Does it handle the '+' sign?",
            answer: "Yes. Our decoder is optimized for web standards and correctly interprets the '+' symbol as a space, which is common in many legacy URL formats."
        }
      ]}
      relatedTools={[
        { name: "URL Encoder", url: "/url-encoder" },
        { name: "URL Query Parser", url: "/query-parser" }
      ]}
    />
  );
}
