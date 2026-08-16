import type { Metadata } from 'next';
import CategoryHub from '@/components/CategoryHub';

export const metadata: Metadata = {
  title: 'Web Accessibility Resources | WCAG Contrast Guide',
  description: 'Practical WCAG contrast guidance and frontend resources for building more accessible interfaces.',
  alternates: { canonical: '/accessibility-tools' },
};

export default function AccessibilityToolsHub() {
  return <CategoryHub
    title="Accessibility Resources"
    intro="Learn how contrast, luminance, semantic structure, and resilient frontend code contribute to accessible web interfaces."
    tools={[
      { badge: 'AA', title: 'WCAG Color Contrast Guide', href: '/guides/wcag-contrast-guide', description: 'Understand WCAG contrast ratios, AA and AAA thresholds, and practical remediation.' },
      { badge: 'UI', title: 'Frontend Developer Tools', href: '/frontend-tools', description: 'Use the maintained frontend utilities alongside accessibility-aware development practices.' },
    ]}
  />;
}
