import { Metadata } from 'next';
import SvgToPngTool from '@/components/tools/SvgToPngTool';
import ToolLayout from '@/components/ToolLayout';

export const metadata: Metadata = {
  title: 'SVG to PNG Converter | High-DPI & Scale Export',
  description: 'Convert SVG to PNG, WebP, or JPEG online with high-DPI scaling (up to 4x). Maintain transparency and sharp paths for professional design workflows.',
  keywords: 'save svg as png, convert svg to png, svg to png high resolution, svg to png 300 dpi, svg to webp converter online',
};

export default function SvgToPngPage() {
  return (
    <ToolLayout
      title="SVG to PNG Converter"
      intro="Convert vector graphics to high-resolution raster images instantly. Our professional-grade converter allows you to up-scale SVGs by up to 400% while maintaining perfect edge sharpness, making it ideal for creating assets for social media, print, or web UI."
      toolNode={<SvgToPngTool />}
      howTo={[
        "Upload your .svg file by clicking the upload area or dragging it onto the tool.",
        "Select your desired output scale. Choose 2x or 3x for high-resolution (Retina) displays.",
        "Choose your preferred output format (PNG for transparency, JPEG for smaller file size).",
        "Toggle the transparency switch if you need a solid white background.",
        "Click 'Download' to save your sharp, high-DPI image locally."
      ]}
      useCases={[
        "Logo Exports: Export vector logos as sharp PNGs for use in slide decks or social media headers.",
        "Print Preparation: Scale small SVGs by 4x to meet high printer DPI requirements without losing edge quality.",
        "Web optimization: Convert SVGs to modern WebP format for improved website performance.",
        "Legacy Support: Quickly generate raster fallbacks for older browsers that don't support SVG vectors."
      ]}
      faqs={[
        {
          question: "Why should I use 2x or 3x scale?",
          answer: "Modern smartphones and high-end monitors use high-pixel-density displays (Retina). Exporting at 2x or 3x ensures your icons and graphics look crisp on these devices instead of appearing blurry."
        },
        {
          question: "Will the image remain sharp at 4x scale?",
          answer: "Yes! Because SVGs are vector-based, they are mathematically defined. Scaling an SVG before rasterization ensures that the resulting PNG is as sharp as if it were natively designed at that size."
        },
        {
          question: "Is my design data safe?",
          answer: "100% safe. The entire conversion process happens inside your browser's local sandbox. Your files are never uploaded to our servers, keeping your intellectual property private."
        }
      ]}
      relatedTools={[
        { name: "SVG Optimizer", url: "/svg-optimizer" },
        { name: "JPEG to SVG", url: "/jpeg-to-svg" },
        { name: "Base64 to Image", url: "/base64-to-image" }
      ]}
    />
  );
}
