import React from "react";
import SearchTransactionFormProps from "../../interfaces/SearchTransactionFormProps";

const SearchTransactionForm: React.FC<SearchTransactionFormProps> = ({
  handleFormSubmit,
  address,
  loading,
  setAddress,
  errorMessage,
}) => {
  return (
    <form onSubmit={handleFormSubmit} className="flex flex-wrap w-full">
      <label htmlFor="address" className="w-full shrink-0 text-lg mb-2">
        Wallet Address:
      </label>
      <input
        type="text"
        name="address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="w-3/4 border-2 border-r-0 border-gray-500 h-12 rounded-l-lg px-4 focus:outline-none focus:border-blue-600 disabled:bg-gray-500 transition-colors duration-150"
        placeholder="Please enter a wallet address"
        disabled={loading}
        required
      />
      <button
        type="submit"
        disabled={loading}
        className="flex-grow bg-blue-600 flex items-center justify-center rounded-r-lg text-white text-sm hover:bg-blue-900 disabled:bg-gray-500 transition-colors duration-150"
      >
        Search
      </button>
      {errorMessage && (
        <p className="text-red-600 text-base my-1 w-full">{errorMessage}</p>
      )}
    </form>
  );
};

export default SearchTransactionForm;
