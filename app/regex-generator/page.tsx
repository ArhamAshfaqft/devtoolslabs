import React from 'react';
import type { Metadata } from 'next';
import ToolLayout from '@/components/ToolLayout';
import RegexGeneratorTool from '@/components/tools/RegexGeneratorTool';

export const metadata: Metadata = {
  title: 'Regex Generator & Creator (Write Regular Expressions Online)',
  description: 'Instantly generate standard regular expressions for emails, URLs, IP addresses, dates, and passwords. Copy and paste ready-to-use Regex patterns.',
  openGraph: {
    title: 'Regex Generator & Creator (Write Regular Expressions Online)',
    description: 'Instantly generate standard regular expressions for emails, URLs, IP addresses, dates, and passwords. Copy and paste ready-to-use Regex patterns.',
    url: 'https://devtoolslabs.com/regex-generator',
  },
  alternates: {
    canonical: '/regex-generator',
  },
};

export default function RegexGeneratorPage() {
  return (
    <ToolLayout
      title="Regex Generator & Creator (Build Regular Expressions)"
      intro="Struggling to remember complex Regex syntax? You are not alone. This Regular Expression Generator and Creator provides instant, battle-tested standard regex patterns for the most common development use cases. Simply click what you need to match, adjust your flags, and copy the pattern directly into your codebase."
      toolNode={<RegexGeneratorTool />}
      howTo={[
        "Select the type of data you want to match from the list (Email, URL, Phone Number, etc).",
        "Review the example output to ensure the pattern matches your specific need.",
        "Adjust the Global (g), Case Insensitive (i), or Multiline (m) flags.",
        "Click the 'COPY REGEX' button to copy the formatted regular expression to your clipboard.",
        "Paste it directly into your JavaScript, Python, or PHP application."
      ]}
      examples={[
        {
          input: "Email Address Pattern",
          output: "/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}/gi"
        },
        {
          input: "Strong Password Validation",
          output: "/^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$/g"
        }
      ]}
      useCases={[
        "Validating user input in frontend HTML forms.",
        "Sanitizing backend API payloads before database insertion.",
        "Extracting specific data formats (like IPs) from massive server log files.",
        "Enforcing strict password complexity requirements during user registration."
      ]}
      faqs={[
        {
          question: "Will these Regular Expressions work in any language?",
          answer: "The patterns provided here are standard, PCRE (Perl Compatible Regular Expressions) compliant. They are designed to work seamlessly in modern programming languages like JavaScript, Python, PHP, Java, and Ruby. However, implementation details (like the wrapping forward slashes) may vary slightly per language."
        },
        {
          question: "What does the 'g' and 'i' flag do?",
          answer: "The 'g' (Global) flag tells the regex engine to find all matches in a string, rather than stopping after the first match. The 'i' (Case Insensitive) flag tells the engine to ignore capitalization, treating 'A' and 'a' identically."
        },
        {
          question: "Are these Regex patterns 100% foolproof?",
          answer: "Regex is incredibly powerful but inherently complex. The patterns provided here cover 99% of standard use cases (like standard RFC email matching). However, for extreme edge cases, you may need to modify the pattern slightly. Always unit test your regex implementations!"
        }
      ]}
      relatedTools={[
        {
          name: "Regex Replace Tester",
          url: "/regex-replace"
        },
        {
          name: "Password Entropy Calculator",
          url: "/password-entropy" // Coming next
        }
      ]}
    />
  );
}
