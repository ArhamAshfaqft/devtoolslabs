import React from 'react';
import ToolLayout from '@/components/ToolLayout';
import CsvToVcardTool from '@/components/tools/CsvToVcardTool';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CSV to vCard (VCF) Converter | 100% Secure & Offline',
  description: 'Instantly convert CSV spreadsheets into standard vCard 3.0 (.vcf) formats for iCloud, Outlook, and Android. 100% client-side. We never upload your sensitive contact data.',
  keywords: ['csv to vcard', 'csv to vcf converter', 'convert contacts to vcard', 'address book converter', 'secure vcard converter', 'icloud vcf builder', 'offline csv to vcf'],
  alternates: {
    canonical: 'https://www.devtoolslabs.com/csv-to-vcard',
  },
};

export default function CsvToVcardPage() {
  return (
    <ToolLayout
      title="CSV to vCard (VCF) Converter"
      intro="If you are importing sprawling Excel contact lists into an iCloud Address Book, an Android phone, or Microsoft Outlook, you must first format it into the strict vCard (VCF) protocol. Most online converters force you to upload your sensitive, personally identifiable contact information (PII) to an unknown foreign server. Our CSV to vCard generator parses your names, emails, and phone numbers natively within your browser's private engine. **Your data is absolutely never sent to a server.**"
      toolNode={<CsvToVcardTool />}
      howTo={[
        "Paste your raw comma-separated values (CSV) into the left 'Raw CSV Data' box. The first line must act as your column headers.",
        "The tool will automatically attempt to figure out which column is the First Name, Email, Phone, etc.",
        "Review the 'Map CSV Columns' bar at the top to ensure the columns map perfectly to standard vCard properties.",
        "The standard VCF 3.0 string builds instantly in the right-hand box as you type or adjust mappings.",
        "Click 'Download' to instantly pull an offline `contacts.vcf` file exactly to your desktop."
      ]}
      examples={[
        {
          input: `Name,Phone
John Doe,+1234567890`,
          output: `BEGIN:VCARD
VERSION:3.0
N:;John Doe;;;
FN:John Doe
TEL;TYPE=CELL:+1234567890
END:VCARD`
        }
      ]}
      useCases={[
        "Sales teams moving scraped cold-email CSV sheets directly into their Apple/Mac iCloud Address Books without data-leak liability.",
        "IT Administrators automating the migration of employee databases into standard Outlook VCF contact trees.",
        "Migrating an ancient CRM's user exporting format into a standard mobile-ready contact sheet securely."
      ]}
      faqs={[
        {
          question: "Is this actually secure? Will my contacts be stolen?",
          answer: "It is mathematically impossible for us to collect your contact list. This specific page is built entirely in isolated static JavaScript (React state). The parsing and transformation calculations occur physically entirely on your phone or laptop processor. We deliberately designed it this way to prevent GDPR violations."
        },
        {
          question: "Which vCard version does this use?",
          answer: "This outputs the vCard 3.0 specification. 3.0 is universally accepted. It solves compatibility issues often found with the newer legacy 2.1 syntax while still loading perfectly on both Google Android and Apple iOS."
        },
        {
          question: "Can I import this file directly into iCloud?",
          answer: "Yes! Simply press 'Download', open the iCloud Contacts Web Portal or the Native Mac Contacts App, click 'File', and 'Import vCard'. It will ingest the entire multi-contact file simultaneously."
        },
        {
          question: "Does it support multiple contacts in one file?",
          answer: "Absolutely. The vCard 3.0 specification inherently allows concatenating dozens or thousands of `BEGIN:VCARD` block rows right after one another in a single `.vcf` document."
        }
      ]}
      relatedTools={[
        { name: "JSON to CSV Converter", url: "/json-to-csv" },
        { name: "CSV to JSON Converter", url: "/csv-to-json" },
        { name: "Markdown Table Generator", url: "/markdown-table" }
      ]}
    />
  );
}
