const forge = require('node-forge');
const fs = require('fs');

// Generate a keypair
const keys = forge.pki.rsa.generateKeyPair(2048);

// Create a certificate
const cert = forge.pki.createCertificate();
cert.publicKey = keys.publicKey;
cert.serialNumber = '01';
cert.validity.notBefore = new Date();
cert.validity.notAfter = new Date();
cert.validity.notAfter.setFullYear(cert.validity.notBefore.getFullYear() + 1);

const attrs = [{
  name: 'commonName',
  value: 'localhost'
}, {
  name: 'organizationName',
  value: 'DevToolsLabs'
}];
cert.setSubject(attrs);
cert.setIssuer(attrs);

// Self-sign certificate
cert.sign(keys.privateKey);

// Convert to PEM
const pem = forge.pki.certificateToPem(cert);
fs.writeFileSync('clean_cert.pem', pem, 'utf8');
console.log('PEM written to clean_cert.pem');
