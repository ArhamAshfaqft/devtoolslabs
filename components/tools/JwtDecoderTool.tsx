'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Editor from '@monaco-editor/react';

// --- Utility Functions for Base64Url ---
const base64UrlDecode = (str: string) => {
  let output = str.replace(/-/g, '+').replace(/_/g, '/');
  switch (output.length % 4) {
    case 0: break;
    case 2: output += '=='; break;
    case 3: output += '='; break;
    default: throw new Error('Illegal base64url string!');
  }
  return decodeURIComponent(
    atob(output)
      .split('')
      .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join('')
  );
};

const base64UrlDecodeToBuffer = (str: string) => {
  let output = str.replace(/-/g, '+').replace(/_/g, '/');
  switch (output.length % 4) {
    case 0: break;
    case 2: output += '=='; break;
    case 3: output += '='; break;
    default: throw new Error('Illegal base64url string!');
  }
  const binary = atob(output);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
};

const base64UrlEncode = (str: string) => {
  const utf8 = encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) => {
    return String.fromCharCode(parseInt('0x' + p1));
  });
  return btoa(utf8)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
};

const bufferToBase64Url = (buffer: ArrayBuffer) => {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
};

const DEFAULT_JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

export default function JwtDecoderTool() {
  const [token, setToken] = useState<string>(DEFAULT_JWT);
  
  const [header, setHeader] = useState<string>('');
  const [payload, setPayload] = useState<string>('');
  const [secret, setSecret] = useState<string>('your-256-bit-secret');
  
  const [signatureStatus, setSignatureStatus] = useState<'valid' | 'invalid' | 'none'>('none');
  const [errorHeader, setErrorHeader] = useState<string | null>(null);
  const [errorPayload, setErrorPayload] = useState<string | null>(null);

  // Decode logic
  const decodeToken = useCallback((jwt: string) => {
    if (!jwt) return;
    const parts = jwt.split('.');
    
    // Header
    try {
      if (parts[0]) {
        const decodedHeader = JSON.parse(base64UrlDecode(parts[0]));
        setHeader(JSON.stringify(decodedHeader, null, 2));
        setErrorHeader(null);
      }
    } catch {
      setErrorHeader("Invalid JSON in Header");
    }

    // Payload
    try {
      if (parts[1]) {
        const decodedPayload = JSON.parse(base64UrlDecode(parts[1]));
        setPayload(JSON.stringify(decodedPayload, null, 2));
        setErrorPayload(null);
      }
    } catch {
      setErrorPayload("Invalid JSON in Payload");
    }
  }, []);

  // Whenever token changes from top box, decode it
  const handleTokenChange = (v: string) => {
    setToken(v);
    decodeToken(v);
    verifySignature(v, secret);
  };

  // Sign logic using Web Crypto API (HS256 only for now)
  const signToken = async (h: string, p: string, s: string) => {
    try {
      setErrorHeader(null);
      setErrorPayload(null);
      const headerObj = JSON.parse(h);
      const payloadObj = JSON.parse(p);
      
      const b64Header = base64UrlEncode(JSON.stringify(headerObj));
      const b64Payload = base64UrlEncode(JSON.stringify(payloadObj));
      const unsignedToken = `${b64Header}.${b64Payload}`;
      
      if (!s) {
        setToken(unsignedToken + ".");
        return;
      }
      
      // Sign HS256
      const encoder = new TextEncoder();
      const key = await window.crypto.subtle.importKey(
        'raw',
        encoder.encode(s),
        { name: 'HMAC', hash: 'SHA-256' },
        false,
        ['sign']
      );
      
      const signature = await window.crypto.subtle.sign(
        'HMAC',
        key,
        encoder.encode(unsignedToken)
      );
      
      const b64Signature = bufferToBase64Url(signature);
      const signedToken = `${unsignedToken}.${b64Signature}`;
      setToken(signedToken);
      verifySignature(signedToken, s);
      
    } catch (err) {
      // JSON parsing error in one of the editors
      if (!h.includes('{')) setErrorHeader("Invalid JSON structure");
      if (!p.includes('{')) setErrorPayload("Invalid JSON structure");
    }
  };

  const handleHeaderChange = (newHeader: string) => {
    setHeader(newHeader);
    signToken(newHeader, payload, secret);
  };

  const handlePayloadChange = (newPayload: string) => {
    setPayload(newPayload);
    signToken(header, newPayload, secret);
  };

  const handleSecretChange = (newSecret: string) => {
    setSecret(newSecret);
    signToken(header, payload, newSecret);
  };

  const verifySignature = async (jwt: string, s: string) => {
    const parts = jwt.split('.');
    if (parts.length !== 3 || !s) {
      setSignatureStatus('none');
      return;
    }
    try {
      const unsignedToken = `${parts[0]}.${parts[1]}`;
      const encoder = new TextEncoder();
      const key = await window.crypto.subtle.importKey(
        'raw', encoder.encode(s), { name: 'HMAC', hash: 'SHA-256' }, false, ['verify']
      );
      
      // Base64Url -> Uint8Array (binary safe)
      const sigBytes = base64UrlDecodeToBuffer(parts[2]);
      
      const isValid = await window.crypto.subtle.verify('HMAC', key, sigBytes, encoder.encode(unsignedToken));
      setSignatureStatus(isValid ? 'valid' : 'invalid');
    } catch (e) {
      setSignatureStatus('invalid');
    }
  };

  // Initial mount load
  useEffect(() => {
    decodeToken(DEFAULT_JWT);
    verifySignature(DEFAULT_JWT, 'your-256-bit-secret');
  }, [decodeToken]);

  return (
    <div className="flex flex-col gap-6 w-full max-w-full">
      <div className="bg-white border text-center p-4 border-gray-200 rounded-xl">
         <h3 className="font-bold text-gray-800 text-lg">JWT Encoder & Decoder</h3>
         <p className="text-gray-500 text-sm mt-1">100% Client-Side. Your tokens never leave your browser.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        
        {/* Left Column: Encoded Token */}
        <div className="flex flex-col gap-3">
          <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Encoded Token (Paste to Decode)</label>
          <textarea
            value={token}
            onChange={(e) => handleTokenChange(e.target.value)}
            style={{fontFamily: 'monospace'}}
            className="w-full h-[600px] p-6 bg-slate-50 border border-slate-200 rounded-xl text-sm break-all focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 resize-none transition-all"
            spellCheck={false}
          />
        </div>

        {/* Right Column: Decoded Edit areas */}
        <div className="flex flex-col gap-4 h-[600px] overflow-y-auto">
          
          {/* HEADER */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
               <label className="text-xs font-black text-red-500 uppercase tracking-widest">Header (Algorithm & Token Type)</label>
               {errorHeader && <span className="text-xs font-bold text-red-500">{errorHeader}</span>}
            </div>
            <div className={`h-40 border rounded-lg overflow-hidden ${errorHeader ? 'border-red-400' : 'border-gray-200'}`}>
              <Editor
                height="100%"
                defaultLanguage="json"
                theme="vs-light"
                value={header}
                onChange={(v) => handleHeaderChange(v || '')}
                options={{ minimap: { enabled: false }, scrollBeyondLastLine: false, fontSize: 13, lineNumbers: 'off' }}
              />
            </div>
          </div>

          {/* PAYLOAD */}
          <div className="flex flex-col gap-2 flex-grow">
            <div className="flex items-center justify-between">
               <label className="text-xs font-black text-purple-600 uppercase tracking-widest">Payload (Data)</label>
               {errorPayload && <span className="text-xs font-bold text-purple-600">{errorPayload}</span>}
            </div>
            <div className={`h-64 border rounded-lg overflow-hidden ${errorPayload ? 'border-red-400' : 'border-gray-200'}`}>
              <Editor
                height="100%"
                defaultLanguage="json"
                theme="vs-light"
                value={payload}
                onChange={(v) => handlePayloadChange(v || '')}
                options={{ minimap: { enabled: false }, scrollBeyondLastLine: false, fontSize: 13, lineNumbers: 'off' }}
              />
            </div>
          </div>

          {/* SIGNATURE */}
          <div className="flex flex-col gap-2 mt-2">
            <label className="text-xs font-black text-blue-500 uppercase tracking-widest">Verify Signature (HS256 only)</label>
            <div className="flex items-center relative">
               <input 
                 type="text" 
                 value={secret}
                 onChange={(e) => handleSecretChange(e.target.value)}
                 placeholder="your-256-bit-secret"
                 className="w-full pl-4 pr-32 py-3 bg-white border border-gray-200 rounded-lg text-sm font-monospace font-medium focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
               />
               <div className="absolute right-2 top-1/2 -translate-y-1/2">
                 {signatureStatus === 'valid' && (
                    <span className="bg-green-100 text-green-700 font-bold px-3 py-1 rounded text-xs">Signature Verified</span>
                 )}
                 {signatureStatus === 'invalid' && (
                    <span className="bg-red-100 text-red-700 font-bold px-3 py-1 rounded text-xs">Invalid Signature</span>
                 )}
               </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
