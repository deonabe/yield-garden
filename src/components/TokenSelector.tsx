import { useState } from "react";

export interface TokenInput {
  token: string;
  amount: number;
}

interface TokenSelectorProps {
  onChange: (input: TokenInput) => void;
}

export default function TokenSelector({ onChange }: TokenSelectorProps) {
  const [token, setToken] = useState("USDC");
  const [amount, setAmount] = useState(1000);

  const handleUpdate = (newToken: string, newAmount: number) => {
    onChange({ token: newToken, amount: newAmount });
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
      <div>
        <label className="block font-medium mb-1">Token</label>
        <select
          className="border px-3 py-2 rounded"
          value={token}
          onChange={(e) => {
            setToken(e.target.value);
            handleUpdate(e.target.value, amount);
          }}
        >
          <option value="USDC">USDC</option>
          <option value="SOL">SOL</option>
          <option value="LP">LP Token</option>
        </select>
      </div>

      <div>
        <label className="block font-medium mb-1">Amount</label>
        <input
          type="number"
          className="border px-3 py-2 rounded w-36"
          value={amount}
          onChange={(e) => {
            const newAmount = Number(e.target.value);
            setAmount(newAmount);
            handleUpdate(token, newAmount);
          }}
        />
      </div>
    </div>
  );
}
