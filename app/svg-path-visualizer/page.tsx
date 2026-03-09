import type { Metadata } from 'next';
import ToolLayout from '@/components/ToolLayout';
import SvgPathVisualizerTool from '@/components/tools/SvgPathVisualizerTool';

export const metadata: Metadata = {
  title: 'SVG Path Visualizer (Free Online Tool) | Test Coordinates Instantly',
  description: 'Instantly visualize and debug SVG path definitions online. Paste your raw d="..." attribute string (Bezier curves, arcs) directly into the sandbox.',
};

export default function SvgPathVisualizerPage() {
  return (
    <ToolLayout
      title="SVG Path Visualizer"
      intro="If you are manually tweaking cubic bezier curves or fixing an exported icon from Adobe Illustrator, SVG path coordinates (the `d` attribute) look like absolute gibberish. This tool provides a live, instant visualization canvas. Type or paste your raw path data to immediately see the vector shape render precisely on a checkerboard background."
      toolNode={<SvgPathVisualizerTool />}
      howTo={[
        "Locate the `<path>` node inside your SVG and copy the contents of its 'd' attribute.",
        "Paste the path string into the text box.",
        "Adjust the 'ViewBox' coordinates if your path is drawn outside the standard 0-100 coordinate grid.",
        "Experiment with the fill color and stroke width controls to verify your asset's design boundaries."
      ]}
      examples={[
        {
          input: 'M 10 10 H 90 V 90 H 10 Z',
          output: '[ Renders a perfect square taking up 80% of the viewBox ]'
        },
        {
          input: 'M 10 80 Q 52.5 10, 95 80 T 180 80',
          output: '[ Renders a smooth quadratic bezier sine wave ]'
        }
      ]}
      useCases={[
        "Reverse-engineering a complex icon path to find out why a cubic curve (C) is bending in the wrong direction.",
        "Determining the exact viewBox boundaries needed to wrap a strangely offset paths output by Figma.",
        "Reducing the mathematical precision (e.g., removing decimal places) of a massive inline SVG and checking if it distorts the shape visually."
      ]}
      faqs={[
        {
          question: "What do the letters M, L, C, and Z mean in a path?",
          answer: "These are standard SVG command tokens. 'M' moves the virtual pen. 'L' draws a straight line. 'C' draws a cubic bezier curve. 'Z' closes the path by drawing a straight line back to the initial 'M' coordinate."
        },
        {
          question: "Why does an uppercase command differ from lowercase?",
          answer: "In the SVG specification, an uppercase command (like 'L 10 10') dictates absolute coordinates relative to the 0,0 upper-left origin of the ViewBox. A lowercase command (like 'l 10 10') dictates relative coordinates, drawing a line 10 units away from wherever the pen currently rests."
        },
        {
          question: "Why is my path rendering completely off-screen?",
          answer: "This is a common issue with vector exports from Sketch or Illustrator. Your ViewBox may be set to '0 0 100 100', but your path coordinates might start at 'M 4500 2300'. You must either manually adjust your viewBox or translate the path to bring it into the frame."
        },
        {
          question: "How does the browser parse this math so quickly?",
          answer: "SVG rendering utilizes the highly optimized 2D graphics hardware acceleration built into your GPU. Our tool injects your string directly into the React Virtual DOM, instructing the browser to redraw the vector mathematically every keystroke."
        },
        {
          question: "Can I use CSS transitions on my path?",
          answer: "Yes, assuming the two paths you are transitioning between have the exact same number of command nodes. You can use CSS or tools like GSAP to animate the `d` attribute smoothly from state A to state B."
        }
      ]}
      relatedTools={[
        { name: "Color Contrast Checker", url: "/color-contrast-checker" },
        { name: "Base64 Image Decoder", url: "/base64-image-decoder" }
      ]}
    />
  );
}
