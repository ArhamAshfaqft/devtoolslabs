'use client';
import React, { useState } from 'react';

// Cloudflare DoH JSON API endpoint
const DOH_URL = 'https://cloudflare-dns.com/dns-query';

interface DnsRecord {
  name: string;
  type: number;
  data: string;
  TTL: number;
}

// Map DNS record types from integer to string representation
const RECORD_TYPES: Record<number, string> = {
  1: 'A',
  2: 'NS',
  5: 'CNAME',
  15: 'MX',
  16: 'TXT',
  28: 'AAAA',
};

// Popular records to fetch simultaneously
const TARGET_TYPES = ['A', 'AAAA', 'CNAME', 'MX', 'TXT', 'NS'];

export default function DnsLookupTool() {
  const [domain, setDomain] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<{ type: string; records: DnsRecord[]; error?: string }[] | null>(null);
  const [globalError, setGlobalError] = useState<string | null>(null);

  const cleanDomain = (input: string) => {
    // Strip protocols, paths, and trailing slashes to get pure domain
    let cleaned = input.toLowerCase().trim();
    cleaned = cleaned.replace(/^https?:\/\//, '');
    cleaned = cleaned.split('/')[0];
    return cleaned;
  };

  const performLookup = async () => {
    const targetDomain = cleanDomain(domain);
    if (!targetDomain) {
      setGlobalError("Please enter a valid domain name.");
      return;
    }

    // Basic domain validation regex
    if (!/^[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?(\.[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*\.[a-z]{2,}$/i.test(targetDomain)) {
        setGlobalError("Invalid domain format. Example: example.com");
        return;
    }

    setLoading(true);
    setGlobalError(null);
    const fetchResults: { type: string; records: DnsRecord[]; error?: string }[] = [];

    try {
      // We fetch all key record types in parallel using Promise.all
      const requests = TARGET_TYPES.map(async (recordType) => {
        try {
          const params = new URLSearchParams({
            name: targetDomain,
            type: recordType,
          });

          // Need to set accept header to get JSON from Cloudflare DOH
          const response = await fetch(`${DOH_URL}?${params.toString()}`, {
            headers: {
              'Accept': 'application/dns-json',
            },
          });

          if (!response.ok) {
             throw new Error(`HTTP ${response.status}`);
          }

          const data = await response.json();
          
          // Cloudflare DoH returns generic statuses, 0 is NOERROR
          if (data.Status !== 0 && data.Status !== 3) {
              return { type: recordType, records: [], error: `DNS Error (Code ${data.Status})` };
          }

          return {
            type: recordType,
            records: data.Answer || [],
          };
        } catch (err: any) {
          return { type: recordType, records: [], error: err.message || 'Lookup failed' };
        }
      });

      const resolved = await Promise.all(requests);
      setResults(resolved);
    } catch (e: any) {
      setGlobalError("Failed to perform DNS lookup. Please check your network connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') performLookup();
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      
      {/* Input Section */}
      <div className="bg-gray-50 border-b border-gray-200 p-6">
        <div className="max-w-3xl mx-auto space-y-4">
            <label className="block text-sm font-semibold text-gray-700">Domain Name Lookup</label>
            <div className="flex gap-3 items-stretch">
                <input 
                    type="text" 
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="e.g. google.com or github.com"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none shadow-sm"
                    spellCheck="false"
                    autoComplete="off"
                />
                <button 
                    onClick={performLookup}
                    disabled={loading || !domain.trim()}
                    className="px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                >
                    {loading ? (
                       <>
                         <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                         lookup...
                       </>
                    ) : 'Lookup'}
                </button>
            </div>
            
            {globalError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded text-sm text-red-600 font-medium">
                    {globalError}
                </div>
            )}
        </div>
      </div>

      {/* Results Section */}
      <div className="p-6 bg-white min-h-[400px]">
         {!results && !loading && !globalError && (
             <div className="h-full flex flex-col items-center justify-center text-gray-400 py-20 space-y-4">
                 <svg className="w-12 h-12 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path></svg>
                 <p className="text-sm font-medium">Enter a domain to view its global DNS records.</p>
             </div>
         )}

         {/* Loading Skeleton */}
         {loading && (
             <div className="animate-pulse space-y-6 max-w-4xl mx-auto">
                 {[1, 2, 3, 4].map(i => (
                     <div key={i} className="border border-gray-100 rounded-lg p-4">
                         <div className="h-4 bg-gray-200 rounded w-16 mb-4"></div>
                         <div className="space-y-2">
                             <div className="h-3 bg-gray-100 rounded w-3/4"></div>
                             <div className="h-3 bg-gray-100 rounded w-1/2"></div>
                         </div>
                     </div>
                 ))}
             </div>
         )}

         {/* Actual Results */}
         {results && !loading && (
             <div className="max-w-4xl mx-auto space-y-6">
                 {results.map((resultGroup) => (
                     <div key={resultGroup.type} className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                         <div className="bg-gray-50 border-b border-gray-200 px-4 py-3 flex justify-between items-center">
                             <h3 className="font-bold text-gray-800 flex items-center gap-2">
                                 <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded font-mono border border-blue-200">{resultGroup.type}</span>
                                 Records
                             </h3>
                             <span className="text-xs font-semibold px-2 py-1 bg-white rounded border border-gray-200 text-gray-500">
                                 {resultGroup.records.length} Found
                             </span>
                         </div>
                         
                         <div className="p-0">
                             {resultGroup.error ? (
                                 <div className="p-4 text-sm text-red-500 italic">Error: {resultGroup.error}</div>
                             ) : resultGroup.records.length === 0 ? (
                                 <div className="p-4 text-sm text-gray-400 italic bg-white">No {resultGroup.type} records found.</div>
                             ) : (
                                 <div className="overflow-x-auto">
                                     <table className="w-full text-sm text-left">
                                         <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-200">
                                             <tr>
                                                 <th className="px-4 py-2 font-semibold">Name</th>
                                                 <th className="px-4 py-2 font-semibold">TTL</th>
                                                 <th className="px-4 py-2 font-semibold w-1/2">Data / Target</th>
                                             </tr>
                                         </thead>
                                         <tbody className="divide-y divide-gray-100 bg-white list-decimal">
                                             {resultGroup.records.map((record, idx) => {
                                                 // Ensure the display type string is correct or fallback
                                                 const displayType = RECORD_TYPES[record.type] || record.type;
                                                 // Only show records that match the requested type, DoH sometimes returns CNAMEs recursively in A lookups
                                                 if (displayType !== resultGroup.type && resultGroup.type !== 'A') return null;

                                                 return (
                                                 <tr key={idx} className="hover:bg-gray-50 transition-colors">
                                                     <td className="px-4 py-3 font-mono text-gray-600 truncate max-w-[200px]" title={record.name}>{record.name}</td>
                                                     <td className="px-4 py-3 text-gray-500">{record.TTL}s</td>
                                                     <td className="px-4 py-3 font-mono text-gray-900 break-all bg-green-50/50">{record.data}</td>
                                                 </tr>
                                             )})}
                                         </tbody>
                                     </table>
                                 </div>
                             )}
                         </div>
                     </div>
                 ))}
             </div>
         )}
      </div>
    </div>
  );
}
