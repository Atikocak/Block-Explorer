import Wallet from "../components/Wallet";

export default function Header() {
  return (
    <div className="flex h-16 p-2 align-middle items-center text-white bg-[#526D82] justify-between shadow-inner drop-shadow-md shadow-[#27374d]">
      <a href="/">
        <img
          src="/solBanner.svg"
          alt="solana-logo"
          className="md:w-36 w-20 mr-4"
        />
      </a>
      <h1 className="md:text-2xl text-sm tracking-wide font-inter md:font-light font-medium flex align-middle items-center text-black text-center ml-2">
        <span>Blockchain Explorer (Mainnet)</span>
      </h1>
      <div className="flex justify-end items-end mr-2">
        <Wallet />
      </div>
    </div>
  );
}
