'use client';
import React, { useState, useEffect } from 'react';

// Lightweight Base64Url encoders (no padding, custom chars)
function toBase64Url(str: string): string {
  const base64 = btoa(new TextEncoder().encode(str).reduce((data, byte) => data + String.fromCharCode(byte), ''));
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function bufferToBase64Url(buffer: ArrayBuffer): string {
  const base64 = btoa(new Uint8Array(buffer).reduce((data, byte) => data + String.fromCharCode(byte), ''));
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export default function JwtGeneratorTool() {
  const [header, setHeader] = useState('{\n  "alg": "HS256",\n  "typ": "JWT"\n}');
  const [payload, setPayload] = useState('{\n  "sub": "1234567890",\n  "name": "Jane Doe",\n  "admin": true,\n  "iat": ' + Math.floor(Date.now() / 1000) + '\n}');
  const [secret, setSecret] = useState('your-256-bit-secret');
  
  const [encodedJwt, setEncodedJwt] = useState('');
  const [errorDetails, setErrorDetails] = useState('');

  const generateToken = async () => {
    try {
      // 1. Validate JSON
      JSON.parse(header);
      JSON.parse(payload);
      setErrorDetails('');

      // 2. Encode Header and Payload
      const encodedHeader = toBase64Url(header);
      const encodedPayload = toBase64Url(payload);
      
      const unsignedToken = `${encodedHeader}.${encodedPayload}`;

      // 3. Check algorithm and sign
      const headerObj = JSON.parse(header);
      
      if (headerObj.alg === 'HS256') {
        if (!secret) throw new Error("A secret key is required for HS256 signing.");
        
        // Native Web Crypto HMAC SHA-256
        const keyData = new TextEncoder().encode(secret);
        const cryptoKey = await crypto.subtle.importKey(
          'raw',
          keyData,
          { name: 'HMAC', hash: 'SHA-256' },
          false,
          ['sign']
        );
        
        const dataToSign = new TextEncoder().encode(unsignedToken);
        const signatureBuffer = await crypto.subtle.sign('HMAC', cryptoKey, dataToSign);
        
        const signatureBase64Url = bufferToBase64Url(signatureBuffer);
        setEncodedJwt(`${unsignedToken}.${signatureBase64Url}`);
        
      } else if (headerObj.alg === 'none') {
        // Unsecured JWT
        setEncodedJwt(`${unsignedToken}.`);
      } else {
        throw new Error(`Algorithm '${headerObj.alg}' is not currently supported by this offline generator. Switch to HS256.`);
      }

    } catch (err: any) {
      setErrorDetails(err.message || 'Syntax error in Header or Payload JSON.');
      setEncodedJwt('');
    }
  };

  // Re-run on inputs change
  useEffect(() => {
    generateToken();
  }, [header, payload, secret]);

  return (
    <div className="w-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-gray-200">
        
        {/* Editor LHS */}
        <div className="lg:col-span-7 flex flex-col hide-scrollbar overflow-y-auto max-h-[700px]">
          
          {/* Header Editor */}
          <div className="flex flex-col border-b border-gray-200">
            <div className="p-3 bg-red-50 border-b border-red-100 flex justify-between items-center">
              <h3 className="text-xs font-bold text-red-700 uppercase tracking-widest">Header</h3>
              <span className="text-[10px] uppercase font-semibold text-red-500 bg-red-100 px-2 py-0.5 rounded">JSON</span>
            </div>
            <textarea
              value={header}
              onChange={(e) => setHeader(e.target.value)}
              className="w-full h-[140px] p-4 font-mono text-sm resize-none focus:outline-none focus:ring-inset focus:ring-1 focus:ring-red-300 text-red-900 bg-white"
              spellCheck="false"
            />
          </div>

          {/* Payload Editor */}
          <div className="flex flex-col border-b border-gray-200">
            <div className="p-3 bg-purple-50 border-b border-purple-100 flex justify-between items-center">
              <h3 className="text-xs font-bold text-purple-700 uppercase tracking-widest">Payload (Claims)</h3>
               <span className="text-[10px] uppercase font-semibold text-purple-500 bg-purple-100 px-2 py-0.5 rounded">JSON</span>
            </div>
            <textarea
              value={payload}
              onChange={(e) => setPayload(e.target.value)}
              className="w-full h-[250px] p-4 font-mono text-sm resize-none focus:outline-none focus:ring-inset focus:ring-1 focus:ring-purple-300 text-purple-900 bg-white"
              spellCheck="false"
            />
          </div>

          {/* Signature Config */}
          <div className="flex flex-col">
            <div className="p-3 bg-blue-50 border-b border-blue-100">
              <h3 className="text-xs font-bold text-blue-700 uppercase tracking-widest">Verify Signature</h3>
            </div>
            <div className="p-4 bg-white flex flex-col gap-3 font-mono text-sm text-blue-900 h-[110px]">
               <div className="flex items-center gap-2">
                 <span className="text-gray-500 font-bold">HMACSHA256(</span>
                 <span>base64UrlEncode(header) + "." +</span>
               </div>
               <div className="flex items-center gap-2 pl-4">
                 <span>base64UrlEncode(payload),</span>
               </div>
               <div className="flex items-center gap-2 pl-4">
                 <input 
                    type="password"
                    value={secret}
                    onChange={(e) => setSecret(e.target.value)}
                    placeholder="your-256-bit-secret"
                    className="flex-1 p-2 bg-blue-50 border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-blue-800"
                 />
                 <span className="text-gray-500 font-bold">)</span>
               </div>
            </div>
          </div>

        </div>

        {/* Output RHS */}
        <div className="lg:col-span-5 bg-gray-50 flex flex-col relative">
          <div className="p-4 bg-gray-100 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-sm font-bold text-gray-900 tracking-wide uppercase">Encoded Token</h3>
            <button 
              disabled={!encodedJwt}
              onClick={() => { if(encodedJwt) navigator.clipboard.writeText(encodedJwt); }} 
               className="text-xs px-4 py-1.5 bg-gray-900 text-white font-medium rounded shadow-sm hover:bg-gray-800 transition-colors disabled:opacity-50"
            >
              Copy JWT
            </button>
          </div>
          
          <div className="p-6 h-full flex flex-col">
            {errorDetails ? (
              <div className="bg-red-50 border border-red-200 rounded p-4 text-red-700 font-mono text-sm break-words whitespace-pre-wrap">
                <span className="font-bold block mb-2">Generation Failed:</span>
                {errorDetails}
              </div>
            ) : (
               <div className="w-full h-full bg-white border border-gray-200 rounded p-6 font-mono text-lg break-all shadow-inner overflow-y-auto whitespace-pre-wrap leading-relaxed">
                  {/* Split token into array to colorize the 3 parts */}
                  {encodedJwt && (
                    <>
                      <span className="text-red-600">{encodedJwt.split('.')[0]}</span>
                      <span className="text-gray-400 font-bold">.</span>
                      <span className="text-purple-600">{encodedJwt.split('.')[1]}</span>
                      <span className="text-gray-400 font-bold">.</span>
                      <span className="text-blue-600">{encodedJwt.split('.')[2] || ''}</span>
                    </>
                  )}
               </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
