const { default: secureLocalStorage } = require("react-secure-storage")

function Encrypt(key,value){
    secureLocalStorage.setItem(key,value);
}
async function Decrypt(key){
    let data = await secureLocalStorage.getItem(key);
    return data;
}
module.exports = {
    Encrypt,Decrypt
}