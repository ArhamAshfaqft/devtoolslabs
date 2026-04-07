import { Metadata } from 'next';
import JsonToYamlTool from '@/components/tools/JsonToYamlTool';
import ToolLayout from '@/components/ToolLayout';

export const metadata: Metadata = {
  title: 'JSON to YAML Converter | Convert JSON to YAML Online Free',
  description: 'How to convert JSON to YAML? Use our free online JSON to YAML converter to transform payloads into clean, readable configuration files with custom indentation.',
  keywords: 'json to yaml, convert json to yaml, json to yml online, convert json to yaml free, devtools, yaml formatter',
};

export default function JsonToYamlPage() {
  return (
    <ToolLayout
      title="JSON to YAML Converter"
      intro="Convert JSON payloads into professional, human-readable YAML configuration files instantly. Optimized for building Kubernetes manifests, Docker Compose files, and cloud-native application configs with precision."
      toolNode={<JsonToYamlTool />}
      howTo={[
        "Paste your JSON payload into the left editor pane.",
        "Select your preferred indentation (2 or 4 spaces).",
        "Click 'Convert to YAML' to trigger the professional serialization engine.",
        "Instantly copy the resulting YAML for your project's configuration files."
      ]}
      examples={[
        {
          input: '{\n  "app": "web",\n  "tier": "frontend"\n}',
          output: 'app: web\ntier: frontend'
        }
      ]}
      useCases={[
        "Infrastructure as Code: Converting JSON responses from APIs into YAML for Terraform or AWS CloudFormation.",
        "App Configuration: Transforming JSON settings into human-readable .yaml files for local development.",
        "CI/CD Mastery: Preparing GitHub Actions workflow configurations from JSON data sources.",
        "JSON vs YAML Analysis: Comparing data structures and ensuring naming consistency across platform migrations."
      ]}
      faqs={[
        {
          question: "How to convert JSON to YAML online securely?",
          answer: "Our tool runs 100% in your browser. No data is ever sent to our servers, making it safe for handling sensitive API keys or private configuration data."
        },
        {
          question: "Does it support nested JSON objects?",
          answer: "Yes. Our converter uses a recursive mapping engine that correctly handles deeply nested objects, arrays, and complex data structures while maintaining valid YAML indentation."
        },
        {
          question: "Can I choose the indent size?",
          answer: "Absolutely. You can toggle between 2-space (the industry standard) and 4-space indentation to match your team's coding style."
        }
      ]}
      relatedTools={[
        { name: "YAML to JSON", url: "/yaml-to-json" },
        { name: "YAML Formatter", url: "/yaml-formatter" },
        { name: "JSON Formatter", url: "/json-formatter" }
      ]}
    />
  );
}
