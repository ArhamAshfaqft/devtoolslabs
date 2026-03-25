import React from 'react';
import ToolLayout from '@/components/ToolLayout';
import GlassmorphismGeneratorTool from '@/components/tools/GlassmorphismGeneratorTool';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Glassmorphism CSS Generator | Create Frosted Glass UI',
  description: 'Visually generate copy-paste CSS for the popular Glassmorphism (frosted glass) UI trend. Adjust blur, transparency, borders, and colors instantly in the browser.',
  keywords: ['glassmorphism generator', 'frosted glass css', 'css blur background', 'backdrop-filter generator', 'neumorphism generator ui'],
  alternates: {
    canonical: 'https://www.devtoolslabs.com/glassmorphism-generator',
  },
  openGraph: {
    title: 'Glassmorphism CSS Generator | Create Frosted Glass UI',
    description: 'Visually generate copy-paste CSS for the popular Glassmorphism (frosted glass) UI trend. Adjust blur, transparency, borders, and colors instantly in the browser.',
    url: 'https://devtoolslabs.com/glassmorphism-generator',
  },
  alternates: {
    canonical: '/glassmorphism-generator',
  },
};

export default function GlassmorphismGeneratorPage() {
  return (
    <ToolLayout
      title="Glassmorphism CSS Generator"
      intro="Glassmorphism is one of the most popular modern UI design trends, defined by its 'frosted glass' aesthetic, vivid background colors bleeding through, and light borders. Manually tweaking CSS properties like `backdrop-filter: blur(px)` and `rgba` alpha channels to get the perfect glassy look can be tedious. Our interactive Glassmorphism Generator lets you visually adjust all parameters in real-time and outputs production-ready CSS instantly."
      toolNode={<GlassmorphismGeneratorTool />}
      howTo={[
        "Use the sliders to adjust the core visual properties of the glass element.",
        "Change the Blur Value to increase or decrease the frosted effect on the content behind the glass.",
        "Adjust the Transparency slider to let more or less of the background color shine through.",
        "Select a Glass Color. White (#ffffff) is standard for light mode, while Black (#000000) works best for dark mode glass.",
        "Click the Output 'Copy CSS' button to instantly grab your `backdrop-filter` and `rgba` code."
      ]}
      examples={[
        {
          input: "Standard Light Glass",
          output: "backdrop-filter: blur(10px);\nbackground: rgba(255, 255, 255, 0.2);\nborder: 1px solid rgba(255, 255, 255, 0.1);"
        },
        {
          input: "Dark Mode Frosted Glass",
          output: "backdrop-filter: blur(16px);\nbackground: rgba(0, 0, 0, 0.4);\nborder: 1px solid rgba(0, 0, 0, 0.2);"
        }
      ]}
      useCases={[
        "Designing modern dashboard UI cards that float over colorful gradient backgrounds.",
        "Creating sleek, Apple-style sticky navigation bars that blur the scrolling page content beneath them.",
        "Building beautiful login modals and hero section overlays.",
        "Prototyping 'Dark Mode' components quickly without opening Figma."
      ]}
      faqs={[
        {
          question: "What CSS property makes the glass blur effect work?",
          answer: "The magic CSS property is `backdrop-filter: blur(10px)`. Unlike the standard `filter` property (which blurs the element itself), `backdrop-filter` applies the effect to everything positioned *behind* the element."
        },
        {
          question: "Why is the background color set using rgba?",
          answer: "`rgba` stands for Red, Green, Blue, Alpha. The Alpha channel controls the transparency/opacity of the background element. To make a glass effect work, the background must be semi-transparent (e.g., 20% opacity) so the blurred layers below can be seen."
        },
        {
          question: "Is Glassmorphism supported on all browsers?",
          answer: "Yes, currently `backdrop-filter` has excellent browser support across modern versions of Chrome, Edge, Safari, and Firefox. Our generator also includes the `-webkit-backdrop-filter` prefix to ensure maximum compatibility on older Apple devices."
        },
        {
          question: "How do I make a dark mode glass component?",
          answer: "Instead of a white background color (`#ffffff`), switch the Glass Color in the tool to black (`#000000`). Then, slightly increase the Transparency value to ensure it looks distinct over dark backgrounds. You should also ensure any inside text is white."
        }
      ]}
      relatedTools={[
        { name: "CSS Keyframer", url: "/css-keyframes" },
        { name: "Color Palette Generator", url: "/color-palette-generator" },
        { name: "WCAG Contrast Checker", url: "/color-contrast-checker" }
      ]}
    />
  );
}
