import type { Metadata } from 'next';
import ToolLayout from '@/components/ToolLayout';
import ColorContrastCheckerTool from '@/components/tools/ColorContrastCheckerTool';

export const metadata: Metadata = {
  title: 'WCAG Color Contrast Checker (Free Online Tool) | Instantly Verify a11y',
  description: 'Instantly calculate relative luminance color contrast ratios to ensure your web designs meet strict WCAG 2.0 AA and AAA accessibility requirements.',
};

export default function ColorContrastCheckerPage() {
  return (
    <ToolLayout
      title="WCAG Color Contrast Checker (Verify Accessibility Online)"
      intro="Web accessibility (a11y) is a critical requirement for modern software development. This tool calculates the luminance contrast ratio between a foreground text color and a background color. It verifies whether your chosen color palette passes the strict WCAG (Web Content Accessibility Guidelines) AA and AAA standard thresholds."
      toolNode={<ColorContrastCheckerTool />}
      howTo={[
        "Type your foreground color (the text color) into the left box in HEX format (e.g., #FFFFFF).",
        "Type your background color into the right box.",
        "Alternatively, click the color swatch to use your operating system's native color picker.",
        "The preview box will immediately update to reflect your choices and calculate the exact ratio.",
        "Below the preview, check the four panels to verify if your combination passes the WCAG AA and AAA validation for normal and large-scale text."
      ]}
      examples={[
        {
          input: 'Foreground: #FFFFFF (White)\nBackground: #111827 (Dark Gray)',
          output: 'Ratio: 15.03 : 1 (Passes all 4 WCAG tests)'
        },
        {
          input: 'Foreground: #888888 (Medium Gray)\nBackground: #FFFFFF (White)',
          output: 'Ratio: 3.54 : 1 (Fails AA Normal, AAA Normal, and AAA Large)'
        }
      ]}
      useCases={[
        "Auditing an existing frontend React or Tailwind codebase for accessibility compliance.",
        "Choosing accessible brand colors during a UI/UX design phase in Figma.",
        "Diagnosing and fixing Google Lighthouse 'Background and foreground colors do not have a sufficient contrast ratio' SEO warnings."
      ]}
      faqs={[
        {
          question: "How is the contrast ratio mathematically calculated?",
          answer: "The WCAG 2.0 defines contrast as '(L1 + 0.05) / (L2 + 0.05)', where L1 is the relative luminance of the lighter color and L2 is the relative luminance of the darker color. The relative luminance itself parses the sRGB gamma values of the hex vector."
        },
        {
          question: "What is the difference between WCAG AA and AAA?",
          answer: "WCAG AA is the standard legal baseline for most international business regulations (like the ADA). It requires a contrast ratio of at least 4.5:1 for normal text. AAA is the absolute highest standard of accessibility, requiring a much stricter ratio of 7.0:1 for normal text."
        },
        {
          question: "Why does text size affect the required contrast ratio?",
          answer: "Visually, larger fonts inherently possess a thicker stroke and higher readable surface area, making them perceptible to visually impaired users at a lower intrinsic contrast ratio. WCAG stipulates that 'Large Text' (typically 18pt or 14pt bold) only requires a 3.0:1 ratio to pass AA validation."
        },
        {
          question: "I failed the contrast test by 0.1. Can I still use the color?",
          answer: "In heavily audited environments or government contracts, no. The WCAG automated testing algorithms are binary. If your ratio is 4.49, you will trigger an accessibility violation. You must darken the background or lighten the text until it hits exactly 4.50 or higher."
        },
        {
          question: "Does pure black on pure white have the highest ratio?",
          answer: "Yes. Pure black (#000000) on pure white (#FFFFFF) yields the maximum mathematically possible contrast ratio of 21:1. Conversely, two identical colors yield the minimum possible ratio of 1:1."
        }
      ]}
      relatedTools={[
        { name: "CSS Clamp Generator", url: "/css-clamp-generator" },
        { name: "JSON Escape", url: "/json-escape-unescape" }
      ]}
    />
  );
}
