import type { Metadata } from 'next';
import ToolLayout from '@/components/ToolLayout';
import CssKeyframesTool from '@/components/tools/CssKeyframesTool';

export const metadata: Metadata = {
  title: 'CSS Keyframe Animation Builder (Free Online Editor) | Preview Instantly',
  description: 'Visually build, preview, and generate complex CSS3 @keyframes animations. Adjust timing functions, scaling, and rotations in real-time.',
};

export default function CssKeyframesPage() {
  return (
    <ToolLayout
      title="CSS Keyframe Animation Builder"
      intro="Writing CSS `@keyframes` logic entirely by hand requires a lot of mental overhead and constant browser refreshing. This visual builder allows you to construct complex, multi-stage CSS animations, edit their timing functions natively, and preview the exact animation rendered directly in the DOM."
      toolNode={<CssKeyframesTool />}
      howTo={[
        "Define an animation name, duration, and iteration rules in the top-left settings pane.",
        "Add new 'Keyframe Timestamps' (percentages between 0% and 100%).",
        "Write pure inline CSS (e.g., `transform: scale(1.2); opacity: 0.5;`) within each timestamp block.",
        "Watch the blue preview square animate instantly as you type.",
        "Copy the fully compiled CSS output block from the bottom right."
      ]}
      examples={[
        {
          input: '0% { transform: rotate(0deg); }\n100% { transform: rotate(360deg); }',
          output: '[ Generates a smoothly spinning infinite spinner ]'
        }
      ]}
      useCases={[
        "Quickly generating customized loading spinners, pulse effects, or bouncing indicators for a modern web app.",
        "Understanding how the `ease-in-out` timing function differs from a strict `linear` progression visually.",
        "Combining multiple transform commands (translate, rotate, and scale) across 5 or 6 different timeline phases."
      ]}
      faqs={[
        {
          question: "How does the Live Preview work?",
          answer: "The tool works by dynamically injecting your generated `@keyframes` syntax directly into a `<style>` block within the React Virtual DOM, and immediately applying the compiled class to the preview window. It literally runs your exact CSS through the browser engine in real-time."
        },
        {
          question: "What is the difference between ease-in and ease-out?",
          answer: "A timing function dictates the rate of change over time. 'ease-in' starts the animation slowly and accelerates towards the end. 'ease-out' starts quickly and decelerates to a slow stop. 'ease-in-out' combines both, creating a smooth transition at both boundaries."
        },
        {
          question: "Can I animate any CSS property?",
          answer: "You can animate most visual CSS properties (colors, borders, opacity). However, for maximum performance in modern browser rendering engines (60fps), you should strictly try to animate only the `transform` and `opacity` properties, as they do not trigger costly DOM layout reflows."
        },
        {
          question: "Why doesn't my box shadow animate perfectly smoothly?",
          answer: "Animating massive CSS modifications like `box-shadow` or `width/height` forces the browser's main thread to repaint the screen every frame. If your machine is older or under heavy JS load, these specific properties may appear to stutter or drop frames."
        },
        {
          question: "Do I need vendor prefixes like -webkit-?",
          answer: "For modern development workflows, no. Modern browsers widely support the standard `@keyframes` rule. If you must support severely outdated mobile browsers, your build system's Auto-Prefixer pipeline will handle injecting `-webkit-` automatically upon compile."
        }
      ]}
      relatedTools={[
        { name: "CSS Clamp Generator", url: "/css-clamp-generator" },
        { name: "Color Contrast Checker", url: "/color-contrast-checker" }
      ]}
    />
  );
}
