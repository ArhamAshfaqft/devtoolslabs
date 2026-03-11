import React from 'react';
import type { Metadata } from 'next';
import GuideLayout from '@/components/GuideLayout';

export const metadata: Metadata = {
  title: 'Understanding CORS: The Definitive Guide for Developers | DevToolsLabs',
  description: 'Master Cross-Origin Resource Sharing (CORS). Learn how preflight requests, Access-Control headers, and security policies work to protect your web applications.',
};

export default function CorsGuidePage() {
  return (
    <GuideLayout
      title="Understanding CORS: Data Security & The Preflight Headache"
      description="Cross-Origin Resource Sharing (CORS) is the #1 cause of 'Network Error' messages for modern developers. Learn exactly how it works and how to fix it securely."
      publishDate="March 12, 2026"
      readTime="10 min"
      relatedTools={[
        { name: "HTTP Header Parser", url: "/http-header-parser" },
        { name: "HTTP Status Codes", url: "/http-status-codes" }
      ]}
    >
      <section>
        <h2>What is CORS?</h2>
        <p>
          CORS stands for <strong>Cross-Origin Resource Sharing</strong>. It is a security mechanism implemented by browsers that allows or restricts requested resources on a web page to be requested from another domain outside the domain from which the first resource was served.
        </p>
        <p>
          Legacy browsers strictly followed the <strong>Same-Origin Policy (SOP)</strong>, which barred a script on <code>domain-a.com</code> from ever touching an API on <code>domain-b.com</code>. CORS provides a safe way to 'poke holes' in that policy for legitimate cross-domain communication.
        </p>
      </section>

      <section>
        <h2>The Core Headers</h2>
        <p>
          CORS is controlled primarily through HTTP response headers sent by the server. Here are the heavy hitters:
        </p>
        <ul>
          <li><code>Access-Control-Allow-Origin</code>: The most critical header. It specifies which origins are allowed to access the resource.</li>
          <li><code>Access-Control-Allow-Methods</code>: A comma-separated list of allowed HTTP methods (GET, POST, etc.).</li>
          <li><code>Access-Control-Allow-Headers</code>: Specifies which custom headers can be sent in the actual request.</li>
        </ul>
      </section>

      <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 my-8">
        <h3 className="text-blue-900 mt-0">Why use '*' is dangerous</h3>
        <p className="text-blue-800 text-sm mb-0">
          Setting <code>Access-Control-Allow-Origin: *</code> allowed anyone to call your API. While useful for public data, it should <strong>never</strong> be used for authenticated endpoints as it allows malicious sites to attempt credential-based attacks via CSRF.
        </p>
      </div>

      <section>
        <h2>The Preflight Request (OPTIONS)</h2>
        <p>
          Ever noticed a mysterious <code>OPTIONS</code> request in your Network tab before your actual <code>POST</code> request? That is a <strong>Preflight Request</strong>.
        </p>
        <p>
          The browser sends this request automatically to verify that the server understands and permits the 'risky' request you are about to make. A request is preflighted if:
        </p>
        <ol>
          <li>It uses a method other than GET, HEAD, or POST.</li>
          <li>It uses custom headers (like <code>Authorization</code> or <code>X-API-Key</code>).</li>
          <li>The Content-Type is not one of: <code>application/x-www-form-urlencoded</code>, <code>multipart/form-data</code>, or <code>text/plain</code>.</li>
        </ol>
      </section>

      <section>
        <h2>Common Fixes for Developers</h2>
        <p>
          If you are seeing <code>'Access to fetch at ... has been blocked by CORS policy'</code>, here is your checklist:
        </p>
        <ul>
          <li><strong>Check the Protocol:</strong> Origins are sensitive. <code>http://localhost</code> and <code>https://localhost</code> are different origins.</li>
          <li><strong>Server-Side Middleware:</strong> Use standard libraries like <code>cors</code> for Express or <code>CORSMiddleware</code> for FastAPI rather than manual header injection.</li>
          <li><strong>Trailing Slashes:</strong> Ensure your allowed origin in the server config perfectly matches the URL in the browser (down to the trailing slash).</li>
        </ul>
      </section>

      <section>
        <h2>Summary</h2>
        <p>
          CORS is not a bug; it is a shield. By understanding the handshake between the browser and the server, you can build secure, cross-domain applications without pulling your hair out.
        </p>
      </section>
    </GuideLayout>
  );
}
