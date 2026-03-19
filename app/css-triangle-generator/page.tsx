import React from 'react';
import ToolLayout from '@/components/ToolLayout';
import CssTriangleGeneratorTool from '@/components/tools/CssTriangleGeneratorTool';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CSS Triangle Generator | Tooltip & Speech Bubble Arrows',
  description: 'Visually generate CSS triangles instantly. Tool for frontend developers to create pure CSS arrows for tooltips, menus, and speech bubbles by hacking border widths.',
  keywords: ['css triangle generator', 'css arrow generator', 'speech bubble arrow css', 'pure css triangle', 'tooltip arrow css'],
  alternates: {
    canonical: 'https://www.devtoolslabs.com/css-triangle-generator',
  },
};

export default function CssTriangleGeneratorPage() {
  return (
    <ToolLayout
      title="CSS Triangle Generator"
      intro="Creating triangles using pure CSS is a classic frontend trick that relies entirely on how the browser renders thick borders hitting transparent edges. These triangles are incredibly useful for building dropdown arrows, tooltips, and chat speech bubbles without relying on SVG or icon fonts. Our interactive CSS Triangle Generator calculates the exact structural borders needed based on your height, width, and direction settings."
      toolNode={<CssTriangleGeneratorTool />}
      howTo={[
        "Use the directional pad selector to choose which way the triangle should point (Up, Down, Left, Right).",
        "We also support standard 45-degree angle triangles (Top-Left, Top-Right, Bottom-Left, Bottom-Right) using the small corner boxes.",
        "Adjust the Width and Height independently to make your triangle slim, wide, squat, or tall.",
        "Select your Triangle Color using the color picker to match the arrow exactly to your tooltip's background.",
        "Copy and paste the output CSS into a `::before` or `::after` pseudo-element on your target UI component."
      ]}
      examples={[
        {
          input: "Upward Pointing Arrow (Width 100, Height 100)",
          output: ".triangle {\n  width: 0;\n  height: 0;\n  border-left: 50px solid transparent;\n  border-right: 50px solid transparent;\n  border-bottom: 100px solid #2563eb;\n}"
        },
        {
          input: "Right-Angled Top-Left Triangle",
          output: ".triangle {\n  width: 0;\n  height: 0;\n  border-bottom: 100px solid transparent;\n  border-left: 100px solid #2563eb;\n}"
        }
      ]}
      useCases={[
        "Adding the small caret/arrow hovering above a 'Tooltip' box.",
        "Designing iMessage style speech bubbles that feature a directional 'tail'.",
        "Creating simple 'Next' and 'Previous' directional UI Chevrons without loading entire icon fonts.",
        "Building ribbon 'fold' effects commonly seen on pricing tables or premium product cards."
      ]}
      faqs={[
        {
          question: "How do pure CSS triangles work?",
          answer: "It's a rendering hack! If an element has zero `width` and zero `height`, it is made up entirely of its borders. By making three of the borders `transparent` and coloring the fourth border, the colored border forms a perfect geometric triangle."
        },
        {
          question: "How do I attach this triangle to an existing element?",
          answer: "The best practice is to attach it using the `::after` or `::before` pseudo-elements. For example, give your tooltip box `position: relative`, and then apply the triangle CSS to `.tooltip::after` and give it `position: absolute` so you can stick it perfectly to the edge."
        },
        {
          question: "Can I make these responsive (using percentages)?",
          answer: "No. The CSS border parsing engine does not correctly render transparent border intersections using percentage values in all browsers. You must use raw `px`, `em`, or `rem` units for CSS triangles to work cross-browser reliably."
        },
        {
          question: "How do I make a triangle with an outline (border color)?",
          answer: "Because the triangle itself is already a border, you cannot simply add `border-color` to it. The common solution is to create *two* identical triangles, absolutely position them together slightly offset by 1px or 2px, and color the back triangle the outline color."
        }
      ]}
      relatedTools={[
        { name: "Glassmorphism Generator", url: "/glassmorphism-generator" },
        { name: "SVG Shape Divider", url: "/svg-shape-divider" },
        { name: "Advanced Box-Shadow", url: "/box-shadow-generator" }
      ]}
    />
  );
}
