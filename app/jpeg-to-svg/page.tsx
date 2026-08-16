import { Metadata } from 'next';
import JpegToSvgTool from '@/components/tools/JpegToSvgTool';
import ToolLayout from '@/components/ToolLayout';

export const metadata: Metadata = {
  title: 'JPEG to SVG Converter | High-Fidelity Color Vectorizer',
  description: 'Convert JPG, PNG, and WEBP images to SVG vector graphics online. Professional multi-color tracing with customizable fidelity, paths, and smoothing.',
  keywords: 'jpeg to svg converter, image to vector online, png to svg, convert image to svg, high fidelity vectorizer, vector tracing tool',
  alternates: { canonical: '/jpeg-to-svg' },
};

export default function JpegToSvgPage() {
  return (
    <ToolLayout
      title="JPEG to SVG Converter"
      intro="Transform bitmap images into infinitely scalable vector graphics. Unlike standard converters that only support black and white, our professional vectorizer uses a high-performance tracing engine to handle full-color images, photos, and complex logos while maintaining clean paths."
      toolNode={<JpegToSvgTool />}
      howTo={[
        "Upload any raster image (JPG, PNG, or WebP) using the upload box.",
        "Select a fidelity preset. 'Logo' is best for symbols, while 'Detailed' works well for illustrations.",
        "Choose between 'Full Color' for photos or 'B&W / Icon' for clean, single-path silhouettes.",
        "Wait a few seconds for our Web Worker to calculate the vector paths locally in your browser.",
        "Preview the result and click 'Download SVG' to save your scalable vector file."
      ]}
      useCases={[
        "Logo Recovery: Convert low-resolution pixelated logos into clean, sharp SVG vectors for print.",
        "Web optimization: Convert photographic elements into lightweight SVG shapes for faster page loads.",
        "CAD & 3D Printing: Generate SVG paths from images to use in CNC or 3D modeling software.",
        "Icon Design: Sketch an icon by hand, take a photo, and vectorize it into a professional digital asset."
      ]}
      faqs={[
        {
          question: "How does image tracing work?",
          answer: "Our tool analyzes the pixels in your image, groups them into color clusters (quantization), and then calculates mathematical Bezier curves that wrap around those clusters to create scalable paths."
        },
        {
          question: "Why should I use B&W mode for logos?",
          answer: "B&W mode creates a single-path vector which is much easier to edit in software like Adobe Illustrator or Figma. It also results in a significantly smaller file size compared to multi-color tracing."
        },
        {
          question: "Can I vectorize a photo?",
          answer: "Yes! By using the 'Detailed' preset and 'Full Color' mode, you can create a stylized, artistic vector version of any photograph."
        },
        {
          question: "Is there a file size limit?",
          answer: "We recommend images under 2000px for the fastest performance. Since the vectorization happens on your computer, very large images may take longer to process."
        }
      ]}
      relatedTools={[
        { name: "SVG Optimizer", url: "/svg-optimizer" },
        { name: "SVG to PNG", url: "/svg-to-png" },
        { name: "Frontend Developer Tools", url: "/frontend-tools" }
      ]}
    />
  );
}
