import type { Metadata } from 'next';
import ToolLayout from '@/components/ToolLayout';
import RegexReferenceTool from '@/components/tools/RegexReferenceTool';

export const metadata: Metadata = {
  title: 'Regex Searchable Reference | Library of Common Regex Patterns',
  description: 'A searchable database of standard Regular Expression patterns for email, IP addresses, phone numbers, and more. Copy production-ready regex strings for your code instantly.',
};

export default function RegexReferencePage() {
  return (
    <ToolLayout
      title="Regex Searchable Reference (Common Pattern Library)"
      intro="For developers, writing a regular expression from scratch is often a journey into 'regex hell'. Instead of wasting time debugging complex character classes, our Searchable Reference Hub provides a curated library of standard, battle-tested patterns. Whether you need to validate a strict V4 UUID, extract HTML tags from a string, or enforce complex password security rules, you can find and copy the exact expression you need in seconds."
      toolNode={<RegexReferenceTool />}
      howTo={[
        "Use the visual search bar above to type what you are trying to match (e.g., 'email' or 'hex').",
        "Browse the results across categories like Validation, System, and Frontend.",
        "Each pattern includes a detailed description explaining what it actually does under the hood.",
        "Click 'Copy Pattern' to save the raw string to your clipboard.",
        "Paste the expression into your project's `.test()` or `.match()` function."
      ]}
      examples={[
        {
          input: 'Search: "IPv4"',
          output: 'Pattern: ^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}...'
        }
      ]}
      useCases={[
        "Frontend developers building form validation logic for emails, passwords, and phone numbers.",
        "Data engineers extracting specific fields (like ISO dates or colors) from large log files.",
        "Backend developers enforcing strict input constraints on API endpoints (e.g., UUID validation).",
        "A11y/UI testing where you need to verify if strings follow specific structural patterns."
      ]}
      faqs={[
        {
          question: "Are these regex patterns JavaScript-compatible?",
          answer: "Yes. All patterns in this library are written to be compatible with standard PCRE and JavaScript RegExp engines. For use in Java or Go, you may occasionally need to double-escape backslashes (e.g., \\\\d instead of \\d)."
        },
        {
          question: "Can I test these patterns with my own data?",
          answer: "Absolutely. We recommend using our 'Regex Match & Extract' tool to paste these patterns into a live tester where you can see how they highlight your actual test strings in real-time."
        },
        {
          question: "What does the 'Validation' category mean?",
          answer: "Validation patterns are designed to return a true/false match for a specific format. They typically start with ^ and end with $ to ensure the entire string conforms to the rule."
        },
        {
          question: "Are these patterns officially 'Perfect'?",
          answer: "Regex is a trade-off between strictness and usability. For example, our email pattern covers 99.9% of standard web usage, but RFC-compliant email validation is notoriously complex. These are designed for real-world production reliability."
        },
        {
          question: "Is this tool updated regularly?",
          answer: "Yes, we continuously add new patterns based on the highest-volume search queries we see in our logs, ensuring the database stays relevant for modern framework development."
        }
      ]}
      relatedTools={[
        { name: "Regex Match & Extract", url: "/regex-tester" },
        { name: "Regex Replace Tester", url: "/regex-replace" },
        { name: "Regex Generator", url: "/regex-generator" }
      ]}
    />
  );
}
