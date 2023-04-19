import { useEffect, useState } from "react";
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
  WriteFunction,
} from "../utils/callFunctions";
import TokenABI from "@/config/abi/bscUSDT.json";
import bridgeABI from "@/config/abi/bridgeABI.json";
import {
  tokens,
  bscContractAddress,
  coreContractAddress,
} from "@/config/constants/addresses";
import { ethers, BigNumber } from "ethers";
import { getAccount } from "@wagmi/core";

function SwapButton() {
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
  const account = getAccount();

  useEffect(() => {
    if (account && account.address) {
      const erc20Address = ethers.utils.getAddress(account.address);
      setUserAddress(erc20Address);
    }
  }, [account]);
  type SwapArgs = {
    token: string;
    amountLD: BigNumber;
    to: string;
    callParams: {};
    adapterParams: "0x";
    gassData: {};
  };

  async function approveTokens() {
    if (chain?.id === 56) {
      setTokenAddress(tokens.USDT.bsc);
      settokenSpender(bscContractAddress);
    } else if (chain?.id === 1116) {
      setTokenAddress(tokens.USDT.core);
      settokenSpender(coreContractAddress);
    }
    const tokenContractAddress = tokenAddress; // Replace with the actual token contract address
    const spender = tokenSpender; // Replace with the spender's address
    const amount = ethers.utils.parseUnits("100", 18); // Replace with the desired approval amount
    const signer_from = signer; // Replace with a valid signer object, e.g. ethers.Wallet or ethers.providers.JsonRpcSigner

    try {
      setApproving(true);
      console.log(tokenAddress);

      const approvalResult: ApprovalResult = await approve(
        tokenContractAddress,
        spender,
        TokenABI,
        amount,
        signer_from
      );

      console.log(`Transaction hash: ${approvalResult.txHash}`);
      console.log(`Transaction status: ${approvalResult.status}`);
      if (approvalResult.status == "mined") {
        setApproving(false);
      }

      await toast.promise(Promise.resolve(), {
        pending: "Approving tokens...",
        success: "Tokens approved successfully 👌",
        error: "Failed to approve tokens",
      });
    } catch (error) {
      const theme = document.documentElement.classList.contains("dark")
        ? "dark"
        : "default";
      if (theme === "default") {
        console.log("light");

        toast.error("Failed to approve tokens: " + error, {
          theme: "light",
        });
      } else {
        console.log("dark");
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
        setTokenAddress(tokens.USDT.bsc);
        settokenSpender(bscContractAddress);
      } else if (chain?.id === 1116) {
        setTokenAddress(tokens.USDT.core);
        settokenSpender(coreContractAddress);
      }
      const tokenContractAddress = tokenAddress; // Replace with the actual token contract address
      const spender = tokenSpender; // Replace with the spender's address

      if (tokenContractAddress && spender && userAddress && chain) {
        const approveBalance = await checkApprovedBalance(
          tokenContractAddress,
          spender,
          userAddress,
          TokenABI,
          Number(chain?.id)
        );
        setapproveBalance(Number(approveBalance));
        console.log(Number(approveBalance));
      } else {
        console.log("loading data .....");
      }
    }
    checkApproveBalance();
  }, [chain, tokenAddress, tokenSpender, userAddress]);

  const [args, setArgs] = useState({} as SwapArgs);
  const [contractAddressSwap, setContractAddressSwap] = useState("");
  const [tokenAddressSwap, setTokenAddressSwap] = useState("");
  const toAddress = address;

  const adapterParams = "0x";
  useEffect(() => {
    const callParams = {
      refundAddress: address,
      zroPaymentAddress: "0x0000000000000000000000000000000000000000",
    };
    if (tokenAddressSwap && toAddress) {
      setArgs({
        token: tokenAddressSwap,
        amountLD: BigNumber.from("10000"),
        to: toAddress,
        callParams: callParams,
        adapterParams: adapterParams,
        gassData: {
          gasLimit: 2200000,
          value: ethers.utils.parseEther("0.001"),
        },
      });
    }
  }, [tokenAddressSwap]);
  console.log(args);
  const { config, error } = usePrepareContractWrite({
    address: "0xf953f9FfA5c1f9F55fD8408C24D23850F1a35213",
    abi: bridgeABI,
    functionName: "bridge",
    args: Object.values(args),
  });
  const { data, isLoading, isSuccess, write } = useContractWrite({
    ...config,
    onError(error) {
      console.log("Error", error);
      const theme = document.documentElement.classList.contains("dark")
        ? "dark"
        : "default";
      if (theme === "default") {
        toast.error("Failed to approve tokens: " + error, {
          theme: "light",
        });
      } else {
        console.log("dark");
        toast.error("Failed to approve tokens: " + error, {
          theme: "dark",
        });
      }
      setSwaping(false);
    },
    onSuccess(data) {
      console.log("Success", data);
      setSwaping(false);
      toast.success("Transactin successfully send 👌");
    },
  });
  const [swaping, setSwaping] = useState(false);
  async function Swap() {
    if (chain?.id === 56) {
      setTokenAddressSwap(tokens.USDT.bsc);
      setContractAddressSwap(bscContractAddress);
    } else if (chain?.id === 1116) {
      setTokenAddressSwap(tokens.USDT.core);
      setContractAddressSwap(coreContractAddress);
    }
    setSwaping(true);
    write?.();
  }

  const HanddleFunctions = () => {
    if (chain?.id === 56 || chain?.id === 1116) {
      if (isConnected) {
        if (approveBalance > 0) {
          if (swaping) {
            return;
          } else {
            Swap();
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
      if (approveBalance > 0) {
        setButtonText("Swap");
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
  }, [approving, chain, isConnected, approveBalance]);
  return (
    <div className="pt-4">
      <div className="relative w-full" data-headlessui-state="">
        <button
          onClick={() => HanddleFunctions()}
          className={`btn w-full flex items-center justify-center gap-2 cursor-pointer transition-all bg-[#02ad02] ${
            swaping || approving
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
