'use client';
import React, { useState, useEffect, useCallback } from 'react';
import Editor from '@monaco-editor/react';
import TurndownService from 'turndown';
import LZString from 'lz-string';

const DEFAULT_HTML = `<h1>Hello World</h1>
<p>This is a <strong>bold</strong> statement with a <a href="https://devtoolslabs.com">link</a>.</p>
<ul>
  <li>Item 1</li>
  <li>Item 2</li>
</ul>
<blockquote>This is a blockquote.</blockquote>
<pre><code class="language-javascript">console.log("Hello");</code></pre>`;

export default function HtmlToMarkdownTool() {
  const [htmlCode, setHtmlCode] = useState(DEFAULT_HTML);
  const [markdownCode, setMarkdownCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Turndown Options
  const [headingStyle, setHeadingStyle] = useState<'atx' | 'setext'>('atx');
  const [hr, setHr] = useState<string>('---');
  const [bulletListMarker, setBulletListMarker] = useState<'-' | '*' | '+'>('-');
  const [codeBlockStyle, setCodeBlockStyle] = useState<'indented' | 'fenced'>('fenced');

  // Load from URL/Local on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.slice(1);
      if (hash) {
        try {
          const params = new URLSearchParams(hash);
          const compressed = params.get('q');
          if (compressed) {
            const decompressed = LZString.decompressFromEncodedURIComponent(compressed);
            if (decompressed) {
              setHtmlCode(decompressed);
              return;
            }
          }
        } catch (e) {
          console.error("Failed to load state from URL", e);
        }
      }
      const saved = localStorage.getItem('dtl_html_input');
      if (saved) setHtmlCode(saved);
    }
  }, []);

  const convertHtml = useCallback(() => {
    try {
      const turndownService = new TurndownService({
        headingStyle,
        hr,
        bulletListMarker,
        codeBlockStyle
      });
      const md = turndownService.turndown(htmlCode);
      setMarkdownCode(md);
      setError(null);

      // Save states
      if (typeof window !== 'undefined') {
        localStorage.setItem('dtl_html_input', htmlCode);
        const compressed = LZString.compressToEncodedURIComponent(htmlCode);
        window.history.replaceState(null, '', `#q=${compressed}`);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to parse HTML.');
    }
  }, [htmlCode, headingStyle, hr, bulletListMarker, codeBlockStyle]);

  useEffect(() => {
    convertHtml();
  }, [convertHtml]);

  const handleCopy = () => {
    navigator.clipboard.writeText(markdownCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setHtmlCode('');
  };

  return (
    <div className="flex flex-col h-[800px] w-full bg-white">
      {/* Configuration Toolbar */}
      <div className="flex flex-wrap items-center gap-4 p-3 border-b border-gray-200 bg-gray-50 text-sm">
        <div className="flex items-center gap-2">
          <label className="font-medium text-gray-700">Headings:</label>
          <select 
            suppressHydrationWarning
            value={headingStyle} 
            onChange={(e) => setHeadingStyle(e.target.value as 'atx' | 'setext')}
            className="border border-gray-300 rounded px-2 py-1 text-gray-800 bg-white"
          >
            <option value="atx">ATX (### Heading)</option>
            <option value="setext">Setext (Heading ========)</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="font-medium text-gray-700">Bullets:</label>
          <select 
            suppressHydrationWarning
            value={bulletListMarker} 
            onChange={(e) => setBulletListMarker(e.target.value as '-' | '*' | '+')}
            className="border border-gray-300 rounded px-2 py-1 text-gray-800 bg-white"
          >
            <option value="-">- (Dash)</option>
            <option value="*">* (Asterisk)</option>
            <option value="+">+ (Plus)</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="font-medium text-gray-700">Code Blocks:</label>
          <select 
            suppressHydrationWarning
            value={codeBlockStyle} 
            onChange={(e) => setCodeBlockStyle(e.target.value as 'indented' | 'fenced')}
            className="border border-gray-300 rounded px-2 py-1 text-gray-800 bg-white"
          >
            <option value="fenced">Fenced (\`\`\`)</option>
            <option value="indented">Indented (4 spaces)</option>
          </select>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Side: HTML Input */}
        <div className="w-1/2 flex flex-col border-r border-gray-200">
          <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-b border-gray-200">
            <span className="font-semibold text-sm text-gray-700">Input HTML</span>
            <button
              suppressHydrationWarning
              onClick={handleClear}
              className="text-xs text-red-600 hover:text-red-700 font-medium px-2 py-1 rounded hover:bg-red-50 transition-colors"
            >
              Clear
            </button>
          </div>
          <div className="flex-1">
            <Editor
              height="100%"
              defaultLanguage="html"
              value={htmlCode}
              onChange={(val) => setHtmlCode(val || '')}
              theme="light"
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                wordWrap: 'on',
                formatOnPaste: true,
                scrollBeyondLastLine: false,
                lineNumbersMinChars: 3,
                padding: { top: 16 }
              }}
            />
          </div>
        </div>

        {/* Right Side: Markdown Output */}
        <div className="w-1/2 flex flex-col bg-gray-50">
          <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 bg-white">
            <span className="font-semibold text-sm text-gray-700">Markdown Output</span>
            <button
              suppressHydrationWarning
              onClick={handleCopy}
              className={`px-3 py-1 text-xs font-semibold rounded transition-colors text-white shadow-sm ${
                copied ? 'bg-green-600 hover:bg-green-700' : 'bg-black hover:bg-gray-800'
              }`}
            >
              {copied ? 'Copied!' : 'Copy Markdown'}
            </button>
          </div>
          <div className="flex-1 relative">
            <Editor
              height="100%"
              defaultLanguage="markdown"
              value={markdownCode}
              theme="light"
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                wordWrap: 'on',
                readOnly: true,
                scrollBeyondLastLine: false,
                lineNumbersMinChars: 3,
                padding: { top: 16 }
              }}
            />
            {error && (
              <div className="absolute bottom-4 left-4 right-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm shadow-sm flex items-start gap-3 z-10">
                <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <div className="break-all font-mono">
                  <strong>Conversion Error:</strong><br/>
                  {error}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
