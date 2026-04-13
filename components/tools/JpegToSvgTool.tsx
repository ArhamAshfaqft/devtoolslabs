'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Image as ImageIcon, Wand2, Download, Upload, Layers, Settings2, RefreshCw, AlertCircle } from 'lucide-react';

export default function JpegToSvgTool() {
  const [image, setImage] = useState<string | null>(null);
  const [svgOutput, setSvgOutput] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [preset, setPreset] = useState<'logo' | 'sketch' | 'detailed'>('logo');
  const [colorMode, setColorMode] = useState<'color' | 'bw'>('color');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    workerRef.current = new Worker('/workers/vectorizer.worker.js');
    workerRef.current.onmessage = (e) => {
      const { success, svg, error } = e.data;
      if (success) {
        try {
          // Use a robust DOM parser rather than regex to fix the SVG scaling.
          // ImageTracer outputs fixed widths without a viewBox which breaks CSS sizing.
          const parser = new DOMParser();
          const doc = parser.parseFromString(svg, "image/svg+xml");
          const svgEl = doc.documentElement;
          
          if (svgEl.tagName.toLowerCase() === 'svg') {
            const w = svgEl.getAttribute('width');
            const h = svgEl.getAttribute('height');
            
            // If it lacks a viewBox but has dimensions, create one so it can scale
            if (w && h && !svgEl.hasAttribute('viewBox')) {
              svgEl.setAttribute('viewBox', `0 0 ${parseFloat(w)} ${parseFloat(h)}`);
            }
            
            // Strip the hardcoded constraints
            svgEl.removeAttribute('width');
            svgEl.removeAttribute('height');
            
            // Force it to fill the container perfectly without clipping
            svgEl.setAttribute('preserveAspectRatio', 'xMidYMid meet');
            svgEl.setAttribute('class', 'w-full h-auto max-h-[80vh] shadow-2xl');
            
            setSvgOutput(svgEl.outerHTML);
          } else {
            setSvgOutput(svg); // Fallback
          }
        } catch (err) {
          console.error("DOM parsing failed, raw SVG outputted", err);
          setSvgOutput(svg);
        }
      } else {
        console.error('Vectorization failed:', error);
      }
      setIsProcessing(false);
    };
    return () => workerRef.current?.terminate();
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
        processImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const processImage = (dataUrl: string) => {
    if (!workerRef.current) return;
    setIsProcessing(true);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const options = {
        ltres: preset === 'detailed' ? 0.5 : 1,
        qtres: preset === 'detailed' ? 0.5 : 1,
        pathomit: 8,
        colorsampling: colorMode === 'bw' ? 0 : 1,
        numberofcolors: preset === 'logo' ? 16 : 64,
        mincolorratio: 0.02,
        colorquantcycles: 3,
        scale: 1,
        simplify: preset === 'sketch' ? 1.5 : 1
      };
      workerRef.current?.postMessage({ imageData, options });
    };
    img.src = dataUrl;
  };

  useEffect(() => {
    if (image) processImage(image);
  }, [preset, colorMode]);

  const downloadSvg = () => {
    const blob = new Blob([svgOutput], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'vectorized.svg';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col gap-8 w-full">

      {/* Step 1 & 2: Controls row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Upload */}
        <div className="bg-white border-2 border-slate-900 rounded-3xl p-6 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]">
          <h3 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-2 uppercase tracking-tighter">
            <Upload className="w-6 h-6 text-indigo-600" />
            1. Upload Image
          </h3>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full py-10 border-4 border-dashed border-slate-100 hover:border-indigo-400 rounded-2xl bg-slate-50 hover:bg-indigo-50/30 transition-all group flex flex-col items-center gap-3"
          >
            <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept="image/*" className="hidden" />
            <div className="w-12 h-12 bg-white border-2 border-slate-900 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
              <ImageIcon className="w-6 h-6 text-slate-900" />
            </div>
            <p className="text-xs font-black text-slate-500 uppercase tracking-widest">Click or Drop JPG / PNG</p>
          </button>
        </div>

        {/* Settings */}
        <div className="bg-white border-2 border-slate-900 rounded-3xl p-6 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]">
          <h3 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-2 uppercase tracking-tighter">
            <Settings2 className="w-6 h-6 text-indigo-600" />
            2. Trace Settings
          </h3>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                <Layers className="w-3 h-3" /> Fidelity Preset
              </label>
              <div className="flex bg-slate-100 p-1 rounded-xl gap-1">
                {(['logo', 'sketch', 'detailed'] as const).map((p) => (
                  <button key={p} disabled={isProcessing} onClick={() => setPreset(p)}
                    className={`flex-1 py-2 text-[10px] font-black rounded-lg uppercase transition-all ${preset === p ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'} disabled:opacity-50`}>
                    {p}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                <Wand2 className="w-3 h-3" /> Color Palette
              </label>
              <div className="flex bg-slate-100 p-1 rounded-xl gap-1">
                {(['color', 'bw'] as const).map((m) => (
                  <button key={m} disabled={isProcessing} onClick={() => setColorMode(m)}
                    className={`flex-1 py-2 text-[10px] font-black rounded-lg uppercase transition-all ${colorMode === m ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-700'} disabled:opacity-50`}>
                    {m === 'color' ? 'Full Color' : 'B&W / Icon'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Step 3: Full-width preview — no height cap, grows with content */}
      <div className="bg-slate-900 border-2 border-slate-900 rounded-3xl p-8 shadow-[8px_8px_0px_0px_rgba(226,232,240,1)] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

        <div className="flex items-center justify-between mb-6 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-500/20 rounded-xl flex items-center justify-center">
              <Wand2 className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <h3 className="text-xl font-black text-white uppercase tracking-tighter">Vector Preview</h3>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">SVG Rendered Output</span>
              </div>
            </div>
          </div>
          {svgOutput && (
            <button onClick={downloadSvg} disabled={isProcessing}
              className="group flex items-center gap-2 px-6 py-3 bg-white hover:bg-indigo-50 text-slate-900 rounded-2xl font-black text-sm shadow-[4px_4px_0px_0px_rgba(79,70,229,1)] active:translate-y-1 active:shadow-none uppercase tracking-tighter disabled:opacity-50">
              <Download className="w-4 h-4 text-indigo-600" /> Download SVG
            </button>
          )}
        </div>

        {/* SVG canvas — unconstrained, renders at full natural size */}
        <div className="relative rounded-2xl bg-slate-800 border-2 border-slate-700 overflow-hidden">
          {isProcessing && (
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm z-20 flex flex-col items-center justify-center gap-4 min-h-[300px]">
              <RefreshCw className="w-10 h-10 text-indigo-400 animate-spin" />
              <p className="text-xs font-black text-white uppercase tracking-[0.2em] animate-pulse">Vectorizing Paths...</p>
            </div>
          )}
          {svgOutput ? (
            <div className="w-full" dangerouslySetInnerHTML={{ __html: svgOutput }} />
          ) : (
            <div className="min-h-[300px] flex items-center justify-center text-center opacity-40">
              <div>
                <ImageIcon className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                <p className="text-sm font-black text-slate-500 uppercase tracking-widest">Upload an image to start tracing</p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-6 relative z-10">
          <div className="flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-xl border border-slate-700">
            <span className="text-[10px] font-black text-slate-500 uppercase">Engine</span>
            <span className="text-[10px] font-bold text-white uppercase tracking-wider">ImageTracer Pro 1.2.6</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-xl border border-slate-700">
            <span className="text-[10px] font-black text-slate-500 uppercase">Mode</span>
            <span className="text-[10px] font-bold text-white uppercase tracking-wider">{preset} / {colorMode}</span>
          </div>
        </div>
      </div>

      {/* Notice */}
      <div className="bg-indigo-50 border-2 border-indigo-200 rounded-3xl p-6 flex items-start gap-4">
        <AlertCircle className="w-6 h-6 text-indigo-600 shrink-0" />
        <div className="text-sm text-indigo-900 font-medium leading-relaxed">
          <p className="font-black mb-2 text-indigo-950 uppercase tracking-tight">Performance Notice:</p>
          Vectorizing high-resolution images can be computationally heavy. Our tool uses <strong>Web Workers</strong> to keep your browser responsive. For logos, choose <strong>B&W / Icon</strong> mode for clean single-color paths.
        </div>
      </div>
    </div>
  );
}
