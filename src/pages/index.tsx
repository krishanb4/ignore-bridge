import Head from "next/head";
import Header from "@/components/Header";
import Swap from "@/components/Swap";
import Theme from "@/components/Theme";
import { useAccount, useConnect, useNetwork, useSwitchNetwork } from "wagmi";
import { useEffect } from "react";
import { InjectedConnector } from "wagmi/connectors/injected";

export default function Home() {
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();
  const { chains, error, isLoading, pendingChainId, switchNetwork } =
    useSwitchNetwork();

  useEffect(() => {
    if (chain?.id == 56 || chain?.id == 1116) {
      return;
    } else {
      switchNetwork?.(1116);
    }
  }, [chain?.id, switchNetwork]);

  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  useEffect(() => {
    if (!isConnected) {
      connect();
    }
  }, [isConnected, connect]);

  return (
    <>
      <Head>
        <title>IgnoreFud Token Bridge</title>
        <meta name="description" content="Default token bridge by IgnoreFud" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Swap />
      <Theme />
    </>
  );
}
