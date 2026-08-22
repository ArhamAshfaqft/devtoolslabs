import type { Metadata } from 'next';
import ToolLayout from '@/components/ToolLayout';
import CsvToVcardTool from '@/components/tools/CsvToVcardTool';

export const metadata: Metadata = {
  title: 'CSV to vCard Converter – Create VCF Contacts Online',
  description: 'Convert CSV contact rows into downloadable vCard VCF data locally in your browser. Map names, phone numbers, emails, and addresses.',
  alternates: { canonical: '/csv-to-vcard' },
  openGraph: {
    title: 'CSV to vCard Converter – Create VCF Contacts Online',
    description: 'Map CSV columns and generate vCard contact data locally in your browser.',
    url: 'https://www.devtoolslabs.com/csv-to-vcard',
  },
};

export default function CsvToVcardPage() {
  return (
    <ToolLayout
      title="CSV to vCard (VCF) Converter"
      intro="Convert a spreadsheet-style CSV contact list into standard vCard 3.0 records. Map your CSV columns to contact fields, preview the generated VCF data, and download it for compatible address-book applications."
      toolNode={<CsvToVcardTool />}
      howTo={[
        'Paste CSV data containing a header row and contact records.',
        'Map each detected CSV column to the matching vCard field.',
        'Review the generated VCF records for missing or incorrectly mapped values.',
        'Copy or download the vCard output and import it into your contact application.',
      ]}
      useCases={[
        'Migrating contacts from spreadsheets into an address book.',
        'Converting CRM exports into portable VCF records.',
        'Preparing contact files without uploading personal data to a conversion service.',
      ]}
      faqs={[
        { question: 'Is my contact data uploaded?', answer: 'No. CSV parsing and vCard generation run locally in your browser.' },
        { question: 'Which vCard version is generated?', answer: 'The tool generates broadly compatible vCard 3.0 records.' },
      ]}
      relatedTools={[
        { name: 'JSON to Excel', url: '/json-to-excel' },
        { name: 'JSON From Array', url: '/json-from-array' },
        { name: 'JSON Formatter', url: '/json-formatter' },
      ]}
    />
  );
}
