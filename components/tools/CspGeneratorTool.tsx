'use client';
import React, { useState, useEffect } from 'react';

const DIRECTIVES = [
  { id: 'default-src', name: 'default-src', description: 'Fallback for other fetch directives.' },
  { id: 'script-src', name: 'script-src', description: 'Allowed sources for JavaScript.' },
  { id: 'style-src', name: 'style-src', description: 'Allowed sources for CSS.' },
  { id: 'img-src', name: 'img-src', description: 'Allowed sources for images.' },
  { id: 'connect-src', name: 'connect-src', description: 'Allowed URLs for fetch/XHR/WebSockets.' },
  { id: 'font-src', name: 'font-src', description: 'Allowed sources for web fonts.' },
  { id: 'frame-src', name: 'frame-src', description: 'Allowed sources for nested browsing contexts (iframes).' },
  { id: 'object-src', name: 'object-src', description: 'Allowed sources for plugins (flash, etc).' },
  { id: 'media-src', name: 'media-src', description: 'Allowed sources for audio/video.' },
];

export default function CspGeneratorTool() {
  const [config, setConfig] = useState<Record<string, string>>({
    'default-src': "'self'",
    'script-src': "'self'",
    'style-src': "'self' 'unsafe-inline'",
    'img-src': "'self' data:",
    'connect-src': "'self'",
  });

  const [output, setOutput] = useState('');

  useEffect(() => {
    const csp = Object.entries(config)
      .filter(([_, value]) => value.trim())
      .map(([key, value]) => `${key} ${value};`)
      .join(' ');
    setOutput(csp);
  }, [config]);

  const updateDirective = (id: string, value: string) => {
    setConfig(prev => ({ ...prev, [id]: value }));
  };

  const handleCopy = () => {
    if (output) navigator.clipboard.writeText(`Content-Security-Policy: ${output}`);
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200 bg-gray-50">
          <div className="flex justify-between items-center mb-4">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">Policy Output</h3>
              <button 
                onClick={handleCopy}
                className="px-4 py-2 bg-gray-900 text-white text-xs font-bold rounded-md hover:bg-black transition-colors"
               >
                  COPY HEADER
              </button>
          </div>
          <div className="p-4 bg-white border border-gray-200 rounded-lg font-mono text-sm text-gray-900 break-all leading-relaxed shadow-inner">
             <span className="text-blue-600 font-bold">Content-Security-Policy:</span> {output}
          </div>
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          {DIRECTIVES.map(directive => (
              <div key={directive.id} className="space-y-2">
                  <div className="flex justify-between items-center px-1">
                      <label className="text-sm font-bold text-gray-900">{directive.name}</label>
                      <span className="text-[10px] text-gray-500 font-medium italic">Directive</span>
                  </div>
                  <input 
                    type="text"
                    value={config[directive.id] || ''}
                    onChange={(e) => updateDirective(directive.id, e.target.value)}
                    placeholder="'self' example.com"
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-mono focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all"
                  />
                  <p className="text-[11px] text-gray-500 leading-normal px-1">{directive.description}</p>
              </div>
          ))}
      </div>
      
      <div className="p-6 bg-blue-50 border-t border-blue-100 italic text-[11px] text-blue-700">
          <strong>Security Tip:</strong> Avoid using <code>'unsafe-inline'</code> or <code>'unsafe-eval'</code> in production unless absolutely necessary. Using <code>'self'</code> restricts resources to your own origin.
      </div>
    </div>
  );
}
