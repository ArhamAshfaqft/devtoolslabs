import type { Metadata } from 'next';
import ToolLayout from '@/components/ToolLayout';
import YamlConverterTool from '@/components/tools/YamlConverterTool';

export const metadata: Metadata = {
  title: 'YAML to JSON Converter (Online Tool) | Kubernetes & Docker YAML Parse',
  description: 'Instantly convert YAML manifests to JSON objects. Perfect for debugging Kubernetes configurations, Docker Compose files, and cloud-init scripts securely offline.',
  openGraph: {
    title: 'YAML to JSON Converter (Online Tool) | Kubernetes & Docker YAML Parse',
    description: 'Instantly convert YAML manifests to JSON objects. Perfect for debugging Kubernetes configurations, Docker Compose files, and cloud-init scripts securely offline.',
    url: 'https://devtoolslabs.com/yaml-to-json',
  },
  alternates: {
    canonical: '/yaml-to-json',
  },
};

export default function YamlToJsonPage() {
  return (
    <ToolLayout
      title="YAML to JSON Converter (DevOps & Cloud Utility)"
      intro="YAML is the industry standard for cloud-native configurations, but many APIs and tools require JSON payloads. Use our professional YAML to JSON converter to translate Kubernetes manifests, Docker configurations, and CI/CD pipelines into clean, structured JSON instantly in your browser."
      toolNode={<YamlConverterTool defaultMode="yaml-to-json" />}
      howTo={[
        "Paste your raw YAML configuration into the 'Input YAML' text area.",
        "Our engine uses js-yaml to parse the input and identify nested keys and values.",
        "The RFC-compliant JSON output is generated instantly on the right.",
        "Click 'Copy' to transfer the JSON payload to your clipboard for use in API requests."
      ]}
      examples={[
        {
          input: "apiVersion: v1\nkind: Pod\nmetadata:\n  name: mypod",
          output: '{\n  "apiVersion": "v1",\n  "kind": "Pod",\n  "metadata": {\n    "name": "mypod"\n  }\n}'
        }
      ]}
      useCases={[
        "Converting complex Kubernetes YAML resources into JSON for use with the kubectl API directly.",
        "Parsing Docker Compose files into JSON to analyze service dependencies or environment variables.",
        "Decoding cloud-init or Terraform YAML configurations to verify structural integrity before deployment."
      ]}
      faqs={[
        {
          question: "Does it support multiple YAML documents?",
          answer: "Currently, this tool parses the first document in a YAML stream. For multiple documents (separated by --- in K8s), we recommend parsing them individually for the most accurate JSON results."
        },
        {
          question: "Does it support YAML anchors and aliases?",
          answer: "Yes! Our parser uses the standard js-yaml engine which fully supports YAML anchors (&) and aliases (*). This makes it perfect for expanding complex Docker Compose files."
        },
        {
          question: "Is it safe for production secrets?",
          answer: "Yes. Processing is 100% client-side via your browser's V8 engine. Your sensitive Kubernetes secrets, environment variables, or API keys never leave your machine."
        },
        {
          question: "Can I convert JSON back to YAML?",
          answer: "Absolutely. Simply use the 'JSON to YAML' toggle at the top of the tool or visit our dedicated JSON to YAML page for a more specialized experience."
        },
        {
          question: "Why convert YAML to JSON for Kubernetes?",
          answer: "While human engineers prefer YAML for readability, many automated CI/CD tools, monitoring dashboards, and the underlying Kubernetes API controllers process configurations as JSON objects."
        }
      ]}
      relatedTools={[
        { name: "JSON to YAML", url: "/json-to-yaml" },
        { name: "JSON Formatter", url: "/json-formatter" },
        { name: "SQL Formatter", url: "/sql-formatter" }
      ]}
    />
  );
}
