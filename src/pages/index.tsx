import Head from "next/head";
import Header from "@/components/Header";
import Swap from "@/components/Swap";
import Theme from "@/components/Theme";

export default function Home() {
  return (
    <>
      <Head>
        <title>IngnoreFud Token Bridge</title>
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
