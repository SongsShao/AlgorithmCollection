const crypto = require("crypto");
const bs58 = require("bs58");

const publicKeyX =
  "0x1E25ECA6C24E4438DB9AD6E66A63D97855F0E910DDF15D3EEF256AD9D541CD5A";
const publicKeyY =
  "0xF22469776B19A8F60D170CDB566CC90EB56DC1FBBD14BE5A6086A759594AD08F";

function generateBTCAddress(publicKeyX, publicKeyY, isCompres) {
  const newPublicKeyX = String(publicKeyX).startsWith("0x")
    ? publicKeyX.slice(2)
    : publicKeyX;
  const newPublicKeyY = String(publicKeyY).startsWith("0x")
    ? publicKeyY.slice(2)
    : publicKeyY;
  // 1. 将公钥 publicKeyX 和 Y 连接起来04开头表示非压缩公钥
  let publicKey;
  if (!isCompres) {
    publicKey = `04${newPublicKeyX}${newPublicKeyY}`;
  } else {
    // 奇数时
    if (parseInt(publicKeyY, 16) % 2) {
      publicKey = `03${newPublicKeyX}`;
    }
    // 偶数时
    else {
      publicKey = `02${newPublicKeyX}`;
    }
  }

  console.log("公钥 publicKeyX 和 publicKeyY:", publicKey);
  // 公钥 publicKeyX 和 publicKeyY: 0xF22469776B19A8F60D170CDB566CC90EB56DC1FBBD14BE5A6086A759594AD08F0x1E25ECA6C24E4438DB9AD6E66A63D97855F0E910DDF15D3EEF256AD9D541CD5A

  // 2. 对连接后的公钥进行 SHA-256 哈希运算
  const hash1 = crypto
    .createHash("sha256")
    .update(publicKey, "hex")
    .digest();
  console.log("SHA-256 哈希运算:", hash1);
  // SHA-256 哈希运算: <Buffer e3 b0 c4 42 98 fc 1c 14 9a fb f4 c8 99 6f b9 24 27 ae 41 e4 64 9b 93 4c a4 95 99 1b 78 52 b8 55>

  // 3. 对哈希结果再进行 RIPEMD-160 哈希运算。
  const hash2 = crypto
    .createHash("ripemd160")
    .update(hash1)
    .digest();
  console.log("RIPEMD-160 哈希运算:", hash2);
  // RIPEMD-160 哈希运算: <Buffer b4 72 a2 66 d0 bd 89 c1 37 06 a4 13 2c cf b1 6f 7c 3b 9f cb>

  // 4.前缀版本号可以根据使用的网络进行选择，常见的版本号有 0x00（主网）、0x6f（测试网）等。
  // 将版本号与 RIPEMD-160 哈希结果连接起来。
  const versionPrefix = "00"; // 主网版本号
  // const versionPrefix = '6f'; // 测试网版本号
  const dataToEncode = `${versionPrefix}${hash2.toString("hex")}`;
  console.log("将版本号与 RIPEMD-160 哈希结果连接:", dataToEncode);
  // 将版本号与 RIPEMD-160 哈希结果连接: 00b472a266d0bd89c13706a4132ccfb16f7c3b9fcb

  // 5.对连接后的数据再进行两次 SHA-256 哈希运算，取前4个字节作为校验和。
  const firstHash = crypto
    .createHash("sha256")
    .update(dataToEncode, "hex")
    .digest();
  console.log("第一次Hash: ", firstHash);
  // 第一次Hash:  <Buffer 9d c8 bd 43 39 80 f8 99 94 68 41 b2 35 73 fc 4d f7 b0 36 a8 0b a7 63 7e 89 04 6e ae 6a 4f a3 b7>

  const secondHash = crypto
    .createHash("sha256")
    .update(firstHash, "hex")
    .digest();
  console.log("第二次Hash: ", secondHash);
  // 第二次Hash:  <Buffer 89 3f 70 11 85 fd 87 3f 5a 3c d2 4c b4 4e 8e 86 a9 f4 1c 63 6e fb 34 ab 76 59 1b df e1 80 e1 47>

  const checkStr = secondHash.toString("hex").slice(0, 8);
  console.log("校验:", checkStr);
  // 校验: 527686a3

  // 6. 将校验和连接在版本号和 RIPEMD-160 哈希结果后面。
  const addressData = `${dataToEncode}${checkStr}`;
  console.log("校验和： ", addressData);
  // 校验和：  00b472a266d0bd89c13706a4132ccfb16f7c3b9fcb527686a3

  // 7. 将连接后的数据进行 Base58 编码，得到最终的比特币地址。
  const btcAddress = bs58.encode(Buffer.from(addressData, "hex"));
  console.log("BTC地址：", btcAddress);
  // BTC地址： 1Cr7pfpJJrdN9NCCk1gLT3CvVbpzWZDj7E
  return btcAddress;
}

console.log(generateBTCAddress(publicKeyX, publicKeyY, true));
console.log(generateBTCAddress(publicKeyX, publicKeyY, false));
