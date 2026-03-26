import React from 'react';
import ToolLayout from '@/components/ToolLayout';
import CssFlexboxGeneratorTool from '@/components/tools/CssFlexboxGeneratorTool';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CSS Flexbox Generator | Interactive Sandbox & Layout Builder',
  description: 'Visually build and learn CSS Flexbox layouts. Tweak flex-direction, justify-content, align-items, and gap in real-time, then copy the auto-generated CSS code.',
  keywords: ['flexbox generator', 'css flex layout builder', 'flexbox visualizer', 'css justify-content generator', 'flexbox interactive tool'],
  alternates: {
    canonical: '/flexbox-generator',
  },
  openGraph: {
    title: 'CSS Flexbox Generator | Interactive Sandbox & Layout Builder',
    description: 'Visually build and learn CSS Flexbox layouts. Tweak flex-direction, justify-content, align-items, and gap in real-time, then copy the auto-generated CSS code.',
    url: 'https://devtoolslabs.com/flexbox-generator',
  },
};

export default function CssFlexboxGeneratorPage() {
  return (
    <ToolLayout
      title="CSS Flexbox Generator"
      intro="Flexbox takes the pain out of CSS layout alignment, but trying to remember the difference between `justify-content` and `align-items` can be frustrating. The CSS Flexbox Generator provides a fully interactive sandbox. Add UI blocks directly onto the canvas, tweak the flex parent properties, see the real-time layout changes, and instantly export the perfectly formatted CSS."
      toolNode={<CssFlexboxGeneratorTool />}
      howTo={[
        "Use the 'Items' slider in the top left of the preview to add or remove blocks from your flex container.",
        "Change `flex-direction` to switch between a horizontal Row layout (default) or a vertical Column layout.",
        "Adjust `justify-content` to position your items along the main axis (e.g., center them, or space them evenly).",
        "Adjust `align-items` to position your items along the cross axis (e.g., stretch them to fill the height).",
        "Use the `gap` slider to implement modern, clean spacing between your items without messy margins."
      ]}
      examples={[
        {
          input: "Perfect Div Centering",
          output: ".flex-container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}"
        },
        {
          input: "Standard Navigation Bar Spacing",
          output: ".flex-container {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}"
        }
      ]}
      useCases={[
        "Centering a child element vertically and horizontally within a parent div (the classic CSS problem).",
        "Building responsive Top Navigation bars where the logo is on the far left and links are on the far right.",
        "Creating fluid grids of cards that wrap cleanly to the next row on mobile devices using `flex-wrap: wrap`.",
        "Rapidly prototyping UI layouts visually before writing the raw CSS code."
      ]}
      faqs={[
        {
          question: "What is the difference between justify-content and align-items?",
          answer: "`justify-content` aligns items along the MAIN axis, while `align-items` aligns them along the CROSS axis. If your `flex-direction` is `row` (horizontal), `justify-content` controls left-to-right alignment, and `align-items` controls top-to-bottom alignment. If you switch to `column`, these axes swap!"
        },
        {
          question: "Why should I use gap instead of margin?",
          answer: "The `gap` property (formerly `grid-gap`) is modern flexbox's best feature. Unlike margins on individual items, `gap` only applies spacing *between* items. You don't have to write messy selectors like `:last-child { margin-right: 0; }` anymore."
        },
        {
          question: "What does align-content do?",
          answer: "`align-content` only works when you have multiple rows of items (which requires `flex-wrap: wrap`). It controls how the multiple rows space themselves out vertically within the parent container, similar to how `justify-content` spaces out individual items."
        },
        {
          question: "Are flexbox layouts responsive?",
          answer: "Inherently, yes! Flex items are designed to grow, shrink, and wrap to accommodate available space. Using `flex-wrap: wrap` is one of the easiest ways to ensure a row of items cleanly stacks into a column on mobile devices."
        }
      ]}
      relatedTools={[
        { name: "Box Shadow Builder", url: "/box-shadow-generator" },
        { name: "CSS Triangle Generator", url: "/css-triangle-generator" },
        { name: "CSS Keyframer", url: "/css-keyframes" }
      ]}
    />
  );
}


