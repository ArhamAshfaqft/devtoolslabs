import type { Metadata } from 'next';
import ToolLayout from '@/components/ToolLayout';
import CspGeneratorTool from '@/components/tools/CspGeneratorTool';

export const metadata: Metadata = {
  title: 'Content Security Policy (CSP) Header Generator | Free Online Wizard',
  description: 'Easily build robust Content Security Policy (CSP) headers for your website. Protect against XSS and data injection attacks with our visual policy builder.',
  openGraph: {
    title: 'Content Security Policy (CSP) Header Generator | Free Online Wizard',
    description: 'Easily build robust Content Security Policy (CSP) headers for your website. Protect against XSS and data injection attacks with our visual policy builder.',
    url: 'https://devtoolslabs.com/csp-generator',
  },
  alternates: {
    canonical: '/csp-generator',
  },
};

export default function CspGeneratorPage() {
  return (
    <ToolLayout
      title="Content Security Policy (CSP) Header Generator"
      intro="Content Security Policy (CSP) is a critical security layer that helps detect and mitigate certain types of attacks, including Cross-Site Scripting (XSS) and data injection attacks. Building a policy manually can be complex; our visual generator helps you construct valid, secure headers in seconds."
      toolNode={<CspGeneratorTool />}
      howTo={[
        "Customize each CSP directive (like script-src, img-src) by adding allowed sources.",
        "Use 'self' to allow resources from your own domain, or list external URLs.",
        "The policy header is generated in real-time at the top of the interface.",
        "Click 'COPY HEADER' to copy the full string for your server configuration or meta tag."
      ]}
      examples={[
        {
          input: "default-src 'self'; script-src 'self' trusted.com;",
          output: "Only allows scripts from your domain and trusted.com."
        }
      ]}
      useCases={[
        "Securing a production Next.js or React application against XSS vulnerabilities.",
        "Limiting where frames and objects can be loaded from to prevent clickjacking.",
        "Ensuring all connections (AJAX/Fetch) are made restricted to specific API endpoints."
      ]}
      faqs={[
        {
          question: "What is 'self'?",
          answer: "'self' is a keyword that refers to the origin from which the protected document is being served, including the same URL scheme and port number."
        },
        {
          question: "What is the difference between frame-src and child-src?",
          answer: "frame-src specifies valid sources for nested browsing contexts (iframes). child-src was intended to cover both iframes and workers, but it is deprecated in favor of frame-src and worker-src in newer CSP versions."
        },
        {
          question: "Does CSP prevent all Cross-Site Scripting (XSS)?",
          answer: "While CSP is an incredibly powerful defense-in-depth layer, it should be used alongside input sanitization and output encoding for a complete security posture."
        },
        {
          question: "Why use CSP?",
          answer: "It is one of the most effective ways to prevent hackers from executing malicious JavaScript on your site. Modern browsers won't run external scripts unless they are specifically whitelisted in your policy."
        },
        {
          question: "Can I use CSP in a <meta> tag?",
          answer: "Yes, you can place your policy in an HTML meta tag like this: <meta http-equiv='Content-Security-Policy' content='...'>, though setting it via server headers is generally preferred for performance and edge-case support."
        }
      ]}
      relatedTools={[
        { name: "HTTP Header Parser", url: "/http-header-parser" },
        { name: "JWT Validator", url: "/jwt-validator" },
        { name: "Password Entropy", url: "/password-entropy" }
      ]}
    />
  );
}
