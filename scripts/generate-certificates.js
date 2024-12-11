const forge = require('node-forge');
const fs = require('fs');
const path = require('path');

function generateCertificates() {
  try {
    // Ensure certificates directory exists
    const certDir = path.join(__dirname, '..', 'certificates');
    if (!fs.existsSync(certDir)) {
      fs.mkdirSync(certDir);
    }

    // Generate a key pair
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
      name: 'countryName',
      value: 'TN'
    }, {
      shortName: 'ST',
      value: 'Tunisia'
    }, {
      name: 'localityName',
      value: 'Tunis'
    }, {
      name: 'organizationName',
      value: 'Tunisian Social Hub'
    }, {
      shortName: 'OU',
      value: 'Development'
    }];

    cert.setSubject(attrs);
    cert.setIssuer(attrs);
    cert.sign(keys.privateKey);

    // Convert to PEM format
    const privateKeyPem = forge.pki.privateKeyToPem(keys.privateKey);
    const certPem = forge.pki.certificateToPem(cert);

    // Write the certificate files
    fs.writeFileSync(path.join(certDir, 'localhost-key.pem'), privateKeyPem);
    fs.writeFileSync(path.join(certDir, 'localhost.pem'), certPem);

    console.log('SSL certificates generated successfully!');
  } catch (error) {
    console.error('Error generating certificates:', error);
  }
}

generateCertificates();
