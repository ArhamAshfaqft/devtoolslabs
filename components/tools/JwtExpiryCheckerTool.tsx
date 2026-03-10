"use client";

import React, { useState, useEffect } from "react";

export default function JwtExpiryCheckerTool() {
  const [token, setToken] = useState<string>("");
  const [status, setStatus] = useState<"empty" | "valid" | "expired" | "invalid">("empty");
  const [expiryData, setExpiryData] = useState<{
    expDate: Date | null;
    isExpired: boolean;
    timeRemaining: string;
  } | null>(null);

  useEffect(() => {
    checkToken(token);
  }, [token]);

  const decodeJwtPayload = (jwt: string) => {
    try {
      const parts = jwt.split(".");
      if (parts.length !== 3) return null;
      
      // Base64Url decode the payload
      let base64Url = parts[1];
      let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      let jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      
      return JSON.parse(jsonPayload);
    } catch (e) {
      return null;
    }
  };

  const formatTimeRemaining = (expTime: number, nowTime: number) => {
    const diffSeconds = Math.floor((expTime - nowTime) / 1000);
    
    if (diffSeconds <= 0) return "0 seconds";
    
    const days = Math.floor(diffSeconds / (3600 * 24));
    const hours = Math.floor((diffSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((diffSeconds % 3600) / 60);
    const seconds = diffSeconds % 60;
    
    const parts = [];
    if (days > 0) parts.push(`${days}d`);
    if (hours > 0) parts.push(`${hours}h`);
    if (minutes > 0) parts.push(`${minutes}m`);
    parts.push(`${seconds}s`);
    
    return parts.join(" ");
  };

  const checkToken = (input: string) => {
    if (!input.trim()) {
      setStatus("empty");
      setExpiryData(null);
      return;
    }

    const payload = decodeJwtPayload(input);
    
    if (!payload || typeof payload !== 'object') {
      setStatus("invalid");
      setExpiryData(null);
      return;
    }

    if (!payload.exp) {
      // Valid JSON, but no 'exp' claim
      setStatus("invalid");
      setExpiryData(null);
      return;
    }

    // JWT exp is in seconds since epoch. JS Date uses milliseconds.
    const expTimeMs = payload.exp * 1000;
    const nowMs = Date.now();
    const isExpired = expTimeMs < nowMs;
    
    setExpiryData({
      expDate: new Date(expTimeMs),
      isExpired: isExpired,
      timeRemaining: isExpired ? "Expired" : formatTimeRemaining(expTimeMs, nowMs)
    });
    
    setStatus(isExpired ? "expired" : "valid");
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700">Paste JWT Token</label>
        <textarea
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
          className="w-full h-32 p-4 font-mono text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-y shadow-sm"
          spellCheck={false}
        />
      </div>

      {status === "invalid" && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm flex items-center gap-2">
           <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
           Invalid JWT structure, or the token does not contain an "exp" (expiration) claim.
        </div>
      )}

      {expiryData && (
        <div className={`p-6 rounded-xl border shadow-sm transition-colors duration-300 ${status === "valid" ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}>
           <div className="flex items-start md:items-center gap-4 flex-col md:flex-row">
             <div className={`p-3 rounded-full flex-shrink-0 ${status === "valid" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
               {status === "valid" ? (
                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
               ) : (
                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
               )}
             </div>
             
             <div className="flex-1 space-y-1">
               <h3 className={`text-xl font-bold ${status === "valid" ? "text-green-900" : "text-red-900"}`}>
                 {status === "valid" ? "Token is Active" : "Token has Expired"}
               </h3>
               
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 pt-4 border-t border-black/5">
                 <div>
                   <span className="block text-xs uppercase tracking-wider font-semibold opacity-60 mb-1">Expiration Date (Local Time)</span>
                   <span className="font-medium">{expiryData.expDate?.toLocaleString()}</span>
                 </div>
                 <div>
                   <span className="block text-xs uppercase tracking-wider font-semibold opacity-60 mb-1">Time Remaining</span>
                   <span className="font-mono font-medium tracking-tight bg-white/50 px-2 py-1 rounded inline-block">
                     {expiryData.timeRemaining}
                   </span>
                 </div>
               </div>
             </div>
           </div>
        </div>
      )}
    </div>
  );
}
