import { useWallet } from "@solana/wallet-adapter-react";
import { Connection, PublicKey } from "@solana/web3.js";
import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Transaction from "../interfaces/Transaction";
import "./App.css";
import SearchTransactionForm from "./components/SearchTransactionForm";
import TransactionList from "./components/TransactionList";
import TransactionListDetail from "./components/TransactionListDetail";
import Layout from "./layout/Layout";

function App() {
  const [loading, setLoading] = useState(false);
  const [txList, setTxList] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState<number | null>(null);
  const [address, setAddress] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [touched, setTouched] = useState(false);
  const { publicKey } = useWallet();
  const navigate = useNavigate();

  useEffect(() => {
    if (!publicKey) {
      setAddress("");
      return;
    } else {
      setAddress(publicKey.toBase58());
    }
  }, [publicKey]);

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage("");

    const apiKey = import.meta.env.VITE_ALCHEMY_API_KEY;
    const rpcEndpoint = `https://solana-mainnet.g.alchemy.com/v2/${apiKey}`;

    try {
      if (address.length === 88 || address.length === 87) {
        navigate(`/tx/${address}`);
      } else {
        const pubKey = new PublicKey(address);
        if (!PublicKey.isOnCurve(pubKey.toBuffer())) {
          throw new Error(
            "You have entered an invalid address. Please enter a valid address!"
          );
        }
        const connectionRPC = new Connection(rpcEndpoint, "confirmed");
        const [txSignatures, accountBalance] = await Promise.all([
          connectionRPC.getSignaturesForAddress(pubKey, { limit: 10 }),
          connectionRPC.getBalance(pubKey),
        ]);

        const transactions: Transaction[] = txSignatures.map((tx) => ({
          signature: tx.signature,
          slot: tx.slot,
          blockTime: tx.blockTime || 0,
          confirmationStatus: tx.confirmationStatus,
        }));

        setTxList(transactions);
        setBalance(accountBalance / 1_000_000_000);
      }
    } catch (error: unknown) {
      console.error("Error fetching data:", error);
      if (error instanceof Error) {
        setErrorMessage(`Error: ${error.message}`);
      } else {
        // error, Error türünde değilse, genel bir hata mesajı ayarlayın
        setErrorMessage("An unknown error occurred");
      }
    } finally {
      setLoading(false);
      setTouched(true);
    }
  };

  return (
    <Layout>
      <div className="w-full h-full mx-auto max-w-2xl p-6 flex flex-col items-center justify-between">
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
                  touched={touched}
                />
                <TransactionList
                  txList={txList}
                  balance={balance}
                  touched={touched}
                />
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
    </Layout>
  );
}

export default App;
