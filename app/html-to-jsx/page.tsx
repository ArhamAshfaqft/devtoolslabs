import type { Metadata } from 'next';
import ToolLayout from '@/components/ToolLayout';
import HtmlToJsxTool from '@/components/tools/HtmlToJsxTool';

export const metadata: Metadata = {
  title: 'HTML to JSX Converter | Transform HTML to React Components Online',
  description: 'Instantly convert raw HTML code into clean, production-ready JSX for React and Next.js. Handles class to className, for to htmlFor, inline styles to objects, and more natively in your browser.',
  openGraph: {
    title: 'HTML to JSX Converter | Transform HTML to React Components Online',
    description: 'Instantly convert raw HTML code into clean, production-ready JSX for React and Next.js. Handles class to className, for to htmlFor, inline styles to objects, and more natively in your browser.',
    url: 'https://devtoolslabs.com/html-to-jsx',
  },
  alternates: {
    canonical: '/html-to-jsx',
  },
};

export default function HtmlToJsxPage() {
  return (
    <ToolLayout
      title="HTML to JSX Converter (React Component Generator)"
      intro="For frontend developers migrating legacy web designs or vanilla HTML templates into modern React or Next.js applications, the transition can be tedious. This tool automates the structural transformation of HTML into valid JSX. It intelligently maps standard attributes (like class and for), converts inline CSS strings into React style objects, and ensures all self-closing tags are compliant with JSX strictness—all while running 100% client-side."
      toolNode={<HtmlToJsxTool />}
      howTo={[
        "Paste your raw HTML snippet into the left 'Raw HTML' input area.",
        "The tool instantly parses the DOM and transforms it into valid JSX in the right panel.",
        "Enable the 'Wrap in Fragment / Component' toggle to automatically generate a standard export functional component.",
        "Set a custom 'Component Name' to match your architectural requirements.",
        "Click 'Copy JSX' and paste directly into your project's .tsx or .jsx files."
      ]}
      examples={[
        {
          input: '<div class="card" style="padding: 10px;">\n  <img src="pic.jpg">\n  <label for="id">Email</label>\n</div>',
          output: '<div className="card" style={{ padding: \'10px\' }}>\n  <img src="pic.jpg" />\n  <label htmlFor="id">Email</label>\n</div>'
        }
      ]}
      useCases={[
        "Migrating a legacy Bootstrap or Tailwind HTML template into a modular React component library.",
        "Quickly prototyping UI sections by copying code from browser 'Inspect Element' and pasting it into your Next.js project.",
        "Cleaning up generated HTML from third-party design tools to ensure JSX compatibility (tags like <br> and <img>).",
        "Converting complex SVG paths into valid JSX components."
      ]}
      faqs={[
        {
          question: "Why can't I use 'class' in JSX?",
          answer: "In JavaScript, 'class' is a reserved keyword used for creating class-based objects. Because JSX is a syntax extension of JavaScript, the React team had to choose an alternative property name for CSS classes, which is 'className'."
        },
        {
          question: "What happens to inline CSS styles?",
          answer: "HTML uses strings for styles (e.g. style='margin: 10px'). JSX requires styles to be passed as JavaScript objects with camelCased keys (e.g. style={{ margin: '10px' }}). Our converter automatically parses and reformats these strings for you."
        },
        {
          question: "Does this handle self-closing tags?",
          answer: "Yes. In standard HTML, tags like <img>, <br>, and <input> don't require a closing slash. However, JSX (and XML) are stricter; every tag must be closed. This tool automatically appends the trailing '/' to all void elements."
        },
        {
          question: "Why do my 'for' labels change to 'htmlFor'?",
          answer: "Similar to 'class', 'for' is a reserved keyword in JavaScript (used for loops). To avoid syntax collisions, JSX uses 'htmlFor' to link <label> elements to their corresponding form inputs."
        },
        {
          question: "Is my code secure?",
          answer: "Yes. All transformation logic happens using the native DOMParser API in your own browser's memory. No code is transmitted to an external server or stored in a database."
        }
      ]}
      relatedTools={[
        { name: "JSON to TypeScript", url: "/json-to-typescript" },
        { name: "SVG Path Visualizer", url: "/svg-path-visualizer" },
        { name: "CSS Keyframer", url: "/css-keyframes" }
      ]}
    />
  );
}
