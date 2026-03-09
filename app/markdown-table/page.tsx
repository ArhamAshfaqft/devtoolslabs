import type { Metadata } from 'next';
import ToolLayout from '@/components/ToolLayout';
import MarkdownTableGeneratorTool from '@/components/tools/MarkdownTableGeneratorTool';

export const metadata: Metadata = {
  title: 'Markdown Table Generator (Free Online Tool) | Convert CSV Instantly',
  description: 'Instantly generate perfectly formatted Markdown tables from CSV, Excel, or tab-separated text. Free online developer utility.',
};

export default function MarkdownTableGeneratorPage() {
  return (
    <ToolLayout
      title="Markdown Table Generator"
      intro="Manually typing out Markdown tables is tedious. Paste your Excel data, CSV, or plain text into this tool to instantly generate a perfectly formatted Markdown table ready for GitHub, Notion, or your blog."
      toolNode={<MarkdownTableGeneratorTool />}
      howTo={[
        "Copy your data from Excel, Google Sheets, or a CSV file.",
        "Paste it into the input area. The tool automatically detects your separator (comma, tab, or pipe).",
        "The first line of your input is automatically used as the table headers.",
        "Click 'Copy Markdown' to grab the formatted code."
      ]}
      examples={[
        {
          input: 'Name, Status, Role\nAlice, Active, Admin\nBob, Offline, User',
          output: '| Name | Status | Role |\n|---|---|---|\n| Alice | Active | Admin |\n| Bob | Offline | User |'
        }
      ]}
      useCases={[
        "Creating documentation tables for README.md files on GitHub.",
        "Converting spreadsheet data into Markdown for static site generators like Hugo or Next.js.",
        "Quickly formatting data for technical blogs or developer forums."
      ]}
      faqs={[
        {
          question: "Which markdown specification does this tool adhere to?",
          answer: "The output uses the GitHub Flavored Markdown (GFM) table extension syntax, meaning the tables generated here are guaranteed to render perfectly on GitHub, GitLab, Reddit, Notion, and Discord."
        },
        {
          question: "How does the auto-detection algorithm parse my clipboard data?",
          answer: "When pasting data straight from Excel or Google Sheets, your clipboard contains tab-separated characters (\\t). The parser evaluates the first line of your input block. It splits the string by tabs, pipes (|), and commas (,). Whichever delimiter yields the highest number of columns is selected to process the entire document."
        },
        {
          question: "Can I align columns to the right or center in Markdown?",
          answer: "While this specific tool generates standard left-aligned tables by default, you can easily change the alignment manually. In the second row of the output (the separator row: |---|), add a colon to the right side (---:) for right-alignment, or colons to both sides (:---:) for center alignment."
        },
        {
          question: "What happens if my CSV data contains commas inside the string values?",
          answer: "Currently, this basic utility splits string rows on raw delimiters. If your CSV contains complex nested strings specifically enclosed in double-quotes (e.g., \"Smith, John\", Engineer), we highly recommend using a Tab-separated format (copying from Excel) to prevent columns from splitting mid-string."
        },
        {
          question: "Is there a limit to the size of the CSV I can paste?",
          answer: "Since the processing runs 100% inside your browser's V8 engine, the table size is restricted only by your local memory limits. You can safely parse thousands of rows instantaneously."
        }
      ]}
      relatedTools={[
        { name: "JSON Escape", url: "/json-escape-unescape" },
        { name: "CSS Clamp Generator", url: "/css-clamp-generator" }
      ]}
    />
  );
}
