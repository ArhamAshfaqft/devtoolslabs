import React from 'react';
import ToolLayout from '@/components/ToolLayout';
import HtpasswdGeneratorTool from '@/components/tools/HtpasswdGeneratorTool';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Htpasswd Generator | Bcrypt & SHA1 Authentication Hasher',
  description: 'Generate highly secure .htpasswd credentials for Apache and Nginx basic HTTP authentication. Uses Bcrypt and SHA-1 algorithms to generate hashed passwords 100% in your browser.',
  keywords: ['htpasswd generator', 'basic auth generator', 'nginx htpasswd', 'apache basic authentication', 'bcrypt htpasswd maker', 'create htpasswd local'],
  alternates: {
    canonical: 'https://www.devtoolslabs.com/htpasswd-generator',
  },
  openGraph: {
    title: 'Htpasswd Generator | Bcrypt & SHA1 Authentication Hasher',
    description: 'Generate highly secure .htpasswd credentials for Apache and Nginx basic HTTP authentication. Uses Bcrypt and SHA-1 algorithms to generate hashed passwords 100% in your browser.',
    url: 'https://devtoolslabs.com/htpasswd-generator',
  },
  alternates: {
    canonical: '/htpasswd-generator',
  },
};

export default function HtpasswdGeneratorPage() {
  return (
    <ToolLayout
      title="Htpasswd Generator"
      intro="For basic HTTP authentication protecting staging servers, internal dashboards, or APIs, Nginx and Apache servers rely on an encrypted `.htpasswd` file. This interactive generator lets you build standard Basic Authentication rows safely. All cryptographic hashing (Bcrypt & SHA1) runs locally in JavaScript, guaranteeing your plain-text passwords are never broadcasted over the public internet."
      toolNode={<HtpasswdGeneratorTool />}
      howTo={[
        "Enter a plain text 'Username' for the first row (e.g., admin).",
        "Enter the 'Password' that you want the user to type into the browser prompt.",
        "Select your 'Algorithm'. Bcrypt is securely recommended for modern Nginx installations.",
        "To generate credentials for an entire team, click 'Add Row' to configure up to 10 users at once.",
        "Click 'Download File' to instantly save the `.htpasswd` file to your computer, or copy the block to paste into your server via SSH."
      ]}
      examples={[
        {
          input: "User: admin, Password: Password123 (Bcrypt)",
          output: "admin:$2y$10$wE9JzFxP0L.H8X5qOOWE8eP3h8C/zIOfS/r.xR3hK4H/C2vJ.3F.G"
        },
        {
          input: "User: webmaster, Password: secretpassword (SHA1)",
          output: "webmaster:{SHA}5en6G6MezRroT3XKqkdPOmY/BfQ="
        }
      ]}
      useCases={[
        "Locking down a staging or testing server from public indexing by adding a basic HTTP Authentication rule to an Nginx `location` block.",
        "Generating quick static credentials without needing to install `apache2-utils` physically on your operating system.",
        "Deploying internal API documentation (like Swagger URIs) safely and cheaply behind an ingress controller basic auth."
      ]}
      faqs={[
        {
          question: "Which algorithm should I choose?",
          answer: "Bcrypt is computationally expensive and is currently the industry standard for password storage because it naturally prevents brute-force dictionary attacks. You should use Bcrypt unless you are confined to a very old legacy Apache server that fails to parse it."
        },
        {
          question: "Can anyone brute force this file?",
          answer: "The `.htpasswd` file is designed to be kept completely outside of your public html structure. Attackers should never be able to download it. If they magically acquire the hashes, Bcrypt calculations are slow enough that cracking long passwords would take centuries."
        },
        {
          question: "Why use this instead of the terminal command `htpasswd -c`?",
          answer: "Often, server environments run slim docker containers (like Alpine Linux) that lack the `apache2-utils` or `httpd-tools` packages containing the native `htpasswd` binaries. Generating the strings offline via the browser bypasses installing useless bloated packages into your slim production containers."
        },
        {
          question: "Is it secure to generate passwords here?",
          answer: "Absolutely. Our utility uses modern cryptographic WebAssembly / JavaScript wrappers. Your data is isolated to the user's Client DOM, and the resulting calculation happens on your CPU. The input keys are immediately discarded when you refresh."
        }
      ]}
      relatedTools={[
        { name: "Chmod Permssions Calculator", url: "/chmod-calculator" },
        { name: "Bcrypt Generator", url: "/bcrypt-generator" },
        { name: "Advanced Password Entropy", url: "/password-entropy" }
      ]}
    />
  );
}
