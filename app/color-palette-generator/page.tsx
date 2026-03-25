import React from 'react';
import type { Metadata } from 'next';
import ToolLayout from '@/components/ToolLayout';
import ColorPaletteGeneratorTool from '@/components/tools/ColorPaletteGeneratorTool';

export const metadata: Metadata = {
  title: 'Color Palette Generator (Create Beautiful Color Schemes Online)',
  description: 'Instantly generate professional color palettes for your next web or mobile project. Lock colors you like and generate beautiful matching schemes with one click.',
  openGraph: {
    title: 'Color Palette Generator (Create Beautiful Color Schemes Online)',
    description: 'Instantly generate professional color palettes for your next web or mobile project. Lock colors you like and generate beautiful matching schemes with one click.',
    url: 'https://devtoolslabs.com/color-palette-generator',
  },
  alternates: {
    canonical: '/color-palette-generator',
  },
};

export default function ColorPaletteGeneratorPage() {
  return (
    <ToolLayout
      title="Color Palette Generator (Create Beautiful Color Schemes Online)"
      intro="Struggling to find the perfect color combination for your next design? This Color Palette Generator provides a fast, intuitive way to discover beautiful color schemes. Simply press SPACE to generate a completely new 5-color palette. Found a color you love? Lock it and regenerate the rest to find the perfect matching shades for your brand or UI kit."
      toolNode={<ColorPaletteGeneratorTool />}
      howTo={[
        "Press the 'Generate New Palette' button or hit the SPACE key on your keyboard.",
        "A random 5-color palette will be instantly generated.",
        "Click the Lock icon on any color you want to keep.",
        "Click 'Generate' again to find new colors that complement your locked choices.",
        "Click the hex code ($#FFFFFF) to copy it directly to your clipboard."
      ]}
      examples={[
        {
          input: "Deep Blue Palette",
          output: "#0F172A, #1E293B, #334155, #475569, #64748B"
        },
        {
          input: "Vibrant Sunset Palette",
          output: "#F87171, #FB923C, #FBBF24, #34D399, #60A5FA"
        }
      ]}
      useCases={[
        "Brainstorming the primary and secondary brand colors for a new identity.",
        "Finding high-contrast accent colors for buttons, call-to-actions, and UI elements.",
        "Creating consistent color themes for data visualization and charts.",
        "Quickly grabbing HEX codes for CSS variables in your `globals.css` or Tailwind config."
      ]}
      faqs={[
        {
          question: "How do I save a palette?",
          answer: "While we don't have a database save feature yet, you can simply copy the HEX codes of the colors you like. Many developers find it useful to paste these directly into their project's README or a CSS file."
        },
        {
          question: "Can I generate more than 5 colors?",
          answer: "Currently, our generator is optimized for a standard 5-color design system, which is common for most web applications (Primary, Secondary, Success, Warning, Neutral). We may add support for larger palettes in a future update."
        },
        {
          question: "Are these colors web-safe?",
          answer: "The generator uses a full 16-million color hex range. Modern browsers and devices support this entire spectrum perfectly. If you are concerned about accessibility (AA/AAA contrast), we recommend using our Color Contrast Checker tool once you've picked your favorites."
        }
      ]}
      relatedTools={[
        {
          name: "Color Contrast Checker",
          url: "/color-contrast-checker"
        },
        {
          name: "SVG Path Visualizer",
          url: "/svg-path-visualizer"
        },
        {
          name: "CSS Keyframe Builder",
          url: "/css-keyframes"
        }
      ]}
    />
  );
}
