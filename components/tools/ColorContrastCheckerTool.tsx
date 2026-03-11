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

  // Helper to find a passing color by slightly darkening or lightening the foreground
  const findPassingColor = (target: number) => {
    if (ratio === null || ratio >= target) return null;
    
    // We'll iterate through luminosity to find a match
    // This is a simplified approach: just move towards black or white
    const lBg = getLuminance(background);
    const isBgDark = lBg < 0.5;
    
    // Convert hex to RGB to start
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    const fullHex = foreground.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fullHex);
    if (!result) return null;

    let r = parseInt(result[1], 16);
    let g = parseInt(result[2], 16);
    let b = parseInt(result[3], 16);

    // Try to darken/lighten systematically
    for (let i = 0; i < 255; i++) {
        // If BG is dark, we need to LIGHTEN the foreground
        // If BG is light, we need to DARKEN the foreground
        if (isBgDark) {
            r = Math.min(255, r + 5);
            g = Math.min(255, g + 5);
            b = Math.min(255, b + 5);
        } else {
            r = Math.max(0, r - 5);
            g = Math.max(0, g - 5);
            b = Math.max(0, b - 5);
        }

        const newHex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
        const newL = getLuminance(newHex);
        const newRatio = (Math.max(newL, lBg) + 0.05) / (Math.min(newL, lBg) + 0.05);
        
        if (newRatio >= target) return newHex;
        if (r === 0 || r === 255) break; 
    }
    return isBgDark ? "#FFFFFF" : "#000000";
  };

  const suggestionAA = !passesAANormal ? findPassingColor(4.5) : null;
  const suggestionAAA = !passesAAANormal ? findPassingColor(7.0) : null;

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
               className="h-12 w-12 cursor-pointer rounded-xl overflow-hidden shadow-sm" 
             />
             <input 
               type="text" 
               value={foreground} 
               onChange={e => setForeground(e.target.value)}
               placeholder="#000000"
               className="w-full p-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none uppercase font-mono text-base transition-all"
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
               className="h-12 w-12 cursor-pointer rounded-xl overflow-hidden shadow-sm" 
             />
             <input 
               type="text" 
               value={background} 
               onChange={e => setBackground(e.target.value)}
               placeholder="#FFFFFF"
               className="w-full p-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none uppercase font-mono text-base transition-all"
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
        className="w-full min-h-[300px] rounded-2xl border border-gray-100 shadow-xl flex flex-col items-center justify-center p-8 text-center transition-all duration-300"
        style={{ backgroundColor: background, color: foreground }}
      >
        <div className="mb-4">
            <span className="text-8xl font-black tracking-tighter block leading-none">
            {ratio ? ratio.toFixed(2) : '?'}
            </span>
            <span className="text-xl font-bold uppercase tracking-[0.2em] mt-2 opacity-60">to 1 Ratio</span>
        </div>
        
        <div className="mt-8 flex flex-col gap-4 w-full max-w-lg opacity-90">
            <p className="text-lg font-medium leading-relaxed">
                The quick brown fox jumps over the lazy dog. 
                <span className="block text-sm mt-1 opacity-70 italic font-normal">Normal Text (16px)</span>
            </p>
            <p className="text-3xl font-extrabold leading-tight">
                Responsive Typography
                <span className="block text-sm mt-1 opacity-70 italic font-normal text-center">Large Text (24px+)</span>
            </p>
        </div>
      </div>

      {/* Suggestion Cards */}
      {(suggestionAA || suggestionAAA) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {suggestionAA && (
                <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl">
                    <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 mb-2 block">Fix for WCAG AA (4.5:1)</span>
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded shadow-sm border border-gray-200" style={{ backgroundColor: suggestionAA }}></div>
                        <span className="font-mono font-bold text-blue-900 uppercase">{suggestionAA}</span>
                        <button 
                            onClick={() => setForeground(suggestionAA)}
                            className="ml-auto text-xs font-bold bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Apply Fix
                        </button>
                    </div>
                </div>
            )}
            {suggestionAAA && (
                <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-xl">
                    <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 mb-2 block">Fix for WCAG AAA (7.0:1)</span>
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded shadow-sm border border-gray-200" style={{ backgroundColor: suggestionAAA }}></div>
                        <span className="font-mono font-bold text-indigo-900 uppercase">{suggestionAAA}</span>
                        <button 
                            onClick={() => setForeground(suggestionAAA)}
                            className="ml-auto text-xs font-bold bg-indigo-600 text-white px-3 py-1.5 rounded-lg hover:bg-indigo-700 transition-colors"
                        >
                            Apply Fix
                        </button>
                    </div>
                </div>
            )}
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className={`p-6 rounded-xl border-2 transition-all ${passesAANormal ? 'bg-green-50 border-green-200 text-green-900' : 'bg-red-50 border-red-200 text-red-900 opacity-60'}`}>
          <div className="flex justify-between items-start mb-4">
            <span className="font-black text-xl leading-none">AA</span>
            <div className={`p-1 rounded-full ${passesAANormal ? 'bg-green-500' : 'bg-red-500'}`}>
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {passesAANormal ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                    )}
                </svg>
            </div>
          </div>
          <span className="text-[10px] uppercase font-black tracking-[0.2em] opacity-60 block mb-1">Normal Text</span>
          <span className="text-xs font-bold">{passesAANormal ? 'Passes 4.5:1' : 'Fails Min 4.5:1'}</span>
        </div>

        <div className={`p-6 rounded-xl border-2 transition-all ${passesAALarge ? 'bg-green-50 border-green-200 text-green-900' : 'bg-red-50 border-red-200 text-red-900 opacity-60'}`}>
          <div className="flex justify-between items-start mb-4">
            <span className="font-black text-xl leading-none">AA</span>
            <div className={`p-1 rounded-full ${passesAALarge ? 'bg-green-500' : 'bg-red-500'}`}>
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {passesAALarge ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                    )}
                </svg>
            </div>
          </div>
          <span className="text-[10px] uppercase font-black tracking-[0.2em] opacity-60 block mb-1">Large Text</span>
          <span className="text-xs font-bold">{passesAALarge ? 'Passes 3.0:1' : 'Fails Min 3.0:1'}</span>
        </div>

        <div className={`p-6 rounded-xl border-2 transition-all ${passesAAANormal ? 'bg-green-50 border-green-200 text-green-900' : 'bg-red-50 border-red-200 text-red-900 opacity-60'}`}>
          <div className="flex justify-between items-start mb-4">
            <span className="font-black text-xl leading-none">AAA</span>
            <div className={`p-1 rounded-full ${passesAAANormal ? 'bg-green-500' : 'bg-red-500'}`}>
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {passesAAANormal ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                    )}
                </svg>
            </div>
          </div>
          <span className="text-[10px] uppercase font-black tracking-[0.2em] opacity-60 block mb-1">Normal Text</span>
          <span className="text-xs font-bold">{passesAAANormal ? 'Passes 7.0:1' : 'Fails Min 7.0:1'}</span>
        </div>

        <div className={`p-6 rounded-xl border-2 transition-all ${passesAAALarge ? 'bg-green-50 border-green-200 text-green-900' : 'bg-red-50 border-red-200 text-red-900 opacity-60'}`}>
          <div className="flex justify-between items-start mb-4">
            <span className="font-black text-xl leading-none">AAA</span>
            <div className={`p-1 rounded-full ${passesAAALarge ? 'bg-green-500' : 'bg-red-500'}`}>
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {passesAAALarge ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                    )}
                </svg>
            </div>
          </div>
          <span className="text-[10px] uppercase font-black tracking-[0.2em] opacity-60 block mb-1">Large Text</span>
          <span className="text-xs font-bold">{passesAAALarge ? 'Passes 4.5:1' : 'Fails Min 4.5:1'}</span>
        </div>
      </div>
    </div>
  );
}
