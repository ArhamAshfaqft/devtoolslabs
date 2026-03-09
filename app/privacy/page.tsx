import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'DevToolsLabs privacy policy. All tools run 100% client-side in your browser. No data is ever sent to our servers.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <main className="max-w-3xl mx-auto py-20 px-6">
        <h1 className="text-4xl font-bold mb-8 tracking-tight">Privacy Policy</h1>
        <p className="text-sm text-gray-400 mb-10">Last updated: March 9, 2026</p>

        <div className="prose prose-gray max-w-none space-y-6 text-gray-600 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">1. Overview</h2>
            <p>DevToolsLabs (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) operates the devtoolslabs.com website. This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">2. Client-Side Processing</h2>
            <p>All developer tools on DevToolsLabs are engineered to run <strong>100% client-side</strong> within your web browser. This means:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>No data you input into any tool is ever transmitted to our servers.</li>
              <li>All processing occurs locally inside the JavaScript engine of your browser.</li>
              <li>We cannot see, store, or access any code, text, JSON, or tokens you paste into our tools.</li>
            </ul>
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
