"use client";

import React, { useState, useEffect } from 'react';

// SVGs for icons
const CopyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
  </svg>
);

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const SlidersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700">
    <line x1="21" y1="4" x2="14" y2="4"></line>
    <line x1="10" y1="4" x2="3" y2="4"></line>
    <line x1="21" y1="12" x2="12" y2="12"></line>
    <line x1="8" y1="12" x2="3" y2="12"></line>
    <line x1="21" y1="20" x2="16" y2="20"></line>
    <line x1="12" y1="20" x2="3" y2="20"></line>
    <line x1="14" y1="1" x2="14" y2="7"></line>
    <line x1="8" y1="9" x2="8" y2="15"></line>
    <line x1="16" y1="17" x2="16" y2="23"></line>
  </svg>
);

const ImageIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className || "text-gray-800 mb-2"}>
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
    <circle cx="8.5" cy="8.5" r="1.5"></circle>
    <polyline points="21 15 16 10 5 21"></polyline>
  </svg>
);

type PatternType = 'polka-dots' | 'grid' | 'stripes' | 'zigzag' | 'isometric' | 'cross';

interface PatternSettings {
  type: PatternType;
  bgColor: string;
  patternColor: string;
  size: number;
  opacity: number;
  strokeWidth: number; // For grids or lines
}

