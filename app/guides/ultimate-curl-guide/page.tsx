import React from 'react';
import type { Metadata } from 'next';
import GuideLayout from '@/components/GuideLayout';

export const metadata: Metadata = {
  title: 'The Ultimate Guide to cURL Commands: Examples & Best Practices | DevToolsLabs',
  description: 'Master cURL for API testing, file downloads, and server debugging. A comprehensive guide with real-world examples for developers and DevOps engineers.',
};

export default function CurlGuidePage() {
  return (
    <GuideLayout
      title="The Ultimate Guide to cURL Commands"
      description="cURL is the Swiss Army knife of data transfer. Whether you are debugging an API or downloading a script, these essential commands will save you hours of work."
      publishDate="March 12, 2026"
      readTime="8 min"
      relatedTools={[
        { name: "cURL to Fetch Converter", url: "/curl-to-fetch" },
        { name: "HTTP Header Parser", url: "/http-header-parser" }
      ]}
    >
      <section>
        <h2>What is cURL?</h2>
        <p>
          cURL (short for "Client URL") is a command-line tool and library for transferring data with URLs. It supports a vast range of protocols, including HTTP, HTTPS, FTP, and more. For most web developers, it is the primary way to test REST APIs without a browser.
        </p>
      </section>

      <section>
        <h2>The Basics: Simple GET Requests</h2>
        <p>The most basic cURL command is just the tool name followed by a URL:</p>
        <pre><code>curl https://api.example.com/data</code></pre>
        <p>To view the response headers along with the body, use the <code>-i</code> flag:</p>
        <pre><code>curl -i https://api.example.com/data</code></pre>
      </section>

      <section>
        <h2>Sending Data with POST</h2>
        <p>
          To create or update resources, you will use the <code>-X POST</code> method along with the <code>-d</code> (data) flag:
        </p>
        <pre><code>curl -X POST -d "name=John&email=john@example.com" https://api.example.com/users</code></pre>
        <p>
          For JSON payloads, which are the standard for modern APIs, you must explicitly set the <code>Content-Type</code> header using the <code>-H</code> flag:
        </p>
        <pre><code>{`curl -X POST -H "Content-Type: application/json" -d '{"name": "John", "age": 30}' https://api.example.com/users`}</code></pre>
      </section>

      <div className="bg-gray-50 border-l-4 border-blue-500 p-6 my-8">
        <h3 className="text-gray-900 mt-0">Pro Tip: cURL to Fetch</h3>
        <p className="text-gray-700 text-sm mb-0">
          If you have a complex cURL command from your browser's dev tools or documentation, you can use our <strong>cURL to Fetch</strong> tool to instantly convert it into a JavaScript snippet for your frontend code.
        </p>
      </div>

      <section>
        <h2>Uploading Files</h2>
        <p>
          Need to test a file upload endpoint? Use the <code>-F</code> (form) flag. The <code>@</code> symbol tells cURL to read the file from your local disk:
        </p>
        <pre><code>curl -F "profile_picture=@/path/to/image.png" https://api.example.com/upload</code></pre>
      </section>

      <section>
        <h2>Authentication</h2>
        <p>
          Most APIs are secured. For Basic Auth, use the <code>-u</code> flag:
        </p>
        <pre><code>curl -u "username:password" https://api.example.com/secure</code></pre>
        <p>
          For Bearer Tokens (common in JWT-based systems), use a custom Authorization header:
        </p>
        <pre><code>{`curl -H "Authorization: Bearer YOUR_TOKEN_HERE" https://api.example.com/protected`}</code></pre>
      </section>

      <section>
        <h2>Summary</h2>
        <p>
          Mastering cURL makes you a more efficient developer. It allows you to isolate server-side behavior from frontend bugs and provides a platform-independent way to share API reproduction steps.
        </p>
      </section>
    </GuideLayout>
  );
}
