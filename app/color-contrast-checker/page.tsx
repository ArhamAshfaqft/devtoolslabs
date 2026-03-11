import type { Metadata } from 'next';
import ToolLayout from '@/components/ToolLayout';
import ColorContrastCheckerTool from '@/components/tools/ColorContrastCheckerTool';

export const metadata: Metadata = {
  title: 'WCAG 2.1 & ADA Color Contrast Checker (Pass/Fail) | DevToolsLabs',
  description: 'Instantly calculate color contrast ratios for WCAG 2.1 AA & AAA compliance. Get automatic color fixes to meet ADA accessibility standards. 100% free & private.',
};

export default function ColorContrastCheckerPage() {
  return (
    <ToolLayout
      title="WCAG & ADA Color Contrast Checker (Free Online a11y Tool)"
      intro="Web accessibility (a11y) is a legal and ethical requirement for modern software. Our advanced contrast checker calculates relative luminance ratios and provides instant 'Fix' suggestions to help your designs meet WCAG 2.1 and ADA compliance standards."
      toolNode={<ColorContrastCheckerTool />}
      howTo={[
        "Type your foreground text color and background color in HEX format.",
        "The tool instantly calculates the contrast ratio using WCAG standardized mathematics.",
        "Check the Pass/Fail badges for WCAG 2.1 Level AA and Level AAA standards.",
        "If a color fails, click the 'Apply Fix' button to automatically find the nearest accessible version of your color."
      ]}
      examples={[
        {
          input: 'Foreground: #767676 (Medium Gray)\nBackground: #FFFFFF (White)',
          output: 'Ratio: 4.54 : 1 (Passes WCAG AA Normal Text)'
        }
      ]}
      useCases={[
        "Fixing ADA compliance violations in enterprise web applications.",
        "Designing accessible design systems that meet WCAG 2.1 AA standards.",
        "Passing automated accessibility audits from tools like Axe or Lighthouse."
      ]}
      faqs={[
        {
          question: "What is the ADA color contrast requirement?",
          answer: "The Americans with Disabilities Act (ADA) points to WCAG 2.1 Level AA as the baseline for digital accessibility. This means a minimum contrast ratio of 4.5:1 for normal text and 3:1 for large text (18pt+ or 14pt bold)."
        },
        {
          question: "How do I fix a contrast ratio error?",
          answer: "Our tool includes a unique 'Apply Fix' feature. When your colors fail, it intelligently iterates through luminance values to find the closest color to your original choice that mathematically satisfies the WCAG threshold."
        }
      ]}
      relatedTools={[
        { name: "Color Palette Generator", url: "/color-palette-generator" },
        { name: "CSS Clamp Generator", url: "/css-clamp-generator" }
      ]}
    >
        <section className="mt-12 prose prose-slate max-w-none">
            <h2>Why ADA Compliance Matters for Your Website</h2>
            <p>
                In the United States and internationally, accessibility is not just a feature—it is a legal requirement. The <strong>ADA (Americans with Disabilities Act)</strong> and Section 508 regulations require website owners to ensure their content is perceivable by everyone, including people with visual impairments.
            </p>
            <h3>Understanding the WCAG 2.1 Thresholds</h3>
            <p>
                The <strong>Web Content Accessibility Guidelines (WCAG)</strong> are the gold standard for testing digital accessibility. There are three levels of compliance:
            </p>
            <ul>
                <li><strong>Level A:</strong> The absolute minimum (rarely used as a target).</li>
                <li><strong>Level AA:</strong> The global standard for commercial websites. Requires 4.5:1 contrast.</li>
                <li><strong>Level AAA:</strong> The highest standard. Required for government or specialized sites. Requires 7:1 contrast.</li>
            </ul>
        </section>
    </ToolLayout>
  );
}