export default function CssBackgroundPatternGeneratorTool() {
  const [settings, setSettings] = useState<PatternSettings>({
    type: 'polka-dots',
    bgColor: '#ffffff',
    patternColor: '#000000',
    size: 40,
    opacity: 0.1,
    strokeWidth: 2,
  });

  const [copied, setCopied] = useState(false);
  const [cssOutput, setCssOutput] = useState('');

  // Helper to convert hex + opacity to rgba
  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const generateCSS = (s: PatternSettings) => {
    const color = hexToRgba(s.patternColor, s.opacity);
    const bg = s.bgColor;
    const size = s.size;
    const stroke = s.strokeWidth;
    const halfSize = size / 2;

    switch (s.type) {
      case 'polka-dots':
        return `background-color: ${bg};\nbackground-image: radial-gradient(${color} ${stroke}px, transparent ${stroke}px), radial-gradient(${color} ${stroke}px, transparent ${stroke}px);\nbackground-size: ${size}px ${size}px;\nbackground-position: 0 0, ${halfSize}px ${halfSize}px;`;
      
      case 'grid':
        return `background-color: ${bg};\nbackground-image: linear-gradient(${color} ${stroke}px, transparent ${stroke}px), linear-gradient(90deg, ${color} ${stroke}px, transparent ${stroke}px);\nbackground-size: ${size}px ${size}px;`;
      
      case 'stripes':
        return `background-color: ${bg};\nbackground-image: repeating-linear-gradient(45deg, ${color} 25%, transparent 25%, transparent 75%, ${color} 75%, ${color}), repeating-linear-gradient(45deg, ${color} 25%, ${bg} 25%, ${bg} 75%, ${color} 75%, ${color});\nbackground-position: 0 0, ${halfSize}px ${halfSize}px;\nbackground-size: ${size}px ${size}px;`;
        // Simpler stripe definition:
        // return `background-color: ${bg};\nbackground-image: repeating-linear-gradient(45deg, transparent, transparent ${size - stroke}px, ${color} ${size - stroke}px, ${color} ${size}px);`;
      
      case 'zigzag':
        return `background-color: ${bg};\nbackground-image: linear-gradient(135deg, ${color} 25%, transparent 25%), linear-gradient(225deg, ${color} 25%, transparent 25%), linear-gradient(45deg, ${color} 25%, transparent 25%), linear-gradient(315deg, ${color} 25%, transparent 25%);\nbackground-position: ${halfSize}px 0, ${halfSize}px 0, 0 0, 0 0;\nbackground-size: ${size}px ${size}px;\nbackground-repeat: repeat;`;

      case 'isometric':
        return `background-color: ${bg};\nbackground-image: linear-gradient(30deg, ${color} 12%, transparent 12.5%, transparent 87%, ${color} 87.5%, ${color}), linear-gradient(150deg, ${color} 12%, transparent 12.5%, transparent 87%, ${color} 87.5%, ${color}), linear-gradient(30deg, ${color} 12%, transparent 12.5%, transparent 87%, ${color} 87.5%, ${color}), linear-gradient(150deg, ${color} 12%, transparent 12.5%, transparent 87%, ${color} 87.5%, ${color}), linear-gradient(60deg, ${color} 25%, transparent 25.5%, transparent 75%, ${color} 75%, ${color}), linear-gradient(60deg, ${color} 25%, transparent 25.5%, transparent 75%, ${color} 75%, ${color});\nbackground-size: ${size}px ${size * 1.732}px;\nbackground-position: 0 0, 0 0, ${halfSize}px ${halfSize * 1.732}px, ${halfSize}px ${halfSize * 1.732}px, 0 0, ${halfSize}px ${halfSize * 1.732}px;`;
        
      case 'cross':
        return `background-color: ${bg};\nbackground-image: radial-gradient(${color} ${stroke}px, transparent 0), radial-gradient(${color} ${stroke}px, transparent 0);\nbackground-size: ${size}px ${size}px;\nbackground-position: 0 0, ${halfSize}px ${halfSize}px;`; // Actually cross is better with linear gradients. Let's fix below.
    }
  };

  // Custom logic for simpler stripes and cross
  useEffect(() => {
    let css = '';
    const color = hexToRgba(settings.patternColor, settings.opacity);
    const bg = settings.bgColor;
    const size = settings.size;
    const stroke = settings.strokeWidth;
    const halfSize = size / 2;

    if (settings.type === 'stripes') {
      css = `background-color: ${bg};\nbackground-image: repeating-linear-gradient(45deg, ${color}, ${color} ${stroke}px, transparent ${stroke}px, transparent ${size}px);`;
    } else if (settings.type === 'cross') {
      css = `background-color: ${bg};\nbackground-image: linear-gradient(${color} ${stroke}px, transparent ${stroke}px), linear-gradient(90deg, ${color} ${stroke}px, transparent ${stroke}px), linear-gradient(${color} ${stroke}px, transparent ${stroke}px), linear-gradient(90deg, ${color} ${stroke}px, transparent ${stroke}px);\nbackground-position: 0 0, 0 0, ${halfSize}px ${halfSize}px, ${halfSize}px ${halfSize}px;\nbackground-size: ${size}px ${size}px;`;
    } else {
      css = generateCSS(settings) || '';
    }
    
    setCssOutput(css);
  }, [settings]);

  const handleCopy = () => {
    navigator.clipboard.writeText(cssOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const PRESETS = [
    { name: "Graph Paper", settings: { type: 'grid' as PatternType, bgColor: '#ffffff', patternColor: '#0055ff', size: 40, opacity: 0.1, strokeWidth: 1 } },
    { name: "Notebook", settings: { type: 'stripes' as PatternType, bgColor: '#fdfdfd', patternColor: '#00bfff', size: 30, opacity: 0.15, strokeWidth: 1 } },
    { name: "Polka Classic", settings: { type: 'polka-dots' as PatternType, bgColor: '#ffebf0', patternColor: '#ff2a5f', size: 30, opacity: 0.2, strokeWidth: 4 } },
    { name: "Dark Zigzag", settings: { type: 'zigzag' as PatternType, bgColor: '#111827', patternColor: '#3b82f6', size: 40, opacity: 0.1, strokeWidth: 2 } },
    { name: "Isometric Tech", settings: { type: 'isometric' as PatternType, bgColor: '#1e1e24', patternColor: '#ff0055', size: 60, opacity: 0.15, strokeWidth: 2 } },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Visual Preview Area */}
      <div 
        className="w-full h-80 md:h-[400px] rounded-xl border border-gray-200 shadow-sm relative overflow-hidden flex items-center justify-center transition-all duration-300"
        style={{ cssText: cssOutput } as React.CSSProperties}
        title="Live Pattern Preview"
      >
        {/* Glassmorphic overlay card just for aesthetic demonstration */}
        <div className="bg-white/70 backdrop-blur-md px-8 py-6 rounded-2xl border border-white/50 shadow-xl flex flex-col items-center">
          <ImageIcon className="w-8 h-8 text-gray-800 mb-2" />
          <h3 className="text-xl font-bold text-gray-900 tracking-tight">Pattern Preview</h3>
          <p className="text-sm text-gray-600 font-medium">Beautiful pure CSS</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Controls Panel */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-6">
            <SlidersIcon />
            <h2 className="text-lg font-semibold text-gray-900">Pattern Controls</h2>
          </div>

          <div className="space-y-6">
            {/* Pattern Type Selector */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Pattern Style</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {[
                  { id: 'polka-dots', label: 'Polka Dots' },
                  { id: 'grid', label: 'Grid' },
                  { id: 'stripes', label: 'Stripes' },
                  { id: 'zigzag', label: 'Zigzag' },
                  { id: 'isometric', label: 'Isometric' },
                  { id: 'cross', label: 'Crosses' },
                ].map((pt) => (
                  <button
                    key={pt.id}
                    onClick={() => setSettings({ ...settings, type: pt.id as PatternType })}
                    className={`px-3 py-2 text-sm font-medium rounded-lg border transition-colors ${
                      settings.type === pt.id 
                      ? 'bg-black text-white border-black' 
                      : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    {pt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Colors */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Background Color</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={settings.bgColor}
                    onChange={(e) => setSettings({ ...settings, bgColor: e.target.value })}
                    className="w-10 h-10 p-0 border-0 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={settings.bgColor}
                    onChange={(e) => setSettings({ ...settings, bgColor: e.target.value })}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-black focus:border-black outline-none uppercase font-mono"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Pattern Color</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={settings.patternColor}
                    onChange={(e) => setSettings({ ...settings, patternColor: e.target.value })}
                    className="w-10 h-10 p-0 border-0 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={settings.patternColor}
                    onChange={(e) => setSettings({ ...settings, patternColor: e.target.value })}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-black focus:border-black outline-none uppercase font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Sliders */}
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-sm font-medium text-gray-700">Pattern Size</label>
                  <span className="text-xs font-mono font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">{settings.size}px</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="150"
                  step="1"
                  value={settings.size}
                  onChange={(e) => setSettings({ ...settings, size: parseInt(e.target.value) })}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-sm font-medium text-gray-700">Pattern Opacity</label>
                  <span className="text-xs font-mono font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">{Math.round(settings.opacity * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={settings.opacity}
                  onChange={(e) => setSettings({ ...settings, opacity: parseFloat(e.target.value) })}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
                />
              </div>

              {settings.type !== 'zigzag' && settings.type !== 'isometric' && (
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-sm font-medium text-gray-700">
                      {settings.type === 'polka-dots' ? 'Dot Radius' : 'Line Thickness'}
                    </label>
                    <span className="text-xs font-mono font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">{settings.strokeWidth}px</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max={settings.size / 2}
                    step="1"
                    value={settings.strokeWidth}
                    onChange={(e) => setSettings({ ...settings, strokeWidth: parseInt(e.target.value) })}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Output & Presets Panel */}
        <div className="flex flex-col gap-6">
          <div className="bg-gray-50 rounded-xl border border-gray-200 shadow-sm p-4 h-full flex flex-col pt-5">
            <h2 className="text-sm font-semibold text-gray-900 mb-3 px-1">Generated CSS</h2>
            <div className="relative flex-1 group">
              <textarea
                readOnly
                value={cssOutput}
                className="w-full h-full min-h-[160px] p-4 bg-gray-900 text-gray-100 font-mono text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-black outline-none resize-none leading-relaxed"
              />
              <button
                onClick={handleCopy}
                className="absolute top-3 right-3 p-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-md transition-colors flex items-center gap-1.5"
                title="Copy to clipboard"
              >
                {copied ? <CheckIcon /> : <CopyIcon />}
                <span className="text-xs font-medium">{copied ? "Copied!" : "Copy"}</span>
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
             <h2 className="text-sm font-semibold text-gray-900 mb-3">Popular Presets</h2>
             <div className="flex flex-wrap gap-2">
                {PRESETS.map((preset, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSettings(preset.settings)}
                    className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium rounded-full transition-colors"
                  >
                    {preset.name}
                  </button>
                ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
