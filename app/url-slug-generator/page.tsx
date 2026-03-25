import type { Metadata } from 'next';
import ToolLayout from '@/components/ToolLayout';
import UrlSlugGeneratorTool from '@/components/tools/UrlSlugGeneratorTool';

export const metadata: Metadata = {
  title: 'URL Slug Generator | Create SEO-Friendly Permalinks Online',
  description: 'Instantly generate clean, SEO-optimized URL slugs from blog titles or text strings. Removes stop-words, special characters, and diacritics natively in your browser.',
  openGraph: {
    title: 'URL Slug Generator | Create SEO-Friendly Permalinks Online',
    description: 'Instantly generate clean, SEO-optimized URL slugs from blog titles or text strings. Removes stop-words, special characters, and diacritics natively in your browser.',
    url: 'https://devtoolslabs.com/url-slug-generator',
  },
  alternates: {
    canonical: '/url-slug-generator',
  },
};

export default function UrlSlugGeneratorPage() {
  return (
    <ToolLayout
      title="URL Slug Generator (SEO URL Maker)"
      intro="A URL slug is the exact address of a specific webpage on your site. Creating clean, readable slugs helps search engines understand your content and improves click-through rates. This generator takes any complex title, automatically removes harmful special characters, strips out SEO stop-words (like 'the' or 'and'), and provides a perfectly hyphenated, lowercase permalink ready for your CMS."
      toolNode={<UrlSlugGeneratorTool />}
      howTo={[
        "Type or paste your raw article title, product name, or phrase into the input box.",
        "The string is instantly converted to lowercase, and all accents (diacritics) are normalized into standard English characters.",
        "Enable the 'Remove Stop Words' filter to automatically strip short connecting words, resulting in a punchier, keyword-dense URL.",
        "Choose between Hyphens (-) or Underscores (_) as your word separator (Note: Google officially prefers hyphens for SEO).",
        "Click the copy button and paste the slug directly into WordPress, Ghost, Next.js, or your custom routing system."
      ]}
      examples={[
        {
          input: 'How to Build a REST API in Node.js (2026 Guide!)',
          output: 'how-to-build-a-rest-api-in-node-js-2026-guide'
        },
        {
          input: 'Settings: [Remove Stop Words]',
          output: 'build-rest-api-node-js-2026-guide'
        }
      ]}
      useCases={[
        "SEO Managers preparing a spreadsheet of optimal URLs for upcoming content pillars.",
        "Developers building a custom CMS requiring an algorithm to format database string inputs into valid route paths.",
        "Stripping out complex French/Spanish accents (e.g., 'café' becomes 'cafe') for cleaner routing parameter parsing."
      ]}
      faqs={[
        {
          question: "Should I use hyphens or underscores for URL slugs?",
          answer: "Always use hyphens (-). Google explicitly states in their documentation that their crawler interprets hyphens as word separators. Conversely, underscores (_) are treated as character connectors, meaning 'my_url_slug' is read by Google as the single word 'myurlslug'."
        },
        {
          question: "Why should I remove stop words from a URL?",
          answer: "Stop-words (like 'a', 'the', 'of') offer almost zero SEO value while physically lengthening your URL. In search results, extremely long URLs get truncated visually. By removing stop-words, you push your primary high-value keywords closer to the front of the slug where search engines and users prioritize them."
        },
        {
          question: "Does this handle foreign languages and accents?",
          answer: "Yes. The tool utilizes Unicode Normalization (NFD) to intelligently decompose accented characters into base letters (e.g., converting 'é' to 'e', or 'ñ' to 'n'). This prevents complex rendering issues in legacy browsers."
        },
        {
          question: "Are URLs case-sensitive?",
          answer: "Yes, web servers like Nginx and Apache are strictly case-sensitive. `domain.com/My-Page` and `domain.com/my-page` are treated as two entirely different entities in the eyes of Google, which can cause 'Duplicate Content' penalties. Always force your slugs to lowercase."
        },
        {
          question: "What happens to characters like &, @, or $?",
          answer: "Our generator strictly follows the RFC 3986 standard for URIs. Any character that is not a letter, number, hyphen, or underscore is automatically stripped or converted to a space before being hyphenated. This ensures your URL never breaks or requires messy 'percent-encoding' in the address bar."
        }
      ]}
      relatedTools={[
        { name: "URL Encoder / Decoder", url: "/url-encoder" },
        { name: "HTML Entity Encoder", url: "/html-entity-encoder" },
        { name: "Markdown Table Generator", url: "/markdown-table" }
      ]}
    />
  );
}
