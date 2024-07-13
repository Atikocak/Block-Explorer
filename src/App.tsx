import { Connection, PublicKey } from "@solana/web3.js";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Transaction from "../interfaces/Transaction";
import "./App.css";
import SearchTransactionForm from "./components/SearchTransactionForm";
import TransactionList from "./components/TransactionList";
import TransactionListDetail from "./components/TransactionListDetail";

function App() {
  const [loading, setLoading] = useState(false);
  const [txList, setTxList] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState<number | null>(null);
  const [address, setAddress] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage("");
    const apiKey = import.meta.env.VITE_ALCHEMY_API_KEY;
    const rpcEndpoint = `https://solana-mainnet.g.alchemy.com/v2/${apiKey}`;

    try {
      const connection = new Connection(rpcEndpoint, "confirmed");
      const pubKey = new PublicKey(address);

      const [txSignatures, accountBalance] = await Promise.all([
        connection.getSignaturesForAddress(pubKey, { limit: 10 }),
        connection.getBalance(pubKey),
      ]);

      const transactions: Transaction[] = txSignatures.map((tx) => ({
        signature: tx.signature,
        slot: tx.slot,
        blockTime: tx.blockTime || 0,
        confirmationStatus: tx.confirmationStatus,
      }));

      setTxList(transactions);
      setBalance(accountBalance / 1_000_000_000);
    } catch (error) {
      console.error("Error fetching data:", error);
      setErrorMessage("Unable to fetch transactions. Please try again later!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="w-full h-full max-w-2xl p-6 flex flex-col items-center justify-between gap-6 mx-auto relative">
        <h1 className="text-2xl">Solana Blockchain Explorer</h1>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <SearchTransactionForm
                  handleFormSubmit={handleFormSubmit}
                  address={address}
                  setAddress={setAddress}
                  loading={loading}
                  errorMessage={errorMessage}
                />
                <TransactionList txList={txList} balance={balance} />
              </>
            }
          ></Route>
          <Route
            path="/tx/:signature"
            element={
              <TransactionListDetail
                loading={loading}
                setLoading={setLoading}
                errorMessage={errorMessage}
                setErrorMessage={setErrorMessage}
              />
            }
          ></Route>
        </Routes>
        {loading && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
            Loading
          </div>
        )}
      </div>
    </>
  );
}

export default App;
