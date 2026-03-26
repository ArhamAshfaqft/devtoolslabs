import React from 'react';
import ToolLayout from '@/components/ToolLayout';
import CssGridGeneratorTool from '@/components/tools/CssGridGeneratorTool';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CSS Grid Generator | Interactive Layout Builder & Visualizer',
  description: 'Visually build complex CSS Grid layouts instantly. Adjust columns, rows, and gaps using fractional units (1fr) and grab the compiled CSS code.',
  keywords: ['css grid generator', 'css grid layout builder', 'grid template columns generator', 'visual css grid', 'css grid tool'],
  alternates: {
    canonical: '/grid-generator',
  },
  openGraph: {
    title: 'CSS Grid Generator | Interactive Layout Builder & Visualizer',
    description: 'Visually build complex CSS Grid layouts instantly. Adjust columns, rows, and gaps using fractional units (1fr) and grab the compiled CSS code.',
    url: 'https://devtoolslabs.com/grid-generator',
  },
};

export default function CssGridGeneratorPage() {
  return (
    <ToolLayout
      title="CSS Grid Generator"
      intro="If Flexbox is for laying out items in a single line, CSS Grid is for laying them out in two dimensions (columns AND rows) simultaneously. Writing `grid-template-columns` syntax from memory can be confusing. The CSS Grid Generator lets you visually construct your exact grid structure using fractional units (`fr`), tweak the internal gaps, and export the clean CSS required for your application."
      toolNode={<CssGridGeneratorTool />}
      howTo={[
        "Use the 'Columns' slider to determine how many vertical tracks the grid should have.",
        "Use the 'Rows' slider to determine the horizontal tracks. (Note: The tool will auto-fill items into the grid based on Columns * Rows multiplied).",
        "Adjust the 'Column Gap' to set the horizontal spacing between items.",
        "Adjust the 'Row Gap' to set the vertical spacing.",
        "Click the purple 'Copy CSS' button to grab the output and apply it to a single parent container in your HTML."
      ]}
      examples={[
        {
          input: "Standard 3-Column Bento Box",
          output: ".grid-container {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  grid-template-rows: repeat(2, 1fr);\n  gap: 16px;\n}"
        },
        {
          input: "Assymetric Gaps",
          output: ".grid-container {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  grid-template-rows: repeat(4, 1fr);\n  column-gap: 8px;\n  row-gap: 32px;\n}"
        }
      ]}
      useCases={[
        "Creating a 'Bento Box' style dashboard, which relies entirely on strict 2-dimensional grid scaffolding.",
        "Building responsive Image Galleries where images perfectly fit into columns with uniform spacing.",
        "Scaffolding a master page layout (Header on top, Sidebar on left, Main Content on right, Footer on bottom).",
        "Replacing heavy layout frameworks (like Bootstrap Rows/Cols) with native browser technologies."
      ]}
      faqs={[
        {
          question: "When should I use CSS Grid vs Flexbox?",
          answer: "The easiest rule of thumb: If you only care about aligning items in one direction (a row of tags, or a column of navigation links), use Flexbox. If you care about items lining up perfectly in BOTH rows and columns simultaneously (like a chess board or a dashboard), use CSS Grid."
        },
        {
          question: "What does the `1fr` unit mean?",
          answer: "`1fr` stands for '1 fractional unit'. If a grid has three columns set to `1fr 1fr 1fr`, it means the browser calculates the total available width, divides it by 3, and gives exactly one fraction to each column. It handles all the complex math dynamically so you don't have to use percentages."
        },
        {
          question: "What does the `repeat()` function do?",
          answer: "Instead of writing `grid-template-columns: 1fr 1fr 1fr 1fr`, CSS provides the repeat function: `repeat(4, 1fr)`. This makes your CSS much cleaner and easier to update. Our generator heavily utilizes `repeat()` for optimal code output."
        },
        {
          question: "How do I make an item span across multiple columns?",
          answer: "While this generator focuses on the parent container's layout, you can easily make children span multiple tracks. Simply target a child item in your CSS and add `grid-column: span 2;`. It will instantly consume two slots in the grid."
        }
      ]}
      relatedTools={[
        { name: "Flexbox Generator", url: "/flexbox-generator" },
        { name: "Box Shadow Builder", url: "/box-shadow-generator" },
        { name: "CSS Triangle Builder", url: "/css-triangle-generator" }
      ]}
    />
  );
}


