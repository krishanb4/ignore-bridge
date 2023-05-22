import React, { useEffect, useState, useContext } from "react";
import Image from "next/image";
import { useAccount, useBalance, useNetwork } from "wagmi";
import { tokens } from "@/config/constants/addresses";
import * as tokenData from "@/config/constants/addresses";
import { ethers } from "ethers";
import { MyContext } from "./context";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { setBalance } from "@/redux/actions";
import * as types from "@/redux/actionConstants";
import axios from "axios";
interface ReceiverComponentProps {
  onDataReceived: (tokenbalance: string) => void; // Define the callback function prop
}

const FromData: React.FC<ReceiverComponentProps> = ({ onDataReceived }) => {
  const dispatch = useDispatch();
  const { chain } = useNetwork();
  const { address, isConnected } = useAccount();
  const [integerPart, setIntegerPart] = useState("0");
  const [fractionalPart, setFractionalPart] = useState("00");
  const [tokenbalance, setTokenBalance] = useState<string>("");
  const [tokenAddress, setTokenAddress] = useState<`0x${string}` | undefined>(
    undefined
  );
  const [tokenAddressOther, setTokenAddressOther] = useState<
    `0x${string}` | undefined
  >(undefined);
  const [chainID, setChainID] = useState(0);
  const { data, isError, isLoading } = useBalance({
    address: address,
    token: tokenAddress,
    watch: true,
    onError(error) {
      // console.log("Error", error);
    },
  });
  const tokendataEth = useBalance({
    address: address,
    token: ethers.utils.getAddress(tokenData.ETH),
    chainId: 1,
    watch: true,
    onSuccess(data) {
      // console.log("Success", data);
    },
    onError(error) {
      console.log("Error", error);
    },
  });

  const tokendataBsc = useBalance({
    address: address,
    token: ethers.utils.getAddress(tokenData.BSC),
    chainId: 56,
    watch: true,
    onSuccess(data) {
      //console.log("Success", data);
    },
    onError(error) {
      console.log("Error", error);
    },
  });
  const tokendataCore = useBalance({
    address: address,
    token: ethers.utils.getAddress(tokenData.CORE),
    chainId: 1116,
    watch: true,
    onSuccess(data) {
      // console.log("Success", data);
    },
    onError(error) {
      console.log("Error", error);
    },
  });
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
  const tokenbalanceFrom = useSelector((state: AppState) => state.tokenbalance);
  const chainsdata = useSelector((state: AppState) => state.chains);
  // console.log(chainsdata);

  useEffect(() => {
    if (chain?.id == 1) {
      setChainID(1);
    } else if (chain?.id == 56) {
      setChainID(1116);
    } else if (chain?.id == 1116) {
      setChainID(56);
    }
  }, [chain?.id]);
  useEffect(() => {
    if (!isLoading) {
      if (data?.formatted) {
        setTokenBalance(data?.formatted?.toString());
      }
    }
  }, [data?.formatted, isLoading]);
  useEffect(() => {
    if (chain?.id == 1) {
      const erc20AddressOther = ethers.utils.getAddress(tokens.IGNORE.eth);
      setTokenAddressOther(erc20AddressOther);
    } else if (chain?.id == 56) {
      const erc20AddressOther = ethers.utils.getAddress(tokens.IGNORE.core);
      setTokenAddressOther(erc20AddressOther);
    } else if (chain?.id == 1116) {
      const erc20AddressOther = ethers.utils.getAddress(tokens.IGNORE.bsc);
      setTokenAddressOther(erc20AddressOther);
    }
  }, [chain?.id]);
  useEffect(() => {
    if (chain?.id == 1) {
      const erc20Address = ethers.utils.getAddress(tokens.IGNORE.eth);

      setTokenAddress(erc20Address);
    } else if (chain?.id == 56) {
      const erc20Address = ethers.utils.getAddress(tokens.IGNORE.bsc);

      setTokenAddress(erc20Address);
    } else if (chain?.id == 1116) {
      const erc20Address = ethers.utils.getAddress(tokens.IGNORE.core);
      setTokenAddress(erc20Address);
    }
  }, [chain?.id]);
  useEffect(() => {
    dispatch({
      type: types.SET_BALANCE,
      payload: {
        corebalance: Number(tokendataCore.data?.formatted),
        bscbalance: Number(tokendataBsc.data?.formatted),
        ethbalance: Number(tokendataEth.data?.formatted),
        enterAmount: "",
      },
    });
  }, [
    dispatch,
    tokendataEth.data?.formatted,
    tokendataBsc.data?.formatted,
    tokendataCore.data?.formatted,
  ]);
  useEffect(() => {
    if (!isLoading) {
      if (chain?.id == 1) {
        const integerPart = Math.floor(Number(tokenbalanceFrom.ethbalance)); // Extract the integer part
        const fractionalPart = (
          Number(tokenbalanceFrom.ethbalance) - integerPart
        ).toFixed(6);

        setIntegerPart(integerPart.toString());
        const fPart = fractionalPart.toString();
      } else if (chain?.id == 56) {
        const integerPart = Math.floor(Number(tokenbalanceFrom.bscbalance)); // Extract the integer part
        const fractionalPart = (
          Number(tokenbalanceFrom.bscbalance) - integerPart
        ).toFixed(6);

        setIntegerPart(integerPart.toString());
        const fPart = fractionalPart.toString();
        setFractionalPart(fPart.substring(2));
      } else if (chain?.id == 1116) {
        const integerPart = Math.floor(Number(tokenbalanceFrom.corebalance)); // Extract the integer part
        const fractionalPart = (
          Number(tokenbalanceFrom.corebalance) - integerPart
        ).toFixed(6);

        setIntegerPart(integerPart.toString());
        const fPart = fractionalPart.toString();
        setFractionalPart(fPart.substring(2));
      }
    }
  }, [
    chain?.id,
    tokenAddress,
    address,
    isLoading,
    dispatch,
    tokenbalance,
    tokenAddressOther,
    tokenbalanceFrom,
  ]);
  const decimals = 18;
  const handleDataInput = () => {
    const bigNumberValue = ethers.utils.parseUnits(tokenbalance, decimals);
    const decimalValue = ethers.utils.formatUnits(bigNumberValue, decimals);
    dispatch({
      type: types.SET_BALANCE,
      payload: {
        corebalance: tokenbalanceFrom.corebalance,
        bscbalance: tokenbalanceFrom.bscbalance,
        ethbalance: tokenbalanceFrom.ethbalance,
        enterAmount: decimalValue,
      },
    });
  };

  const [tokenPrice, setTokenPrice] = useState("");
  useEffect(() => {
    let response = null;

    new Promise(async (resolve, reject) => {
      try {
        response = await axios.get(
          "https://api.coingecko.com/api/v3/simple/price?ids=ignore-fud&vs_currencies=usd"
        );
      } catch (ex) {
        response = null;
        // error
        console.log(ex);
        reject(ex);
      }
      if (response) {
        // success
        const json = response.data;
        setTokenPrice(json["ignore-fud"]["usd"]);
        resolve(json);
      }
    });
  }, []);
  return (
    <div className="flex flex-row items-center justify-between h-[36px]">
      <p className="font-medium text-lg flex items-baseline select-none text-gray-500 dark:text-slate-400">
        $ {Number(tokenPrice) * Number(tokenbalanceFrom.enterAmount)}
      </p>
      <button
        onClick={() => handleDataInput()}
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
};

export default FromData;
