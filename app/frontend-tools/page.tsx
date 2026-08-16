import type { Metadata } from 'next';
import CategoryHub from '@/components/CategoryHub';

export const metadata: Metadata = {
  title: 'Frontend Design Tools | SVG, JSX & CSS Utilities',
  description: 'Convert and optimize SVG assets, transform HTML into JSX, and generate production-ready CSS patterns.',
  alternates: { canonical: '/frontend-tools' },
};

export default function FrontendToolsHub() {
  return <CategoryHub
    title="Frontend Design Tools"
    intro="Prepare frontend code and visual assets with interactive browser-based utilities for React, SVG, CSS, and Elementor workflows."
    tools={[
      { badge: 'JSX', title: 'HTML to JSX', href: '/html-to-jsx', description: 'Convert HTML attributes, inline styles, and elements into valid React JSX.' },
      { badge: 'SVG', title: 'SVG Optimizer', href: '/svg-optimizer', description: 'Remove unnecessary SVG metadata and reduce path precision safely.' },
      { badge: 'PNG', title: 'SVG to PNG', href: '/svg-to-png', description: 'Export SVG graphics as high-resolution PNG, WebP, or JPEG files.' },
      { badge: 'VEC', title: 'JPEG to SVG', href: '/jpeg-to-svg', description: 'Trace raster images into scalable vector paths directly in the browser.' },
      { badge: 'CSS', title: 'CSS Background Patterns', href: '/css-background-patterns', description: 'Generate customizable visual patterns with reusable CSS output.' },
      { badge: 'ELM', title: 'HTML to Elementor JSON', href: '/html-to-elementor', description: 'Convert compatible HTML sections into importable Elementor template JSON.' },
    ]}
  />;
}
