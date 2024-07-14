import Transaction from "./Transaction";

interface TransactionListProps {
  txList: Transaction[];
  balance: number | null;
  touched: boolean;
}

export default TransactionListProps;
