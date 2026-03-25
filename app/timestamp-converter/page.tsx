import type { Metadata } from 'next';
import ToolLayout from '@/components/ToolLayout';
import TimestampConverterTool from '@/components/tools/TimestampConverterTool';

export const metadata: Metadata = {
  title: 'Unix Epoch Timestamp Converter (Free Online Tool)',
  description: 'Instantly convert Unix epoch timestamps to human-readable local dates, UTC, and ISO times. Automatically detects milliseconds or seconds. Free developer tool.',
  openGraph: {
    title: 'Unix Epoch Timestamp Converter (Free Online Tool)',
    description: 'Instantly convert Unix epoch timestamps to human-readable local dates, UTC, and ISO times. Automatically detects milliseconds or seconds. Free developer tool.',
    url: 'https://devtoolslabs.com/timestamp-converter',
  },
  alternates: {
    canonical: '/timestamp-converter',
  },
};

export default function TimestampConverterPage() {
  return (
    <ToolLayout
      title="Unix Timestamp Converter (Convert Epoch to Date Online)"
      intro="Bridging the gap between computer time and human time. A Unix Timestamp is simply the number of seconds that have elapsed since January 1st, 1970. This tool bidirectionally translates native integer timestamps directly into your exact local timezone, UTC string, and ISO-8601 format."
      toolNode={<TimestampConverterTool />}
      howTo={[
        "To decode an epoch: Paste your integer into the left 'Unix Timestamp' box.",
        "To encode a date: Use the calendar picker on the right 'Local Date & Time'.",
        "The tool automatically identifies whether your timestamp is encoded in Seconds (10 digits) or Milliseconds (13 digits).",
        "View the 'Converted Timestamps' grid below for UTC, ISO, and relative time differentials."
      ]}
      examples={[
        {
          input: '1735689600',
          output: 'Local: Wed Jan 01 2025\nUTC: Wed, 01 Jan 2025 00:00:00 GMT\nISO 8601: 2025-01-01T00:00:00.000Z'
        }
      ]}
      useCases={[
        "Debugging database records: Converting a raw 'created_at' integer field from PostgreSQL or MongoDB into a readable date.",
        "Generating integer expiry markers for JWT payloads (the `exp` claim).",
        "Calculating the exact Unix Time required to set a scheduled cron job or delayed background queue task in Node.js."
      ]}
      faqs={[
        {
          question: "What is the difference between Seconds and Milliseconds?",
          answer: "Most backend languages (like PHP or Go) and databases store Unix time natively in seconds (a 10-digit number like 1700000000). However, JavaScript natively calculates `Date.now()` in milliseconds (a 13-digit number like 1700000000000). Our tool automatically detects which variation you are pasting."
        },
        {
          question: "How is the local timezone determined?",
          answer: "The 'Local Timezone' grid calculates the offset entirely client-side based on the native clock and region settings of your operating system. It does not ping an IP-location database."
        },
        {
          question: "What happens in the Year 2038?",
          answer: "The 'Year 2038 Problem' occurs when 32-bit signed integers run out of space to track seconds (at exactly 03:14:07 UTC on 19 January 2038). Modern operating systems use 64-bit integers which pushes the integer overflow out by 292 billion years. This tool uses JavaScript's 64-bit float numbers, making it completely immune."
        },
        {
          question: "Is ISO 8601 the same as UTC?",
          answer: "Not necessarily. UTC is the universal time standard. ISO 8601 is a strict string formatting rule (YYYY-MM-DDTHH:mm:ss.sssZ). The 'Z' at the end of an ISO string denotes 'Zulu time', which is equivalent to UTC. However, ISO strings can technically omit the Z and define custom timezone offsets."
        }
      ]}
      relatedTools={[
        { name: "Cron Job Parser", url: "/cron-parser" },
        { name: "JSON Formatter", url: "/json-formatter" }
      ]}
    />
  );
}
