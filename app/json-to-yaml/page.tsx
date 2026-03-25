import type { Metadata } from 'next';
import ToolLayout from '@/components/ToolLayout';
import YamlConverterTool from '@/components/tools/YamlConverterTool';

export const metadata: Metadata = {
  title: 'JSON to YAML Converter (Free Online Tool) | Docker & Cloud-Init YAML',
  description: 'Instantly convert JSON arrays and objects into clean, human-readable YAML format. Ideal for creating Docker Compose, Kubernetes manifests, and cloud-init files.',
  openGraph: {
    title: 'JSON to YAML Converter (Free Online Tool) | Docker & Cloud-Init YAML',
    description: 'Instantly convert JSON arrays and objects into clean, human-readable YAML format. Ideal for creating Docker Compose, Kubernetes manifests, and cloud-init files.',
    url: 'https://devtoolslabs.com/json-to-yaml',
  },
  alternates: {
    canonical: '/json-to-yaml',
  },
};

export default function JsonToYamlPage() {
  return (
    <ToolLayout
      title="JSON to YAML Converter (Cloud Config Generator)"
      intro="Manually writing whitespace-sensitive YAML from JSON data is error-prone. Paste your raw JSON object below to instantly generate perfectly formatted, indented YAML blocks ready for use in Kubernetes, Docker Compose, or Ansible Playbooks."
      toolNode={<YamlConverterTool defaultMode="json-to-yaml" />}
      howTo={[
        "Paste your valid JSON payload into the 'Input JSON' box.",
        "The tool validates your JSON structure and executes the conversion.",
        "Human-readable YAML (with standard 2-space indentation) is generated on the right.",
        "Click 'Copy' to use the YAML output in your configuration files or documents."
      ]}
      examples={[
        {
          input: '{\n  "version": "3.8",\n  "services": {\n    "web": {\n      "image": "nginx"\n    }\n  }\n}',
          output: "version: '3.8'\nservices:\n  web:\n    image: nginx"
        }
      ]}
      useCases={[
        "Building Docker Compose files from sample JSON service definitions.",
        "Generating Kubernetes Resource YAMLs from API response data.",
        "Converting JSON-based configuration files into YAML for better human readability in Git repositories."
      ]}
      faqs={[
        {
          question: "What indentation does it use?",
          answer: "We use the industry-standard 2-space indentation for all YAML generation to ensure maximum compatibility with modern cloud providers like AWS, GCP, Azure, and DigitalOcean."
        },
        {
          question: "How does it handle complex arrays?",
          answer: "JSON arrays are converted into standard YAML list notation (sequences), making it easy to define multi-container pods or complex cloud-init user lists."
        },
        {
          question: "Is this tool secure for private data?",
          answer: "Yes. All conversion logic runs locally in your browser. No data is transmitted over the network, ensuring your proprietary JSON configs remain confidential."
        },
        {
          question: "Can I use this for Docker Compose?",
          answer: "Yes! Many developers prefer drafting their service structures in JSON and then using this tool to generate the final indentation-sensitive docker-compose.yml file."
        },
        {
          question: "Does it support JSON strings with special characters?",
          answer: "Yes, the generator correctly escapes special characters and handles multi-line strings according to the YAML 1.2 specification, ensuring your data integrity is preserved."
        }
      ]}
      relatedTools={[
        { name: "YAML to JSON", url: "/yaml-to-json" },
        { name: "JSON Formatter", url: "/json-formatter" },
        { name: "SQL Formatter", url: "/sql-formatter" }
      ]}
    />
  );
}
