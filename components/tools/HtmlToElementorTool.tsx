"use client";

import React, { useState, useCallback, useEffect } from 'react';
import dynamic from 'next/dynamic';

// --- Types ---
interface ElementorNode {
  id: string;
  elType: 'section' | 'column' | 'widget';
  isInner?: boolean;
  widgetType?: string;
  settings: Record<string, any>;
  elements: ElementorNode[];
}

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

export default function HtmlToElementorTool() {
  const [html, setHtml] = useState<string>(`<!-- Paste your HTML here -->
<div class="my-section">
  <h1>Welcome to DevToolsLabs</h1>
  <p>This is a sample HTML structure that will be converted to Elementor JSON.</p>
  <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085" alt="Laptop" />
  <a href="https://devtoolslabs.com" class="btn">Explore Tools</a>
</div>`);
  const [jsonOutput, setJsonOutput] = useState<string>('');
  const [copied, setCopied] = useState(false);

  const generateId = () => Math.random().toString(36).slice(2, 9);

  const mapHtmlNodeToElementor = (node: Node): ElementorNode | null => {
    if (node.nodeType === Node.TEXT_NODE) {
      if (!node.textContent?.trim()) return null;
      return {
        id: generateId(),
        elType: 'widget',
        widgetType: 'text-editor',
        settings: { editor: node.textContent.trim() },
        elements: []
      };
    }

    if (node.nodeType !== Node.ELEMENT_NODE) return null;
    const el = node as HTMLElement;
    const tagName = el.tagName.toLowerCase();

    // Map Specific Tags
    if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(tagName)) {
      return {
        id: generateId(),
        elType: 'widget',
        widgetType: 'heading',
        settings: {
          title: el.innerText,
          header_size: tagName,
          align: el.style.textAlign || 'left'
        },
        elements: []
      };
    }

    if (tagName === 'p') {
      return {
        id: generateId(),
        elType: 'widget',
        widgetType: 'text-editor',
        settings: { editor: el.innerHTML },
        elements: []
      };
    }

    if (tagName === 'img') {
      return {
        id: generateId(),
        elType: 'widget',
        widgetType: 'image',
        settings: {
          image: { url: el.getAttribute('src') || '' },
          caption: el.getAttribute('alt') || ''
        },
        elements: []
      };
    }

    if (tagName === 'a' || tagName === 'button') {
      return {
        id: generateId(),
        elType: 'widget',
        widgetType: 'button',
        settings: {
          text: el.innerText,
          link: { url: el.getAttribute('href') || '#', is_external: '', nofollow: '', custom_attributes: '' },
          align: 'left',
          size: 'md'
        },
        elements: []
      };
    }

    // Container Mapping
    const children = Array.from(el.childNodes)
      .map(child => mapHtmlNodeToElementor(child))
      .filter(n => n !== null) as ElementorNode[];

    return {
      id: generateId(),
      elType: tagName === 'div' || tagName === 'section' ? 'section' : 'column',
      settings: {
        _title: el.className || tagName,
      },
      elements: tagName === 'div' || tagName === 'section' 
        ? [{
            id: generateId(),
            elType: 'column',
            settings: { _column_size: 100 },
            elements: children
          }] 
        : children
    };
  };

  const convert = useCallback(() => {
    if (typeof window === 'undefined') return;
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const rootElements = Array.from(doc.body.childNodes)
        .map(node => mapHtmlNodeToElementor(node))
        .filter(n => n !== null);

      const elementorTemplate = {
        content: rootElements,
        page_settings: {
          title: "Converted Template",
          status: "publish"
        },
        version: "0.4",
        title: "DevToolsLabs Import",
        type: "section"
      };

      setJsonOutput(JSON.stringify(elementorTemplate, null, 2));
    } catch (e) {
      setJsonOutput('Error parsing HTML');
    }
  }, [html]);

  useEffect(() => {
    convert();
  }, [convert]);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadJson = () => {
    const blob = new Blob([jsonOutput], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'elementor-template.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[500px]">
        {/* Editor Left */}
        <div className="flex flex-col border border-gray-200 rounded-xl overflow-hidden shadow-sm bg-white">
          <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 flex justify-between items-center">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Input HTML</span>
          </div>
          <div className="flex-1 min-h-0">
            <MonacoEditor
              height="100%"
              language="html"
              theme="vs-light"
              value={html}
              onChange={(v) => setHtml(v || '')}
              options={{ minimap: { enabled: false }, fontSize: 13, wordWrap: 'on' }}
            />
          </div>
        </div>

        {/* Editor Right */}
        <div className="flex flex-col border border-gray-200 rounded-xl overflow-hidden shadow-sm bg-white">
          <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 flex justify-between items-center">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Elementor JSON</span>
            <div className="flex gap-2">
               <button onClick={handleCopy} className="text-xs font-bold px-2 py-1 bg-black text-white rounded hover:bg-gray-800 transition-colors">
                  {copied ? 'Copied!' : 'Copy'}
               </button>
               <button onClick={downloadJson} className="text-xs font-bold px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                  Download .json
               </button>
            </div>
          </div>
          <div className="flex-1 min-h-0">
            <MonacoEditor
              height="100%"
              language="json"
              theme="vs-dark"
              value={jsonOutput}
              options={{ readOnly: true, minimap: { enabled: false }, fontSize: 13, wordWrap: 'on' }}
            />
          </div>
        </div>
      </div>

      {/* Expert Info Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-50 border border-blue-100 p-5 rounded-xl">
           <h3 className="text-sm font-bold text-blue-900 mb-2 flex items-center gap-2">
             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
             Expert Integration Tip
           </h3>
           <p className="text-xs text-blue-800 leading-relaxed">
             This JSON is compatible with <strong>Elementor 3.0+</strong>. To use it: 
             Go to Elementor &rarr; Templates &rarr; Saved Templates &rarr; <strong>Import Templates</strong>. 
             Upload the <code>.json</code> file generated here.
           </p>
        </div>
        <div className="bg-emerald-50 border border-emerald-100 p-5 rounded-xl">
           <h3 className="text-sm font-bold text-emerald-900 mb-2 flex items-center gap-2">
             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
             Mapping Logic
           </h3>
           <ul className="text-[11px] text-emerald-800 space-y-1.5 list-disc list-inside">
             <li><code>div</code>/<code>section</code> &rarr; Elementor Section</li>
             <li><code>h1-h6</code> &rarr; Heading Widget</li>
             <li><code>img</code> &rarr; Image Widget</li>
             <li><code>a</code> &rarr; Button Widget</li>
           </ul>
        </div>
        <div className="bg-purple-50 border border-purple-100 p-5 rounded-xl">
           <h3 className="text-sm font-bold text-purple-900 mb-2 flex items-center gap-2">
             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
             100% Client-Side
           </h3>
           <p className="text-xs text-purple-800 leading-relaxed">
             We use the browser's native DOM parser. Your HTML never touches our server, ensuring your internal project structures remain private.
           </p>
        </div>
      </div>
    </div>
  );
}
