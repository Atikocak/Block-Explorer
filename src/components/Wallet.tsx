import {
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { FC } from "react";

// Default styles that can be overridden by your app
import "@solana/wallet-adapter-react-ui/styles.css";

export const Wallet: FC = () => {
  // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.

  return (
    <WalletModalProvider>
      <WalletMultiButton />
      {/* Put your content here */}
    </WalletModalProvider>
  );
};

export default Wallet;
