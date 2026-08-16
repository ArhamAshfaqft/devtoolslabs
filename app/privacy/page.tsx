import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'DevToolsLabs privacy policy, including local browser processing and disclosures for the limited tools that require network requests.',
  openGraph: {
    title: 'Privacy Policy',
    description: 'DevToolsLabs privacy policy, including local browser processing and disclosures for the limited tools that require network requests.',
    url: 'https://www.devtoolslabs.com/privacy',
  },
  alternates: {
    canonical: '/privacy',
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <main className="max-w-3xl mx-auto py-20 px-6">
        <h1 className="text-4xl font-bold mb-8 tracking-tight">Privacy Policy</h1>
        <p className="text-sm text-gray-400 mb-10">Last updated: August 16, 2026</p>

        <div className="prose prose-gray max-w-none space-y-6 text-gray-600 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">1. Overview</h2>
            <p>DevToolsLabs (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) operates the devtoolslabs.com website. This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">2. Client-Side Processing</h2>
            <p>Most developer tools on DevToolsLabs process input locally within your web browser. For those local tools:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>Input is not transmitted to DevToolsLabs servers.</li>
              <li>All processing occurs locally inside the JavaScript engine of your browser.</li>
              <li>DevToolsLabs cannot see or store the values processed locally.</li>
            </ul>
            <p className="mt-3">Network-dependent tools display a notice beside the tool. DNS Lookup sends the entered domain directly to Cloudflare&apos;s public DNS-over-HTTPS resolver. cURL to Fetch sends the pasted command to the DevToolsLabs conversion endpoint, so users must remove credentials and personal data before submitting it.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">3. Analytics &amp; Cookies</h2>
            <p>We may use basic, privacy-respecting analytics services (such as Vercel Analytics) to understand aggregate traffic patterns like page views and geographic regions. These analytics do not track individual users, store personal data, or use invasive cookies.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">4. Third-Party Links</h2>
            <p>Our website may contain links to external sites that are not operated by us. We have no control over, and assume no responsibility for, the content or privacy practices of any third-party sites.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">5. Changes to This Policy</h2>
            <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">6. Contact</h2>
            <p>If you have any questions about this Privacy Policy, please open an issue on our <a href="https://github.com/ArhamAshfaqft/devtoolslabs" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">GitHub repository</a>.</p>
          </section>
        </div>
      </main>
    </div>
  );
}
