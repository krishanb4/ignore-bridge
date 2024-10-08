import { tokens } from "@/config/constants/addresses";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useAccount, useBalance, useNetwork } from "wagmi";
import { AppDispatch } from "@/redux/store";
import { useSelector } from "react-redux";
import * as addresses from "@/config/constants/addresses";
import { TokenAddressRoute } from "@/config/constants/bridgeRoute";
import axios from "axios";
interface AppState {
  tokenbalance: {
    corebalance: number;
    bscbalance: number;
    ethbalance: number;
    enterAmount: string;
  };
  chains: {
    firstChain: {
      id: number;
      name: string;
      symbol: string;
    };
    secondChain: {
      id: number;
      name: string;
      symbol: string;
    };
  };
}
interface AddressObject {
  [key: string]: string;
}
function ToData() {
  const { chain } = useNetwork();
  const { address, isConnected } = useAccount();
  const [integerPart, setIntegerPart] = useState("0");
  const [fractionalPart, setFractionalPart] = useState("00");
  const [tokenbalance, setTokenBalanceLocal] = useState("");
  const [chainID, setChainID] = useState(0);
  const [tokenAddress, setTokenAddress] = useState<`0x${string}` | undefined>(
    undefined
  );

  const chainsdata = useSelector((state: AppState) => state.chains);
  const tokenbalanceFrom = useSelector((state: AppState) => state.tokenbalance);
  const token_address = TokenAddressRoute(chainsdata.secondChain.symbol);

  const { data, isError, isLoading } = useBalance({
    address: address,
    token: token_address,
    watch: true,
    chainId: chainsdata.secondChain.id,
    onSuccess(data) {
      // console.log("Success", data);
    },

    onError(error) {
      console.log("Error", error);
    },
  });

  useEffect(() => {
    if (!isLoading) {
      const tokenB = data?.formatted || "";
      setTokenBalanceLocal(tokenB);
      const integerPart = Math.floor(Number(data?.formatted)); // Extract the integer part
      const fractionalPart = (Number(data?.formatted) - integerPart).toFixed(6);

      setIntegerPart(integerPart.toString());
      const fPart = fractionalPart.toString();
      setFractionalPart(fPart.substring(2));
    }
  }, [chain?.id, tokenAddress, address, data, isLoading]);
  const [tokenPrice, setTokenPrice] = useState("");
  useEffect(() => {
    let response = null;

    const fetchData = async () => {
      try {
        response = await axios.get(
          "https://api.coingecko.com/api/v3/simple/price?ids=ignore-fud&vs_currencies=usd",
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Headers":
                "Origin, X-Requested-With, Content-Type, Accept",
            },
          }
        );
      } catch (ex) {
        response = null;
        // error
        console.log(ex);
      }
      if (response) {
        // success
        const json = response.data;
        setTokenPrice(json["ignore-fud"]["usd"]);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-row items-center justify-between h-[36px]">
      <p className="font-medium text-lg flex items-baseline select-none text-gray-500 dark:text-slate-400">
        $ {Number(tokenPrice) * Number(tokenbalanceFrom.enterAmount)}
      </p>
      <button
        data-testid="undefined-balance-button"
        type="button"
        className="font-medium flex gap-1.5 items-center py-1 text-blue hover:text-blue-600 active:text-blue-700 dark:text-slate-400 hover:dark:text-slate-300 px-2 rounded-md"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 18 18"
          width="18"
          height="18"
        >
          <path
            fill="currentColor"
            d="M15.6 4.6H1.85v-.55l12.1-.968v.968h1.65V2.4c0-1.21-.98-2.059-2.177-1.888L2.378 2.089C1.18 2.26.2 3.39.2 4.6v11a2.2 2.2 0 002.2 2.2h13.2a2.2 2.2 0 002.2-2.2V6.8a2.2 2.2 0 00-2.2-2.2zm-1.65 7.707a1.65 1.65 0 01-.63-3.176 1.65 1.65 0 11.63 3.176z"
          ></path>
        </svg>
        <span className="text-lg">
          {integerPart}.
          <span className="text-sm font-semibold">{fractionalPart}</span>
        </span>
      </button>
    </div>
  );
}

export default ToData;
function dispatch(arg0: void) {
  throw new Error("Function not implemented.");
}
