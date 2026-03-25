import type { Metadata } from 'next';
import ToolLayout from '@/components/ToolLayout';
import HtmlMinifierTool from '@/components/tools/HtmlMinifierTool';

export const metadata: Metadata = {
  title: 'HTML Minifier (Free Online Tool) | Compress Code Instantly',
  description: 'Instantly strip whitespace, remove comments, and compress your HTML code to improve website loading speeds. 100% free, browser-based native execution.',
  openGraph: {
    title: 'HTML Minifier (Free Online Tool) | Compress Code Instantly',
    description: 'Instantly strip whitespace, remove comments, and compress your HTML code to improve website loading speeds. 100% free, browser-based native execution.',
    url: 'https://devtoolslabs.com/html-minifier',
  },
  alternates: {
    canonical: '/html-minifier',
  },
};

export default function HtmlMinifierPage() {
  return (
    <ToolLayout
      title="HTML Minifier (Compress & Minify HTML Code Online)"
      intro="Extra spaces, line breaks, and developer comments inside your HTML source code are ignored by browsers, but they consume valuable network bandwidth. Use our blazing-fast local HTML compressor to strip unnecessary characters and dramatically reduce your initial page load payload size securely."
      toolNode={<HtmlMinifierTool />}
      howTo={[
        "Paste your bloated, raw HTML code into the left text box.",
        "Toggle compression rules via the top checkboxes. 'Collapse Whitespace' and 'Remove Comments' are mathematically safe for 99% of frameworks.",
        "The Minified text will instantly appear in the dark window on the right.",
        "Check the Compression Ratio analytics bar at the bottom to see exactly how many kilobytes you just saved."
      ]}
      examples={[
        {
          input: '<!-- Header Section -->\n<div class="header">\n  <h1>Title</h1>\n</div>',
          output: '<div class="header"><h1>Title</h1></div>'
        }
      ]}
      useCases={[
        "Preparing a marketing landing page intended for slow 3G mobile connections by aggressively purging HTML file sizes.",
        "Minifying hardcoded HTML templates before injecting them into a Javascript bundle or rendering them on an embedded IoT device.",
        "Removing proprietary developer notes and comments from a source file before pushing it to a public production CDN."
      ]}
      faqs={[
        {
          question: "Is minifying code safe?",
          answer: "Yes, standard minification (removing spaces and comments) is perfectly safe and widely used by almost every modern website. The browser parses the mathematical DOM tree, not the human-readable formatting."
        },
        {
          question: "What does 'Remove Optional Tags' do?",
          answer: "The HTML5 specification mathematically allows developers to omit certain closing tags (like `</p>` or `</li>`) because the browser can implicitly infer where the element ends. While this saves additional bytes, it can occasionally break strictly-typed modern frameworks (like React or Vue), which is why we label it 'Risky'."
        },
        {
          question: "Will this minify inline scripts or CSS?",
          answer: "No. This tool specifically targets structural HTML tags and document formatting. It does not parse or compress the logic inside `<script>` or `<style>` blocks. You should use a dedicated CSS or JS minifier for those sections."
        },
        {
          question: "Is my proprietary layout code uploaded to a server?",
          answer: "Absolutely not. Our standard privacy guarantee applies: the compression algorithms execute strictly inside your local web browser's memory via standard Regex string replacement. Zero data is transmitted externally."
        }
      ]}
      relatedTools={[
        { name: "CSS Clamp Generator", url: "/css-clamp-generator" },
        { name: "SVG Path Visualizer", url: "/svg-path-visualizer" }
      ]}
    />
  );
}
