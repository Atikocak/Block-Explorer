import { Connection, VersionedTransactionResponse } from "@solana/web3.js";
import { format, fromUnixTime } from "date-fns";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TransactionListDetailProps from "../../interfaces/TransactionListDetailProps.ts";

const TransactionListDetail: React.FC<TransactionListDetailProps> = ({
  loading,
  setLoading,
  errorMessage,
  setErrorMessage,
}) => {
  const [transactionData, setTransactionData] =
    useState<VersionedTransactionResponse | null>(null);
  const { signature } = useParams<{ signature: string }>();

  useEffect(() => {
    const fetchTransactionData = async () => {
      if (!signature) return;

      setLoading(true);
      setErrorMessage("");

      try {
        const apiKey = import.meta.env.VITE_ALCHEMY_API_KEY;
        const rpcEndpoint = `https://solana-mainnet.g.alchemy.com/v2/${apiKey}`;
        const connection = new Connection(rpcEndpoint, "confirmed");

        const txData = await connection.getTransaction(signature, {
          maxSupportedTransactionVersion: 0,
        });

        if (txData) {
          setTransactionData(txData);
        } else {
          setErrorMessage("Transaction not found");
        }
      } catch (error) {
        console.error("Error fetching transaction data:", error);
        setErrorMessage(
          "Unable to fetch transaction details. Please try again later!"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTransactionData();
  }, [signature, setLoading, setErrorMessage]);

  return (
    <div className="w-full">
      {!loading && transactionData && (
        <div className="rounded-lg border max-w-xl overflow-x-auto mx-auto">
          <table className="table-auto w-full border-collapse p-4">
            <tbody className="overflow-x-scroll">
              <tr className="border-b">
                <td className="font-medium text-sm p-4">Signature</td>
                <td className="p-4">
                  {transactionData.transaction?.signatures[0] || "N/A"}
                </td>
              </tr>
              <tr className="border-b">
                <td className="font-medium text-sm p-4">Timestamp</td>
                <td className="p-4">
                  {format(
                    fromUnixTime(transactionData.blockTime ?? 0),
                    "MMMM d, yyyy 'at' HH:mm:ss 0000"
                  )}
                </td>
              </tr>
              <tr className="border-b">
                <td className="font-medium text-sm p-4">Recent Blockhash</td>
                <td className="p-4">
                  {transactionData.transaction?.message.recentBlockhash ||
                    "N/A"}
                </td>
              </tr>
              <tr className="border-b">
                <td className="font-medium text-sm p-4">Fee</td>
                <td className="p-4">
                  {transactionData.meta?.fee
                    ? transactionData.meta.fee / 1_000_000_000
                    : "N/A"}
                </td>
              </tr>
              <tr className="border-b">
                <td className="font-medium text-sm p-4">Amount</td>
                <td className="p-4">
                  ◎
                  {transactionData.meta?.postBalances &&
                  transactionData.meta?.preBalances
                    ? (transactionData.meta.postBalances[0] -
                        transactionData.meta.preBalances[0]) /
                      1_000_000_000
                    : "N/A"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      {!loading && !transactionData && (
        <p className="text-center text-gray-500">
          {errorMessage || "No transaction found"}
        </p>
      )}
    </div>
  );
};

export default TransactionListDetail;
