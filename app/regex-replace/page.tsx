import type { Metadata } from 'next';
import ToolLayout from '@/components/ToolLayout';
import RegexReplaceTool from '@/components/tools/RegexReplaceTool';

export const metadata: Metadata = {
  title: 'Regex Replace Tester (Free Online Tool) | Interactive Simulator',
  description: 'Test Javascript regular expression replacements dynamically. Simulate String.replace() with capture groups, global flags, and real-time previews instantly.',
};

export default function RegexReplacePage() {
  return (
    <ToolLayout
      title="Regex Replace Tester"
      intro="Stop guessing if your Regex replacement logic works. This tool perfectly simulates the JavaScript String.replace() method inside the browser. Type your expression, define your capture groups, and watch the output text update instantaneously."
      toolNode={<RegexReplaceTool />}
      howTo={[
        "Type your target text into the 'Test String' box on the left.",
        "Enter your Regular Expression pattern and specific flags (like 'g' for global or 'i' for case-insensitive).",
        "Type your replacement logic. You can use standard string replacements or JavaScript capture group syntax (e.g., $1 or $2).",
        "The Result box on the right will instantly reflect the simulated output."
      ]}
      examples={[
        {
          input: 'Regex: (Hello) (World)\nReplace: $2 $1\nText: Hello World',
          output: 'World Hello'
        },
        {
          input: 'Regex: \\d+\nReplace: [REDACTED]\nText: Phone: 5551234',
          output: 'Phone: [REDACTED]'
        }
      ]}
      useCases={[
        "Debugging complex capture group swaps (e.g., reformatting dates from MM-DD-YYYY to YYYY-MM-DD).",
        "Validating data sanitization scripts before deploying them to a backend Node.js server.",
        "Testing regex boundary flags and multi-line matching behavior.",
        "Learning and visualizing how different regex flags (g, m, i, u) alter replacement outcomes."
      ]}
      faqs={[
        {
          question: "Which Regex engine does this tool use?",
          answer: "This tool runs entirely in your browser using the native ECMAScript (JavaScript) Regular Expression engine. It behaves exactly like calling .replace() in a Node.js or browser environment."
        },
        {
          question: "How do I reference capture groups in the replacement?",
          answer: "You can reference capture groups identically to JavaScript syntax using the dollar sign. $1 refers to the first captured group in parentheses, $2 refers to the second, and $& references the entire matched substring."
        },
        {
          question: "What does the 'g' flag do in a replacement?",
          answer: "The 'g' (global) flag forces the regex engine to replace every single occurrence of the pattern in the string. Without it, the engine will stop and return after making only the very first matched replacement."
        },
        {
          question: "Why isn't my negative lookbehind working?",
          answer: "Lookbehinds (e.g., (?<=a)b) are supported in modern JavaScript engines (V8, SpiderMonkey), meaning they will work in this tool on all modern browsers. However, if you are testing here but deploying to an older environment (like legacy Safari), the regex might fail in production."
        },
        {
          question: "Is this safe for testing sensitive strings?",
          answer: "Yes. All pattern matching and text parsing occurs locally in your device's memory. The test strings and regex patterns are never submitted over a network, making it completely safe for proprietary logs or PII."
        }
      ]}
      relatedTools={[
        { name: "JSON Escape", url: "/json-escape-unescape" },
        { name: "JWT Validator", url: "/jwt-validator" }
      ]}
    />
  );
}
