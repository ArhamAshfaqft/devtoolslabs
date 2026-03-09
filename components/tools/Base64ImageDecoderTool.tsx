'use client';
import React, { useState, useEffect } from 'react';

export default function Base64ImageDecoderTool() {
  const [input, setInput] = useState('');
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [fileDetails, setFileDetails] = useState<{size: string, type: string} | null>(null);

  useEffect(() => {
    if (!input.trim()) {
      setImageSrc(null);
      setError('');
      setFileDetails(null);
      return;
    }

    try {
      let finalBase64 = input.trim().replace(/\s+/g, '');
      let mimeType = 'image/png'; // Default guess if missing prefix

      // Check if the user pasted raw base64 without the data URI prefix
      if (!finalBase64.startsWith('data:image')) {
        // Attempt to guess type based on common base64 image headers
        if (finalBase64.startsWith('/9j/')) mimeType = 'image/jpeg';
        else if (finalBase64.startsWith('iVBORw0KGgo')) mimeType = 'image/png';
        else if (finalBase64.startsWith('R0lGODlh')) mimeType = 'image/gif';
        else if (finalBase64.startsWith('UklGR')) mimeType = 'image/webp';
        else if (finalBase64.startsWith('PHN2Zy')) mimeType = 'image/svg+xml';
        
        finalBase64 = `data:${mimeType};base64,${finalBase64}`;
      } else {
        // Extract exact mime type if prefix exists
        const match = finalBase64.match(/data:(image\/[a-zA-Z0-9+.-]+);base64,/);
        if (match && match[1]) {
          mimeType = match[1];
        }
      }

      // Calculate approximate file size
      const base64Length = finalBase64.length - (finalBase64.indexOf(',') + 1);
      const padding = (finalBase64.endsWith('==') ? 2 : (finalBase64.endsWith('=') ? 1 : 0));
      const fileSizeInBytes = (base64Length * 0.75) - padding;
      
      const formatSize = (bytes: number) => {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
      };

      setImageSrc(finalBase64);
      setFileDetails({ size: formatSize(fileSizeInBytes), type: mimeType });
      setError('');
    } catch (err) {
      setError('Invalid Base64 Image string.');
      setImageSrc(null);
      setFileDetails(null);
    }
  }, [input]);

  const handleDownload = () => {
    if (!imageSrc || !fileDetails) return;
    const extension = fileDetails.type.split('/')[1]?.split('+')[0] || 'img';
    const a = document.createElement('a');
    a.href = imageSrc;
    a.download = `decoded_image.${extension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="flex flex-col gap-8 w-full">
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">Base64 Image String</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
          className="w-full h-48 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none transition-colors font-mono text-xs bg-gray-50 text-gray-900 break-all"
        ></textarea>
        <p className="text-xs text-gray-500 mt-2">Paste raw base64 or a complete data URI scheme. Tool auto-detects JPG, PNG, GIF, WEBP, and SVG headers.</p>
      </div>

      {error && <div className="p-4 bg-red-50 text-red-700 border border-red-200 rounded-lg text-sm font-medium">{error}</div>}

      <div>
        <div className="flex justify-between items-center mb-4">
          <label className="block text-xl font-semibold text-gray-900 mb-0">Decoded Image Preview</label>
        </div>
        
        <div className="border border-gray-300 rounded-lg bg-gray-100 overflow-hidden flex flex-col items-center justify-center min-h-[300px] p-6 text-center relative checkerboard-bg">
          {/* Checkerboard CSS for transparent images */}
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
          
          {imageSrc ? (
            <div className="flex flex-col items-center">
              <img 
                src={imageSrc} 
                alt="Decoded output" 
                className="max-w-full max-h-[500px] object-contain shadow-md border border-gray-200 bg-white"
                onError={() => {
                  setError("The string provided does not resolve to a valid browser-supported image structure.");
                  setImageSrc(null);
                }}
              />
              {fileDetails && (
                <div className="mt-6 flex flex-wrap gap-4 items-center justify-center bg-white p-4 rounded-lg shadow-sm border border-gray-200 absolute bottom-4">
                  <span className="text-xs font-semibold uppercase text-gray-500 tracking-wider">Type: <span className="text-gray-900 font-bold">{fileDetails.type}</span></span>
                  <span className="text-xs font-semibold uppercase text-gray-500 tracking-wider">Approx Size: <span className="text-gray-900 font-bold">{fileDetails.size}</span></span>
                  <button 
                    onClick={handleDownload}
                    className="ml-2 px-4 py-1.5 bg-gray-900 text-white text-xs font-medium rounded hover:bg-gray-800 transition-colors"
                  >
                    Download Image
                  </button>
                </div>
              )}
            </div>
          ) : (
             <span className="text-gray-500 bg-white/80 px-4 py-2 rounded backdrop-blur-sm shadow-sm font-medium">Image preview will render here</span>
          )}
        </div>
      </div>
    </div>
  );
}
