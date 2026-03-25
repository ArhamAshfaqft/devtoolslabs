import type { Metadata } from 'next';
import ToolLayout from '@/components/ToolLayout';
import BcryptGeneratorTool from '@/components/tools/BcryptGeneratorTool';

export const metadata: Metadata = {
  title: 'Bcrypt Password Hash Generator & Checker (Online Tool)',
  description: 'Generate secure Bcrypt hashes online or verify cleartext passwords against existing Bcrypt hashes. 100% private client-side execution using bcryptjs.',
  openGraph: {
    title: 'Bcrypt Password Hash Generator & Checker (Online Tool)',
    description: 'Generate secure Bcrypt hashes online or verify cleartext passwords against existing Bcrypt hashes. 100% private client-side execution using bcryptjs.',
    url: 'https://devtoolslabs.com/bcrypt-generator',
  },
  alternates: {
    canonical: '/bcrypt-generator',
  },
};

export default function BcryptGeneratorPage() {
  return (
    <ToolLayout
      title="Bcrypt Hash Generator & Verifier (Salt Rounds Tool)"
      intro="Developers require strong hashing algorithms to securely store user passwords. Bcrypt is the industry standard. Use this tool to instantly generate secure Bcrypt hashes from cleartext passwords, test different 'work factors' (salt rounds), and securely verify if a password matches a given hash completely offline in your browser."
      toolNode={<BcryptGeneratorTool />}
      howTo={[
        "Select 'Generate Hash' to create a new hash, or 'Verify Hash' to compare an existing one.",
        "Enter your plaintext password string.",
        "For Generation: Use the slider to select your 'Salt Rounds' (work factor). Higher rounds take longer to compute, increasing security against brute-force attacks.",
        "Click 'Generate Bcrypt Hash'.",
        "The cryptographic operation will block momentarily as it calculates (to simulate server load) and then output the secure `$2a$` hash."
      ]}
      examples={[
        {
          input: 'Password: admin123\nRounds: 10',
          output: "Hash: $2a$10$XU.Y8yVQKbqo23QpY5zZ0.R8iC7T8mU3wVJ5vO9sI7w8qY5zZ0.R8" // Mock string example
        }
      ]}
      useCases={[
        "Generating manual secure passwords for database seeding or initial admin account setup.",
        "Verifying that a user's password properly aligns with a hashed value extracted from a database query.",
        "Experiencing and understanding the performance impact of increasing Bcrypt salt rounds from 10 to 12 or 14."
      ]}
      faqs={[
        {
          question: "Is it safe to generate passwords using this tool?",
          answer: "Yes! DevToolsLabs operates on a strict zero-server policy. All Bcrypt calculations are performed locally in your browser using JavaScript. Your plaintext password is never transmitted over the internet."
        },
        {
          question: "What are Salt Rounds (Work Factor)?",
          answer: "Bcrypt is designed to be slow on purpose to prevent hackers from rapidly guessing passwords using GPU hardware. The 'Salt Rounds' define how many times the hashing algorithm iterates. Round 10 takes ~100ms, but Round 14 can take several seconds. We recommend standardizing on 10 or 12 for modern web applications."
        },
        {
          question: "Why does generating the identical password twice produce different hashes?",
          answer: "Bcrypt automatically generates a random 'Salt' (a unique string of characters) every single time it hashes a password. This salt is prepended to the hash and prevents 'Rainbow Table' attacks, ensuring the same password used by two users doesn't look the same in the database."
        },
        {
          question: "Can an original password be extracted from a Bcrypt hash?",
          answer: "No. Because Bcrypt is a cryptographic one-way hashing function (unlike Base64 which is encoding), it cannot be reversed. The only way to find the password is to repeatedly guess plaintext passwords, hash them, and see if they match."
        },
        {
          question: "What do the first characters ($2a$, $2b$) mean?",
          answer: "They define the specific algorithm version used. $2a$ is the standard original version. $2b$ and $2y$ are slightly updated implementations utilized by newer PHP servers or cryptographic libraries, but they are all functionally comparable and highly secure."
        }
      ]}
      relatedTools={[
        { name: "UUID Generator", url: "/uuid-generator" },
        { name: "Password Entropy Calculator", url: "/password-entropy" },
        { name: "JWT Hash Validator", url: "/jwt-validator" }
      ]}
    />
  );
}
