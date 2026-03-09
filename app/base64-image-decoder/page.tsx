import type { Metadata } from 'next';
import ToolLayout from '@/components/ToolLayout';
import Base64ImageDecoderTool from '@/components/tools/Base64ImageDecoderTool';

export const metadata: Metadata = {
  title: 'Base64 Image Decoder (Free Online Tool) | View Instantly',
  description: 'Instantly decode Base64 strings into images (PNG, JPG, webp, SVG). Preview the image directly in your browser without uploading to a server.',
};

export default function Base64ImageDecoderPage() {
  return (
    <ToolLayout
      title="Base64 Image Decoder (View & Download Encoded Images Online)"
      intro="Developers often need to copy Base64 image strings from JSON APIs, CSS files, or database rows. Instead of writing a script to save it, simply paste the long Base64 string here to instantly view the image, check its file size, and download it locally. All processing is 100% secure and runs entirely inside your browser."
      toolNode={<Base64ImageDecoderTool />}
      howTo={[
        "Copy your long Base64 image string. It can be raw (e.g., iVBORw0...) or formatted with the Data URI Scheme (data:image/png;base64,iVBO...).",
        "Paste the string into the input box.",
        "The tool will instantly decode the data and render the image preview on the checkerboard background.",
        "Click the Download button to save the reconstructed image file locally to your machine."
      ]}
      examples={[
        {
          input: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
          output: '[ Renders a transparent 1x1 GIF Image ]'
        }
      ]}
      useCases={[
        "Debugging images embedded directly inside JSON or XML API responses.",
        "Extracting small inline icon graphics from a minified CSS file or SVG tag.",
        "Converting heavily serialized image data from MongoDB or PostgreSQL rows back into viewable files.",
        "Validating that a Base64 upload script is generating uncorrupted, valid image structures."
      ]}
      faqs={[
        {
          question: "What is a Base64 encoded image?",
          answer: "Base64 encoding translates binary data (like an image file) into a strict subset of 64 printable ASCII characters. This allows the image to be safely transmitted over text-based protocols like HTTP (inside JSON) or embedded directly inside HTML/CSS without corruption."
        },
        {
          question: "Can I paste raw Base64 without the 'data:image' prefix?",
          answer: "Yes. Our tool analyzes the first few characters (the magic bytes) of your raw Base64 string. It automatically detects common image signatures (like /9j/ for JPEG or iVBORw for PNG) and dynamically prepends the required Data URI scheme to render the image."
        },
        {
          question: "Does this save the image to your servers?",
          answer: "Absolutely not. The image rendering process utilizes the native HTML <img> tag, pointing directly at the 'data:' URI you provide in the memory of the DOM. No network requests are made to external servers."
        },
        {
          question: "Why is the decoded image size slightly different than the string length?",
          answer: "Because Base64 encoding utilizes 4 characters to represent 3 bytes of binary data, the raw Base64 string is inherently ~33% larger than the actual image file size. Our tool mathematically calculates and displays the true underlying byte size (excluding the base64 padding)."
        },
        {
          question: "What image formats are supported?",
          answer: "Any image format that is natively supported by modern web browsers can be rendered here. This includes standard formats like PNG, JPEG, GIF, and modern highly-compressed formats like WebP, AVIF, and vector SVG structures."
        }
      ]}
      relatedTools={[
        { name: "JSON Escape", url: "/json-escape-unescape" },
        { name: "HTML Entity Decoder", url: "/html-entity-decoder" }
      ]}
    />
  );
}
