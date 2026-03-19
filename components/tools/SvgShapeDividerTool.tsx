"use client";

import React, { useState, useEffect } from 'react';

type ShapeType = 'waves' | 'tilt' | 'curve' | 'triangle' | 'arrow';

const SHAPE_PATHS: Record<ShapeType, string> = {
  waves: "M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z",
  tilt: "M1200 120L0 16.48V0h1200v120z",
  curve: "M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z",
  triangle: "M1200 0L0 0 598.97 114.72 1200 0z",
  arrow: "M600,112.77C268.63,112.77,0,65.52,0,7.23V120H1200V7.23C1200,65.52,931.37,112.77,600,112.77Z"
};

export default function SvgShapeDividerTool() {
  const [shape, setShape] = useState<ShapeType>('waves');
  const [color, setColor] = useState('#ffffff');
  const [height, setHeight] = useState(120);
  const [flipVertical, setFlipVertical] = useState(false);
  const [flipHorizontal, setFlipHorizontal] = useState(false);
  const [htmlOutput, setHtmlOutput] = useState('');
  const [cssOutput, setCssOutput] = useState('');

  useEffect(() => {
    // Generate the SVG markup
    const transform = [
      flipHorizontal ? 'scaleX(-1)' : '',
      flipVertical ? 'scaleY(-1)' : ''
    ].filter(Boolean).join(' ');

    const svgClass = transform ? ' class="shape-fill"' : ' class="shape-fill"';
    
    // HTML Wrapper for absolute positioning
    const html = `<div class="custom-shape-divider">
    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="${SHAPE_PATHS[shape]}" fill="${color}"${svgClass}></path>
    </svg>
</div>`;
    
    // Corresponding CSS
    const posLine = flipVertical ? 'top: 0;' : 'bottom: 0;';
    const css = `.custom-shape-divider {
    position: absolute;
    ${posLine}
    left: 0;
    width: 100%;
    overflow: hidden;
    line-height: 0;${transform ? `\n    transform: ${transform};` : ''}
}

.custom-shape-divider svg {
    position: relative;
    display: block;
    width: calc(100% + 1.3px);
    height: ${height}px;
}`;

    setHtmlOutput(html);
    setCssOutput(css);
  }, [shape, color, height, flipVertical, flipHorizontal]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      
      {/* Visual Preview */}
      <div className="rounded-2xl overflow-hidden relative min-h-[400px] lg:min-h-full flex flex-col border border-gray-200 shadow-sm bg-gradient-to-r from-blue-600 to-purple-600">
        
        {/* Placeholder Content Area */}
        <div className="flex-1 flex items-center justify-center p-8 z-10 text-center text-white pb-[140px]">
           <div>
             <h3 className="text-3xl font-bold mb-2">Engaging Sections</h3>
             <p className="opacity-90 max-w-sm mx-auto">Make your landing page stand out with beautiful SVG section transitions.</p>
           </div>
        </div>

        {/* The Live SVG Divider */}
        <div 
           className="absolute left-0 w-full overflow-hidden leading-[0] transition-all duration-300"
           style={{ 
              bottom: flipVertical ? 'auto' : 0, 
              top: flipVertical ? 0 : 'auto',
              transform: `${flipHorizontal ? 'scaleX(-1)' : ''} ${flipVertical ? 'scaleY(-1)' : ''}`.trim()
            }}
        >
          <svg 
             data-name="Layer 1" 
             xmlns="http://www.w3.org/2000/svg" 
             viewBox="0 0 1200 120" 
             preserveAspectRatio="none"
             style={{ 
               position: 'relative', 
               display: 'block', 
               width: 'calc(100% + 1.3px)', 
               height: `${height}px`,
               transition: 'height 0.3s ease'
             }}
          >
             <path d={SHAPE_PATHS[shape]} fill={color}></path>
          </svg>
        </div>

        {/* Lower Content Placeholder to show effect context */}
        {!flipVertical && (
            <div className="h-8 bg-white absolute bottom-0 left-0 w-full z-0" style={{ backgroundColor: color }}></div>
        )}
         {flipVertical && (
            <div className="h-8 bg-white absolute top-0 left-0 w-full z-0" style={{ backgroundColor: color }}></div>
        )}
      </div>

      {/* Controls */}
      <div className="bg-white border text-gray-800 border-gray-200 rounded-2xl p-6 lg:p-8 shadow-sm flex flex-col h-full">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Divider Settings</h3>
        
        <div className="space-y-6 flex-grow">
          
          {/* Shape Selector */}
          <div>
            <label className="text-sm font-bold text-gray-700 block mb-2">Shape Style</label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {(Object.keys(SHAPE_PATHS) as ShapeType[]).map((s) => (
                <button 
                  key={s}
                  onClick={() => setShape(s)}
                  className={`py-2 px-1 text-xs font-semibold rounded-lg capitalize border transition-all ${shape === s ? 'bg-blue-50 border-blue-600 text-blue-700' : 'bg-white border-gray-200 hover:bg-gray-50 text-gray-600'}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Color Picker */}
          <div>
            <label className="text-sm font-bold text-gray-700 block mb-2">Fill Color</label>
            <div className="flex items-center gap-3">
              <input 
                type="color" 
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-10 h-10 p-1 rounded cursor-pointer border-gray-200"
              />
               <span className="text-sm font-mono text-gray-600 uppercase bg-gray-100 px-3 py-1.5 rounded-md border border-gray-200">{color}</span>
               <span className="text-xs text-gray-400 italic ml-2">Tip: Match the background of the adjacent section.</span>
            </div>
          </div>

          {/* Height Control */}
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-bold text-gray-700">Height</label>
              <span className="text-sm font-mono text-gray-500 bg-gray-100 px-2 rounded-md">{height}px</span>
            </div>
            <input 
               type="range" min="20" max="300" step="1" 
               value={height} 
               onChange={(e) => setHeight(Number(e.target.value))}
               className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          {/* Flip Controls */}
          <div className="flex gap-6 pt-2">
            <div className="flex items-center">
                <input 
                    type="checkbox" 
                    id="flipH" 
                    className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                    checked={flipHorizontal}
                    onChange={(e) => setFlipHorizontal(e.target.checked)}
                />
                <label htmlFor="flipH" className="ml-2 text-sm text-gray-700 font-bold cursor-pointer">
                    Flip Horizontal
                </label>
            </div>
            <div className="flex items-center">
                <input 
                    type="checkbox" 
                    id="flipV" 
                    className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                    checked={flipVertical}
                    onChange={(e) => setFlipVertical(e.target.checked)}
                />
                <label htmlFor="flipV" className="ml-2 text-sm text-gray-700 font-bold cursor-pointer">
                    Invert (Top)
                </label>
            </div>
          </div>

        </div>

        {/* HTML Output Area */}
        <div className="mt-8 pt-6 border-t border-gray-100 relative group">
          <div className="flex justify-between items-center mb-2">
             <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">HTML Output</label>
             <button
                onClick={() => copyToClipboard(htmlOutput)}
                className="flex items-center gap-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold px-3 py-1 rounded text-xs transition-colors"
              >
                Copy HTML
              </button>
          </div>
          <pre className="bg-gray-900 text-blue-300 p-4 rounded-xl text-xs font-mono overflow-x-auto shadow-inner leading-relaxed">
            {htmlOutput}
          </pre>
        </div>

        {/* CSS Output Area */}
        <div className="mt-4 relative group">
          <div className="flex justify-between items-center mb-2">
             <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">CSS Output</label>
             <button
                onClick={() => copyToClipboard(cssOutput)}
                className="flex items-center gap-1.5 bg-green-50 hover:bg-green-100 text-green-700 font-bold px-3 py-1 rounded text-xs transition-colors"
              >
                Copy CSS
              </button>
          </div>
          <pre className="bg-gray-900 text-green-300 p-4 rounded-xl text-xs font-mono overflow-x-auto shadow-inner leading-relaxed">
            {cssOutput}
          </pre>
        </div>

      </div>
    </div>
  );
}
