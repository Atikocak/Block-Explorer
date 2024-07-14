import React from "react";
import SearchTransactionFormProps from "../../interfaces/SearchTransactionFormProps";

const SearchTransactionForm: React.FC<SearchTransactionFormProps> = ({
  handleFormSubmit,
  address,
  loading,
  setAddress,
  errorMessage,
  touched,
}) => {
  return (
    <form onSubmit={handleFormSubmit} className="w-full mx-auto">
      <label
        htmlFor="address"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Search
      </label>
      {/* Wallet Address or Transaction ID */}
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-white dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          name="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="block w-full transition-all duration-300 p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-[#526D82] focus:ring-blue-500 focus:border-blue-500"
          placeholder="Please enter a wallet address or a tx id"
          disabled={loading}
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="text-white absolute end-2.5 bottom-2.5 bg-[#1b1a55] hover:bg-[#27374D] transition-all duration-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Search
        </button>
      </div>
      {touched && errorMessage && (
        <p className="text-red-600 text-base my-1 w-full">{errorMessage}</p>
      )}
    </form>
  );
};

export default SearchTransactionForm;
