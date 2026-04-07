import React from 'react';
import type { Metadata } from 'next';
import ToolLayout from '@/components/ToolLayout';
import HtmlToElementorTool from '@/components/tools/HtmlToElementorTool';

export const metadata: Metadata = {
  title: 'HTML to Elementor JSON Converter - Free Online Tool',
  description: 'Instantly convert raw HTML snippets into Elementor JSON templates. Perfectly map headings, text, images, and buttons to Elementor widgets for easy import.',
  keywords: 'convert html to elementor, html to elementor json, elementor template generator, free elementor tool, devtoolslabs',
  openGraph: {
    title: 'HTML to Elementor JSON Converter - Free Online Tool',
    description: 'Instantly convert raw HTML snippets into Elementor JSON templates. Move your static code into Elementor in seconds.',
    url: 'https://devtoolslabs.com/html-to-elementor',
  },
  alternates: {
    canonical: '/html-to-elementor',
  },
};

export default function HtmlToElementorPage() {
  const codeSnippets = [
    {
      language: "JavaScript (JSON Structure)",
      code: `{
  "content": [
    {
      "id": "abc1234",
      "elType": "section",
      "elements": [
        {
          "id": "def5678",
          "elType": "column",
          "settings": { "_column_size": 100 },
          "elements": [
            {
              "id": "ghi9012",
              "elType": "widget",
              "widgetType": "heading",
              "settings": { "title": "Hello World" }
            }
          ]
        }
      ]
    }
  ],
  "page_settings": { "title": "My Template" },
  "version": "0.4",
  "type": "section"
}`
    },
    {
      language: "Node.js (Mapping Logic)",
      code: `const mapNode = (el) => {
  if (el.tagName === 'H1') {
    return {
      elType: 'widget',
      widgetType: 'heading',
      settings: { title: el.innerText }
    };
  }
  // Add image, text, and button mapping here...
};`
    }
  ];

  return (
    <ToolLayout
      title="HTML to Elementor JSON Converter"
      intro="Stop rebuilding static HTML snippets from scratch in Elementor. Our high-performance converter takes your raw HTML structure and maps it directly to Elementor's native JSON template format. This is the ultimate utility for developers migrating landing pages or custom code into the Elementor ecosystem."
      toolNode={<HtmlToElementorTool />}
      codeSnippets={codeSnippets}
      howTo={[
        "Paste your raw HTML code into the left editor (supports div, h1-h6, p, img, and anchor tags).",
        "The tool instantly generates a valid Elementor .json template in the right editor.",
        "Click 'Download .json' to save the file to your computer.",
        "In WordPress, go to Elementor > Templates > Saved Templates and click 'Import Templates' to upload the file.",
        "Insert the template into any page using the Elementor Library."
      ]}
      examples={[
        {
          input: '<div class="hero"><h1>Future of Web</h1><p>Build faster.</p></div>',
          output: 'Returns an Elementor Section with a Column containing a Heading and a Text Editor widget.'
        }
      ]}
      useCases={[
        "Migrating legacy static HTML sites to WordPress and Elementor.",
        "Quickly prototyping UI layouts in HTML and bringing them into a page builder.",
        "Converting design system HTML components into shareable Elementor templates.",
        "Bulk importing sections from a custom build into client sites."
      ]}
      faqs={[
        {
          question: "How do I import the generated JSON into Elementor?",
          answer: "In your WordPress dashboard, navigate to 'Templates' > 'Saved Templates'. At the top, click the 'Import Templates' button and upload the .json file you downloaded from this tool. Once imported, you can find it in the 'My Templates' tab within the Elementor editor."
        },
        {
          question: "Which HTML tags are supported?",
          answer: "Our converter currently supports standard semantic tags: <div> and <section> (mapped to Sections/Columns), <h1>-<h6> (mapped to Heading widgets), <p> and <span> (mapped to Text Editor widgets), <img> (mapped to Image widgets), and <a>/<button> (mapped to Button widgets)."
        },
        {
          question: "Does it support custom CSS classes?",
          answer: "The current version maps the principal class of a <div> to the Elementor Section title for organizational purposes, but it does not yet automatically map complex CSS styles to Elementor's design controls. It focuses on structural and content migration."
        },
        {
          question: "Why does my imported section look blank?",
          answer: "Ensure that you are importing the JSON as a 'Template' and not as a 'Page Export' if you're using older a versions of Elementor. Our JSON is optimized for the 'Saved Templates' library import process."
        }
      ]}
      relatedTools={[
        { name: "HTML to JSX Converter", url: "/html-to-jsx" },
        { name: "CSS Background Patterns", url: "/css-background-patterns" },
        { name: "JSON to MySQL Schema", url: "/json-to-mysql" },
        { name: "HTML Minifier", url: "/html-minifier" }
      ]}
    />
  );
}
