import React from 'react';
import type { Metadata } from 'next';
import GuideLayout from '@/components/GuideLayout';

export const metadata: Metadata = {
  title: 'The DevOps Kubernetes YAML Blueprint | DevToolsLabs',
  description: 'Master Kubernetes manifest design. Learn YAML best practices for K8s, common syntax pitfalls, linter strategies, and how to build reusable cloud-native infrastructure.',
};

export default function KubernetesYamlGuidePage() {
  return (
    <GuideLayout
      title="The DevOps Kubernetes YAML Blueprint: Best Practices & Manifest Design"
      description="YAML is the language of modern infrastructure. This guide provides a deep dive into designing production-ready Kubernetes manifests, avoiding syntax pitfalls, and leveraging linters to ensure error-free deployments."
      publishDate="March 15, 2026"
      readTime="10 min"
      relatedTools={[
        { name: "YAML Validator & Linter", url: "/yaml-validator" },
        { name: "YAML to JSON Converter", url: "/yaml-to-json" },
        { name: "JSON to YAML Converter", url: "/json-to-yaml" }
      ]}
    >
      <section>
        <h2>YAML: The Indentation-Driven Engine of DevOps</h2>
        <p>
          In the DevOps world, **YAML (YAML Ain't Markup Language)** is everywhere. From Docker Compose to Kubernetes and GitHub Actions, it has become the standard for configuration. However, its strict reliance on white space and indentation makes it one of the most common sources of production "deployment failure" bugs.
        </p>
      </section>

      <section>
        <h2>1. The Four Pillars of a Kubernetes Manifest</h2>
        <p>
          Every Kubernetes object (Pod, Deployment, Service) follows a core structure that you must understand to debug effectively:
        </p>
        <ol>
          <li><strong>apiVersion:</strong> Defines which version of the Kubernetes API you're using to create this object.</li>
          <li><strong>kind:</strong> The type of object you want to create (e.g., <code>Deployment</code>).</li>
          <li><strong>metadata:</strong> Data that helps uniquely identify the object, including its <code>name</code> and <code>labels</code>.</li>
          <li><strong>spec:</strong> The "Desired State"—exactly what you want Kubernetes to run.</li>
        </ol>
      </section>

      <section>
        <h2>2. Common YAML Pitfalls (and How to Avoid Them)</h2>
        <p>
            One misplaced space can crash a whole cluster. Here are the "Gotchas" our <strong>YAML Linter</strong> is designed to catch:
        </p>
        <ul>
          <li><strong>Tabs vs. Spaces:</strong> Kubernetes YAML flatly forbids tab characters. Always use 2 or 4 spaces.</li>
          <li><strong>Boolean Ambiguity:</strong> Values like <code>yes</code>, <code>no</code>, <code>on</code>, and <code>off</code> are often interpreted as booleans. Always wrap string values in quotes (e.g., <code>"on"</code>) to be safe.</li>
          <li><strong>Multine Strings:</strong> Use <code>|</code> (literal, preserving newlines) or <code>&gt;</code> (folded, replacing newlines with spaces) for complex configuration scripts within your YAML.</li>
        </ul>
      </section>

      <section>
        <h2>3. Designing Reusable Manifests</h2>
        <p>
          Hard-coding values (like image tags or replica counts) directly into YAML is a "bad smell" in DevOps. Modern architecture uses templating engines:
        </p>
        <ul>
          <li><strong>Helm:</strong> The package manager for Kubernetes. Uses Go templating to inject values into YAML.</li>
          <li><strong>Kustomize:</strong> A template-free way to customize manifests using "patches" and "overlays" for different environments (Dev, Staging, Prod).</li>
        </ul>
      </section>

      <section>
        <h2>4. Security First: Handling YAML Secrets</h2>
        <p>
          **Never commit plain-text Secret YAMLs to Git.** Instead, use:
        </p>
        <ul>
          <li><strong>Sealed Secrets:</strong> Encrypt your secrets so they can safely live in your repository and only be decrypted by the cluster.</li>
          <li><strong>External Secrets Operator:</strong> Pull secrets directly from AWS Secrets Manager or HashiCorp Vault into your Kubernetes pods at runtime.</li>
        </ul>
      </section>

      <section>
        <h2>5. Validation Strategies</h2>
        <p>
          Before applying a manifest, always run a <strong>Dry Run</strong>:
        </p>
        <pre>{`kubectl apply -f manifest.yaml --dry-run=client`}</pre>
        <p>
            Combined with a browser-based <strong>YAML Validator</strong>, this two-step verification process eliminates almost all syntax-related deployment downtime.
        </p>
      </section>

      <section>
        <h2>Summary</h2>
        <p>
          Mastering Kubernetes YAML is about more than just matching brackets—it's about understanding the relationship between indentation and infrastructure. By following these blueprint patterns and utilizing strict linting, you can build reliable, scalable, and secure cloud-native systems.
        </p>
      </section>
    </GuideLayout>
  );
}
