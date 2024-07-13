interface TransactionListDetailProps {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  errorMessage: string;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
}

export default TransactionListDetailProps;
