import { Metadata } from 'next';
import YamlToJsonTool from '@/components/tools/YamlToJsonTool';
import ToolLayout from '@/components/ToolLayout';

export const metadata: Metadata = {
  title: 'YAML to JSON Converter | Online YAML Parser & Safe Loader',
  description: 'How to convert YAML to JSON? Use our free online YAML to JSON converter to transform K8s manifests, Docker Compose, and Ansible files into clean JSON.',
  keywords: 'yaml to json, convert yaml to json, yaml parser online, yaml safe load, kubernetes to json, devtools',
};

export default function YamlToJsonPage() {
  return (
    <ToolLayout
      title="YAML to JSON Converter"
      intro="Transform complex YAML data into clean, valid JSON instantly. Optimized for DevOps engineers and developers who need to parse Kubernetes manifests, cloud configs, and Ansible playbooks for programmatic review."
      toolNode={<YamlToJsonTool />}
      howTo={[
        "Paste your YAML content into the left editor pane.",
        "Click 'Convert to JSON' to trigger the industrial-grade safe-loading engine.",
        "The resulting JSON is instantly rendered in the right pane with professional 2-space indentation.",
        "One-click copy the JSON for use in your API requests or codebases."
      ]}
      examples={[
        {
          input: 'api: v1 \nmetadata: \n  name: app',
          output: '{\n  "api": "v1",\n  "metadata": {\n    "name": "app"\n  }\n}'
        }
      ]}
      useCases={[
        "DevOps: Converting Kubernetes Helm charts into JSON for validation scripts.",
        "Cloud Engineering: Parsing AWS CloudFormation or Terraform YAML into JSON payloads.",
        "API Test: Transforming human-readable YAML documentation into raw JSON for Postman or cURL.",
        "System Audit: Flattening complex nested YAML configurations into a simpler JSON structure."
      ]}
      faqs={[
        {
          question: "How to convert YAML to JSON safely?",
          answer: "Our tool follows the 'Safe Load' schema, meaning we disable hazardous YAML features like custom tags or code execution. Your conversion is secure and stable."
        },
        {
          question: "Support for YAML Anchors and Aliases?",
          answer: "Yes. Our engine correctly resolves recursive anchors (&) and aliases (*) during the conversion, ensuring your JSON output matches the final state of your YAML config."
        },
        {
          question: "Is there a limit to the file size?",
          answer: "Conversion is handled entirely in your browser. Large files up to 20MB are processed smoothly without any data leaving your device."
        }
      ]}
      relatedTools={[
        { name: "JSON to YAML", url: "/json-to-yaml" },
        { name: "YAML Formatter", url: "/yaml-formatter" },
        { name: "JSON Formatter", url: "/json-formatter" }
      ]}
    />
  );
}
