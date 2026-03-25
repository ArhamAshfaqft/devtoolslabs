import React from 'react';
import ToolLayout from '@/components/ToolLayout';
import SvgShapeDividerTool from '@/components/tools/SvgShapeDividerTool';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SVG Shape Divider Generator | Wavy CSS Section Transitions',
  description: 'Visually generate beautiful, responsive SVG shape dividers for landing pages. Create waves, curves, or slanted angles to separate sections smoothly with HTML and CSS.',
  keywords: ['svg shape divider', 'wavy bottom css', 'svg section divider', 'css slanted div', 'curve section transition bottom'],
  alternates: {
    canonical: 'https://www.devtoolslabs.com/svg-shape-divider',
  },
  openGraph: {
    title: 'SVG Shape Divider Generator | Wavy CSS Section Transitions',
    description: 'Visually generate beautiful, responsive SVG shape dividers for landing pages. Create waves, curves, or slanted angles to separate sections smoothly with HTML and CSS.',
    url: 'https://devtoolslabs.com/svg-shape-divider',
  },
  alternates: {
    canonical: '/svg-shape-divider',
  },
};

export default function SvgShapeDividerPage() {
  return (
    <ToolLayout
      title="SVG Shape Divider Generator"
      intro="Flat, straight lines between sections of a landing page are boring. Modern web design uses custom SVG paths to create beautiful waves, slants, and curved transitions that guide the user's eye down the page. Our SVG Shape Divider Generator lets you visually select a shape, adjust its height, and invert its position, instantly generating the production-ready HTML and CSS required to implement it beautifully."
      toolNode={<SvgShapeDividerTool />}
      howTo={[
        "Select the Shape Style you prefer from the preset buttons (Waves, Tilt, Curve, Arrow, Triangle).",
        "Set the Fill Color to precisely match the background color of the section touching the divider. (e.g., if the section below the wave is white, the 'Fill Color' should be white).",
        "Adjust the Height slider to make the wave more aggressive or subtle.",
        "Check the 'Invert (Top)' box if you want the divider to sit at the top of a section rather than the bottom.",
        "Copy the HTML snippet into your template (inside a section wrapper), and the CSS snippet into your stylesheet."
      ]}
      examples={[
        {
          input: "Wave Divider (HTML)",
          output: "<div class=\"custom-shape-divider\">\n  <svg viewBox=\"0 0 1200 120\" preserveAspectRatio=\"none\">\n    <path d=\"M321...\" fill=\"#ffffff\"></path>\n  </svg>\n</div>"
        },
        {
          input: "Slanted / Tilted Section (CSS)",
          output: ".custom-shape-divider {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  width: 100%;\n  overflow: hidden;\n}"
        }
      ]}
      useCases={[
        "SaaS Landing Pages jumping from a dark blue 'Hero' section into a white 'Features' section via a subtle curved transition.",
        "Creating playful, wavy separators for creative portfolio websites or e-commerce storefronts.",
        "Designing directional 'Arrow' or 'Triangle' dividers that subconsciously point users towards a call-to-action (CTA) button.",
        "Replacing heavy, inefficient PNG background image dividers with lightweight, responsive, mathematical SVG paths."
      ]}
      faqs={[
        {
          question: "How do I implement the code on my real website?",
          answer: "First, you need a wrapping container for the section (like a `<header>` or `<section>` tag) that has `position: relative;` applied to it in CSS. Then, simply paste the generated HTML block directly inside that container, either at the very top or very bottom."
        },
        {
          question: "Why does the divider overlap my text?",
          answer: "The divider uses `position: absolute;` so it does not affect the flow of your document. If it sits on top of text, you need to add padding-bottom (or padding-top) to your main section wrapper equal to the height of the SVG (e.g., `padding-bottom: 120px;`)."
        },
        {
          question: "Is the generated SVG responsive on mobile?",
          answer: "Yes! By using the `viewBox=\"0 0 1200 120\"` and `preserveAspectRatio=\"none\"` attributes on the SVG, the path stretches dynamically horizontally to fill the screen on any device, entirely automatically."
        },
        {
          question: "Why should I use SVG instead of a PNG or CSS clip-path?",
          answer: "PNGs are pixelated on high-DPI screens and have large file sizes. `clip-path` in CSS is great but lacks cross-browser reliability for highly complex wavy shapes. Inline SVG is crisp, infinitely scalable, and performs identically in every modern browser."
        }
      ]}
      relatedTools={[
        { name: "Glassmorphism Generator", url: "/glassmorphism-generator" },
        { name: "Box Shadow Builder", url: "/box-shadow-generator" },
        { name: "SVG Path Visualizer", url: "/svg-path-visualizer" }
      ]}
    />
  );
}
