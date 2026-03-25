import type { Metadata } from 'next';
import ToolLayout from '@/components/ToolLayout';
import DnsLookupTool from '@/components/tools/DnsLookupTool';

export const metadata: Metadata = {
  title: 'DNS Lookup Tool (A, MX, TXT, CNAME) | Check DNS Records Online',
  description: 'Instantly lookup and verify domain DNS records including A, AAAA, MX, TXT, and CNAME. Execute secure, highly-accurate DNS over HTTPS queries directly in your browser.',
  openGraph: {
    title: 'DNS Lookup Tool (A, MX, TXT, CNAME) | Check DNS Records Online',
    description: 'Instantly lookup and verify domain DNS records including A, AAAA, MX, TXT, and CNAME. Execute secure, highly-accurate DNS over HTTPS queries directly in your browser.',
    url: 'https://devtoolslabs.com/dns-lookup',
  },
  alternates: {
    canonical: '/dns-lookup',
  },
};

export default function DnsLookupPage() {
  return (
    <ToolLayout
      title="Global DNS Record Lookup (Domain Checker)"
      intro="Webmasters and DevOps engineers frequently need to verify domain propagation and server configurations. Our advanced DNS Lookup Tool utilizes secure DNS-over-HTTPS (DoH) to simultaneously query global A, AAAA, MX, TXT, and CNAME records for any domain, all from within your browser."
      toolNode={<DnsLookupTool />}
      howTo={[
        "Enter the naked domain name (e.g., devtoolslabs.com) in the search field.",
        "Click 'Lookup' or press Enter to initiate the parallel query.",
        "The tool sends secure DoH requests directly to Cloudflare's 1.1.1.1 infrastructure.",
        "View the instantly parsed results organized beautifully by record type.",
        "Verify your IP addresses, mail server routes, and SPF/TXT verification strings."
      ]}
      examples={[
        {
          input: 'Domain: google.com\nType: A Record',
          output: "Name: google.com\nTTL: 300s\nData: 142.250.190.46"
        }
      ]}
      useCases={[
        "Verifying that a domain name has successfully propagated to a new hosting provider's IP address.",
        "Checking MX (Mail Exchange) records to ensure Google Workspace or Office 365 emails will route correctly.",
        "Validating TXT records for SSL certificate issuance, SPF (Sender Policy Framework), and domain ownership verification.",
        "Inspecting CNAME aliases used for CDNs, subdomains, and load balancers."
      ]}
      faqs={[
        {
          question: "How does this DNS tool work without a backend?",
          answer: "We utilize DNS over HTTPS (DoH) via Cloudflare's public resolver API. Your browser constructs a secure HTTP request to fetch the raw DNS JSON data, completely bypassing traditional, easily-manipulated UDP DNS queries. This means zero latency from our servers."
        },
        {
          question: "What does TTL mean?",
          answer: "TTL stands for Time To Live. It represents the number of seconds a DNS record is designed to be cached by Internet Service Providers (ISPs) and local routers before they must query the authoritative name server for an update."
        },
        {
          question: "Why check A and AAAA records simultaneously?",
          answer: "An 'A' record points a domain to an IPv4 address, while an 'AAAA' record points to an IPv6 address. Modern, high-performance web infrastructure requires both to reach the maximum number of global users seamlessly."
        },
        {
          question: "Are these results cached?",
          answer: "Because we query Cloudflare's massive public resolvers directly, the results reflect the current global cache state. This gives you a highly accurate picture of what regular users on the internet are actually seeing right now."
        },
        {
          question: "What is a TXT record used for?",
          answer: "TXT (Text) records are incredibly versatile. Today, they are primarily used by DevOps and Security teams for SPF, DKIM, and DMARC email authentication, as well as proving domain ownership to services like Google Search Console and GitHub Pages."
        }
      ]}
      relatedTools={[
        { name: "HTTP Header Parser", url: "/http-header-parser" },
        { name: "URL Encoder", url: "/url-encoder" },
        { name: "Regex Match/Extract", url: "/regex-tester" }
      ]}
    />
  );
}
