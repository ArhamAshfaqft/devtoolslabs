import React from 'react';
import type { Metadata } from 'next';
import ToolLayout from '@/components/ToolLayout';
import PasswordEntropyTool from '@/components/tools/PasswordEntropyTool';

export const metadata: Metadata = {
  title: 'Password Entropy Calculator (Check Password Strength Online)',
  description: 'Instantly calculate your password\'s Shannon Entropy (bits) and determine how long it would take an offline attacker to crack it. 100% private, client-side only.',
  openGraph: {
    title: 'Password Entropy Calculator (Check Password Strength Online)',
    description: 'Instantly calculate your password\',
    url: 'https://devtoolslabs.com/password-entropy',
  },
  alternates: {
    canonical: '/password-entropy',
  },
};

export default function PasswordEntropyPage() {
  return (
    <ToolLayout
      title="Password Entropy Calculator (Check Password Strength Online)"
      intro="Are your access credentials actually secure, or just long? This Password Entropy Calculator uses standard information theory (Shannon Entropy) to mathematically determine the true cryptographic strength of your passwords. It calculates the pool size (uppercase, lowercase, numbers, symbols) and length to give you exact bit-strength and an estimated offline cracking time. This tool runs 100% in your browser; your keystrokes never leave your device."
      toolNode={<PasswordEntropyTool />}
      howTo={[
        "Begin typing your password into the input field.",
        "Watch the Entropy (bits) score update in real-time as you type.",
        "Observe the Estimated Crack Time to understand its resilience against brute-force attacks.",
        "Check the breakdown at the bottom to see your Character Pool Size and Password Length."
      ]}
      examples={[
        {
          input: "password123",
          output: "41 bits (Weak) - Cracks in 22 Minutes"
        },
        {
          input: "correct-horse-battery-staple",
          output: "135 bits (Very Strong) - Cracks in Millions of Years"
        }
      ]}
      useCases={[
        "Evaluating database administration or root server access credentials.",
        "Testing the effectiveness of Diceware or passphrase generation strategies.",
        "Educating internal employees on why 'P@ssw0rd1' is cryptographically weak despite meeting minimum requirements.",
        "Verifying the output strength of automated random password generators."
      ]}
      faqs={[
        {
          question: "What is Password Entropy?",
          answer: "Information Entropy (often measured in bits) is a scientific concept measuring the 'randomness' or unpredictability of data. In cybersecurity, higher password entropy means there are exponentially more possible combinations an attacker must guess to brute-force the password."
        },
        {
          question: "How is the Entropy calculated here?",
          answer: "We use the standard Shannon Entropy formula: E = L * log2(R). Where L is the Length of the password, and R is the Pool Size (26 for lowercase, +26 for uppercase, +10 for numbers, +32 for symbols)."
        },
        {
          question: "How is the 'Crack Time' estimated?",
          answer: "The crack time is a hypothetical metric. It assumes an attacker has stolen your hashed password (like an offline MD5 or SHA-256 hash) and is running a massive parallel GPU rig capable of guessing 100 Billion passwords every single second. The time shown is how long it would take to guess exactly half of all possible combinations in your entropy pool."
        },
        {
          question: "Is it safe to type my real password here?",
          answer: "While this tool is technically 100% offline and no data is ever transmitted to our servers, cybersecurity best practices dictate that you should NEVER type your real, highly sensitive production passwords into any web browser form you don't absolutely have to. We recommend testing the *structure* of your passwords, not the exact passwords themselves."
        }
      ]}
      relatedTools={[
        {
          name: "Secure Hash Generator",
          url: "/hash-generator"
        },
        {
          name: "Random UUID Generator",
          url: "/uuid-generator"
        },
        {
          name: "Regex Generator",
          url: "/regex-generator"
        }
      ]}
    />
  );
}
