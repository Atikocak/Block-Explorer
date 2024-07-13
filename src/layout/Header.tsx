import Wallet from "../components/Wallet";

export default function Header() {
  return (
    <div className="flex mt-10 justify-between">
      <h1 className="text-2xl text-center ml-2">
        Solana Blockchain Explorer - Mainnet
      </h1>
      <div className="flex justify-end items-end mr-2">
        <Wallet />
      </div>
    </div>
  );
}
