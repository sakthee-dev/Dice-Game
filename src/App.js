import { useState } from "react";
import axios from "axios";

export default function App() {
  const [balance, setBalance] = useState(1000);
  const [betAmount, setBetAmount] = useState(10);
  const [rollResult, setRollResult] = useState(null);
  const [serverSeedHash, setServerSeedHash] = useState("");
  const [clientSeed, setClientSeed] = useState("random-seed");

  const rollDice = async () => {
    try {
      const res = await axios.post("http://localhost:5000/roll-dice", {
        betAmount,
        clientSeed,
      });

      const { roll, serverSeedHash, winAmount, playerBalance } = res.data;

      setRollResult(roll);
      setBalance(playerBalance);
      setServerSeedHash(serverSeedHash);

      if (winAmount > 0) {
        setRollResult(`You won! Rolled ${roll}`);
      } else {
        setRollResult(`You lost! Rolled ${roll}`);
      }
    } catch (error) {
      alert(error.response?.data?.error || "Error rolling dice");
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-2xl font-bold mb-4">🎲 Provably Fair Dice Game</h1>
      <p className="mb-2">Balance: ${balance}</p>
      <input
        type="number"
        value={betAmount}
        onChange={(e) => setBetAmount(Number(e.target.value))}
        className="mb-2 p-2 border rounded text-black"
      />
      <input
        type="text"
        value={clientSeed}
        onChange={(e) => setClientSeed(e.target.value)}
        className="mb-2 p-2 border rounded text-black"
        placeholder="Enter Client Seed"
      />
      <button onClick={rollDice} className="bg-green-500 px-4 py-2 rounded">
        Roll Dice
      </button> <br />
      {rollResult !== null && (
        <div className="mt-4">
          <p className="mb-3">🔒 Server Seed Hash: {serverSeedHash}</p>
          <p className="text-xl">🎲 <strong>{rollResult}</strong></p><br/>
        </div>
      )}
    </div>
  );
}
