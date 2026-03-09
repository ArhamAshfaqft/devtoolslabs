'use client';
import React, { useState, useEffect } from 'react';

export default function ColorContrastCheckerTool() {
  const [foreground, setForeground] = useState('#111827');
  const [background, setBackground] = useState('#ffffff');
  const [ratio, setRatio] = useState<number | null>(null);
  const [error, setError] = useState('');

  // Converts hex to relative luminance (WCAG standardized math)
  const getLuminance = (hex: string) => {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    const fullHex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fullHex);
    
    if (!result) return 0;

    let r = parseInt(result[1], 16) / 255;
    let g = parseInt(result[2], 16) / 255;
    let b = parseInt(result[3], 16) / 255;

    r = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
    g = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
    b = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);

    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };

  useEffect(() => {
    try {
      const isValidHex = (value: string) => /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(value.trim());
      if (!isValidHex(foreground) || !isValidHex(background)) {
        setRatio(null);
        setError('Enter valid HEX colors like #FFFFFF.');
        return;
      }

      const l1 = getLuminance(foreground);
      const l2 = getLuminance(background);
      const lightest = Math.max(l1, l2);
      const darkest = Math.min(l1, l2);
      const contrast = (lightest + 0.05) / (darkest + 0.05);
      setRatio(contrast);
      setError('');
    } catch (e) {
      setRatio(null);
      setError('Enter valid HEX colors like #FFFFFF.');
    }
  }, [foreground, background]);

  const passesAANormal = ratio !== null && ratio >= 4.5;
  const passesAALarge = ratio !== null && ratio >= 3.0;
  const passesAAANormal = ratio !== null && ratio >= 7.0;
  const passesAAALarge = ratio !== null && ratio >= 4.5;

  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-5 border border-gray-200 rounded-xl bg-gray-50 flex flex-col gap-4">
          <label className="text-sm font-semibold text-gray-900 uppercase tracking-widest block">Foreground Color</label>
          <div className="flex items-center gap-3">
             <input 
               type="color" 
               value={foreground} 
               onChange={e => setForeground(e.target.value)}
               className="h-10 w-10 cursor-pointer rounded overflow-hidden" 
             />
             <input 
               type="text" 
               value={foreground} 
               onChange={e => setForeground(e.target.value)}
               placeholder="#000000"
               className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 outline-none uppercase font-mono text-sm"
             />
          </div>
        </div>

        <div className="p-5 border border-gray-200 rounded-xl bg-gray-50 flex flex-col gap-4">
          <label className="text-sm font-semibold text-gray-900 uppercase tracking-widest block">Background Color</label>
          <div className="flex items-center gap-3">
             <input 
               type="color" 
               value={background} 
               onChange={e => setBackground(e.target.value)}
               className="h-10 w-10 cursor-pointer rounded overflow-hidden p-0 border-0" 
             />
             <input 
               type="text" 
               value={background} 
               onChange={e => setBackground(e.target.value)}
               placeholder="#FFFFFF"
               className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 outline-none uppercase font-mono text-sm"
             />
          </div>
        </div>
      </div>
      {error && (
        <div className="text-sm font-medium text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-2">
          {error}
        </div>
      )}

      <div 
        className="w-full min-h-[250px] rounded-xl border border-gray-200 shadow-inner flex flex-col items-center justify-center p-8 text-center transition-colors duration-200"
        style={{ backgroundColor: background, color: foreground }}
      >
        <span className="text-7xl font-bold tracking-tighter mb-2">
          {ratio ? ratio.toFixed(2) : '?'} : 1
        </span>
        <span className="text-sm font-medium opacity-80 uppercase tracking-widest">Contrast Ratio</span>
        
        <div className="mt-8 flex gap-8 flex-wrap justify-center opacity-90">
           <div className="flex flex-col items-center gap-1">
             <span className="text-[14px]">Normal Text (14pt)</span>
             <span className="text-lg font-bold">Look at this text to judge readability.</span>
           </div>
           <div className="flex flex-col items-center gap-1">
             <span className="text-[14px]">Large Text (18pt)</span>
             <span className="text-2xl font-bold">This is a larger headline.</span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className={`p-4 rounded-lg border ${passesAANormal ? 'bg-green-50 border-green-200 text-green-900' : 'bg-red-50 border-red-200 text-red-900'} flex flex-col items-center text-center justify-center`}>
          <span className="font-bold text-lg">WCAG AA</span>
          <span className="text-xs uppercase tracking-wider font-semibold mt-1 opacity-70">Normal Text</span>
          <span className={`mt-2 px-3 py-1 rounded-full text-xs font-bold uppercase ${passesAANormal ? 'bg-green-200' : 'bg-red-200'}`}>{passesAANormal ? 'Pass' : 'Fail'}</span>
        </div>
        <div className={`p-4 rounded-lg border ${passesAALarge ? 'bg-green-50 border-green-200 text-green-900' : 'bg-red-50 border-red-200 text-red-900'} flex flex-col items-center text-center justify-center`}>
          <span className="font-bold text-lg">WCAG AA</span>
          <span className="text-xs uppercase tracking-wider font-semibold mt-1 opacity-70">Large Text</span>
          <span className={`mt-2 px-3 py-1 rounded-full text-xs font-bold uppercase ${passesAALarge ? 'bg-green-200' : 'bg-red-200'}`}>{passesAALarge ? 'Pass' : 'Fail'}</span>
        </div>
        <div className={`p-4 rounded-lg border ${passesAAANormal ? 'bg-green-50 border-green-200 text-green-900' : 'bg-red-50 border-red-200 text-red-900'} flex flex-col items-center text-center justify-center`}>
          <span className="font-bold text-lg">WCAG AAA</span>
          <span className="text-xs uppercase tracking-wider font-semibold mt-1 opacity-70">Normal Text</span>
          <span className={`mt-2 px-3 py-1 rounded-full text-xs font-bold uppercase ${passesAAANormal ? 'bg-green-200' : 'bg-red-200'}`}>{passesAAANormal ? 'Pass' : 'Fail'}</span>
        </div>
        <div className={`p-4 rounded-lg border ${passesAAALarge ? 'bg-green-50 border-green-200 text-green-900' : 'bg-red-50 border-red-200 text-red-900'} flex flex-col items-center text-center justify-center`}>
          <span className="font-bold text-lg">WCAG AAA</span>
          <span className="text-xs uppercase tracking-wider font-semibold mt-1 opacity-70">Large Text</span>
          <span className={`mt-2 px-3 py-1 rounded-full text-xs font-bold uppercase ${passesAAALarge ? 'bg-green-200' : 'bg-red-200'}`}>{passesAAALarge ? 'Pass' : 'Fail'}</span>
        </div>
      </div>
    </div>
  );
}
