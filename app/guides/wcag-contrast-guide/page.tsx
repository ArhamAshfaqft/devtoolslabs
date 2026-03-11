import React from 'react';
import type { Metadata } from 'next';
import GuideLayout from '@/components/GuideLayout';

export const metadata: Metadata = {
  title: 'WCAG Color Contrast & ADA Compliance Guide for Developers | DevToolsLabs',
  description: 'Everything you need to know about web accessibility contrast standards. Master WCAG 2.1 Level AA/AAA and ensure your site is ADA compliant.',
};

export default function WcagContrastGuidePage() {
  return (
    <GuideLayout
      title="The Developer's Guide to WCAG Color Contrast & ADA Compliance"
      description="Web accessibility is not just a nice-to-have; it is a legal requirement. Learn how to master color contrast to build inclusive products."
      publishDate="March 12, 2026"
      readTime="12 min"
      relatedTools={[
        { name: "Color Contrast Checker", url: "/color-contrast-checker" },
        { name: "Color Palette Generator", url: "/color-palette-generator" }
      ]}
    >
      <section>
        <h2>The Legal Landscape: ADA & Section 508</h2>
        <p>
          In the United States, the <strong>Americans with Disabilities Act (ADA)</strong> Title III has been interpreted by courts to apply to websites. This means business websites must be accessible to people with disabilities, including those with low vision or color blindness.
        </p>
        <p>
          The globally recognized standard for measuring this accessibility is the <strong>WCAG (Web Content Accessibility Guidelines)</strong>.
        </p>
      </section>

      <section>
        <h2>Level AA vs. Level AAA: Which do you need?</h2>
        <p>
          The WCAG 2.1 provides three levels of compliance:
        </p>
        <ul>
          <li><strong>Level AA:</strong> The "sweet spot" and the target for most commercial, e-commerce, and SaaS websites. It requires a contrast ratio of <strong>4.5:1</strong> for normal text.</li>
          <li><strong>Level AAA:</strong> The ultimate standard. Often required for government projects or educational materials. It requires a ratio of <strong>7:1</strong> for normal text.</li>
        </ul>
      </section>

      <div className="bg-blue-50 p-8 rounded-2xl border border-blue-100 my-10">
        <h3 className="text-blue-900 mt-0">The 4.5:1 Rule</h3>
        <p className="text-blue-800 mb-0 leading-relaxed">
          Why 4.5:1? This specific ratio was chosen because it compensates for the loss in contrast sensitivity usually experienced by users with vision loss equivalent to approximately 20/40 vision.
        </p>
      </div>

      <section>
        <h2>What Counts as "Large Text"?</h2>
        <p>
          The WCAG guidelines allow for a lower contrast ratio of <strong>3:1</strong> for large text. But what qualifies as large?
        </p>
        <ul>
          <li>At least 18pt (roughly 24px) normal weight.</li>
          <li>At least 14pt (roughly 18.6px) <strong>bold</strong> weight.</li>
        </ul>
        <p>If your text is smaller than this, you must hit the 4.5:1 target to pass Level AA.</p>
      </section>

      <section>
        <h2>Practical Tips for Designers & Developers</h2>
        <ol>
            <li><strong>Design in Grayscale First:</strong> If your UI is usable in black and white, it is likely highly accessible.</li>
            <li><strong>Don't Rely on Color Alone:</strong> Never use color as the <em>only</em> way to convey information (e.g., a red border for an error is good, but you also need an error icon or text label).</li>
            <li><strong>Automate Your Audit:</strong> Use tools like <strong>Lighthouse</strong> or our own <strong>Contrast Checker</strong> during the development phase to catch issues before they reach production.</li>
        </ol>
      </section>

      <section>
          <h2>Summary</h2>
          <p>
              Accessibility is the hallmark of professional software engineering. By mastering color contrast, you not only avoid legal risks but also ensure your product is usable by the widest possible audience.
          </p>
      </section>
    </GuideLayout>
  );
}
