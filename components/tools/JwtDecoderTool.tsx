"use client";

import React, { useState, useEffect } from 'react';

export default function JwtDecoderTool() {
  const [jwt, setJwt] = useState('');
  const [headerStr, setHeaderStr] = useState('');
  const [payloadStr, setPayloadStr] = useState('');
  const [signature, setSignature] = useState('');
  const [error, setError] = useState('');

  // Example base64 decode for URL safe
  const decodeBase64Url = (str: string) => {
    try {
      // Replace non-url compatible chars with base64 standard chars
      str = str.replace(/-/g, '+').replace(/_/g, '/');
      // Pad with exactly enough equals signs
      const pad = str.length % 4;
      if (pad) {
        if (pad === 1) throw new Error('InvalidLengthError: Input base64url string is the wrong length to determine padding');
        str += new Array(5 - pad).join('=');
      }
      return decodeURIComponent(atob(str).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
    } catch (e: any) {
      return `Error decoding: ${e.message}`;
    }
  };

  useEffect(() => {
    if (!jwt.trim()) {
       setHeaderStr('');
       setPayloadStr('');
       setSignature('');
       setError('');
       return;
    }

    const parts = jwt.split('.');
    
    if (parts.length !== 3) {
      setError('Invalid JWT structure. A valid JWT must contain exactly 3 parts separated by dots (.)');
      setHeaderStr('');
      setPayloadStr('');
      setSignature('');
      return;
    }

    setError('');
    
    // Decode Header
    try {
        const decodedHeader = decodeBase64Url(parts[0]);
        setHeaderStr(JSON.stringify(JSON.parse(decodedHeader), null, 2));
    } catch (e) {
        setHeaderStr(decodeBase64Url(parts[0])); // Show raw if not valid JSON
    }

    // Decode Payload
    try {
        const decodedPayload = decodeBase64Url(parts[1]);
        setPayloadStr(JSON.stringify(JSON.parse(decodedPayload), null, 2));
    } catch (e) {
        setPayloadStr(decodeBase64Url(parts[1]));
    }

    // Signature is purely visual in a decoder
    setSignature(parts[2]);

  }, [jwt]);

  const loadExample = () => {
     // A safe, dummy JWT for example purposes.
     setJwt("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Input Side */}
      <div className="bg-white border text-gray-800 border-gray-200 rounded-2xl p-6 lg:p-8 shadow-sm flex flex-col h-full">
        <div className="flex justify-between items-center mb-4">
           <h3 className="text-lg font-bold text-gray-900">Encoded JWT</h3>
           <button 
             onClick={loadExample}
             className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors"
           >
             Load Example
           </button>
        </div>
        <p className="text-sm text-gray-500 mb-4 leading-relaxed">
          Paste your JSON Web Token below. The tool will automatically decode and parse the Header and Payload in real-time. Everything happens in your browser.
        </p>

        <textarea
          value={jwt}
          onChange={(e) => setJwt(e.target.value)}
          className="w-full flex-grow p-5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none font-mono text-sm leading-relaxed resize-none shadow-inner min-h-[300px]"
          placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
          spellCheck="false"
        />

        {error && (
            <div className="mt-4 p-4 bg-red-50 relative border-l-4 border-red-500 rounded-r-lg flex items-start gap-3">
              <svg className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <p className="text-sm text-red-700 font-medium">{error}</p>
            </div>
        )}
      </div>

      {/* Decoded Side */}
      <div className="bg-white border flex flex-col gap-6 text-gray-800 border-gray-200 rounded-2xl p-6 lg:p-8 shadow-sm h-full">
        
        {/* Header Block */}
        <div>
           <h3 className="text-sm font-bold text-red-600 uppercase tracking-wide mb-2 flex items-center gap-2">
             HEADER <span className="text-xs font-normal text-gray-400 normal-case">(Algorithm & Token Type)</span>
           </h3>
           <div className="relative group">
              <pre className="bg-gray-50 border border-gray-200 p-4 rounded-xl text-sm font-mono text-red-700 overflow-x-auto min-h-[100px] leading-relaxed">
                 {headerStr || "/* Waiting for token... */"}
              </pre>
           </div>
        </div>

        {/* Payload Block */}
        <div className="flex-grow">
           <h3 className="text-sm font-bold text-purple-600 uppercase tracking-wide mb-2 flex items-center gap-2">
             PAYLOAD <span className="text-xs font-normal text-gray-400 normal-case">(Data / Claims)</span>
           </h3>
           <div className="relative group h-full">
              <pre className="bg-gray-50 border border-gray-200 p-4 rounded-xl text-sm font-mono text-purple-700 overflow-x-auto min-h-[200px] h-full leading-relaxed">
                 {payloadStr || "/* Waiting for token... */"}
              </pre>
           </div>
        </div>

        {/* Signature Block */}
        <div>
           <h3 className="text-sm font-bold text-blue-600 uppercase tracking-wide mb-2 flex items-center gap-2">
             SIGNATURE <span className="text-xs font-normal text-gray-400 normal-case">(Verification)</span>
           </h3>
           <div className="relative group">
              <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl text-sm font-mono text-blue-700 break-all leading-relaxed">
                 {signature || "/* Waiting for token... */"}
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}
