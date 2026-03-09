'use client';
import React, { useState, useEffect } from 'react';

export default function CssClampGeneratorTool() {
  const [minWidth, setMinWidth] = useState(320);
  const [maxWidth, setMaxWidth] = useState(1280);
  const [minFontSize, setMinFontSize] = useState(16);
  const [maxFontSize, setMaxFontSize] = useState(24);
  const [pixelsPerRem, setPixelsPerRem] = useState(16);
  
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (minWidth >= maxWidth || minFontSize >= maxFontSize || pixelsPerRem <= 0) {
      setOutput('/* Invalid constraints: Min values must be less than Max values */');
      return;
    }

    const minWidthRem = minWidth / pixelsPerRem;
    const maxWidthRem = maxWidth / pixelsPerRem;
    const minFontSizeRem = minFontSize / pixelsPerRem;
    const maxFontSizeRem = maxFontSize / pixelsPerRem;

    const slope = (maxFontSizeRem - minFontSizeRem) / (maxWidthRem - minWidthRem);
    const yAxisIntersection = -minWidthRem * slope + minFontSizeRem;

    const preferredValue = `${yAxisIntersection.toFixed(4)}rem + ${(slope * 100).toFixed(4)}vw`;
    
    const clampFunction = `clamp(${minFontSizeRem}rem, ${preferredValue}, ${maxFontSizeRem}rem);`;
    setOutput(`font-size: ${clampFunction}`);
    setCopied(false);
  }, [minWidth, maxWidth, minFontSize, maxFontSize, pixelsPerRem]);

  const copyToClipboard = () => {
    if (output && !output.includes('Invalid')) {
      navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4 p-5 bg-gray-50 border border-gray-200 rounded-lg">
          <h3 className="font-semibold text-gray-900 border-b border-gray-200 pb-2">Viewport Width (px)</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Viewport</label>
            <input type="number" value={minWidth} onChange={e => setMinWidth(Number(e.target.value))} className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none transition-colors" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Maximum Viewport</label>
            <input type="number" value={maxWidth} onChange={e => setMaxWidth(Number(e.target.value))} className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none transition-colors" />
          </div>
        </div>

        <div className="space-y-4 p-5 bg-gray-50 border border-gray-200 rounded-lg">
          <h3 className="font-semibold text-gray-900 border-b border-gray-200 pb-2">Font Size (px)</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Font Size</label>
            <input type="number" value={minFontSize} onChange={e => setMinFontSize(Number(e.target.value))} className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none transition-colors" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Maximum Font Size</label>
            <input type="number" value={maxFontSize} onChange={e => setMaxFontSize(Number(e.target.value))} className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none transition-colors" />
          </div>
        </div>
      </div>
      
      <div className="w-full md:w-1/2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Base REM size (px)</label>
          <input type="number" value={pixelsPerRem} onChange={e => setPixelsPerRem(Number(e.target.value))} className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 outline-none max-w-xs transition-colors" />
      </div>

      <div className="mt-2">
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-semibold text-gray-900">Generated CSS</label>
          <button onClick={copyToClipboard} className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-1">
            {copied ? (
              <span className="text-green-600">Copied!</span>
            ) : (
              <span>Copy CSS</span>
            )}
          </button>
        </div>
        <div className="p-5 border border-gray-300 rounded-lg bg-gray-900 text-green-400 font-mono text-[15px] overflow-x-auto shadow-inner leading-relaxed">
          {output}
        </div>
      </div>
    </div>
  );
}

