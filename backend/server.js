const express = require("express");
const cors = require("cors");
const { generateRoll, verifyRoll } = require("./hashUtils");

const app = express();
app.use(cors());
app.use(express.json());

let playerBalance = 1000; 

app.post("/roll-dice", (req, res) => {
  const { betAmount, clientSeed } = req.body;
  if (betAmount <= 0 || betAmount > playerBalance) {
    return res.status(400).json({ error: "Invalid bet amount" });
  }

  const { roll, serverSeedHash, serverSeed } = generateRoll(clientSeed);
  playerBalance -= betAmount;
  let winAmount = 0;
  if (roll >= 4) {
    winAmount = betAmount * 2;
    playerBalance += winAmount;
  }

  res.json({ roll, serverSeedHash, winAmount, playerBalance, serverSeed });
});

app.listen(5000, () => console.log("Backend running on port 5000"));
