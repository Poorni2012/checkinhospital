const CryptoJS = require('crypto-js');

// Define your key and IV (Initialization Vector)
const key = CryptoJS.enc.Utf8.parse('poornikalirajann'); // 16-byte key
const iv = CryptoJS.enc.Utf8.parse('kalirajannpoorni'); // 16-byte IV

// Encryption function
exports.encrypt = (data) => {
    // Encrypt the data
    const encrypted = CryptoJS.AES.encrypt(data, key, { iv: iv });
    // Combine the IV and ciphertext
    const encryptedData = iv.toString(CryptoJS.enc.Hex) + encrypted.ciphertext.toString(CryptoJS.enc.Hex);
    return encryptedData; // Return as a hexadecimal string
};

// Decryption function
exports.decrypt = (encryptedData) => {
    // Extract the IV and ciphertext from the encrypted data
    const ivHex = encryptedData.slice(0, 32); // First 32 characters (16 bytes in hex)
    const ciphertextHex = encryptedData.slice(32); // Remaining characters

    // Convert them back to WordArray
    const iv = CryptoJS.enc.Hex.parse(ivHex);
    const ciphertext = CryptoJS.enc.Hex.parse(ciphertextHex);

    // Decrypt the data
    const decrypted = CryptoJS.AES.decrypt({ ciphertext: ciphertext }, key, { iv: iv });
    return decrypted.toString(CryptoJS.enc.Utf8); // Convert the decrypted data back to a UTF-8 string
};
