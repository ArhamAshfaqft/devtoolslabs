import type { Metadata } from 'next';
import ToolLayout from '@/components/ToolLayout';
import Base64EncodeDecodeTool from '@/components/tools/Base64EncodeDecodeTool';

export const metadata: Metadata = {
  title: 'Base64 Encoder & Decoder | Convert Text Online',
  description: 'Encode text as Base64 or decode Base64 into readable UTF-8 text locally in your browser. Includes Unicode and emoji support.',
  alternates: { canonical: '/base64-encode-decode' },
};

export default function Base64EncodeDecodePage() {
  return (
    <ToolLayout
      title="Base64 Encoder & Decoder"
      intro="Convert text to Base64 or decode Base64 back into readable UTF-8 text. The conversion runs locally in your browser, including support for Unicode characters and emoji."
      toolNode={<Base64EncodeDecodeTool />}
      howTo={[
        "Choose Encode or Decode mode.",
        "Paste text or a Base64 value into the input field.",
        "Review the converted result as it appears.",
        "Copy the output for use in your application or terminal."
      ]}
      examples={[
        { input: 'Hello World!', output: 'SGVsbG8gV29ybGQh' },
        { input: 'eyJhbGciOiJIUzI1NiJ9', output: '{"alg":"HS256"}' }
      ]}
      useCases={[
        "Preparing HTTP Basic Authentication values.",
        "Inspecting encoded API payloads or JWT segments.",
        "Safely converting UTF-8 text for systems that require ASCII input."
      ]}
      faqs={[
        {
          question: "Is Base64 encryption?",
          answer: "No. Base64 is a reversible encoding format and provides no confidentiality. Do not use it to protect passwords or secrets."
        },
        {
          question: "Is my input uploaded?",
          answer: "No. Encoding and decoding use browser APIs on your device; the input is not sent to DevToolsLabs servers."
        },
        {
          question: "Does it support Unicode?",
          answer: "Yes. The converter uses UTF-8 byte conversion so emoji and non-Latin text are handled correctly."
        }
      ]}
      relatedTools={[
        { name: "JWT Decoder", url: "/jwt-decoder" },
        { name: "URL Encoder & Decoder", url: "/url-encode-decode" },
        { name: "Encoding Tools", url: "/encoding-tools" }
      ]}
    />
  );
}
