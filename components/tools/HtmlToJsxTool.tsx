'use client';
import React, { useState, useEffect } from 'react';

// Attribute mapping for HTML to JSX
const ATTRIBUTE_MAPPING: { [key: string]: string } = {
  class: 'className',
  for: 'htmlFor',
  autocomplete: 'autoComplete',
  autofocus: 'autoFocus',
  autoplay: 'autoPlay',
  colspan: 'colSpan',
  contenteditable: 'contentEditable',
  contextmenu: 'contextMenu',
  crossorigin: 'crossOrigin',
  datetime: 'dateTime',
  enctype: 'encType',
  formaction: 'formAction',
  formenctype: 'formEncType',
  formmethod: 'formMethod',
  formnovalidate: 'formNoValidate',
  formtarget: 'formTarget',
  frameborder: 'frameBorder',
  hreflang: 'hrefLang',
  'http-equiv': 'httpEquiv',
  inputmode: 'inputMode',
  keytype: 'keyType',
  maxlength: 'maxLength',
  minlength: 'minLength',
  novalidate: 'noValidate',
  readonly: 'readOnly',
  rowspan: 'rowSpan',
  spellcheck: 'spellCheck',
  srcdoc: 'srcDoc',
  srclang: 'srcLang',
  srcset: 'srcSet',
  tabindex: 'tabIndex',
  usemap: 'useMap',
};

// Event handlers mapping
const EVENT_MAPPING: { [key: string]: string } = {
  onclick: 'onClick',
  onchange: 'onChange',
  oninput: 'onInput',
  onsubmit: 'onSubmit',
  onkeydown: 'onKeyDown',
  onkeyup: 'onKeyUp',
  onfocus: 'onFocus',
  onblur: 'onBlur',
  onmouseenter: 'onMouseEnter',
  onmouseleave: 'onMouseLeave',
};

// Self-closing tags that need a slash at the end in JSX
const SELF_CLOSING_TAGS = new Set([
  'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'
]);

