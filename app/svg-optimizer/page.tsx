import { Metadata } from 'next';
import SvgOptimizerTool from '@/components/tools/SvgOptimizerTool';
import ToolLayout from '@/components/ToolLayout';

export const metadata: Metadata = {
  title: 'SVG Optimizer | Online SVG Minifier & Cleaner',
  description: 'Clean and minify SVG code online. Remove metadata, junk attributes, and optimize path precision to reduce file size for faster web performance.',
  keywords: 'svg minifier, optimize svg for web, svg cleaner online, reduce svg file size, svg path optimizer',
};

export default function SvgOptimizerPage() {
  return (
    <ToolLayout
      title="SVG Optimizer"
      intro="Speed up your website by cleaning up bloated SVG code. Our optimizer strips away hidden metadata from design software (like Inkscape or Illustrator), removes unnecessary comments, and minifies coordinate precision without losing visual quality."
      toolNode={<SvgOptimizerTool />}
      howTo={[
        "Paste your raw SVG code into the left editor panel.",
        "The tool will automatically optimize the code and display the results on the right.",
        "Adjust the 'Precision' level (1-3) to find the perfect balance between file size and detail.",
        "Check the stats bar at the top to see exactly how many kilobytes you've saved.",
        "Click 'Save' to download your minified .svg file."
      ]}
      useCases={[
        "Performance Tuning: Reduce the size of icons and logos to improve LCP (Largest Contentful Paint) metrics.",
        "Asset Cleanup: Remove proprietary metadata (sodipodi, inkscape) that adds weight but no value to images.",
        "Animation Prep: Sanitize SVG code to make it easier to animate via CSS or GSAP.",
        "Email Marketing: Optimize SVGs for embedding in HTML emails where file size limits are critical."
      ]}
      faqs={[
        {
          question: "How does this tool reduce SVG size?",
          answer: "It removes non-standard attributes, metadata, XML declarations, and comments. It also rounds coordinate values in path data to a specified decimal precision, which often accounts for the majority of the byte savings."
        },
        {
          question: "Will it break my SVG?",
          answer: "Our 'Safe Mode' logic only removes data that isn't required for rendering. However, setting precision to '1' might cause slight shifts in very complex illustrations. We recommend '2' for most web icons."
        },
        {
          question: "Wait, isn't SVGO the standard?",
          answer: "Yes! This tool uses a professional-grade cleanup engine inspired by SVGO, optimized to run securely and instantly in your browser without ever uploading your files."
        }
      ]}
      relatedTools={[
        { name: "SVG to PNG", url: "/svg-to-png" },
        { name: "JPEG to SVG", url: "/jpeg-to-svg" },
        { name: "SVG to Base64", url: "/svg-to-base64" }
      ]}
    />
  );
}
