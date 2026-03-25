import type { Metadata } from 'next';
import ToolLayout from '@/components/ToolLayout';
import AdvancedPasswordSecurityTool from '@/components/tools/AdvancedPasswordSecurityTool';

export const metadata: Metadata = {
  title: 'Advanced Password Security Meter | Time to Crack & Entropy Tool',
  description: 'Simulate how long it would take an attacker to crack your password. Calculate cryptographic entropy and identifies vulnerabilities like keyboard patterns or short lengths online.',
  openGraph: {
    title: 'Advanced Password Security Meter | Time to Crack & Entropy Tool',
    description: 'Simulate how long it would take an attacker to crack your password. Calculate cryptographic entropy and identifies vulnerabilities like keyboard patterns or short lengths online.',
    url: 'https://devtoolslabs.com/password-security-meter',
  },
  alternates: {
    canonical: '/password-security-meter',
  },
};

export default function AdvancedPasswordSecurityPage() {
  return (
    <ToolLayout
      title="Advanced Password Security Meter (Time to Crack)"
      intro="Most password checkers only look for numbers and symbols. Our advanced security meter utilizes cryptographic entropy calculations (bits) to determine the true strength of your password. It simulates two common attack scenarios—a throttled online brute-force and a high-speed offline GPU attack—while auditing your string for common vulnerabilities like dictionary words, keyboard sequences, and length risks."
      toolNode={<AdvancedPasswordSecurityTool />}
      howTo={[
        "Type your password into the test field. No data is ever sent to our server; processing is 100% local.",
        "Observe the Entropy (bits) calculation. Higher bits represent exponential difficulty for attackers.",
        "Compare the 'Offline' vs 'Online' crack times to understand how hardware accelerates breaches.",
        "Review the 'Security Audit' panel to identify specific weaknesses in your string.",
        "Follow the Pro Mitigation steps to upgrade your password to an 'unbreakable' passphrase."
      ]}
      examples={[
        {
          input: 'p@ssword123',
          output: 'Entropy: 32 bits | Crack Time (Offline): Instantly'
        },
        {
          input: 'CorrectHorseBatteryStaple',
          output: 'Entropy: 128 bits | Crack Time (Offline): Millions of years'
        }
      ]}
      useCases={[
        "Educational tool for security awareness training within corporate environments.",
        "Developers testing the potential entropy of auto-generated initial passwords.",
        "Determining if your 'strong' password is actually vulnerable to modern high-end GPU arrays.",
        "Understanding the mathematical advantage of 'Length' over 'Complexity' in passphrase design."
      ]}
      faqs={[
        {
          question: "What is cryptographic entropy?",
          answer: "Entropy, measured in bits, represents the amount of unpredictability in a password. In terms of brute-force attacks, adding 1 bit of entropy doubles the amount of work an attacker must perform to crack the password. A password with 128 bits is currently considered uncrackable by modern physics."
        },
        {
          question: "How do you calculate 'Time to Crack'?",
          answer: "We use the formula: Time = (2^Entropy) / (Guess Speed). For 'Online' attacks, we assume a throttled server allowing 100 guesses/sec. For 'Offline' attacks, we assume a high-end GPU cluster capable of 10 billion guesses per second."
        },
        {
          question: "Why is length more important than symbols?",
          answer: "Mathematically, the character set size (base) is the base of the exponent, but the length is the exponent itself. Increasing the length from 8 to 12 provides a massive exponential jump in security compared to simply swapping a letter for a symbol like '@'."
        },
        {
          question: "Is it safe to type my real password here?",
          answer: "Yes. Our tool is 100% client-side. The JavaScript runs entirely in your browser's private memory. No data is sent over the internet to our servers. To be extra safe, you can even disconnect your internet while using this tool."
        },
        {
          question: "What is a 'Dictionary Attack'?",
          answer: "A dictionary attack uses a pre-compiled list of millions of common passwords (found in previous leaks like 'RockYou.txt'). If your password is a single English word or a common pattern, an attacker can find it in milliseconds regardless of length."
        }
      ]}
      relatedTools={[
        { name: "Bcrypt Hash Generator", url: "/bcrypt-generator" },
        { name: "UUID Generator", url: "/uuid-generator" },
        { name: "JWT Expiry Checker", url: "/jwt-expiry-checker" }
      ]}
    />
  );
}
