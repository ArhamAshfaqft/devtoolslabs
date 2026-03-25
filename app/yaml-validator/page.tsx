import type { Metadata } from 'next';
import ToolLayout from '@/components/ToolLayout';
import YamlValidatorTool from '@/components/tools/YamlValidatorTool';

export const metadata: Metadata = {
  title: 'YAML Validator & Linter | Online Kubernetes YAML Checker',
  description: 'Instantly validate your YAML syntax online. Identify indentation errors, illegal characters, and structural anomalies in Kubernetes manifests, Docker Compose, and CI/CD pipelines.',
  openGraph: {
    title: 'YAML Validator & Linter | Online Kubernetes YAML Checker',
    description: 'Instantly validate your YAML syntax online. Identify indentation errors, illegal characters, and structural anomalies in Kubernetes manifests, Docker Compose, and CI/CD pipelines.',
    url: 'https://devtoolslabs.com/yaml-validator',
  },
  alternates: {
    canonical: '/yaml-validator',
  },
};

export default function YamlValidatorPage() {
  return (
    <ToolLayout
      title="YAML Validator & Linter (DevOps Config Checker)"
      intro="YAML is the backbone of modern cloud infrastructure, but its strict indentation rules and case-sensitivity make it notoriously difficult to debug manually. Whether you are building complex Kubernetes deployments, Docker Compose stacks, or GitHub Action workflows, a single missing space can break your entire production pipeline. This tool provides an instant, browser-native linter that catches syntax errors and provides a clean JSON schema preview of your data."
      toolNode={<YamlValidatorTool />}
      howTo={[
        "Paste your YAML configuration snippet into the 'YAML Input' editor on the left.",
        "The validator automatically scans your code for syntax violations and indentation errors.",
        "If a structural error is found, the 'Linter Trace' will identify the exact line requiring correction.",
        "Once valid, review the 'Object Schema Preview' to ensure your data hierarchy is being parsed correctly by service engines.",
        "Copy your validated code directly back into your `deployment.yaml` or `docker-compose.yml` file."
      ]}
      examples={[
        {
          input: 'services:\n  web:\n    image: nginx\n    ports:\n    - "80:80"',
          output: 'Status: Valid YAML Syntax | Schema Preview displayed.'
        }
      ]}
      useCases={[
        "Debugging Kubernetes 'invalid manifest' errors during `kubectl apply` commands.",
        "Verifying complex Ansible Playbook logic before running migrations across server clusters.",
        "Identifying illegal 'Tab' characters in YAML files (which are strictly prohibited by the specification).",
        "Converting messy YAML configurations into clean JSON for API prototyping and data transformation."
      ]}
      faqs={[
        {
          question: "Why is YAML indentation so strict?",
          answer: "YAML uses white-space indentation to define its structure and hierarchy, similar to Python. This removes the need for braces `{}` and semi-colons, but it means that even a single extra space can change the meaning of your configuration or cause the parser to fail entirely."
        },
        {
          question: "Can I use tabs in YAML?",
          answer: "No. The YAML specification strictly forbids the use of the Tab character for indentation. You must always use spaces (typically 2 or 4). Our linter will automatically flag tab characters as syntax violations."
        },
        {
          question: "How do I define a list in YAML?",
          answer: "Lists are defined using a hyphen `-` followed by a space. Each list item must be at the same indentation level. Example: `ports:\n  - 80\n  - 443`."
        },
        {
          question: "Is this safe for production secrets?",
          answer: "Yes. This tool is 100% client-side. Your configuration data (including potential environment variables or secrets) is processed entirely within your browser and never leaves your machine."
        },
        {
          question: "What is a 'YAML anchor'?",
          answer: "Anchors (&) and Aliases (*) allow you to avoid duplicating data in large YAML files by defining a property एकदा (once) and referencing it later. Our validator supports standard anchor and alias parsing."
        }
      ]}
      relatedTools={[
        { name: "YAML to JSON Converter", url: "/yaml-to-json" },
        { name: "JSON to YAML Converter", url: "/json-to-yaml" },
        { name: "Mock JSON Generator", url: "/mock-json-generator" }
      ]}
    />
  );
}
