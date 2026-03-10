import React from 'react';
import type { Metadata } from 'next';
import GuideLayout from '@/components/GuideLayout';

export const metadata: Metadata = {
  title: 'How Unix Timestamps Work: The Developer Guide to Epoch Time | DevToolsLabs',
  description: 'Understand the Unix epoch, how to convert timestamps to human-readable dates, and how to handle timezones in your web applications.',
};

export default function UnixTimestampGuidePage() {
  return (
    <GuideLayout
      title="How Unix Timestamps Work: The Developer's Guide to Epoch Time"
      description="Whether you're working with databases, APIs, or logs, you'll inevitably encounter a long string of numbers representing a point in time. This is the Unix Timestamp. In this guide, we'll explain how it works and how to handle it correctly."
      publishDate="March 10, 2026"
      readTime="6 min"
      relatedTools={[
        { name: "Unix Timestamp Converter", url: "/timestamp-converter" },
        { name: "JSON Formatter", url: "/json-formatter" },
        { name: "JWT Expiry Checker", url: "/jwt-expiry-checker" }
      ]}
    >
      <section>
        <h2>What is a Unix Timestamp?</h2>
        <p>
          The <strong>Unix Timestamp</strong> (also known as Epoch time or POSIX time) is a system for describing a point in time. It is defined as the number of seconds that have elapsed since <strong>00:00:00 UTC, Thursday, 1 January 1970</strong>, minus leap seconds.
        </p>
        <p>
          It is widely used in computing because it represents a specific moment in history as a single, simple integer, making it incredibly easy for computers to sort, compare, and perform math on dates.
        </p>
      </section>

      <section>
        <h2>The "Unix Epoch"</h2>
        <p>
          January 1st, 1970, is what we call the <strong>Epoch</strong>. Every timestamp is simply an offset from this starting point. 
        </p>
        <ul>
          <li><strong>0:</strong> Exactly midnight on Jan 1, 1970.</li>
          <li><strong>1672531200:</strong> Midnight on Jan 1, 2023.</li>
          <li><strong>-631152000:</strong> Midnight on Jan 1, 1950 (Negative numbers represent dates before the epoch).</li>
        </ul>
      </section>

      <section>
        <h2>Seconds vs. Milliseconds</h2>
        <p>
          One of the most common bugs in web development is confusing <strong>Seconds</strong> and <strong>Milliseconds</strong>.
        </p>
        <ul>
          <li><strong>Unix Standard:</strong> Measured in seconds (usually a 10-digit number).</li>
          <li><strong>JavaScript Standard:</strong> Measured in milliseconds (usually a 13-digit number).</li>
        </ul>
        <p>
          In JavaScript, <code>Date.now()</code> returns milliseconds. If you're passing this to an API that expects Unix seconds, you must divide by 1000.
        </p>
        <pre>{`const seconds = Math.floor(Date.now() / 1000);`}</pre>
      </section>

      <section>
        <h2>The Year 2038 Problem (Y2K38)</h2>
        <p>
          On January 19, 2038, at 03:14:07 UTC, the Unix timestamp will exceed the maximum value that can be stored in a 32-bit signed integer (<code>2,147,483,647</code>). 
        </p>
        <p>
          When this happens, the counter will wrap around to a negative number, effectively "resetting" time to 1901. Most modern systems have already migrated to <strong>64-bit integers</strong>, which can store timestamps for hundreds of billions of years, but legacy systems may still be at risk.
        </p>
      </section>

      <section>
        <h2>Best Practices for Developers</h2>
        <h3>1. Always Store as UTC</h3>
        <p>
          Never store timestamps in a local timezone. Always store the Unix integer (UTC) in your database. This avoids countless "daylight savings" and "offset" bugs.
        </p>
        
        <h3>2. Format on the Frontend</h3>
        <p>
          Keep the data as an integer until the very last moment. Let the user's browser handle the conversion to their specific local timezone for display.
        </p>
      </section>

      <section>
        <h2>Summary</h2>
        <p>
          Unix timestamps are the "universal language" of time in software engineering. By understanding the 1970 starting point and the difference between seconds and milliseconds, you'll be able to build much more resilient time-based systems.
        </p>
      </section>
    </GuideLayout>
  );
}
