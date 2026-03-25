import React from 'react';
import type { Metadata } from 'next';
import ToolLayout from '@/components/ToolLayout';
import HeaderMimeHubTool from '@/components/tools/HeaderMimeHubTool';

export const metadata: Metadata = {
  title: 'MIME Types & Security Headers Hub: Developer Quick Reference | DevToolsLabs',
  description: 'A comprehensive, filterable reference for HTTP Security Headers (CSP, HSTS) and MIME Types. Perfect for web server configuration and security auditing.',
  openGraph: {
    title: 'MIME Types & Security Headers Hub: Developer Quick Reference | DevToolsLabs',
    description: 'A comprehensive, filterable reference for HTTP Security Headers (CSP, HSTS) and MIME Types. Perfect for web server configuration and security auditing.',
    url: 'https://devtoolslabs.com/header-mime-hub',
  },
  alternates: {
    canonical: '/header-mime-hub',
  },
};

export default function HeaderMimeHubPage() {
  return (
    <ToolLayout
      title="MIME Types & Security Headers Hub"
      intro="Secure your web applications and configure server responses with confidence. Use this interactive hub to find definitions, best practices, and real-world examples of headers and content types."
      toolNode={<HeaderMimeHubTool />}
      howTo={[
        "Filter by category (Security, MIME Type, Caching) using the top buttons",
        "Search for a specific header or type (e.g., 'CSP' or 'JSON')",
        "Copy the pro-grade examples directly into your server configuration files"
      ]}
      examples={[
        { input: "CSP", output: "Content-Security-Policy: default-src 'self'..." },
        { input: "nosniff", output: "X-Content-Type-Options: nosniff" }
      ]}
      useCases={[
        "Configuring Nginx or Apache security headers",
        "Setting correct Content-Type for API responses",
        "Auditing website security posture"
      ]}
      faqs={[
        {
          question: "Why is the 'nosniff' header important?",
          answer: "The 'X-Content-Type-Options: nosniff' header prevents the browser from trying to guess the content type of a resource, which could lead to security vulnerabilities if an attacker manages to upload a file with a misleading extension."
        },
        {
          question: "What does CSP protect against?",
          answer: "Content Security Policy (CSP) is primarily designed to mitigate Cross-Site Scripting (XSS) attacks by strictly controlling which resources are allowed to be loaded and executed by the browser."
        }
      ]}
      relatedTools={[
        { name: "HTTP Header Parser", url: "/http-header-parser" },
        { name: "HTTP Status Codes", url: "/http-status-codes" }
      ]}
    >
      <section className="mt-12 p-8 bg-blue-50/50 rounded-2xl border border-blue-100">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Security Best Practice</h2>
        <p className="text-gray-700 text-sm leading-relaxed italic">
          "Default to deny. Start with a strict Content-Security-Policy and only whitelist the domains and sources you absolutely trust. A secure header configuration is the first line of defense in modern web infrastructure."
        </p>
      </section>
    </ToolLayout>
  );
}
