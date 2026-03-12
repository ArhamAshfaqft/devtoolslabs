import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'WCAG Accessibility Tools | Color Contrast & ADA Compliance',
  description: 'Ensure your web designs meet WCAG 2.1 AA/AAA standards. Free client-side tools for color contrast checking, luminance calculation, and accessibility audits.',
};

export default function AccessibilityToolsHub() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 md:py-20">
      <div className="max-w-3xl mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 tracking-tight">Accessibility (WCAG) Tools</h1>
        <p className="text-xl text-gray-600 leading-relaxed">
          Building inclusive web applications starts with color and contrast. Use these professional-grade accessibility utilities to verify that your UI components meet legal ADA and international WCAG standards entirely inside your browser.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/color-contrast-checker" className="group p-6 bg-white border border-gray-200 rounded-xl hover:border-gray-900 transition-colors shadow-sm hover:shadow-md">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-900 font-bold group-hover:bg-gray-900 group-hover:text-white transition-colors">
              AA
            </div>
            <h2 className="text-xl font-bold text-gray-900">Color Contrast Checker</h2>
          </div>
          <p className="text-gray-600 leading-relaxed mb-4">
            Instantly calculate the contrast ratio between text and background colors. Includes our "Smart Fixer" that suggests the nearest color to pass WCAG 2.1 AA and AAA standards.
          </p>
          <span className="text-sm font-semibold text-blue-600 group-hover:text-blue-800 flex items-center gap-1">
            Open Tool <span aria-hidden="true">&rarr;</span>
          </span>
        </Link>

        <Link href="/guides/wcag-contrast-guide" className="group p-6 bg-white border border-gray-200 rounded-xl hover:border-gray-900 transition-colors shadow-sm hover:shadow-md">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-900 font-bold group-hover:bg-gray-900 group-hover:text-white transition-colors">
              ?
            </div>
            <h2 className="text-xl font-bold text-gray-900">WCAG & ADA Guide</h2>
          </div>
          <p className="text-gray-600 leading-relaxed mb-4">
            The definitive developer's guide to color contrast, luminance, and accessibility. Learn why 4.5:1 matters and how to pass a professional accessibility audit.
          </p>
          <span className="text-sm font-semibold text-blue-600 group-hover:text-blue-800 flex items-center gap-1">
            Read Guide <span aria-hidden="true">&rarr;</span>
          </span>
        </Link>
      </div>
    </div>
  );
}
