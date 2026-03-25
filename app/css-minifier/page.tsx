import type { Metadata } from 'next';
import ToolLayout from '@/components/ToolLayout';
import CssMinifierTool from '@/components/tools/CssMinifierTool';

export const metadata: Metadata = {
  title: 'CSS Code Minifier (Free Online Tool) | Strip CSS Whitespace',
  description: 'Instantly remove comments, line breaks, and excess spaces from your CSS stylesheet code. Shrink file sizes to improve your Core Web Vitals.',
  openGraph: {
    title: 'CSS Code Minifier (Free Online Tool) | Strip CSS Whitespace',
    description: 'Instantly remove comments, line breaks, and excess spaces from your CSS stylesheet code. Shrink file sizes to improve your Core Web Vitals.',
    url: 'https://devtoolslabs.com/css-minifier',
  },
  alternates: {
    canonical: '/css-minifier',
  },
};

export default function CssMinifierPage() {
  return (
    <ToolLayout
      title="CSS Minifier (Compress & Minify CSS Code Online)"
      intro="Bloated CSS stylesheets block browser rendering and hurt your Google Core Web Vital scores. This offline tool intelligently parses standard Cascade Style Sheet logic, stripping away comments, empty spaces, and optional terminations to guarantee maximum compression with zero external dependencies."
      toolNode={<CssMinifierTool />}
      howTo={[
        "Paste your fully formatted CSS styling directly into the left text area.",
        "Your code is instantaneously stripped of visual formatting and crushed into a single line string.",
        "The dark panel on the right contains your fully minified production asset.",
        "Assess the Analytics bar at the bottom to see exactly how much byte data you've saved."
      ]}
      examples={[
        {
          input: '/* Main container */\n.card {\n  color: #fff;\n  padding: 10px;\n}',
          output: '.card{color:#fff;padding:10px}'
        }
      ]}
      useCases={[
        "Combining and minifying multiple modular CSS files before deploying them via a fast CDN cache.",
        "Removing hundreds of obsolete `/* Commented out for now */` lines from legacy codebase monolithic templates.",
        "Shrinking an inline `<style>` block dynamically so it can be injected safely into a server-side rendered React string header."
      ]}
      faqs={[
        {
          question: "Will this minify SCSS or SASS?",
          answer: "No. This tool strictly parses standard compiled CSS syntax. SASS and SCSS contain complex logical operators (like `@mixin` or nested math) that require a dedicated webpack or Node compiler to convert into plain CSS before minification can occur."
        },
        {
          question: "What does 'Remove Final Semicolon' mean?",
          answer: "In standard CSS rendering logic, the very last semicolon inside a closing bracket (e.g., `color: red; }`) is completely mathematically redundant. Stripping it is a common micro-optimization technique used by tools like TailwindCSS."
        },
        {
          question: "Can I unpack a minified CSS file?",
          answer: "Converting a minified file back to readable CSS is called 'Beautification'. This specific tool only handles compression. You will need a dedicated CSS Formatter tool to re-indent the file."
        },
        {
          question: "Is this tool sending my code to a server?",
          answer: "Absolutely not. The mathematical Regex compression pipeline operates 100% locally within your system's browser engine. No file uploads or network requests are executed."
        }
      ]}
      relatedTools={[
        { name: "HTML Minifier", url: "/html-minifier" },
        { name: "CSS Clamp Generator", url: "/css-clamp-generator" }
      ]}
    />
  );
}
