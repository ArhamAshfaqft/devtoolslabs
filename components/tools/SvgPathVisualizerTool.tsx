'use client';
import React, { useState } from 'react';

export default function SvgPathVisualizerTool() {
  const [d, setD] = useState('M 10 10 H 90 V 90 H 10 Z');
  const [viewBox, setViewBox] = useState('0 0 100 100');
  const [fill, setFill] = useState('#e2e8f0');
  const [stroke, setStroke] = useState('#0f172a');
  const [strokeWidth, setStrokeWidth] = useState('2');

  return (
    <div className="flex flex-col md:flex-row gap-8 w-full">
      <div className="w-full md:w-1/2 flex flex-col gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">SVG <code className="bg-gray-100 px-1 rounded">&lt;path d="..." /&gt;</code> string</label>
          <textarea
            value={d}
            onChange={(e) => setD(e.target.value)}
            placeholder="M 10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80"
            className="w-full h-40 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none font-mono text-sm bg-gray-50 text-gray-900"
            spellCheck="false"
          ></textarea>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-widest text-gray-700 mb-1">ViewBox</label>
            <input 
              type="text" 
              value={viewBox} 
              onChange={e => setViewBox(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-900 outline-none text-sm font-mono"
            />
          </div>
          <div>
             <label className="block text-xs font-semibold uppercase tracking-widest text-gray-700 mb-1">Stroke Width</label>
             <input 
              type="number" 
              value={strokeWidth} 
              onChange={e => setStrokeWidth(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-900 outline-none text-sm font-mono"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
           <div>
            <label className="block text-xs font-semibold uppercase tracking-widest text-gray-700 mb-1">Fill Color</label>
            <div className="flex bg-white rounded border border-gray-300 overflow-hidden">
               <input type="color" value={fill} onChange={e => setFill(e.target.value)} className="w-10 h-10 border-0 p-0" />
               <input type="text" value={fill} onChange={e => setFill(e.target.value)} className="w-full px-2 outline-none font-mono text-sm uppercase" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-widest text-gray-700 mb-1">Stroke Color</label>
            <div className="flex bg-white rounded border border-gray-300 overflow-hidden">
               <input type="color" value={stroke} onChange={e => setStroke(e.target.value)} className="w-10 h-10 border-0 p-0" />
               <input type="text" value={stroke} onChange={e => setStroke(e.target.value)} className="w-full px-2 outline-none font-mono text-sm uppercase" />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full md:w-1/2 min-h-[400px] border border-gray-200 rounded-xl bg-gray-50 flex items-center justify-center p-8 relative overflow-hidden checkerboard-bg">
         <style dangerouslySetInnerHTML={{__html: `
            .checkerboard-bg {
              background-image: 
                linear-gradient(45deg, #e5e7eb 25%, transparent 25%), 
                linear-gradient(-45deg, #e5e7eb 25%, transparent 25%), 
                linear-gradient(45deg, transparent 75%, #e5e7eb 75%), 
                linear-gradient(-45deg, transparent 75%, #e5e7eb 75%);
              background-size: 20px 20px;
              background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
            }
          `}} />
          
         <svg 
            viewBox={viewBox} 
            className="w-full h-full max-w-full max-h-full origin-center drop-shadow-md overflow-visible"
         >
            <path 
              d={d || 'M0 0'} 
              fill={fill} 
              stroke={stroke} 
              strokeWidth={strokeWidth} 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            />
         </svg>
      </div>
    </div>
  );
}
