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
import {
  tokens,
  bscContractAddress,
  coreContractAddress,
} from "@/config/constants/addresses";
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

interface AppState {
  tokenbalance: string;
}

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
  const [tokenAddress, setTokenAddress] = useState("");
  const [tokenSpender, settokenSpender] = useState("");
  const [userAddress, setUserAddress] = useState<`0x${string}` | string>("");
  const [tokenBalance, setTokenBalance] = useState("");
  const account = getAccount();
  const [dummyData, setDummyData] = useState("");
  const tokenbalance = useSelector((state: AppState) => state.tokenbalance);

  useEffect(() => {
    setDummyData(Object.values(tokenbalance)[2]);
  }, [tokenbalance]);

  useEffect(() => {
    if (chain?.id == 56) {
      const tokenBalanceFrom = Object.values(tokenbalance)[1];
      setTokenBalance(tokenBalanceFrom);
    } else if (chain?.id == 1116) {
      const tokenBalanceFrom = Object.values(tokenbalance)[0];
      setTokenBalance(tokenBalanceFrom);
    }
  }, [chain?.id, tokenbalance]);
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
    adapterParams: string;
    gassData: {};
  };

  type SwapArgsCore = {
    token: string;
    amountLD: BigNumber;
    to: string;
    callParams: {};
    adapterParams: string;
    gassData: {};
  };
  async function checkApproveBalance() {
    if (chain?.id === 56) {
      setTokenAddress(tokens.IGNORE.bsc);
      settokenSpender(bscContractAddress);
    } else if (chain?.id === 1116) {
      setTokenAddress(tokens.IGNORE.core);
      settokenSpender(coreContractAddress);
    }
    const tokenContractAddress = tokenAddress; // Replace with the actual token contract address
    const spender = tokenSpender; // Replace with the spender's address
    // console.log({ tokenContractAddress, spender, userAddress, TokenABI });

    if (tokenContractAddress && spender && userAddress && chain?.id) {
      try {
        const approveBalance = await checkApprovedBalance(
          tokenContractAddress,
          spender,
          userAddress,
          TokenABI,
          Number(chain?.id)
        );
        setapproveBalance(Number(approveBalance) / 10 ** 18);
        // console.log(`approve balance ${Number(approveBalance) / 10 ** 18}`);
      } catch (error) {
        // console.log(error);
      }
    } else {
      // console.log("loading data .....");
    }
  }

  async function approveTokens() {
    if (chain?.id === 56) {
      setTokenAddress(tokens.IGNORE.bsc);
      settokenSpender(bscContractAddress);
    } else if (chain?.id === 1116) {
      setTokenAddress(tokens.IGNORE.core);
      settokenSpender(coreContractAddress);
    }
    const tokenContractAddress = tokenAddress; // Replace with the actual token contract address
    const spender = tokenSpender; // Replace with the spender's address
    const amount = ethers.utils.parseUnits(
      "115792089237316195423570985008687907853269984665640564039457.584007913129639935",
      18
    ); // Replace with the desired approval amount
    const signer_from = signer; // Replace with a valid signer object, e.g. ethers.Wallet or ethers.providers.JsonRpcSigner

    try {
      setApproving(true);
      // console.log(tokenAddress);

      const approvalResult: ApprovalResult = await approve(
        tokenContractAddress,
        spender,
        TokenABI,
        amount,
        signer_from
      );

      // console.log(`Transaction hash: ${approvalResult.txHash}`);
      // console.log(`Transaction status: ${approvalResult.status}`);
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
      if (chain?.id === 56) {
        setTokenAddress(tokens.IGNORE.bsc);
        settokenSpender(bscContractAddress);
      } else if (chain?.id === 1116) {
        setTokenAddress(tokens.IGNORE.core);
        settokenSpender(coreContractAddress);
      }
      const tokenContractAddress = tokenAddress; // Replace with the actual token contract address
      const spender = tokenSpender; // Replace with the spender's address

      if (tokenContractAddress && spender && userAddress && chain?.id) {
        try {
          const approveBalance = await checkApprovedBalance(
            tokenContractAddress,
            spender,
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
  }, [chain?.id, tokenAddress, tokenSpender, userAddress]);

  const [args, setArgs] = useState({} as SwapArgs);
  const [argsCore, setArgsCore] = useState({} as SwapArgsCore);
  const [contractAddressSwap, setContractAddressSwap] =
    useState<`0x${string}`>();
  const [tokenAddressSwap, setTokenAddressSwap] = useState("");
  const toAddress = address;
  const adapterParams = ethers.utils.solidityPack(
    ["uint16", "uint256"],
    [1, 900000]
  );
  const [swaping, setSwaping] = useState(false);

  useEffect(() => {
    const callParams = {
      refundAddress: address,
      zroPaymentAddress: "0x0000000000000000000000000000000000000000",
    };

    const decimals = 18;
    if (dummyData) {
      const numberEntered = ethers.utils.parseUnits(dummyData, decimals);
      console.log(`entered ${numberEntered}`);

      if (tokenAddressSwap && toAddress) {
        if (chain?.id == 56) {
          setArgs({
            localToken: tokenAddressSwap,
            remoteChainId: 153,
            amountLD: BigNumber.from(numberEntered),
            to: toAddress,
            unwrapWeth: true,
            callParams: callParams,
            adapterParams: adapterParams,
            gassData: {
              gasLimit: 900000,
              value: ethers.utils.parseEther("0.003"),
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
              gasLimit: 900000,
              value: ethers.utils.parseEther("3"),
            },
          });
        }
      }
    }
  }, [tokenAddressSwap, address, toAddress, chain?.id, dummyData]);

  const HanddleFunctions = () => {
    if (chain?.id === 56 || chain?.id === 1116) {
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
      switchNetwork?.(56);
    }
  };
  const [buttonText, setButtonText] = useState("");

  useEffect(() => {
    if (chain?.id === 56 || chain?.id === 1116) {
      if (approveBalance >= 40000) {
        if (
          Number(dummyData) <= 0 ||
          !dummyData ||
          Number(dummyData) > Number(tokenBalance)
        ) {
          if (Number(dummyData) > Number(tokenBalance)) {
            setButtonText("Enter Correct Amount");
            // if (Number(dummyData) < 40000) {
            //   // console.log(Number(dummyData));
            //   setButtonText("Minimum bridge amount is 40000 4TOKEN ");
            // } else {
            //   // console.log(Number(dummyData));
            //   setButtonText("Enter Correct Amount");
            // }
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
  const [prepareContract, setPrepareContract] = useState("");
  const [contractABI, setContractABI] = useState<Array<any>>([]);
  // console.log(`contract ${tokenSpender}`);
  useEffect(() => {
    function getContract() {
      if (chain?.id === 56) {
        setPrepareContract(tokens.IGNORE.bsc);
        setContractABI((prevState) => [...prevState, ...bscbridgeABI]);
      } else if (chain?.id === 1116) {
        setPrepareContract(tokens.IGNORE.core);
        setContractABI((prevState) => [...prevState, ...bridgeABI]);
      }
    }
    getContract();
  }, [chain?.id]);

  const { config, error } = usePrepareContractWrite({
    address: contractAddressSwap,
    abi: contractABI,
    functionName: "bridge",
    args: Object.values(
      chain?.id === 1116 ? argsCore : chain?.id === 56 ? args : ""
    ),
  });
  // useEffect(() => {
  //   if (swaping && error) {
  //     // console.log(error);

  //     const theme = document.documentElement.classList.contains("dark")
  //       ? "dark"
  //       : "default";
  //     if (theme === "default") {
  //       toast.error("Failed to send tokens: ", {
  //         theme: "light",
  //       });
  //     } else {
  //       // console.log("dark");
  //       toast.error("Failed to send tokens: ", {
  //         theme: "dark",
  //       });
  //     }
  //     setSwaping(false);
  //   }
  // }, [error, swaping]);
  // // console.log(error);

  const { data, isLoading, isSuccess, write } = useContractWrite({
    ...config,
    onError(error) {
      // console.log("Error", error);
      // // console.log("swaping error ");

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

      if (chain?.id == 56) {
        const from = "BSC";
        const to = "CORE";
        const newTransaction = {
          to: to,
          from: from,
          tx: hash,
          time: moment().format("DD-MM-YYYY hh:mm:ss"),
        };

        // const exists = transactions.some(
        //   (transaction) => transaction.tx === newTransaction.tx
        // );

        const txExists = transactions.filter(
          (transaction) => transaction.tx === newTransaction.tx
        );

        if (txExists.length > 0) {
          // console.log("Transaction already exists!");
        } else {
          transactions.push(newTransaction);
          localStorage.setItem("transactions", JSON.stringify(transactions));
        }
      } else if (chain?.id == 1116) {
        // console.log("core to bsc");
        const from = "CORE";
        const to = "BSC";
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
  }
  useEffect(() => {
    if (chain?.id === 56) {
      setTokenAddressSwap(tokens.IGNORE.bsc);
      setContractAddressSwap(bscContractAddress);
    } else if (chain?.id === 1116) {
      setTokenAddressSwap(tokens.IGNORE.core);
      setContractAddressSwap(coreContractAddress);
    }
  }, [chain?.id]);

  async function Swap() {
    if (tokenAddressSwap && toAddress) {
      write?.();
      setSwaping(true);
    } else {
      // nothing
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
