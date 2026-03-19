import React from 'react';
import ToolLayout from '@/components/ToolLayout';
import BoxShadowGeneratorTool from '@/components/tools/BoxShadowGeneratorTool';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Advanced CSS Box-Shadow Generator & Layer Builder',
  description: 'Visually generate beautiful, smooth CSS box-shadows. Adjust X, Y, Blur, Spread, Opacity, and Inset properties to easily create neumorphic designs or modern card elevations.',
  keywords: ['box shadow generator', 'css drop shadow', 'neumorphism shadow generator', 'layered box shadow', 'css elevation shadow', 'inset shadow builder'],
  alternates: {
    canonical: 'https://www.devtoolslabs.com/box-shadow-generator',
  },
};

export default function BoxShadowGeneratorPage() {
  return (
    <ToolLayout
      title="Advanced CSS Box-Shadow Generator"
      intro="Creating the perfect CSS `box-shadow` is notoriously difficult when writing code by hand. A great shadow distinguishes premium, modern UI from flat, uninspired design. Our interactive Box-Shadow Generator allows you to visually tweak the X/Y offsets, blur radius, spread, and opacity to craft the perfect drop shadow or inset shadow. Instantly grab the browser-prefixed CSS for your Next.js, React, or standard HTML projects."
      toolNode={<BoxShadowGeneratorTool />}
      howTo={[
        "Adjust the X and Y Offsets to dictate where the light source is coming from.",
        "Increase the Blur Radius to make the shadow softer and more diffuse, or decrease it for a hard, pixel-art style drop.",
        "Use the Spread Radius to make the shadow larger (positive) or smaller (negative) than the base element.",
        "Toggle the 'Inset' switch to push the shadow inside the box, creating a carved-out, debossed effect.",
        "Change the Background and Box colors in the preview area to ensure your shadow looks good in context.",
        "Click any Preset (like 'Neumorph') for a one-click foundational style, then tweak to perfection."
      ]}
      examples={[
        {
          input: "Soft Modern Elevation (Card)",
          output: "box-shadow: 0px 10px 25px -5px rgba(0, 0, 0, 0.1);"
        },
        {
          input: "Harsh Directional Drop",
          output: "box-shadow: 12px 12px 0px 0px rgba(0, 0, 0, 1);"
        },
        {
          input: "Inner Carved / Pressed State",
          output: "box-shadow: inset 0px 0px 15px 2px rgba(0, 0, 0, 0.2);"
        }
      ]}
      useCases={[
        "Designing floating action buttons (FABs) with a soft, natural drop-shadow.",
        "Creating \"Neumorphic\" interfaces by mixing light background colors with subtle inset or wide-spread shadows.",
        "Visually debugging CSS shadows that look \"dirty\" or overly dark by fine-tuning the opacity and spread.",
        "Generates clean, cross-browser compatible prefixed CSS (`-webkit-box-shadow`, `-moz-box-shadow`)."
      ]}
      faqs={[
        {
          question: "What is the difference between Blur and Spread?",
          answer: "The Blur radius determines how soft the shadow edges are; a high blur means a very soft, gradient-like edge. The Spread radius determines the physical size of the shadow block before the blur happens. Setting spread to a negative number makes the shadow smaller than the box, which is the secret to a 'floating' elevation effect."
        },
        {
          question: "What is an Inset shadow?",
          answer: "By default, shadows project outward from the element. Adding the `inset` keyword moves the shadow inside the border of the element. This creates the illusion that the element is pushed into or carved out of the page."
        },
        {
          question: "How do I make a shadow look more realistic?",
          answer: "Realistic light is rarely harsh. The secret to premium Apple-style or Stripe-style shadows is a high Blur radius (e.g., 30px+), a slightly negative Spread radius (e.g., -5px), and very low Opacity (e.g., 5% to 15% black). Try our 'Soft' or 'Deep' presets to see this in action."
        },
        {
          question: "Can I use rgba colors for shadows?",
          answer: "Absolutely, and you always should! Using solid colors (like `#000000`) looks terrible for shadows. Setting the color to black but dropping the alpha (opacity) to `0.1` (`rgba(0,0,0,0.1)`) allows the background color of the page to realistically tint the shadow."
        }
      ]}
      relatedTools={[
        { name: "Glassmorphism Generator", url: "/glassmorphism-generator" },
        { name: "CSS Keyframer", url: "/css-keyframes" },
        { name: "Color Palette Generator", url: "/color-palette-generator" }
      ]}
    />
  );
}
