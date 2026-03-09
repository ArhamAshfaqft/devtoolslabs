'use client';
import React, { useState, useEffect } from 'react';

export default function MarkdownTableGeneratorTool() {
  const [input, setInput] = useState('Name, Age, Role\nJohn, 25, Developer\nSarah, 30, Designer');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!input.trim()) {
      setOutput('');
      return;
    }

    try {
      const lines = input.trim().split('\n');
      if (lines.length === 0) return;

      let separator = ',';
      if (lines[0].includes('\t')) separator = '\t';
      else if (lines[0].includes('|')) separator = '|';

      const normalizePipeLine = (line: string) =>
        line.replace(/^\s*\|\s*/, '').replace(/\s*\|\s*$/, '');

      const headerLine = separator === '|' ? normalizePipeLine(lines[0]) : lines[0];
      let headers = headerLine.split(separator).map(s => s.trim());
      
      let markdown = '| ' + headers.join(' | ') + ' |\n';
      markdown += '|' + headers.map(() => '---').join('|') + '|\n';

      for (let i = 1; i < lines.length; i++) {
        const rowLine = separator === '|' ? normalizePipeLine(lines[i]) : lines[i];
        const row = rowLine.split(separator).map(s => s.trim());
        while(row.length < headers.length) row.push('');
        markdown += '| ' + row.slice(0, headers.length).join(' | ') + ' |\n';
      }

      setOutput(markdown);
      setCopied(false);
    } catch (err) {
      setOutput('Error parsing data. Ensure it is comma, tab, or pipe separated.');
    }
  }, [input]);

  const copyToClipboard = () => {
    if (output && !output.startsWith('Error')) {
      navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">Input CSV or Tab-Separated Data</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Header1, Header2&#10;Value1, Value2"
          className="w-full h-40 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none transition-colors font-mono text-sm bg-gray-50 text-gray-900"
        ></textarea>
        <p className="text-xs text-gray-500 mt-2">Auto-detects commas, tabs, or pipes as separators.</p>
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-semibold text-gray-900">Markdown Table Output</label>
          <button onClick={copyToClipboard} className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-1">
            {copied ? (
              <span className="text-green-600">Copied!</span>
            ) : (
              <span>Copy Markdown</span>
            )}
          </button>
        </div>
        <textarea
          readOnly
          value={output}
          placeholder="Result will appear here..."
          className="w-full h-48 p-5 border border-gray-300 rounded-lg bg-gray-900 text-green-400 font-mono text-[14px] outline-none leading-loose shadow-inner"
        ></textarea>
      </div>
    </div>
  );
}

