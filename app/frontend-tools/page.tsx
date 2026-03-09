import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Free Frontend Design Tools | CSS Clamp, Keyframes, & SVG Vis',
  description: 'A suite of advanced frontend developer tools. Calculate fluid typography formulas, simulate CSS animations, and render mathematically perfect SVG vectors.',
};

export default function FrontendToolsHub() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 md:py-20">
      <div className="max-w-3xl mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 tracking-tight">Frontend Design Tools</h1>
        <p className="text-xl text-gray-600 leading-relaxed">
          Modern UI/UX requires pixel-perfect accuracy and responsive mathematical rules. Stop guessing values in your CSS files. Use our highly visual, interactive tools to intelligently generate accessibility reports, fluid typography functions, CSS hardware animations, and vector graphics natively in your browser.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/css-clamp-generator" className="group p-6 bg-white border border-gray-200 rounded-xl hover:border-gray-900 transition-colors shadow-sm hover:shadow-md">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-900 font-bold group-hover:bg-gray-900 group-hover:text-white transition-colors">
              px
            </div>
            <h2 className="text-xl font-bold text-gray-900">CSS Clamp() Generator</h2>
          </div>
          <p className="text-gray-600 leading-relaxed mb-4">
            Eliminate complex media queries. Generate perfectly calculated fluid typography CSS formulas that smoothly and continuously scale font sizes between mobile phones and massive desktop monitors.
          </p>
          <span className="text-sm font-semibold text-blue-600 group-hover:text-blue-800 flex items-center gap-1">
            Open Tool <span aria-hidden="true">&rarr;</span>
          </span>
        </Link>

        <Link href="/svg-path-visualizer" className="group p-6 bg-white border border-gray-200 rounded-xl hover:border-gray-900 transition-colors shadow-sm hover:shadow-md">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-900 font-bold group-hover:bg-gray-900 group-hover:text-white transition-colors">
              {/* Note: In React, we must escape the M token safely if needed, or simply render standard text */}
              {'<path>'}
            </div>
            <h2 className="text-xl font-bold text-gray-900">SVG Path Visualizer</h2>
          </div>
          <p className="text-gray-600 leading-relaxed mb-4">
            Translate confusing, coordinate-heavy SVG paths (like M 10 10 C 20 20...) into a live, interactive visualization canvas. Perfect for debugging exported Adobe Illustrator or Figma assets.
          </p>
          <span className="text-sm font-semibold text-blue-600 group-hover:text-blue-800 flex items-center gap-1">
            Open Tool <span aria-hidden="true">&rarr;</span>
          </span>
        </Link>
        
        <Link href="/color-contrast-checker" className="group p-6 bg-white border border-gray-200 rounded-xl hover:border-gray-900 transition-colors shadow-sm hover:shadow-md">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-900 font-bold group-hover:bg-gray-900 group-hover:text-white transition-colors">
              WCAG
            </div>
            <h2 className="text-xl font-bold text-gray-900">Color Contrast Checker</h2>
          </div>
          <p className="text-gray-600 leading-relaxed mb-4">
            Ensure your brand colors are legally accessible. Calculates the precise relative luminance ratio of any background and foreground pair to guarantee WCAG 2.0 AA and AAA compliance.
          </p>
          <span className="text-sm font-semibold text-blue-600 group-hover:text-blue-800 flex items-center gap-1">
            Open Tool <span aria-hidden="true">&rarr;</span>
          </span>
        </Link>
        
        <Link href="/css-keyframes" className="group p-6 bg-white border border-gray-200 rounded-xl hover:border-gray-900 transition-colors shadow-sm hover:shadow-md">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-900 font-bold group-hover:bg-gray-900 group-hover:text-white transition-colors">
              @
            </div>
            <h2 className="text-xl font-bold text-gray-900">CSS Keyframes Builder</h2>
          </div>
          <p className="text-gray-600 leading-relaxed mb-4">
            Visually design complex, timeline-based CSS animations right in your browser. Configure transform scales, rotations, and timing functions with instantaneous visual sandbox layout testing.
          </p>
          <span className="text-sm font-semibold text-blue-600 group-hover:text-blue-800 flex items-center gap-1">
            Open Tool <span aria-hidden="true">&rarr;</span>
          </span>
        </Link>
        
        <Link href="/html-minifier" className="group p-6 bg-white border border-gray-200 rounded-xl hover:border-gray-900 transition-colors shadow-sm hover:shadow-md">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-900 font-bold group-hover:bg-gray-900 group-hover:text-white transition-colors">
              H
            </div>
            <h2 className="text-xl font-bold text-gray-900">HTML Code Minifier</h2>
          </div>
          <p className="text-gray-600 leading-relaxed mb-4">
            Instantly shrink your HTML bundle sizes by safely collapsing DOM whitespace and selectively purging hidden developer comments prior to production deployment.
          </p>
          <span className="text-sm font-semibold text-blue-600 group-hover:text-blue-800 flex items-center gap-1">
            Open Tool <span aria-hidden="true">&rarr;</span>
          </span>
        </Link>

        <Link href="/css-minifier" className="group p-6 bg-white border border-gray-200 rounded-xl hover:border-gray-900 transition-colors shadow-sm hover:shadow-md">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-900 font-bold group-hover:bg-gray-900 group-hover:text-white transition-colors">
              C
            </div>
            <h2 className="text-xl font-bold text-gray-900">CSS Code Minifier</h2>
          </div>
          <p className="text-gray-600 leading-relaxed mb-4">
            Accelerate your Core Web Vitals scoring by forcefully parsing cascading stylesheets down to zero-space formatting, stripping redundant terminations and configuration blocks offline.
          </p>
          <span className="text-sm font-semibold text-blue-600 group-hover:text-blue-800 flex items-center gap-1">
            Open Tool <span aria-hidden="true">&rarr;</span>
          </span>
        </Link>
      </div>
    </div>
  );
}
