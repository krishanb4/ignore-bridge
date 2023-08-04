import "@/styles/globals.css";
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import type { AppProps } from "next/app";
import { configureChains, createClient, useConnect, WagmiConfig } from "wagmi";
import { chainlist } from "@/config/chains";
import { Web3Modal } from "@web3modal/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import store from "@/redux/store";
import { Provider } from "react-redux";
import { useEffect } from "react";
import { InjectedConnector } from "wagmi/connectors/injected";
import { mainnet, bsc } from "wagmi/chains";

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID!;
const { chains, provider } = configureChains(
  [mainnet, bsc, chainlist.coreDAO, chainlist.baseChain],
  [w3mProvider({ projectId })]
);

const wagmiClient = createClient({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, version: 1, chains }),
  provider,
});

const ethereumClient = new EthereumClient(wagmiClient, chains);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Provider store={store}>
        <WagmiConfig client={wagmiClient}>
          <Component {...pageProps} />
          <ToastContainer />
        </WagmiConfig>
        <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
      </Provider>
    </>
  );
}
