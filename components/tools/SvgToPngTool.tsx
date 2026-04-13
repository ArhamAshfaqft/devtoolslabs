'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Download, Upload, Image as ImageIcon, Maximize, Settings, FileType } from 'lucide-react';

export default function SvgToPngTool() {
  const [svgContent, setSvgContent] = useState<string>('');
  const [format, setFormat] = useState<'png' | 'jpeg' | 'webp'>('png');
  const [scale, setScale] = useState<number>(2);
  const [isTransparent, setIsTransparent] = useState<boolean>(true);
  const [exportUrl, setExportUrl] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSvgContent(event.target?.result as string);
      };
      reader.readAsText(file);
    }
  };

  const convertSvg = async () => {
    if (!svgContent || !canvasRef.current) return;

    const img = new Image();
    const svgBlob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      const canvas = canvasRef.current!;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Calculate dimensions with scale
      const width = (img.width || 300) * scale;
      const height = (img.height || 300) * scale;

      canvas.width = width;
      canvas.height = height;

      // Handle background
      if (!isTransparent) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, width, height);
      } else {
        ctx.clearRect(0, 0, width, height);
      }

      ctx.drawImage(img, 0, 0, width, height);
      
      const dataUrl = canvas.toDataURL(`image/${format}`, 0.9);
      setExportUrl(dataUrl);
      URL.revokeObjectURL(url);
    };

    img.src = url;
  };

  useEffect(() => {
    if (svgContent) {
      convertSvg();
    }
  }, [svgContent, format, scale, isTransparent]);

  const downloadImage = () => {
    if (!exportUrl) return;
    const link = document.createElement('a');
    link.download = `converted-image.${format}`;
    link.href = exportUrl;
    link.click();
  };

  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Configuration & Input */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="bg-white border-2 border-slate-900 rounded-3xl p-6 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]">
            <h3 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-2 uppercase tracking-tighter">
              <Upload className="w-6 h-6 text-indigo-600" />
              1. Upload SVG
            </h3>
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="group cursor-pointer border-4 border-dashed border-slate-200 hover:border-indigo-400 rounded-2xl p-8 transition-all bg-slate-50 hover:bg-indigo-50/30 text-center"
            >
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileUpload} 
                accept=".svg" 
                className="hidden" 
              />
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-white border-2 border-slate-900 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
                  <Upload className="w-6 h-6 text-slate-900" />
                </div>
                <p className="text-sm font-bold text-slate-600 mt-2">Click to select an SVG file</p>
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Supports .svg files</p>
              </div>
            </div>
          </div>

          <div className="bg-white border-2 border-slate-900 rounded-3xl p-6 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]">
            <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2 uppercase tracking-tighter">
              <Settings className="w-6 h-6 text-indigo-600" />
              2. Pro Settings
            </h3>
            
            <div className="grid gap-6">
              {/* Format */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                  <FileType className="w-3 h-3" /> Output Format
                </label>
                <div className="flex bg-slate-100 p-1 rounded-xl gap-1">
                  {(['png', 'jpeg', 'webp'] as const).map((f) => (
                    <button
                      key={f}
                      onClick={() => setFormat(f)}
                      className={`flex-1 py-2 text-xs font-black rounded-lg uppercase tracking-tighter transition-all ${
                        format === f ? 'bg-white text-indigo-600 shadow-sm border border-slate-200' : 'text-slate-500 hover:text-slate-700'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              {/* Scale */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                  <Maximize className="w-3 h-3" /> Export Scale (DPI)
                </label>
                <div className="flex bg-slate-100 p-1 rounded-xl gap-1">
                  {[1, 2, 3, 4].map((s) => (
                    <button
                      key={s}
                      onClick={() => setScale(s)}
                      className={`flex-1 py-2 text-xs font-black rounded-lg transition-all ${
                        scale === s ? 'bg-indigo-600 text-white shadow-[0px_4px_12px_rgba(79,70,229,0.3)]' : 'text-slate-500 hover:text-slate-700'
                      }`}
                    >
                      {s}x
                    </button>
                  ))}
                </div>
                <p className="text-[10px] text-slate-400 font-medium">Use 2x or 3x for Retina-ready sharp images.</p>
              </div>

              {/* Transparency */}
              <label className="relative inline-flex items-center cursor-pointer group">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={isTransparent}
                  onChange={() => setIsTransparent(!isTransparent)}
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                <span className="ml-3 text-sm font-bold text-slate-700">Maintain Transparency</span>
              </label>
            </div>
          </div>
        </div>

        {/* Right: Preview & Download */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="bg-slate-900 border-2 border-slate-900 rounded-3xl p-6 shadow-[8px_8px_0px_0px_rgba(226,232,240,1)] flex flex-col h-full min-h-[500px]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-black text-white flex items-center gap-2 uppercase tracking-tighter">
                <ImageIcon className="w-6 h-6 text-indigo-400" />
                Live Preview
              </h3>
              {exportUrl && (
                <button
                  onClick={downloadImage}
                  className="group flex items-center gap-2 px-6 py-3 bg-white hover:bg-indigo-50 text-slate-900 rounded-2xl transition-all font-black text-sm shadow-[4px_4px_0px_0px_rgba(79,70,229,1)] active:translate-y-1 active:shadow-none uppercase tracking-tighter"
                >
                  <Download className="w-4 h-4 text-indigo-600 group-hover:bounce" />
                  Download {format.toUpperCase()}
                </button>
              )}
            </div>

            <div className="flex-grow flex items-center justify-center overflow-auto p-8 rounded-2xl bg-slate-800 border-2 border-slate-700 relative group/canvas">
              {exportUrl ? (
                <img 
                  src={exportUrl} 
                  className="max-w-full max-h-full object-contain shadow-2xl transition-transform group-hover/canvas:scale-[1.02]" 
                  style={{ 
                    backgroundImage: isTransparent ? 'conic-gradient(#334155 0.25turn, #1e293b 0.25turn 0.5turn, #334155 0.5turn 0.75turn, #1e293b 0.75turn)' : 'none',
                    backgroundSize: '20px 20px'
                  }}
                  alt="Converted Preview"
                />
              ) : (
                <div className="text-center text-slate-500">
                  <div className="w-16 h-16 bg-slate-700 rounded-2xl flex items-center justify-center mx-auto mb-4 opacity-50">
                    <ImageIcon className="w-8 h-8" />
                  </div>
                  <p className="text-sm font-bold font-mono">WAITING FOR SVG UPLOAD...</p>
                </div>
              )}
            </div>
            {exportUrl && (
              <div className="mt-4 flex items-center gap-4 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                <span>Format: {format}</span>
                <span>•</span>
                <span>Scale: {scale}x</span>
                <span>•</span>
                <span>Alpha: {isTransparent ? 'ON' : 'OFF'}</span>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
