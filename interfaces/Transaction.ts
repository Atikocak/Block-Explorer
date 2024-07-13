interface Transaction {
  signature: string;
  slot: number;
  blockTime: number;
  confirmationStatus: string | undefined;
}

export default Transaction;