export default function HtmlToJsxTool() {
  const [html, setHtml] = useState('<section class="hero">\n  <h1 style="color: blue; font-size: 20px;">Hello World</h1>\n  <img src="logo.png" alt="Logo" onclick="alert(\'hi\')">\n  <label for="name">Name:</label>\n  <input type="text" id="name" placeholder="Enter name">\n</section>');
  const [jsx, setJsx] = useState('');
  const [isCopying, setIsCopying] = useState(false);

  // Options
  const [useComponentWrapper, setUseComponentWrapper] = useState(false);
  const [componentName, setComponentName] = useState('MyComponent');

  const convertStyleToJsx = (styleStr: string) => {
    const styles: { [key: string]: string } = {};
    styleStr.split(';').forEach(rule => {
      const [prop, value] = rule.split(':').map(s => s.trim());
      if (prop && value) {
        // camelCase the property
        const camelProp = prop.replace(/-([a-z])/g, g => g[1].toUpperCase());
        styles[camelProp] = value;
      }
    });
    return `{{ ${Object.entries(styles).map(([p, v]) => `${p}: '${v}'`).join(', ')} }}`;
  };

  const transformNode = (node: Node): string => {
    if (node.nodeType === Node.TEXT_NODE) {
      return node.textContent || '';
    }

    if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as Element;
      const tagName = element.tagName.toLowerCase();
      let attributes = '';

      Array.from(element.attributes).forEach(attr => {
        let name = attr.name.toLowerCase();
        let value = attr.value;

        // Map attribute names
        if (ATTRIBUTE_MAPPING[name]) {
          name = ATTRIBUTE_MAPPING[name];
        } else if (EVENT_MAPPING[name]) {
          name = EVENT_MAPPING[name];
        }

        // Special handling for style
        if (name === 'style') {
          attributes += ` ${name}=${convertStyleToJsx(value)}`;
        } else {
          // Wrap values in quotes if they are strings
          attributes += ` ${name}="${value.replace(/"/g, '&quot;')}"`;
        }
      });

      if (SELF_CLOSING_TAGS.has(tagName)) {
        return `<${tagName}${attributes} />`;
      }

      const children = Array.from(element.childNodes)
        .map(child => transformNode(child))
        .join('');

      return `<${tagName}${attributes}>${children}</${tagName}>`;
    }

    return '';
  };

  const convertHtmlToJsx = () => {
    try {
      if (!html.trim()) {
        setJsx('');
        return;
      }

      const parser = new DOMParser();
      // Wrap in a div to ensure we can parse multiple top-level elements
      const doc = parser.parseFromString(`<div>${html}</div>`, 'text/html');
      const root = doc.body.firstChild;

      if (!root) {
        setJsx('');
        return;
      }

      // We only want the children of our temporary wrapper div
      let result = Array.from(root.childNodes)
        .map(child => transformNode(child))
        .join('\n');

      // Basic cleanup (indentation-ish)
      result = result.replace(/>\s+</g, '>\n<');

      if (useComponentWrapper) {
        setJsx(`export default function ${componentName}() {\n  return (\n    <>\n      ${result.split('\n').join('\n      ')}\n    </>\n  );\n}`);
      } else {
        setJsx(result);
      }
    } catch (err) {
      setJsx('Error parsing HTML. Please check your syntax.');
    }
  };

  useEffect(() => {
    convertHtmlToJsx();
  }, [html, useComponentWrapper, componentName]);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsx);
    setIsCopying(true);
    setTimeout(() => setIsCopying(false), 2000);
  };

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[600px]">
        
        {/* HTML Input */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-widest">Raw HTML</h3>
            <div className="flex gap-4">
                <button onClick={() => setHtml('')} className="text-xs font-bold text-red-500 hover:text-red-600">Clear</button>
            </div>
          </div>
          <div className="flex-1 relative group">
            <textarea
              value={html}
              onChange={(e) => setHtml(e.target.value)}
              className="w-full h-full p-6 font-mono text-sm bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none transition-all"
              placeholder="Paste your HTML here..."
              spellCheck="false"
            />
          </div>
        </div>

        {/* JSX Output */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-widest">JSX Output</h3>
            <button
              onClick={handleCopy}
              className={`text-xs font-bold px-4 py-2 rounded-lg transition-all ${
                isCopying ? 'bg-green-100 text-green-700' : 'bg-gray-900 text-white hover:bg-gray-800'
              } flex items-center gap-2`}
            >
              {isCopying ? (
                <>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                  Copy JSX
                </>
              )}
            </button>
          </div>
          <div className="flex-1 relative group">
            <textarea
              readOnly
              value={jsx}
              className="w-full h-full p-6 font-mono text-sm bg-white border border-gray-200 rounded-xl outline-none resize-none"
              spellCheck="false"
            />
          </div>
        </div>
      </div>

      {/* Options Panel */}
      <div className="bg-white p-6 border border-gray-200 rounded-xl shadow-sm flex flex-col md:flex-row gap-8 items-center">
         <label className="flex items-center gap-3 cursor-pointer group">
            <div className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${useComponentWrapper ? 'bg-blue-600' : 'bg-gray-300'}`}>
                <input 
                    type="checkbox" 
                    className="hidden" 
                    checked={useComponentWrapper} 
                    onChange={() => setUseComponentWrapper(!useComponentWrapper)} 
                />
                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${useComponentWrapper ? 'translate-x-6' : 'translate-x-0'}`} />
            </div>
            <span className="text-sm font-bold text-gray-700 group-hover:text-gray-900 transition-colors">Wrap in Fragment / Component</span>
         </label>

         {useComponentWrapper && (
             <div className="flex items-center gap-3 animate-in fade-in duration-300">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Component Name:</span>
                <input 
                    type="text" 
                    value={componentName}
                    onChange={(e) => setComponentName(e.target.value)}
                    className="px-3 py-1.5 border border-gray-300 rounded text-sm font-mono focus:ring-2 focus:ring-blue-500 outline-none"
                />
             </div>
         )}

         <div className="ml-auto flex gap-4 text-xs font-bold text-gray-400 uppercase tracking-widest border-l border-gray-100 pl-8">
            <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                Standard Attributes
            </div>
            <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                Inline Styles
            </div>
         </div>
      </div>
    </div>
  );
}
