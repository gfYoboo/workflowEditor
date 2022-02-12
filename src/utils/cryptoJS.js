import CryptoJS from 'crypto-js';
export function getLegalKeyIV() {
  const secObj = { iKey: '', iIV: '' };
  secObj.iKey = CryptoJS.enc.Utf8.parse('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
  secObj.iIV = CryptoJS.enc.Utf8.parse('1234567812345678');
  return secObj;
}
export function EncryptParam(argObj) {
  if (argObj == null || argObj === undefined) return argObj;
  let o = '';
  let isObj = false;
  if (typeof (argObj) === 'string') { o = argObj.toString(); } else {
    o = JSON.stringify(argObj);
    isObj = true;
  }
  const secObj = getLegalKeyIV();
  const e1 = CryptoJS.AES.encrypt(o, secObj.iKey,
    {
      iv: secObj.iIV,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
  const es = StrToBinary(e1.toString());
  // var es = e1.toString();
  if (isObj) { return { data: es }; } else { return es; }
}
export function DecryptParam(argStr) {
  argStr = BinaryToStr(argStr);

  const secObj = getLegalKeyIV();
  const decrypted = CryptoJS.AES.decrypt(argStr, secObj.iKey,
    {
      iv: secObj.iIV,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
  return decrypted.toString(CryptoJS.enc.Utf8);
}
export function StrToBinary(str) {
  const result = [];
  const list = str.split('');
  for (let i = 0; i < list.length; i++) {
    const item = list[i];
    const binaryStr = PadLeft(item.charCodeAt().toString(16), 2, '0');
    result.push(binaryStr);
  }
  return result.join('');
}
export function BinaryToStr(str) {
  const result = [];
  const list = str.split('');
  for (let i = 0; i < list.length - 1; i += 2) {
    const item = list[i] + '' + list[i + 1];
    str = String.fromCharCode(parseInt(item, 16));
    result.push(str);
  }
  return result.join('');
}
export function PadLeft(s, len, charStr) {
  return new Array(len - s.length + 1).join(charStr || '') + s;
}
export function PadRight(s, len, charStr) {
  return s + new Array(len - s.length + 1).join(charStr || '');
}
