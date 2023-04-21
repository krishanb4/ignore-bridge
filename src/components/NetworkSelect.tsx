import Image from "next/image";
import { useEffect, useState } from "react";
import { useNetwork, useSwitchNetwork } from "wagmi";
function NetworkSelect() {
  const { switchNetwork } = useSwitchNetwork();
  const { chain } = useNetwork();

  const [chainDetails, setChainDetails] = useState([
    {
      id: 1116,
      symbol: "core",
      name: "Core Chain",
    },
    {
      id: 56,
      symbol: "bsc",
      name: "BSC Chain",
    },
  ]);
  const [switchNetworkId, setSwitchNetworkId] = useState(56);
  useEffect(() => {
    if (chain) {
      setChainDetails(
        chain.id == 56
          ? [
              {
                id: 56,
                symbol: "bsc",
                name: "BSC Chain",
              },
              {
                id: 1116,
                symbol: "core",
                name: "Core Chain",
              },
            ]
          : [
              {
                id: 1116,
                symbol: "core",
                name: "Core Chain",
              },
              {
                id: 56,
                symbol: "bsc",
                name: "BSC Chain",
              },
            ]
      );

      setSwitchNetworkId(chain.id == 56 ? 1116 : 56);
    }
  }, [chain]);
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl mb-4 dark:text-white">
      <div className="flex flex-col border-[2px] border-[#02ad02] bg-gradient-to-r from-blue/[0.15] to-pink/[0.15] hover:from-blue/20 hover:to-pink/20 saturate-[2] dark:saturate-[1] px-4 py-3 rounded-xl">
        <div className="flex gap-3 items-center">
          <svg
            strokeWidth="1"
            width="24"
            height="24"
            className="text-blue"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 256 256"
          >
            <rect width="256" height="256" fill="none"></rect>
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="24"
              d="M32,72H55.06445a64,64,0,0,1,52.079,26.80076l41.7132,58.39848A64,64,0,0,0,200.93555,184H232"
            ></path>
            <polyline
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="24"
              points="208 48 232 72 208 96"
            ></polyline>
            <polyline
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="24"
              points="208 160 232 184 208 208"
            ></polyline>
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="24"
              d="M152.76794 93.858A64.00219 64.00219 0 0 1 200.93555 72H232M32 184H55.06445a64.00212 64.00212 0 0 0 48.16769-21.85814"
            ></path>
          </svg>
          <div className="flex flex-col">
            <h1 className="flex gap-1.5 items-center font-semibold text-gray-900 dark:text-slate-50">
              <span className="flex gap-1.5 items-center bg-gradient-to-r from-blue to-pink text-[#0cb34d] bg-clip-text">
                Cross Chain
              </span>
              <div className="flex justify-center" data-headlessui-state="">
                <button
                  id="headlessui-menu-button-:r1c:"
                  type="button"
                  aria-haspopup="menu"
                  aria-expanded="false"
                  data-headlessui-state=""
                >
                  {/* <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    width="16"
                    height="16"
                    className="text-gray-400 dark:text-slate-500"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                      clipRule="evenodd"
                    ></path>
                  </svg> */}
                </button>
              </div>
            </h1>
            <span className="font-medium text-sm text-gray-700 dark:text-slate-400">
              Swap tokens from one network to another.
            </span>
          </div>
        </div>
        <div className="pt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={() => switchNetwork?.(switchNetworkId)}
                type="button"
                className="z-10 group hover:bg-white/30 hover:dark:bg-white/[0.16] p-2 border-white transition-all rounded-full cursor-pointer"
              >
                <div className="transition-transform rotate-0 group-hover:rotate-180">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="3"
                    stroke="currentColor"
                    aria-hidden="true"
                    className="w-4 h-4 text-blue"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    ></path>
                  </svg>
                </div>
              </button>
            </div>
            <div className="grid grid-cols-2 gap-[60px] border-gray-200 dark:border-slate-800">
              <div className="z-10">
                <div data-headlessui-state="">
                  <button
                    className="transition-[background] bg-[#daffda] dark:bg-white/[0.08] hover:bg-[#8af48a] hover:dark:bg-white/[0.16] pl-2 pr-3 font-medium flex flex-col rounded-xl py-1.5 w-full"
                    type="button"
                    aria-expanded="false"
                    data-headlessui-state=""
                    id="headlessui-popover-button-:r12:"
                  >
                    <span className="flex gap-1 items-center font-medium px-1 text-xs text-gray-500 dark:text-slate-400 pt-0.5">
                      From
                    </span>
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-1 overflow-hidden">
                        <Image
                          src={`/images/${chainDetails[0].symbol}.png`}
                          alt=""
                          width="20"
                          height="20"
                        />

                        <span className="w-full text-left truncate">
                          {chainDetails[0].name}
                        </span>
                      </div>
                      <div className="min-w-4 min-h-4">
                        {/* <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="3"
                          stroke="currentColor"
                          aria-hidden="true"
                          width="16"
                          height="16"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                          ></path>
                        </svg> */}
                      </div>
                    </div>
                  </button>
                </div>
              </div>
              <div className="z-10">
                <div data-headlessui-state="">
                  <button
                    className="transition-[background] bg-[#daffda] dark:bg-white/[0.08] hover:bg-[#8af48a] hover:dark:bg-white/[0.16] pl-2 pr-3 font-medium flex flex-col rounded-xl py-1.5 w-full"
                    type="button"
                    aria-expanded="false"
                    data-headlessui-state=""
                    id="headlessui-popover-button-:r14:"
                  >
                    <span className="flex gap-1 items-center font-medium px-1 text-xs text-gray-500 dark:text-slate-400 pt-0.5">
                      To
                    </span>
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center justify-start gap-1 overflow-hidden">
                        <Image
                          src={`/images/${chainDetails[1].symbol}.png`}
                          alt=""
                          width="20"
                          height="20"
                        />

                        <span className="w-full text-left truncate">
                          {chainDetails[1].name}
                        </span>
                      </div>
                      <div className="min-w-4 min-h-4">
                        {/* <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="3"
                          stroke="currentColor"
                          aria-hidden="true"
                          width="16"
                          height="16"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                          ></path>
                        </svg> */}
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NetworkSelect;
