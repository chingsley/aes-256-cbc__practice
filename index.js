const crypto = require('crypto');

const iv = crypto.randomBytes(16);
console.log('\n\niv = ', iv, '\n\n');
const key = '12345678123456781234567812345678';

const encrypt = (value) => {
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  let encrypted = cipher.update(value, 'utf-8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
};

const encryptObjValues = ({ ...obj }) => {
  Object.keys(obj).forEach(key => {
    obj[key] = (obj[key] !== null) ? encrypt(obj[key].toString()) : encrypt('NA');
  });
  return obj;
};

const decrypt = (value) => {
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
  let decrypted = decipher.update(value, 'hex', 'utf-8');
  decrypted += decipher.final('utf-8');
  return decrypted;
};

const decryptObjValues = ({ ...obj }) => {
  Object.keys(obj).forEach(key => {
    obj[key] = decrypt(obj[key].toString());
  });
  return obj;
};

// TESTING
// const data = "These are the droids you are looking for!";
// const encryptedData = encrypt(data);
// console.log(encryptedData);

// const decryptedData = decrypt(encryptedData);
// console.log(decryptedData);

// const obj = { firstname: "kingsley", lastname: "eneja" };
// const encryptedObjValues = encryptObjValues(obj);
// console.log(encryptedObjValues);

// const decryptedObjValues = decryptObjValues(encryptedObjValues);
// console.log(decryptedObjValues);

// console.log(encrypt(JSON.stringify(obj)));

module.exports = { encryptObjValues, decryptObjValues };
