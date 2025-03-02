const crypto = require("crypto");
const generateServerSeed = () => crypto.randomBytes(32).toString("hex");
const hashSeed = (seed) => crypto.createHash("sha256").update(seed).digest("hex");

const generateRoll = (clientSeed) => {
  const serverSeed = generateServerSeed();
  const serverSeedHash = hashSeed(serverSeed);
  const combinedSeed = hashSeed(serverSeed + clientSeed);
  const roll = (parseInt(combinedSeed.substring(0, 8), 16) % 6) + 1;
  return { roll, serverSeedHash, serverSeed };
};

module.exports = { generateRoll, hashSeed };
