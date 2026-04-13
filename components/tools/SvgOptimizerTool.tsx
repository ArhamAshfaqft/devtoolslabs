'use client';

import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { Sparkles, Trash2, FileOutput, Gauge, Copy, Check, Download, AlertCircle } from 'lucide-react';

export default function SvgOptimizerTool() {
  const [input, setInput] = useState<string>('');
  const [output, setOutput] = useState<string>('');
  const [precision, setPrecision] = useState<number>(2);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [stats, setStats] = useState<{ original: number; optimized: number } | null>(null);

  // Deep Clean Optimization Logic (Browser-Safe)
  const optimizeSvg = (xml: string) => {
    if (!xml.trim()) return;
    setIsOptimizing(true);

    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(xml, 'image/svg+xml');

      // Check for parsing errors
      const errorNode = doc.querySelector('parsererror');
      if (errorNode) throw new Error('Invalid SVG XML');

      const svg = doc.querySelector('svg');
      if (!svg) throw new Error('No <svg> tag found');

      // 1. Remove common metadata/junk
      const removeList = [
        'metadata', 'defs', 'desc', 'title', 'sodipodi:namedview', 
        'cc:Work', 'rdf:RDF'
      ];
      removeList.forEach(tagName => {
        doc.querySelectorAll(tagName).forEach(el => el.remove());
      });

      // 2. Remove comments (Manual string processing later)
      
      // 3. Clean attributes
      const walk = (node: Element) => {
        // Remove empty attributes
        Array.from(node.attributes).forEach(attr => {
          if (!attr.value.trim() || attr.name.startsWith('inkscape:') || attr.name.startsWith('sodipodi:')) {
            node.removeAttribute(attr.name);
          }
          
          // Truncate path decimals if it's a 'd' attribute
          if (attr.name === 'd') {
            const cleaned = attr.value.replace(/(\d+\.\d{3,})/g, (match) => {
               return parseFloat(match).toFixed(precision).replace(/\.?0+$/, '');
            });
            node.setAttribute(attr.name, cleaned);
          }
        });
        
        // Recurse
        Array.from(node.children).forEach(child => walk(child));
      };
      walk(svg);

      // 4. Convert back to string and minify whitespace
      let result = new XMLSerializer().serializeToString(doc);
      
      // Remove XML declaration and doctype
      result = result.replace(/<\?xml.*?\?>/g, '');
      result = result.replace(/<!DOCTYPE.*?>/g, '');
      // Remove comments
      result = result.replace(/<!--[\s\S]*?-->/g, '');
      // Minify whitespace
      result = result.replace(/>\s+</g, '><').trim();

      setOutput(result);
      setStats({
        original: new Blob([xml]).size,
        optimized: new Blob([result]).size
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsOptimizing(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (input) optimizeSvg(input);
    }, 500);
    return () => clearTimeout(timer);
  }, [input, precision]);

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadSvg = () => {
    const blob = new Blob([output], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'optimized.svg';
    link.click();
    URL.revokeObjectURL(url);
  };

  const savings = stats ? (((stats.original - stats.optimized) / stats.original) * 100).toFixed(1) : 0;

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border-2 border-slate-900 rounded-3xl p-6 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-50 border-2 border-indigo-200 rounded-2xl flex items-center justify-center">
            <Gauge className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Original Size</p>
            <p className="text-xl font-black text-slate-900">{stats ? (stats.original / 1024).toFixed(2) : '0.00'} KB</p>
          </div>
        </div>
        <div className="bg-white border-2 border-slate-900 rounded-3xl p-6 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] flex items-center gap-4 border-l-8 border-l-emerald-500">
          <div className="w-12 h-12 bg-emerald-50 border-2 border-emerald-100 rounded-2xl flex items-center justify-center">
            <FileOutput className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Optimized Size</p>
            <p className="text-xl font-black text-emerald-600">{stats ? (stats.optimized / 1024).toFixed(2) : '0.00'} KB</p>
          </div>
        </div>
        <div className="bg-indigo-600 border-2 border-slate-900 rounded-3xl p-6 shadow-[8px_8px_0px_0px_rgba(49,46,129,1)] flex items-center gap-4 text-white">
          <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-[10px] font-black text-white/60 uppercase tracking-widest">Total Savings</p>
            <p className="text-xl font-black">{savings}%</p>
          </div>
        </div>
      </div>

      {/* Main Tool Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 h-[600px]">
        {/* Input */}
        <div className="flex flex-col gap-3 h-full">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2 text-slate-400">
              <span className="text-xs font-black uppercase tracking-widest">Raw SVG Input</span>
            </div>
            <button onClick={() => setInput('')} className="text-[10px] font-black text-slate-400 hover:text-red-500 flex items-center gap-1 transition-colors uppercase">
              <Trash2 className="w-3 h-3" /> Clear
            </button>
          </div>
          <div className="flex-grow bg-white border-2 border-slate-200 rounded-3xl overflow-hidden focus-within:border-indigo-500 transition-colors shadow-[4px_4px_0px_0px_rgba(226,232,240,1)]">
            <Editor
              height="100%"
              defaultLanguage="xml"
              theme="vs-light"
              value={input}
              onChange={(v) => setInput(v || '')}
              options={{
                minimap: { enabled: false },
                fontSize: 13,
                wordWrap: 'on',
                lineNumbers: 'on',
                padding: { top: 20 }
              }}
            />
          </div>
        </div>

        {/* Output */}
        <div className="flex flex-col gap-3 h-full">
          <div className="flex items-center justify-between px-2">
             <div className="flex items-center gap-4">
               <div className="flex items-center gap-2 text-emerald-600">
                 <span className="text-xs font-black uppercase tracking-widest">Optimized Output</span>
               </div>
               {/* Precision Controls */}
               <div className="flex items-center gap-2 bg-slate-100 px-3 py-1 rounded-full">
                  <span className="text-[9px] font-black text-slate-400 uppercase">Precision:</span>
                  {[1, 2, 3].map(p => (
                    <button 
                      key={p} 
                      onClick={() => setPrecision(p)}
                      className={`text-[10px] font-bold w-5 h-5 rounded flex items-center justify-center transition-all ${precision === p ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                      {p}
                    </button>
                  ))}
               </div>
             </div>
             <div className="flex gap-2">
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-2 px-4 py-1.5 bg-white border-2 border-slate-900 rounded-xl text-slate-900 text-[10px] font-black uppercase hover:bg-slate-50 transition-all active:translate-y-0.5"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
                <button
                  onClick={downloadSvg}
                  className="flex items-center gap-2 px-4 py-1.5 bg-indigo-600 border-2 border-slate-900 rounded-xl text-white text-[10px] font-black uppercase hover:bg-indigo-700 transition-all shadow-[2px_2px_0px_0px_rgba(49,46,129,1)] active:translate-y-0.5 active:shadow-none"
                >
                  <Download className="w-3.5 h-3.5" /> Save
                </button>
             </div>
          </div>
          <div className="flex-grow bg-emerald-50/20 border-2 border-emerald-100 rounded-3xl overflow-hidden shadow-[4px_4px_0px_0px_rgba(209,250,229,1)]">
            <Editor
              height="100%"
              defaultLanguage="xml"
              theme="vs-light"
              value={output}
              options={{
                readOnly: true,
                minimap: { enabled: false },
                fontSize: 13,
                wordWrap: 'on',
                lineNumbers: 'on',
                contextmenu: false,
                padding: { top: 20 }
              }}
            />
          </div>
        </div>
      </div>

      {/* Info Warning */}
      <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-4 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="text-xs text-amber-800 font-medium leading-relaxed">
          <p className="font-black mb-1 text-amber-900 uppercase tracking-tight">Pro Tip: Decimal Precision</p>
          Lowering decimal precision (e.g. to 1) drastically reduces file size for smaller icons but might cause slight visual shifts in complex illustrations. 
          Use **2 or 3** for high-fidelity vectors.
        </div>
      </div>
    </div>
  );
}
