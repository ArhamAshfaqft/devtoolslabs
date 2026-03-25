import React from 'react';
import type { Metadata } from 'next';
import ToolLayout from '@/components/ToolLayout';
import MermaidPlaygroundTool from '@/components/tools/MermaidPlaygroundTool';

export const metadata: Metadata = {
  title: 'Mermaid.js Diagram Playground: Text-to-Diagram Live Editor | DevToolsLabs',
  description: 'Create beautiful architectural diagrams, flowcharts, and sequence diagrams from simple text using Mermaid.js. 100% free, offline, and secure.',
  openGraph: {
    title: 'Mermaid.js Diagram Playground: Text-to-Diagram Live Editor | DevToolsLabs',
    description: 'Create beautiful architectural diagrams, flowcharts, and sequence diagrams from simple text using Mermaid.js. 100% free, offline, and secure.',
    url: 'https://devtoolslabs.com/diagram-playground',
  },
  alternates: {
    canonical: '/diagram-playground',
  },
};

export default function MermaidPlaygroundPage() {
  return (
    <ToolLayout
      title="Mermaid Diagram Playground"
      intro="Transform your architectural thoughts into professional diagrams instantly. Type Mermaid.js syntax and watch your flowchart, sequence diagram, or Gantt chart render in real-time."
      toolNode={<MermaidPlaygroundTool />}
      howTo={[
        "Type or paste Mermaid.js syntax into the editor on the left",
        "Watch the live preview update instantly on the right",
        "Use the category buttons (Flow, Seq, Gantt) for quick templates",
        "Copy the generated SVG code for use in your documentation"
      ]}
      examples={[
        { 
          input: "graph LR\nA --> B", 
          output: "[SVG Diagram Rendering]" 
        }
      ]}
      useCases={[
        "Visualizing system architecture in READMEs",
        "Designing complex workflow logic",
        "Quickly generating Gantt charts for project planning"
      ]}
      faqs={[
        {
          question: "Is my diagram data sent to any server?",
          answer: "No. The Mermaid.js rendering engine runs entirely in your browser. Your diagram code never leaves your computer."
        },
        {
          question: "Can I themes the diagrams?",
          answer: "Our playground uses a neutral developer-friendly theme by default, but you can override it using Mermaid.js directives directly in the editor."
        }
      ]}
      relatedTools={[
        { name: "SVG Path Visualizer", url: "/svg-path-visualizer" },
        { name: "Markdown Table", url: "/markdown-table" }
      ]}
    />
  );
}
