const bip39 = require("bip39");

// 输入助记词
const mnemonic =
  "mystery caught patch interest eternal borrow cave copy evidence ice fabric also predict shove tortoise";

// 生成种子的密码短语（Passphrase）
const passphrase = "";

// 生成种子
function mnemonicToSeed(mnemonic, passphrase) {
  const seed = bip39.mnemonicToSeedSync(mnemonic, passphrase);
  return seed;
}

// 计算种子
const seed = mnemonicToSeed(mnemonic, passphrase);

console.log("种子:", seed.toString("hex"));
