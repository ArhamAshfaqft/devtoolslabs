import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'DevToolsLabs terms of service for using our free, client-side developer utilities.',
  openGraph: {
    title: 'Terms of Service',
    description: 'DevToolsLabs terms of service for using our free, client-side developer utilities.',
    url: 'https://devtoolslabs.com/terms',
  },
  alternates: {
    canonical: '/terms',
  },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <main className="max-w-3xl mx-auto py-20 px-6">
        <h1 className="text-4xl font-bold mb-8 tracking-tight">Terms of Service</h1>
        <p className="text-sm text-gray-400 mb-10">Last updated: March 9, 2026</p>

        <div className="prose prose-gray max-w-none space-y-6 text-gray-600 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">1. Acceptance of Terms</h2>
            <p>By accessing and using DevToolsLabs (&quot;the Service&quot;), you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access the Service.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">2. Description of Service</h2>
            <p>DevToolsLabs provides a collection of free, client-side developer utilities accessible via a web browser. All tools are provided &quot;as is&quot; and are designed for development, testing, and educational purposes.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">3. Use of Service</h2>
            <p>You agree to use the Service only for lawful purposes and in accordance with these Terms. You agree not to:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>Use the Service in any way that violates any applicable law or regulation.</li>
              <li>Attempt to interfere with or disrupt the Service or its infrastructure.</li>
              <li>Use automated systems to excessively access the Service in a manner that burdens our infrastructure.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">4. Disclaimer of Warranties</h2>
            <p>The Service is provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis. DevToolsLabs makes no warranties, expressed or implied, regarding the accuracy, reliability, or availability of any tool or feature.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">5. Limitation of Liability</h2>
            <p>In no event shall DevToolsLabs be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the Service.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">6. Changes to Terms</h2>
            <p>We reserve the right to modify or replace these Terms at any time. Continued use of the Service after any changes constitutes acceptance of the new Terms.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">7. Contact</h2>
            <p>If you have questions about these Terms, please open an issue on our <a href="https://github.com/ArhamAshfaqft/devtoolslabs" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">GitHub repository</a>.</p>
          </section>
        </div>
      </main>
    </div>
  );
}
