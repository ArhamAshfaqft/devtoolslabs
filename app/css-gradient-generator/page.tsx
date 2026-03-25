import React from 'react';
import ToolLayout from '@/components/ToolLayout';
import CssGradientGeneratorTool from '@/components/tools/CssGradientGeneratorTool';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CSS Gradient Generator | Linear & Radial Background Builder',
  description: 'Visually build beautiful CSS gradients instantly. Toggle between linear and radial layouts, tweak angles, and add up to 5 custom color stops to generate cross-browser compatible gradient CSS.',
  keywords: ['css gradient generator', 'linear gradient builder', 'radial gradient generator', 'css background generator', 'color stop tool'],
  alternates: {
    canonical: 'https://www.devtoolslabs.com/css-gradient-generator',
  },
  openGraph: {
    title: 'CSS Gradient Generator | Linear & Radial Background Builder',
    description: 'Visually build beautiful CSS gradients instantly. Toggle between linear and radial layouts, tweak angles, and add up to 5 custom color stops to generate cross-browser compatible gradient CSS.',
    url: 'https://devtoolslabs.com/css-gradient-generator',
  },
  alternates: {
    canonical: '/css-gradient-generator',
  },
};

export default function CssGradientGeneratorPage() {
  return (
    <ToolLayout
      title="CSS Gradient Generator"
      intro="Creating smooth, perfectly aligned CSS gradients by writing code manually is error-prone. The CSS Gradient Generator is an incredibly simple, visual workspace that lets you blend up to 5 color stops dynamically. Tweak angles, switch between circular and radial layouts, and instantly grab the auto-compiled CSS to beautify your application's backgrounds, buttons, and landing pages."
      toolNode={<CssGradientGeneratorTool />}
      howTo={[
        "Choose your base Gradient Type: 'Linear' (a straight line transition) or 'Radial' (radiating outwards from the center).",
        "If Linear is chosen, adjust the 'Direction' slider to change the angle (0° to 360°) of the color transition.",
        "Use the Color Stop managers to pick your hex colors. Slide the position bar to dictate exactly where the color transition happens (0% to 100%).",
        "Click '+ Add Stop' to add up to 5 different colors to create complex, multi-layered gradients (like rainbows or sunsets).",
        "Grab the resulting CSS block, which safely includes a solid background color fallback for older browsers that fail to parse gradients."
      ]}
      examples={[
        {
          input: "Standard Button Gradient (Linear)",
          output: "background: #4f46e5;\nbackground: linear-gradient(90deg, #4f46e5 0%, #ec4899 100%);"
        },
        {
          input: "Glowing Orb Effect (Radial)",
          output: "background: #10b981;\nbackground: radial-gradient(circle at center, #10b981 0%, #064e3b 85%);"
        }
      ]}
      useCases={[
        "Designing sleek, modern Call to Action (CTA) buttons that pop off the page via a subtle 90-degree linear gradient.",
        "Scaffolding full-page landing page backgrounds with 3 or 4 subtle brand color stops.",
        "Creating beautiful image overlays using transparent `rgba` colors in the gradient color pickers.",
        "Building 'Neumorphic' or 'Glassmorphic' light effects quickly without opening graphic tools like Figma."
      ]}
      faqs={[
        {
          question: "What is a 'Color Stop'?",
          answer: "A color stop defines a specific point along the gradient line where a color should reach its pure, unblended state. The browser automatically handles the smooth transition mathematical blending between any two stops. E.g., setting Red at 0% and Blue at 100% means the 50% mark will be exactly Purple."
        },
        {
          question: "What is the difference between Linear and Radial?",
          answer: "A Linear gradient blends colors in a straight line from one side to another based on an angle (e.g., from top to bottom, or diagonally). A Radial gradient starts at a specific point (typically the center) and radiates outward in a circular or elliptical shape."
        },
        {
          question: "Why is there a plain 'background' fallback generated?",
          answer: "While nearly 100% of modern browsers support `linear-gradient` natively, it is an industry best practice to supply a unified solid background color first. If a user is on an ancient device, or if a CSS syntax edge-case causes the gradient rule to fail to parse, the fallback color guarantees their text remains readable against a solid, similarly colored background."
        },
        {
          question: "Can I use Hex, RGB, or HSL values?",
          answer: "Yes, standard CSS `linear-gradient()` functions accept any valid CSS color unit. Our visual generator uses standard Hex codes for maximum compatibility, but you can manually alter the output code string to use `rgba(..)` if you need alpha-level transparency."
        }
      ]}
      relatedTools={[
        { name: "Grid Layout Builder", url: "/grid-generator" },
        { name: "Glassmorphism Generator", url: "/glassmorphism-generator" },
        { name: "Advanced Box-Shadow Builder", url: "/box-shadow-generator" }
      ]}
    />
  );
}
