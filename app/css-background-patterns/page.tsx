import type { Metadata } from 'next';
import ToolLayout from '@/components/ToolLayout';
import CssBackgroundPatternGeneratorTool from '@/components/tools/CssBackgroundPatternGeneratorTool';

export const metadata: Metadata = {
  title: 'CSS Background Pattern Generator (Free Cool Backgrounds)',
  description: 'Instantly generate cool background patterns using pure CSS. Create customized polka dots, grid paper, diagonal stripes, and zigzags for your website or design projects.',
  openGraph: {
    title: 'CSS Background Pattern Generator (Free Cool Backgrounds)',
    description: 'Instantly generate cool background patterns using pure CSS. Create customized polka dots, grid paper, diagonal stripes, and zigzags for your website or design projects.',
    url: 'https://devtoolslabs.com/css-background-patterns',
  },
  alternates: {
    canonical: '/css-background-patterns',
  },
};

export default function CssBackgroundPatternGeneratorPage() {
  return (
    <ToolLayout
      title="CSS Background Pattern Generator"
      intro="Finding the perfect texture for a hero section or website background used to require downloading heavy SVG or PNG images. Our CSS Background Pattern Generator allows you to instantly generate beautiful, lightweight, resolution-independent patterns exclusively using pure CSS gradients. Adjust colors, opacity, and scale to create custom polka dots, graph paper grids, notebook stripes, and more. Copy the 1-line CSS and drop it into your CSS or Tailwind project."
      toolNode={<CssBackgroundPatternGeneratorTool />}
      howTo={[
        "Select your desired Pattern Style (e.g., Polka Dots, Grid, Stripes) from the buttons on the left.",
        "Use the Color Pickers to choose your Background Color and Pattern Color. You can manually enter Hex codes as well.",
        "Adjust the Scale slider to make the repeating pattern larger or smaller.",
        "Adjust the Opacity slider to create a subtle watermark effect (highly recommended for modern UI design).",
        "If available for your pattern, adjust the Stroke Width to make the lines or dots thicker.",
        "Click the copy button on the output box to copy the pure CSS to your clipboard."
      ]}
      examples={[
        {
          input: "Subtle Graph Paper (Grid)",
          output: "background-color: #ffffff;\nbackground-image: linear-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.05) 1px, transparent 1px);\nbackground-size: 40px 40px;"
        },
        {
          input: "Playful Polka Dots",
          output: "background-color: #ffebf0;\nbackground-image: radial-gradient(rgba(255, 42, 95, 0.2) 4px, transparent 4px), radial-gradient(rgba(255, 42, 95, 0.2) 4px, transparent 4px);\nbackground-size: 30px 30px;\nbackground-position: 0 0, 15px 15px;"
        }
      ]}
      useCases={[
        "Adding a subtle structural grid pattern to SaaS dashboards or developer tool landing pages for a technical feel.",
        "Creating playful, soft polka-dot backgrounds for e-commerce sites, children's brands, or creative portfolios.",
        "Using diagonal stripes behind 'Warning' banners or 'Under Construction' elements.",
        "Replacing heavy, un-optimized background images or SVGs to improve Google Core Web Vitals and load times."
      ]}
      faqs={[
        {
          question: "How do pure CSS patterns work?",
          answer: "Pure CSS patterns leverage the `background-image` property paired with CSS `linear-gradient` or `radial-gradient` functions. By carefully calculating the color stops and combining them with `background-size` and `background-position`, you can force the browser to repeat these gradients infinitely, creating the illusion of complex geometric shapes."
        },
        {
          question: "Are CSS backgrounds better than SVG or PNG images?",
          answer: "Yes, in almost every measurable way. Pure CSS patterns require zero HTTP requests to load (meaning instant rendering). They are completely resolution-independent, meaning they look flawlessly sharp on standard displays, 4k screens, and Retina iPhones. They also use almost zero memory compared to large image files."
        },
        {
          question: "Can I use these patterns with Tailwind CSS?",
          answer: "Absolutely. While Tailwind doesn't have built-in utilities for complex repeating zig-zags, you can simply paste the generated output from this tool into an arbitrary value bracket like `bg-[linear-gradient...]` or place it in your global `globals.css` file as a custom utility class."
        },
        {
          question: "Why do some patterns use rgba() instead of hex codes?",
          answer: "Using `rgba()` allows us to inject an opacity channel directly into the pattern color. This is critical for good design: it lets the pattern blend naturally into whatever background color you choose without needing to guess the precise hex code of the blended output."
        }
      ]}
      relatedTools={[
        { name: "Glassmorphism Generator", url: "/glassmorphism-generator" },
        { name: "CSS Gradient Generator", url: "/css-gradient-generator" },
        { name: "Box-Shadow Generator", url: "/box-shadow-generator" }
      ]}
    />
  );
}
