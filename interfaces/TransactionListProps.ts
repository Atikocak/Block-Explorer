import Transaction from "./Transaction";

interface TransactionListProps {
  txList: Transaction[];
  balance: number | null;
}

export default TransactionListProps;
