import React, { useEffect, useState } from "react";
import {
  useAccount,
  useConnect,
  useSigner,
  useSwitchNetwork,
  useNetwork,
  usePrepareContractWrite,
  useContractWrite,
} from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  approve,
  ApprovalResult,
  checkApprovedBalance,
} from "../utils/callFunctions";
import TokenABI from "@/config/abi/bscUSDT.json";
import bridgeABI from "@/config/abi/bridgeABI.json";
import bscbridgeABI from "@/config/abi/bscbridgeABI.json";
import AddressRoute, {
  TokenAddressRoute,
} from "@/config/constants/bridgeRoute";
import { ethers, BigNumber } from "ethers";
import { getAccount } from "@wagmi/core";
import { MyContext } from "./context";
import { useSelector } from "react-redux";
import { createClient } from "@layerzerolabs/scan-client";
import moment from "moment";

interface Transaction {
  to: string;
  from: string;
  tx: string;
}

interface ChainRoute {
  to: string;
  from: string;
}

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
type TokenBalanceList = {
  [key: string]: number;
};

function SwapButton() {
  const client = createClient("mainnet");
  const context = React.useContext(MyContext);
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();
  const { data: signer } = useSigner();
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const [approving, setApproving] = useState(false);
  // const [tokenAddress, setTokenAddress] = useState("");
  // const [tokenSpender, settokenSpender] = useState("");
  const [userAddress, setUserAddress] = useState<`0x${string}` | string>("");

  const account = getAccount();
  const [dummyData, setDummyData] = useState("");
  // v1.1
  const [tokenBalance, setTokenBalance] = useState(0);
  const tokenbalance = useSelector((state: AppState) => state.tokenbalance);
  const chaindetails = useSelector((state: AppState) => state.chains);
  const [bridgeRoute, setBridgeRoute] = useState({
    from: "ETH",
    to: "BSC",
  });

  const [tokenBalanceList, setTokenBalanceList] = useState<TokenBalanceList>({
    ETH: 0,
    BSC: 0,
    CORE: 0,
  });
  const [routeContractAddress, setRouteContractAddress] =
    useState<`0x${string}`>();
  const [routeTokenAddress, setRouteTokenAddress] = useState<`0x${string}`>();

  useEffect(() => {
    const eth_balance = tokenbalance.ethbalance;
    const bsc_balance = tokenbalance.bscbalance;
    const core_balance = tokenbalance.corebalance;
    setTokenBalanceList({
      ETH: eth_balance,
      BSC: bsc_balance,
      CORE: core_balance,
    });
  }, [tokenbalance, chaindetails]);

  useEffect(() => {
    const balance = tokenbalance.enterAmount;
    const balan_to = balance;
    setDummyData(balan_to);
  }, [tokenbalance]);
  useEffect(() => {
    const balance = tokenBalanceList[bridgeRoute.from];
    const balan_to = balance;
    setTokenBalance(balan_to);
  }, [tokenBalanceList, bridgeRoute.from]);

  useEffect(() => {
    setBridgeRoute({
      from: chaindetails.firstChain.symbol,
      to: chaindetails.secondChain.symbol,
    });
  }, [chaindetails.firstChain.symbol, chaindetails.secondChain.symbol]);

  useEffect(() => {
    if (account && account.address) {
      const erc20Address = ethers.utils.getAddress(account.address);
      setUserAddress(erc20Address);
    }
  }, [account]);
  type SwapArgs = {
    localToken: string;
    remoteChainId: number;
    amountLD: BigNumber;
    to: string;
    callParams: {};
    unwrapWeth: boolean;
    adapterParams: "0x";
    gassData: {};
  };

  type SwapArgsCore = {
    token: string;
    amountLD: BigNumber;
    to: string;
    callParams: {};
    adapterParams: "0x";
    gassData: {};
  };
  useEffect(() => {
    const From_To = bridgeRoute.from + "_" + bridgeRoute.to;

    const route_address = AddressRoute(From_To);
    setRouteContractAddress(route_address);
    console.log(route_address);
  }, [bridgeRoute.from, bridgeRoute.to]);
  useEffect(() => {
    const From = bridgeRoute.from;

    const token_address = TokenAddressRoute(From);
    setRouteTokenAddress(token_address);
    console.log(token_address);
  }, [bridgeRoute.from]);
  async function checkApproveBalance() {
    if (routeTokenAddress && routeContractAddress && userAddress && chain?.id) {
      try {
        const approveBalance = await checkApprovedBalance(
          routeTokenAddress,
          routeContractAddress,
          userAddress,
          TokenABI,
          Number(chain?.id)
        );
        setapproveBalance(Number(approveBalance) / 10 ** 18);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("data not available yet...");
    }
  }

  async function approveTokens() {
    const amount = ethers.utils.parseUnits(
      "115792089237316195423570985008687907853269984665640564039457",
      18
    );
    const signer_from = signer;
    try {
      setApproving(true);
      if (routeTokenAddress && routeContractAddress) {
        const approvalResult: ApprovalResult = await approve(
          routeTokenAddress,
          routeContractAddress,
          TokenABI,
          amount,
          signer_from
        );
        if (approvalResult.status == "mined") {
          setApproving(false);
        }
        await toast.promise(Promise.resolve(), {
          pending: "Approving tokens...",
          success: "Tokens approved successfully 👌",
          error: "Failed to approve tokens",
        });
        checkApproveBalance();
        setApproving(false);
      }
    } catch (error) {
      const theme = document.documentElement.classList.contains("dark")
        ? "dark"
        : "default";
      if (theme === "default") {
        // console.log("light");

        toast.error("Failed to approve tokens: " + error, {
          theme: "light",
        });
      } else {
        // console.log("dark");
        toast.error("Failed to approve tokens: " + error, {
          theme: "dark",
        });
      }
      console.error(`Failed to approve tokens: ${error}`);
      setApproving(false);
    }
  }
  const [approveBalance, setapproveBalance] = useState(0);
  useEffect(() => {
    async function checkApproveBalance() {
      if (
        routeTokenAddress &&
        routeContractAddress &&
        userAddress &&
        chain?.id
      ) {
        try {
          const approveBalance = await checkApprovedBalance(
            routeTokenAddress,
            routeContractAddress,
            userAddress,
            TokenABI,
            Number(chain?.id)
          );
          setapproveBalance(Number(approveBalance) / 10 ** 18);
        } catch (error) {}
      } else {
        // nothing
      }
    }
    checkApproveBalance();
  }, [chain?.id, userAddress, routeTokenAddress, routeContractAddress]);

  const [args, setArgs] = useState({} as SwapArgs);
  const [argsCore, setArgsCore] = useState({} as SwapArgsCore);
  const [contractAddressSwap, setContractAddressSwap] =
    useState<`0x${string}`>();
  const [tokenAddressSwap, setTokenAddressSwap] = useState("");
  const toAddress = address;
  const adapterParams = "0x";
  const [swaping, setSwaping] = useState(false);

  useEffect(() => {
    const callParams = {
      refundAddress: address,
      zroPaymentAddress: "0x0000000000000000000000000000000000000000",
    };

    const decimals = 18;
    if (dummyData) {
      const numberEntered = ethers.utils.parseUnits(
        dummyData.toString(),
        decimals
      );
      console.log(`entered ${numberEntered}`);

      if (tokenAddressSwap && toAddress) {
        if (chain?.id == 1 || chain?.id == 56) {
          setArgs({
            localToken: tokenAddressSwap,
            remoteChainId: 153,
            amountLD: BigNumber.from(numberEntered),
            to: toAddress,
            unwrapWeth: true,
            callParams: callParams,
            adapterParams: adapterParams,
            gassData: {
              // gasLimit: 2400000,
              value: ethers.utils.parseEther("0.001"),
            },
          });
        } else if (chain?.id == 1116) {
          setArgsCore({
            token: tokenAddressSwap,
            amountLD: BigNumber.from(numberEntered),
            to: toAddress,
            callParams: callParams,
            adapterParams: adapterParams,
            gassData: {
              // gasLimit: 2400000,
              value: ethers.utils.parseEther("1"),
            },
          });
        }
      }
    }
  }, [tokenAddressSwap, address, toAddress, chain?.id, dummyData]);

  const HanddleFunctions = () => {
    if (chain?.id === 1 || chain?.id === 56 || chain?.id === 1116) {
      if (isConnected) {
        if (approveBalance >= 40000) {
          if (Number(dummyData) <= 0 || !dummyData) {
            return;
          } else {
            if (!swaping) {
              if (Number(dummyData) >= 40000) {
                if (Number(dummyData) <= Number(tokenBalance)) {
                  Swap();
                }
              }
            }
          }
        } else {
          if (approving) {
            return;
          } else {
            approveTokens();
          }
        }
      } else {
        connect();
      }
    } else {
      switchNetwork?.(1);
    }
  };
  const [buttonText, setButtonText] = useState("");

  useEffect(() => {
    if (chain?.id === 1 || chain?.id === 56 || chain?.id === 1116) {
      if (approveBalance >= 40000) {
        if (
          Number(dummyData) <= 0 ||
          !dummyData ||
          Number(dummyData) > Number(tokenBalance)
        ) {
          if (Number(dummyData) > Number(tokenBalance)) {
            setButtonText("Enter Correct Amount");
          } else {
            if (Number(dummyData) < 40000 && Number(dummyData) > 0) {
              setButtonText("Minimum bridge amount is 40000 4TOKEN");
            } else {
              setButtonText("Enter Amount");
            }
          }
        } else {
          if (swaping) {
            setButtonText("Bridging");
          } else {
            if (Number(dummyData) < 40000) {
              setButtonText("Minimum bridge amount is 40000 4TOKEN");
            } else {
              setButtonText("Bridge");
            }
          }
        }
      } else {
        if (approving) {
          setButtonText("Approving");
        } else if (isConnected) {
          setButtonText("Approve");
        } else {
          setButtonText("Connect Wallet");
        } // Extracted into an independent statement
      }
    } else {
      setButtonText("Switch Network");
    }
  }, [
    approving,
    chain,
    isConnected,
    approveBalance,
    swaping,
    buttonText,
    dummyData,
    tokenbalance,
    tokenBalance,
  ]);
  // const [prepareContract, setPrepareContract] = useState("");
  const [contractABI, setContractABI] = useState<Array<any>>([]);

  useEffect(() => {
    if (chain?.id === 1) {
      setContractABI((prevState) => [...prevState, ...bscbridgeABI]);
    } else if (chain?.id === 56) {
      setContractABI((prevState) => [...prevState, ...bscbridgeABI]);
    } else if (chain?.id === 1116) {
      setContractABI((prevState) => [...prevState, ...bridgeABI]);
    }
  }, [chain?.id]);

  let argsToUse;

  if (chain?.id === 1) {
    argsToUse = args;
  } else if (chain?.id === 1116) {
    argsToUse = argsCore;
  } else if (chain?.id === 56) {
    argsToUse = args;
  } else {
    argsToUse = "";
  }

  const { config, error } = usePrepareContractWrite({
    address: routeContractAddress,
    abi: contractABI,
    functionName: "bridge",
    args: Object.values(argsToUse),
  });

  const { data, isLoading, isSuccess, write } = useContractWrite({
    ...config,
    onError(error) {
      const theme = document.documentElement.classList.contains("dark")
        ? "dark"
        : "default";
      if (theme === "default") {
        toast.error("Failed to send tokens: " + error, {
          theme: "light",
        });
      } else {
        // console.log("dark");
        toast.error("Failed to send tokens: " + error, {
          theme: "dark",
        });
      }
      setSwaping(false);
    },
    onSuccess(data) {
      setSwaping(false);
      toast.success("Transaction successfully sent 👌");
    },
  });
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  useEffect(() => {
    const storedTransactions = localStorage.getItem("transactions");
    if (storedTransactions !== null) {
      setTransactions(JSON.parse(storedTransactions));
    }
  }, []);

  if (isSuccess) {
    if (data?.hash) {
      const hash = data.hash.toString();
      const from = bridgeRoute.from;
      const to = bridgeRoute.to;
      const newTransaction = {
        to: to,
        from: from,
        tx: hash,
        time: moment().format("DD-MM-YYYY hh:mm:ss"),
      };
      // console.log(transactions);

      const txExists = transactions.filter(
        (transaction) => transaction.tx === newTransaction.tx
      );

      if (txExists.length > 0) {
        // console.log("Transaction already exists!");
      } else {
        transactions.push(newTransaction);
        localStorage.setItem("transactions", JSON.stringify(transactions));
      }
    }
  }

  async function Swap() {
    if (routeContractAddress && toAddress) {
      write?.();
      setSwaping(true);
    } else {
      console.log("data not ready yet...");
    }
  }
  return (
    <div className="pt-4">
      <div className="relative w-full" data-headlessui-state="">
        <button
          onClick={() => HanddleFunctions()}
          className={`btn w-full flex items-center justify-center gap-2 cursor-pointer transition-all bg-[#02ad02] ${
            swaping || approving
              ? "opacity-40 overflow-hidden cursor-pointer"
              : "hover:bg-[#187c18] active:bg-[#082908]"
          } ${
            approveBalance > 40000 &&
            (Number(dummyData) <= 0 || !dummyData || Number(dummyData) < 40000)
              ? "opacity-40 overflow-hidden cursor-pointer"
              : "hover:bg-[#187c18] active:bg-[#082908]"
          } ${
            Number(dummyData) > Number(tokenBalance)
              ? "opacity-40 overflow-hidden cursor-pointer"
              : "hover:bg-[#187c18] active:bg-[#082908]"
          }   text-white px-6 h-[52px] rounded-xl text-base font-semibold`}
          aria-expanded="false"
          data-headlessui-state=""
          disabled={swaping || approving}
          type="button"
          id="headlessui-popover-button-:r1e:"
        >
          {swaping || approving ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="m-0 bg-transparent block antialiased"
              width="38px"
              height="38px"
              viewBox="0 0 100 100"
              preserveAspectRatio="xMidYMid"
              style={{ shapeRendering: "auto" }}
            >
              <circle
                cx="50"
                cy="50"
                r="0"
                fill="none"
                stroke="#300313"
                strokeWidth="2"
              >
                <animate
                  attributeName="r"
                  repeatCount="indefinite"
                  dur="1s"
                  values="0;51"
                  keyTimes="0;1"
                  keySplines="0 0.2 0.8 1"
                  calcMode="spline"
                  begin="0s"
                ></animate>
                <animate
                  attributeName="opacity"
                  repeatCount="indefinite"
                  dur="1s"
                  values="1;0"
                  keyTimes="0;1"
                  keySplines="0.2 0 0.8 1"
                  calcMode="spline"
                  begin="0s"
                ></animate>
              </circle>
              <circle
                cx="50"
                cy="50"
                r="0"
                fill="none"
                stroke="#46dff0"
                strokeWidth="2"
              >
                <animate
                  attributeName="r"
                  repeatCount="indefinite"
                  dur="1s"
                  values="0;51"
                  keyTimes="0;1"
                  keySplines="0 0.2 0.8 1"
                  calcMode="spline"
                  begin="-0.5s"
                ></animate>
                <animate
                  attributeName="opacity"
                  repeatCount="indefinite"
                  dur="1s"
                  values="1;0"
                  keyTimes="0;1"
                  keySplines="0.2 0 0.8 1"
                  calcMode="spline"
                  begin="-0.5s"
                ></animate>
              </circle>
            </svg>
          ) : (
            ""
          )}
          <span className="hidden md:block">{buttonText}</span>
          <span className="block md:hidden">{buttonText}</span>
        </button>
      </div>
    </div>
  );
}

export default SwapButton;
