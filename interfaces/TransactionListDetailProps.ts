interface TransactionListDetailProps {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  errorMessage: string;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  signatureProp?: string;
}

export default TransactionListDetailProps;
