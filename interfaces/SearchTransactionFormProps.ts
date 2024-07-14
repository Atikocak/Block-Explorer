interface SearchTransactionFormProps {
  handleFormSubmit: (event: React.FormEvent) => void;
  address: string;
  setAddress: (address: string) => void;
  loading: boolean;
  errorMessage: string;
  touched: boolean;
}

export default SearchTransactionFormProps;
