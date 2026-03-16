"use client";

import React, { useState } from 'react';
import forge from 'node-forge';

interface CertInfo {
  subject: string;
  issuer: string;
  validFrom: string;
  validTo: string;
  serialNumber: string;
  signatureAlgorithm: string;
  publicKeyInfo: string;
  fingerprint: string;
  san: string[];
}

export default function SslCertificateDecoderTool() {
  const [input, setInput] = useState('');
  const [certInfo, setCertInfo] = useState<CertInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  const decodeCertificate = (pem: string) => {
    try {
      setError(null);
      const cleanPem = pem.trim();
      if (!cleanPem) {
        setCertInfo(null);
        return;
      }

      const cert = forge.pki.certificateFromPem(cleanPem);
      
      const formatDN = (attrs: any[]) => {
        return attrs.map(a => `${a.shortName || a.name}=${a.value}`).join(', ');
      };

      const info: CertInfo = {
        subject: formatDN(cert.subject.attributes),
        issuer: formatDN(cert.issuer.attributes),
        validFrom: cert.validity.notBefore.toUTCString(),
        validTo: cert.validity.notAfter.toUTCString(),
        serialNumber: cert.serialNumber,
        signatureAlgorithm: forge.pki.oids[cert.siginfo.algorithmOid] || cert.siginfo.algorithmOid,
        publicKeyInfo: `${(cert.publicKey as any).n ? 'RSA' : 'Other'} (${(cert.publicKey as any).n ? (cert.publicKey as any).n.bitLength() : '?'} bits)`,
        fingerprint: forge.md.sha256.create().update(forge.asn1.toDer(forge.pki.certificateToAsn1(cert)).getBytes()).digest().toHex().match(/.{1,2}/g)?.join(':').toUpperCase() || 'N/A',
        san: []
      };

      // Extract SAN (Subject Alternative Names)
      const altNamesExt = cert.extensions.find(e => e.name === 'subjectAltName');
      if (altNamesExt && (altNamesExt as any).altNames) {
        info.san = (altNamesExt as any).altNames.map((n: any) => `${n.type === 2 ? 'DNS' : n.type === 7 ? 'IP' : 'Other'}:${n.value}`);
      }

      setCertInfo(info);
    } catch (err: any) {
      setError(err.message || 'Invalid PEM certificate. Please ensure it starts with -----BEGIN CERTIFICATE-----');
      setCertInfo(null);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setInput(val);
    decodeCertificate(val);
  };

  const handleExample = () => {
    const pemLines = [
      "-----BEGIN CERTIFICATE-----",
      "MIICzzCCAbegAwIBAgIBATANBgkqhkiG9w0BAQUFADArMRIwEAYDVQQDEwlsb2Nh",
      "bGhvc3QxFTATBgNVBAoTDERldlRvb2xzTGFiczAeFw0yNjAzMTYyMDQ3NDhaFw0y",
      "NzAzMTYyMDQ3NDhaMCsxEjAQBgNVBAMTCWxvY2FsaG9zdDEVMBMGA1UEChMMRGV2",
      "VG9vbHNMYWJzMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAybqwg+Rn",
      "8mXwz4VW+Q3vVAvGBZnEsw1d3jdgRfPY3HYV0PVOnZiz3IqssVXNz6TFnYHtUV/H",
      "anhggD3SS1uZIuHLLY1PEyEge9y5LywUK2awQVtm411sWK/CsWovNEXBZOpj5D8R",
      "L5BIZP/ToIH+nkaY2zToVQPwQlVstMs6rqmubWc0qKDdBYw4mTWKoTXxQL+O/ItU",
      "BEXiRXes/RfUkhuRm9PAyYQASoSLmNlK5spM2En4Jw+eq71NX7IKqTChflAP367o",
      "ms/zveRej9Dz3QV9vTXQYawP9DJz0bFK8wttKmEc7Y0EEVIp2/S9OhKmEmWGCEM2",
      "5F9VvhN8un2+fwIDAQABMA0GCSqGSIb3DQEBBQUAA4IBAQCxMlL96y8pj3m+xgz3",
      "aHDvjQLrQk9Db128ovjJgyxzDhvtkmGDtE99BDBmiTrKf2Hay1ioobGi1QRkwOUE",
      "HtzzRCa6aLXPjAEqqID0Tavxe8pKWpmHglN3Fqz3Y/S9WDs2TuseJRLOgx2kaoSx",
      "1wARtyhOtZTgZ+Lc9RL4smBV20pp5sio7DPr4r0PQFxOGUI9c7ASWvNeoTwRrIZL",
      "zmhsjAHAxTP1sZp7rceU62n+GWTrBO5UTrrJe3Ho1J/+KjUWe+tPrF+0WEMSfSmD",
      "dmHwpm6D3NRn1QvofVyETWCR1RcIzxSxS0LJmlUN/4r/VhR2p1f9gL4bPrMqWC4z",
      "Flhi",
      "-----END CERTIFICATE-----"
    ];
    const examplePem = pemLines.join('\n');
    setInput(examplePem);
    decodeCertificate(examplePem);
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">
          Paste SSL Certificate (PEM Format)
        </label>
        <textarea
          value={input}
          onChange={handleInputChange}
          placeholder="-----BEGIN CERTIFICATE-----..."
          className="w-full h-48 p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm shadow-sm"
        />
        <div className="mt-2 flex justify-end">
          <button 
            onClick={handleExample}
            className="text-xs font-semibold text-blue-600 hover:text-blue-800"
          >
            Try Example Certificate
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm font-medium">
          {error}
        </div>
      )}

      {certInfo && (
        <div className="bg-gray-50 border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200 bg-white">
            <h3 className="font-bold text-gray-900">Certificate Details</h3>
          </div>
          <div className="px-6 py-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-3">
                <span className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Subject</span>
                <code className="text-sm text-gray-800 break-all">{certInfo.subject}</code>
              </div>
              <div className="md:col-span-3">
                <span className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Issuer</span>
                <code className="text-sm text-gray-800 break-all">{certInfo.issuer}</code>
              </div>
              <div>
                <span className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Valid From</span>
                <span className="text-sm text-gray-800">{certInfo.validFrom}</span>
              </div>
              <div>
                <span className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Valid To</span>
                <span className={`text-sm ${new Date(certInfo.validTo) < new Date() ? 'text-red-600 font-bold' : 'text-gray-800'}`}>
                  {certInfo.validTo}
                </span>
              </div>
              <div>
                <span className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Serial Number</span>
                <code className="text-sm text-gray-800">{certInfo.serialNumber}</code>
              </div>
              <div>
                <span className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Algorithm</span>
                <span className="text-sm text-gray-800">{certInfo.signatureAlgorithm}</span>
              </div>
              <div>
                <span className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Public Key</span>
                <span className="text-sm text-gray-800">{certInfo.publicKeyInfo}</span>
              </div>
              <div className="md:col-span-3">
                <span className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">SHA-256 Fingerprint</span>
                <code className="text-[10px] text-gray-600 font-mono break-all">{certInfo.fingerprint}</code>
              </div>
              {certInfo.san.length > 0 && (
                <div className="md:col-span-3">
                  <span className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Subject Alternative Names (SAN)</span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {certInfo.san.map((name, i) => (
                      <span key={i} className="px-2 py-0.5 bg-blue-50 text-blue-700 text-[10px] font-bold rounded-md border border-blue-100 italic">
                        {name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
