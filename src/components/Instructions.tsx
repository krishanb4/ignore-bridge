import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useContractRead } from "wagmi";
import AddressRoute, {
  TokenAddressRoute,
} from "@/config/constants/bridgeRoute";
import bsccoreABI from "@/config/abi/bsc-coreABI.json";
import bscethABI from "@/config/abi/bsc-ethABI.json";
import ethcoreABI from "@/config/abi/eth-coreABI.json";
import ethbscABI from "@/config/abi/eth-bscABI.json";
import corebscABI from "@/config/abi/core-bscABI.json";
import coreethABI from "@/config/abi/core-ethABI.json";
import bscbaseABI from "@/config/abi/bsc-baseABI.json";
import basebscABI from "@/config/abi/base-bscABI.json";

import { ethers } from "ethers";

type GasArgs = {
  remoteChainId?: number;
  useZro: boolean;
  adapterParams: string;
};

interface AppState {
  tokenbalance: {
    bscbalance: number;
    corebalance: number;
    enterAmount: string;
    ethbalance: number;
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

const Instructions = () => {
  const [gasArgs, setGasArgs] = useState({} as GasArgs);
  const chaindetails = useSelector((state: AppState) => state.chains);
  const [routeContractAddress, setRouteContractAddress] =
    useState<`0x${string}`>();
  const [requiredFee, setRequiredFee] = useState(0);
  const [bridgeRoute, setBridgeRoute] = useState({
    from: "ETH",
    to: "BSC",
  });
  const adapterParams = ethers.utils.solidityPack(
    ["uint16", "uint256"],
    [1, 900000]
  );
  useEffect(() => {
    setBridgeRoute({
      from: chaindetails.firstChain.symbol,
      to: chaindetails.secondChain.symbol,
    });
  }, [chaindetails.firstChain.symbol, chaindetails.secondChain.symbol]);
  const [contractABI, setContractABI] = useState([] as any);
  useEffect(() => {
    if (chaindetails.firstChain.id == 56 && chaindetails.secondChain.id == 1) {
      setContractABI(bscethABI);
    } else if (
      chaindetails.firstChain.id == 1116 &&
      chaindetails.secondChain.id == 1
    ) {
      setContractABI(coreethABI);
    } else if (
      chaindetails.firstChain.id == 1 &&
      chaindetails.secondChain.id == 56
    ) {
      setContractABI(ethbscABI);
    } else if (
      chaindetails.firstChain.id == 1116 &&
      chaindetails.secondChain.id == 56
    ) {
      setContractABI(corebscABI);
    } else if (
      chaindetails.firstChain.id == 56 &&
      chaindetails.secondChain.id == 1116
    ) {
      setContractABI(bsccoreABI);
    } else if (
      chaindetails.firstChain.id == 1 &&
      chaindetails.secondChain.id == 1116
    ) {
      setContractABI(ethcoreABI);
    } else if (
      chaindetails.firstChain.id == 8453 &&
      chaindetails.secondChain.id == 56
    ) {
      setContractABI(basebscABI);
    } else if (
      chaindetails.firstChain.id == 56 &&
      chaindetails.secondChain.id == 8453
    ) {
      setContractABI(bscbaseABI);
    }
  }, [chaindetails.firstChain.id, chaindetails.secondChain.id]);
  useEffect(() => {
    if (
      (bridgeRoute.from == "ETH" && bridgeRoute.to == "BSC") ||
      (bridgeRoute.from == "BASE" && bridgeRoute.to == "BSC")
    ) {
      setGasArgs({
        remoteChainId: 102,
        useZro: false,
        adapterParams: adapterParams,
      });
    } else if (
      (bridgeRoute.from == "CORE" && bridgeRoute.to == "ETH") ||
      (bridgeRoute.from == "CORE" && bridgeRoute.to == "BSC") ||
      (bridgeRoute.from == "BSC" && bridgeRoute.to == "ETH")
    ) {
      setGasArgs({
        useZro: false,
        adapterParams: adapterParams,
      });
    } else if (
      (bridgeRoute.from == "BSC" && bridgeRoute.to == "CORE") ||
      (bridgeRoute.from == "ETH" && bridgeRoute.to == "CORE")
    ) {
      setGasArgs({
        remoteChainId: 153,
        useZro: false,
        adapterParams: adapterParams,
      });
    } else if (
      (bridgeRoute.from == "CORE" && bridgeRoute.to == "BSC") ||
      (bridgeRoute.from == "BSC" && bridgeRoute.to == "BASE")
    ) {
      setGasArgs({
        //remoteChainId: 184,
        useZro: false,
        adapterParams: adapterParams,
      });
    }
  }, [adapterParams, bridgeRoute.from, bridgeRoute.to]);
  useEffect(() => {
    const From_To = bridgeRoute.from + "_" + bridgeRoute.to;

    const route_address = AddressRoute(From_To);
    setRouteContractAddress(route_address);
  }, [bridgeRoute.from, bridgeRoute.to]);

  const gasData = useContractRead({
    address: routeContractAddress,
    abi: contractABI,
    functionName: "estimateBridgeFee",
    watch: true,
    args: Object.values(gasArgs),
  });
  // console.log(gasArgs);
  useEffect(() => {
    setRequiredFee(Number(gasData.data?.nativeFee) / 10 ** 18);
  }, [bridgeRoute.from, gasData.data?.nativeFee]);
  return (
    <>
      <div className="dark:bg-[#545c5c] bg-[#b2c9dc] mt-[18px] pr-4 pt-4 pl-10 pb-4 rounded-[5px]">
        <ul className="list-disc text-sm">
          <li>Minimum Crosschain Amount is 40,000 4TOKEN</li>
          <li>
            LayerZero {bridgeRoute.from} to {bridgeRoute.to} bridge fee is{" "}
            {((requiredFee / 100) * 105).toFixed(5)}{" "}
            {bridgeRoute.from == "BASE" ? "ETH" : bridgeRoute.from} +{" "}
            {bridgeRoute.from} gas fee
          </li>
          <li>Estimated Time of Crosschain Arrival is 4-10 min</li>
          <li>
            Estimated fees will be charged and excess will be returned back to
            your wallet
          </li>
        </ul>
      </div>
    </>
  );
};

export default Instructions;
