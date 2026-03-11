"use client";

import React, { useState, useEffect, useRef } from "react";
import mermaid from "mermaid";

mermaid.initialize({
  startOnLoad: false,
  theme: 'neutral',
  securityLevel: 'loose',
  fontFamily: 'Poppins, sans-serif'
});

const EXAMPLES = {
  flowchart: `graph TD
    A[Start] --> B{Is it working?}
    B -- Yes --> C[Great!]
    B -- No --> D[Check Logs]
    D --> B`,
  sequence: `sequenceDiagram
    Alice->>John: Hello John, how are you?
    loop Healthcheck
        John->>John: Fight against hypochondria
    end
    Note right of John: Rational thoughts <br/>prevail!
    John-->>Alice: Great!
     John->>Bob: How about you?
    Bob-->>John: Jolly good!`,
  gantt: `gantt
    title A Gantt Diagram
    dateFormat  YYYY-MM-DD
    section Section
    A task           :a1, 2026-03-01, 30d
    Another task     :after a1  , 20d
    section Another
    Task in Another  :2026-03-12  , 12d
    another task      : 24d`
};

export default function MermaidPlaygroundTool() {
  const [code, setCode] = useState(EXAMPLES.flowchart);
  const [svg, setSvg] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const renderDiagram = async (inputCode: string) => {
    if (!inputCode.trim()) return;
    
    try {
      const id = `mermaid-container-${Math.random().toString(36).substr(2, 9)}`;
      const { svg: renderedSvg } = await mermaid.render(id, inputCode);
      setSvg(renderedSvg);
      setError(null);
    } catch (err: any) {
      console.error("Mermaid error:", err);
      setError("Syntax Error: Check your Mermaid.js format.");
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      renderDiagram(code);
    }, 500);
    return () => clearTimeout(timer);
  }, [code]);

  const copySvg = () => {
    navigator.clipboard.writeText(svg);
    alert("SVG code copied to clipboard!");
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 min-h-[500px]">
      {/* Editor Side */}
      <div className="w-full lg:w-1/2 flex flex-col gap-4">
        <div className="flex items-center justify-between">
           <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">Diagram Definition</label>
           <div className="flex gap-2">
             <button onClick={() => setCode(EXAMPLES.flowchart)} className="text-[10px] font-bold bg-gray-100 text-gray-500 px-2 py-1 rounded hover:bg-gray-200">Flow</button>
             <button onClick={() => setCode(EXAMPLES.sequence)} className="text-[10px] font-bold bg-gray-100 text-gray-500 px-2 py-1 rounded hover:bg-gray-200">Seq</button>
             <button onClick={() => setCode(EXAMPLES.gantt)} className="text-[10px] font-bold bg-gray-100 text-gray-500 px-2 py-1 rounded hover:bg-gray-200">Gantt</button>
           </div>
        </div>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          spellCheck={false}
          className="flex-1 w-full h-[300px] lg:h-full p-6 text-sm font-mono bg-gray-900 text-blue-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 transition-all resize-none leading-relaxed"
          placeholder="Enter mermaid code here..."
        />
      </div>

      {/* Preview Side */}
      <div className="w-full lg:w-1/2 flex flex-col gap-4">
        <div className="flex items-center justify-between">
           <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">Live Preview</label>
           {svg && (
             <button 
              onClick={copySvg}
              className="text-[10px] font-bold text-blue-600 hover:text-blue-700 uppercase tracking-widest"
             >
                Copy SVG Code
             </button>
           )}
        </div>
        <div className="flex-1 bg-white border border-gray-100 rounded-2xl shadow-inner overflow-auto flex items-center justify-center p-8 min-h-[300px]">
          {error ? (
            <div className="text-red-500 bg-red-50 px-4 py-2 rounded-lg text-sm font-medium border border-red-100 animate-pulse">
              {error}
            </div>
          ) : (
            <div 
              ref={containerRef}
              className="max-w-full"
              dangerouslySetInnerHTML={{ __html: svg }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
