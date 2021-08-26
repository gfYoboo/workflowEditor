import cryptoJs from 'crypto-js'

export function GetProtID(point) {
    if (point.startsWith("0,")) {
        return "port_left"
    }
    else if (point.startsWith("1,")) {
        return "port_bottom"
    }
    else if (point.startsWith("2,")) {
        return "port_right"
    }
    else if (point.startsWith("3,")) {
        return "port_top"
    }
}
export function EncryptParam(argObj) {
    if (argObj == null || argObj === undefined) return argObj;
    let o = "";
    let isObj = false;
    if (typeof (argObj) === 'string')
        o = argObj.toString();
    else {
        o = JSON.stringify(argObj);
        isObj = true;
    }
    let secObj = getLegalKeyIV();
    let e1 = cryptoJs.AES.encrypt(o, secObj.iKey,
        {
            iv: secObj.iIV,
            mode: cryptoJs.mode.CBC,
            padding: cryptoJs.pad.Pkcs7
        });
    let es = StrToBinary(e1.toString());
    if (isObj)
        return { "data": es };
    else
        return es;
}
export function StrToBinary(str) {
    let result = [];
    let list = str.split("");
    for (let i = 0; i < list.length; i++) {
        let item = list[i];
        let binaryStr = PadLeft(item.charCodeAt().toString(16), 2, '0');
        result.push(binaryStr);

    }
    return result.join("");
}
export function getLegalKeyIV() {
    let secObj = { iKey: '', iIV: '' };
    secObj.iKey = cryptoJs.enc.Utf8.parse("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    secObj.iIV = cryptoJs.enc.Utf8.parse("1234567812345678");
    return secObj;
}
export function PadLeft(s, len, charStr) {
    return new Array(len - s.length + 1).join(charStr || '') + s;
}