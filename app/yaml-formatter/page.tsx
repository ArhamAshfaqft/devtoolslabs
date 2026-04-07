import { Metadata } from 'next';
import YamlFormatterTool from '@/components/tools/YamlFormatterTool';
import ToolLayout from '@/components/ToolLayout';

export const metadata: Metadata = {
  title: 'YAML Formatter | Online YAML Validator & Indentation Fixer',
  description: 'How to format YAML? Use our free online YAML formatter and validator to fix indentation errors, multiline strings, and structural issues. 100% Client-side.',
  keywords: 'yaml formatter, online yaml validator, yaml vs yml, format yaml online, yaml indentation fixer, devtools',
};

export default function YamlFormatterPage() {
  return (
    <ToolLayout
      title="YAML Formatter & Validator"
      intro="A professional-grade YAML formatting engine built for developers. Fix messy indentation, handle multiline strings, and validate your YAML schema against production standards instantly."
      toolNode={<YamlFormatterTool />}
      howTo={[
        "Paste your YAML payload into the high-fidelity Monaco Editor.",
        "Click 'Format YAML' to apply standard indentation (2 or 4 spaces).",
        "Use 'Smart Fix' to automatically detect and correct tab-vs-space errors and trailing whitespaces.",
        "Your clean, valid YAML is ready for one-click copying to your local config."
      ]}
      examples={[
        {
          input: 'api: version: v1 \n  metadata: name: my-app',
          output: 'api:\n  version: v1\n  metadata:\n    name: my-app'
        }
      ]}
      useCases={[
        "Kubernetes Config: Validating and formatting large K8s resource manifests.",
        "Docker Compose: Fixing indentation errors in microservice orchestrations.",
        "CI/CD Pipelines: Testing GitHub Actions or GitLab CI YAML syntax before pushing.",
        "YML vs YAML Analysis: Comparing file structures and ensuring naming consistency across projects."
      ]}
      faqs={[
        {
          question: "How to format YAML online securely?",
          answer: "Our tool processes 100% of your data locally in the browser. Unlike other online formatters, your sensitive configuration keys never touch a remote server."
        },
        {
          question: "Can I fix YAML indentation errors automatically?",
          answer: "Yes. Our 'Smart Fix' feature is specifically designed to handle the #1 cause of YAML failures: mismatched tabs and spaces. It normalizes indentation to your preferred setting (2 or 4 spaces)."
        },
        {
          question: "What is the difference between .yaml and .yml?",
          answer: "There is no functional difference. Both extensions map to the same YAML data standard. However, official documentation prefers .yaml for consistency in large-scale projects."
        },
        {
          question: "Support for multiline strings?",
          answer: "Our formatter preserves and cleans literal (|) and folded (>) multiline blocks, ensuring your config file remains legible and valid."
        }
      ]}
      relatedTools={[
        { name: "JSON to YAML", url: "/json-to-yaml" },
        { name: "YAML to JSON", url: "/yaml-to-json" },
        { name: "JSON Formatter", url: "/json-formatter" }
      ]}
    />
  );
}
