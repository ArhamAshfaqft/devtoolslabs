"use client";

import React, { useState } from "react";

interface StatusCode {
  code: number;
  message: string;
  description: string;
  category: "Informational" | "Success" | "Redirection" | "Client Error" | "Server Error";
}

const STATUS_CODES: StatusCode[] = [
  { code: 100, message: "Continue", category: "Informational", description: "The server has received the request headers and the client should proceed to send the request body." },
  { code: 101, message: "Switching Protocols", category: "Informational", description: "The requester has asked the server to switch protocols." },
  { code: 200, message: "OK", category: "Success", description: "Standard response for successful HTTP requests." },
  { code: 201, message: "Created", category: "Success", description: "The request has been fulfilled, resulting in the creation of a new resource." },
  { code: 202, message: "Accepted", category: "Success", description: "The request has been accepted for processing, but the processing has not been completed." },
  { code: 204, message: "No Content", category: "Success", description: "The server successfully processed the request and is not returning any content." },
  { code: 301, message: "Moved Permanently", category: "Redirection", description: "This and all future requests should be directed to the given URI." },
  { code: 302, message: "Found", category: "Redirection", description: "The resource was found, but at a different URI temporarily." },
  { code: 304, message: "Not Modified", category: "Redirection", description: "Indicates that the resource has not been modified since the version specified by the request headers." },
  { code: 307, message: "Temporary Redirect", category: "Redirection", description: "The request should be repeated with another URI; however, future requests should still use the original URI." },
  { code: 308, message: "Permanent Redirect", category: "Redirection", description: "The request and all future requests should be repeated using another URI." },
  { code: 400, message: "Bad Request", category: "Client Error", description: "The server cannot or will not process the request due to an apparent client error." },
  { code: 401, message: "Unauthorized", category: "Client Error", description: "Similar to 403 Forbidden, but specifically for use when authentication is required and has failed or has not yet been provided." },
  { code: 403, message: "Forbidden", category: "Client Error", description: "The request was valid, but the server is refusing action." },
  { code: 404, message: "Not Found", category: "Client Error", description: "The requested resource could not be found but may be available in the future." },
  { code: 405, message: "Method Not Allowed", category: "Client Error", description: "A request method is not supported for the requested resource." },
  { code: 409, message: "Conflict", category: "Client Error", description: "Indicates that the request could not be processed because of conflict in the current state of the resource." },
  { code: 410, message: "Gone", category: "Client Error", description: "Indicates that the resource requested is no longer available and will not be available again." },
  { code: 422, message: "Unprocessable Entity", category: "Client Error", description: "The request was well-formed but was unable to be followed due to semantic errors." },
  { code: 429, message: "Too Many Requests", category: "Client Error", description: "The user has sent too many requests in a given amount of time." },
  { code: 500, message: "Internal Server Error", category: "Server Error", description: "A generic error message, given when an unexpected condition was encountered." },
  { code: 501, message: "Not Implemented", category: "Server Error", description: "The server either does not recognize the request method, or it lacks the ability to fulfil the request." },
  { code: 502, message: "Bad Gateway", category: "Server Error", description: "The server was acting as a gateway or proxy and received an invalid response from the upstream server." },
  { code: 503, message: "Service Unavailable", category: "Server Error", description: "The server cannot handle the request (because it is overloaded or down for maintenance)." },
  { code: 504, message: "Gateway Timeout", category: "Server Error", description: "The server was acting as a gateway or proxy and did not receive a timely response from the upstream server." },
];

const CATEGORIES = ["All", "Informational", "Success", "Redirection", "Client Error", "Server Error"];

export default function HttpStatusWizardTool() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = STATUS_CODES.filter(s => {
    const matchesFilter = filter === "All" || s.category === filter;
    const matchesSearch = s.code.toString().includes(search) || s.message.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-gray-50 p-6 rounded-2xl border border-gray-200 shadow-sm">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                filter === cat 
                  ? "bg-gray-900 text-white shadow-md" 
                  : "bg-white text-gray-500 border border-gray-200 hover:border-gray-900 hover:text-gray-900"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="relative w-full md:w-64">
           <input
            type="text"
            placeholder="Search code or message..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all font-poppins text-sm"
           />
           <svg className="absolute left-3 top-2.5 w-4.5 h-4.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
           </svg>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(s => (
          <div key={s.code} className="p-6 bg-white border border-gray-200 rounded-2xl hover:border-blue-500 hover:shadow-md transition-all group">
            <div className="flex items-center justify-between mb-4">
              <span className={`text-4xl font-black ${
                s.code >= 500 ? "text-red-600" : s.code >= 400 ? "text-orange-500" : s.code >= 300 ? "text-blue-500" : s.code >= 200 ? "text-green-600" : "text-gray-400"
              }`}>
                {s.code}
              </span>
              <span className="text-[10px] font-black uppercase tracking-widest bg-gray-100 text-gray-500 px-2 py-1 rounded">
                {s.category}
              </span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{s.message}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{s.description}</p>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-20 text-center text-gray-400 font-medium bg-gray-50 rounded-2xl border border-dashed border-gray-200">
          No status codes match your search.
        </div>
      )}
    </div>
  );
}
