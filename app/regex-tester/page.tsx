import type { Metadata } from 'next';
import ToolLayout from '@/components/ToolLayout';
import RegexTesterTool from '@/components/tools/RegexTesterTool';

export const metadata: Metadata = {
  title: 'Regex Tester & Extractor (Online Regular Expression Matcher)',
  description: 'Test, debug, and extract data using Regular Expressions (Regex). Safely debug PCRE and JavaScript regex patterns with live capture group extraction.',
  openGraph: {
    title: 'Regex Tester & Extractor (Online Regular Expression Matcher)',
    description: 'Test, debug, and extract data using Regular Expressions (Regex). Safely debug PCRE and JavaScript regex patterns with live capture group extraction.',
    url: 'https://devtoolslabs.com/regex-tester',
  },
  alternates: {
    canonical: '/regex-tester',
  },
};

export default function RegexTesterPage() {
  return (
    <ToolLayout
      title="Regex Match & Extract Tester (Free Online Standard Debugger)"
      intro="Working with complex Regular Expressions can feel like deciphering an alien language. Our Regex Tester helps you visually debug your patterns in real-time. Whether you are validating inputs or extracting specific capture groups from massive log files, this tool executes your regex instantly in the browser without sending your private test data to any server."
      toolNode={<RegexTesterTool />}
      howTo={[
        "Enter your Regular Expression pattern in the top input box (without the wrapping `/` slashes).",
        "Toggle your desired regex flags, such as 'g' (Global) or 'i' (Case Insensitive).",
        "Paste your sample text into the 'Test String' area.",
        "The tool will instantly evaluate the pattern and display all matches.",
        "Expand each match to view standard capture groups and named capture groups."
      ]}
      examples={[
        {
          input: 'Pattern: (?<username>\\w+)@(?<domain>[\\w.-]+)\nText: Contact support@example.com',
          output: "Match: support@example.com\nNamed Groups: { username: 'support', domain: 'example.com' }"
        }
      ]}
      useCases={[
        "Debugging complex Regex patterns before deploying them to production codebases.",
        "Extracting specific data points (like IP addresses or User IDs) from raw server access logs.",
        "Testing Named Capture Groups `(?<name>...)` to ensure API routing logic functions correctly.",
        "Validating that a regex accurately rejects negative edge-cases in form validation."
      ]}
      faqs={[
        {
          question: "Which Regex engine does this tool use?",
          answer: "This tool uses the native JavaScript RegExp engine built into your browser (V8 engine in Chrome/Edge, SpiderMonkey in Firefox). Because most modern languages (Python, PHP, Java) use standards based on PCRE, testing your patterns here is highly accurate across platforms."
        },
        {
          question: "What are Named Capture Groups?",
          answer: "Named capture groups allow you to assign a specific label to a portion of your regex match using the syntax `(?<name>pattern)`. Instead of referring to matched data by index (e.g., match[1]), you can refer to it by name (e.g., match.groups.name), making your code much easier to read and maintain."
        },
        {
          question: "Does my test data get saved?",
          answer: "No. Test strings (which often contain sensitive PII or proprietary logs) are processed entirely client-side. Your data never leaves your computer."
        },
        {
          question: "Why do I see 'Infinite loop' warnings?",
          answer: "If you construct a regex that can match a zero-length string (like `.*` without boundaries) while the global flag ('g') is active, the engine could freeze. We automatically detect and step over zero-length global matches to protect your browser from crashing."
        },
        {
          question: "What is the 's' (Dot All) flag?",
          answer: "By default, the dot (`.`) character in regex matches any character EXCEPT line breaks. Enabling the 's' flag changes this behavior, forcing the dot to match absolutely everything, including newlines (\\n or \\r). This is vital when parsing multi-line HTML or JSON data."
        }
      ]}
      relatedTools={[
        { name: "Regex Generator", url: "/regex-generator" },
        { name: "Regex Replace", url: "/regex-replace" },
        { name: "JSON Validator", url: "/json-validator" }
      ]}
    />
  );
}
