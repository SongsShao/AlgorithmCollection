const crypto = require("crypto");
const bs58 = require("bs58");

function getAddress(publicKey) {
  const hash1 = crypto
    .createHash("sha256")
    .update(publicKey, "hex")
    .digest();
  const hash2 = crypto
    .createHash("ripemd160")
    .update(hash1)
    .digest();
  const addressVersion = "00"; // 主网地址版本号，这里使用0x00
  const payload = addressVersion + hash2.toString("hex");
  const checksum = crypto
    .createHash("sha256")
    .update(payload, "hex")
    .digest();
  const secondHash = crypto
    .createHash("sha256")
    .update(checksum, "hex")
    .digest();
  const address = Buffer.from(
    payload + secondHash.toString("hex").substring(0, 8),
    "hex"
  );

  return bs58.encode(address);
}

const X = "1E25ECA6C24E4438DB9AD6E66A63D97855F0E910DDF15D3EEF256AD9D541CD5A";
const Y = "F22469776B19A8F60D170CDB566CC90EB56DC1FBBD14BE5A6086A759594AD08F";

const publicKey = Y + X;
const address = getAddress(publicKey);

console.log("BTC Address:", address);
