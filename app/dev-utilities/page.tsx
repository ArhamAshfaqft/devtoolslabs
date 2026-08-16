import type { Metadata } from 'next';
import CategoryHub from '@/components/CategoryHub';

export const metadata: Metadata = {
  title: 'Developer Utilities | HTTP, Git, DNS & Diagrams',
  description: 'Focused developer utilities for HTTP debugging, Git commands, DNS records, diagrams, and status-code reference.',
  alternates: { canonical: '/dev-utilities' },
};

export default function DevUtilityToolsHub() {
  return <CategoryHub
    title="System & Developer Utilities"
    intro="Handle frequent development tasks with focused utilities for network inspection, Git workflows, diagrams, and protocol references."
    tools={[
      { badge: 'HDR', title: 'HTTP Header Parser', href: '/http-header-parser', description: 'Parse raw HTTP request and response headers into structured data.' },
      { badge: 'DNS', title: 'DNS Lookup', href: '/dns-lookup', description: 'Query A, AAAA, MX, TXT, and CNAME records through DNS over HTTPS.' },
      { badge: 'HTTP', title: 'HTTP Status Codes', href: '/http-status-codes', description: 'Explore status-code meanings and appropriate usage through an interactive reference.' },
      { badge: 'GIT', title: 'Git Command Generator', href: '/git-command-generator', description: 'Build common Git commands from clear, reviewable selections.' },
      { badge: 'MMD', title: 'Mermaid Diagram Playground', href: '/diagram-playground', description: 'Create and preview Mermaid flowcharts, sequences, and architecture diagrams.' },
      { badge: 'cURL', title: 'cURL to Fetch', href: '/curl-to-fetch', description: 'Convert sanitized cURL commands into JavaScript fetch() calls.' },
    ]}
  />;
}
