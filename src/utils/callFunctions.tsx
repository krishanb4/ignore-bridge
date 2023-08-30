import { ethers, BigNumber } from "ethers";
import { getProvider } from "@wagmi/core";
import { usePrepareContractWrite, useContractWrite } from "wagmi";
import tokeneABI from "@/config/abi/tokenABI.json";
export interface ApprovalResult {
  txHash: string;
  status: "mined" | "failed";
}

export async function approve(
  tokenContractAddress: string,
  spender: string | undefined,
  TokenABI: any,
  amount: ethers.BigNumber,
  signer: any
): Promise<ApprovalResult> {
  try {
    // Create an instance of the ERC20 token contract
    const tokenContract = new ethers.Contract(
      tokenContractAddress,
      TokenABI,
      signer
    );

    const provider = signer.provider;

    // Estimate the gas limit for the approval transaction
    // const gasLimit = await tokenContract.estimateGas.approve(spender, amount);

    const gasPrice = await provider.getGasPrice();

    const value2 = ethers.BigNumber.from("3000000000");

    // const sum = Number(gasPrice) + 3000000000;

    // Build the approval transaction
    // const transaction = await tokenContract.populateTransaction.approve(
    //   spender,
    //   amount,
    //   {
    //     gasLimit: gasLimit,
    //     gasPrice: ethers.BigNumber.from(sum),
    //   }
    // );

    const maxUint256 = ethers.constants.MaxUint256;
    console.log(
      "🚀 ~ file: callFunctions.tsx:47 ~ maxUint256:",
      Number(maxUint256)
    );

    const gasLimit = await tokenContract.estimateGas.approve(
      spender,
      maxUint256
    );

    const gasPriceValue = ethers.BigNumber.from(gasPrice);
    const sum = gasPriceValue.add(ethers.BigNumber.from("3000000000"));

    const transaction = {
      to: tokenContractAddress,
      data: tokenContract.interface.encodeFunctionData("approve", [
        spender,
        maxUint256,
      ]),
      gasLimit: gasLimit,
      gasPrice: sum,
    };

    // Sign and send the approval transaction
    const signedTransaction = await signer.sendTransaction(transaction);
    const transactionReceipt = await signedTransaction.wait();

    return {
      txHash: transactionReceipt.transactionHash,
      status: transactionReceipt.status === 1 ? "mined" : "failed",
    };
  } catch (error) {
    console.error(`Failed to approve tokens: ${error}`);
    throw error;
  }
}

export const checkApprovedBalance = async (
  tokenContractAddress: string,
  spenderAddress: string,
  userAddress: string,
  tokenABI: any,
  chainId: number
) => {
  try {
    const provider = getProvider({
      chainId: chainId,
    });
    // Create token contract instance
    const tokenContract = new ethers.Contract(
      tokenContractAddress,
      tokenABI,
      provider
    );

    // Check approved balance
    const approvedBalance = await tokenContract.allowance(
      userAddress,
      spenderAddress
    );

    // Return approved balance
    return approvedBalance;
  } catch (error) {
    console.error("Failed to check approved balance:", error);
    throw error;
  }
};

type SwapArgs = {
  token: string;
  amountLD: BigNumber;
  to: string;
  callParams: {};
  adapterParams: "0x";
  gassData: {};
};

interface BridgeParams {
  prepareContract: string;
  args: SwapArgs;
}

interface UseBridgeReturnType {
  bridge: any;
  error: any;
}

// export const useBridge = (
//   prepareContract: string,
//   args: SwapArgs
// ): UseBridgeReturnType => {
//   const { config, error } = usePrepareContractWrite({
//     address: ethers.utils.getAddress(prepareContract),
//     abi: bridgeABI,
//     functionName: "bridge",
//     args: Object.values(args),
//   });

//   const bridge = async () => {
//     try {
//       const response = config.mode;
//       // console.log(response);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return { bridge, error };
// };
