import Image from "next/image";
import Link from "next/link";
import MainNetwork from "@/components/MainNetwork";
import { useState, useEffect, useRef } from "react";
import MobileNetworks from "./MobileNetworks";
import { Web3Button } from "@web3modal/react";
import { useNetwork, useSwitchNetwork } from "wagmi";
import Transactions from "./Transactions";

const Header: React.FC = () => {
  const [isModelopen, openModel] = useState(false);
  const componentRef = useRef<HTMLDivElement>(null);
  const [isNetworkListOpen, openNetworkList] = useState(false);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        componentRef.current &&
        !componentRef.current.contains(event.target as Node)
      ) {
        openModel(false); // Update state to indicate mouse click on empty space
        openNetworkList(false);
      }
    };

    document.addEventListener("click", handleClickOutside); // Add event listener to document

    return () => {
      document.removeEventListener("click", handleClickOutside); // Remove event listener on component unmount
    };
  }, [isNetworkListOpen, isModelopen]);
  const { chain } = useNetwork();
  const [currentNetwork, setCurrentNetwork] = useState("");
  const [currentNetworkImage, setCurrentNetworkImage] = useState("");
  const { chains, error, isLoading, pendingChainId, switchNetwork } =
    useSwitchNetwork();
  useEffect(() => {
    if (chain?.id === 1) {
      setCurrentNetwork("Ethereum");
      setCurrentNetworkImage("eth");
    } else if (chain?.id === 56) {
      setCurrentNetwork("BSC Chain");
      setCurrentNetworkImage("bsc");
    } else if (chain?.id === 1116) {
      setCurrentNetwork("Core Chain");
      setCurrentNetworkImage("core");
    } else if (chain?.id === 8453) {
      setCurrentNetwork("Base Chain");
      setCurrentNetworkImage("base");
    } else {
      setCurrentNetworkImage("error");
      setCurrentNetwork("");
    }
    // console.log(error);
  }, [chain, error]);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <header
        ref={componentRef}
        className="lg:border-transparent text-black dark:text-white bg-gray-100 dark:bg-slate-900 border-gray-300/70 dark:border-slate-200/5 border-b sticky flex items-center top-0 z-[1] transition-all h-[56px]"
      >
        <div className="mx-auto flex items-center max-w-full w-full h-[56px]">
          <div className="grid grid-cols-2 items-center w-full mx-auto z-[101] px-4">
            <div className="flex items-center sm:gap-1">
              <Link
                className="flex flex-row items-center sm:pl-2 sm:pr-6"
                href="/"
              >
                <div className="block md:hidden w-7 h-7 sm:w-[115px] sm:h-[37px]">
                  <Image
                    src="/images/4logo.png"
                    alt=""
                    width={800}
                    height={800}
                  />
                </div>
                <div className="hidden md:block w-7 h-7 sm:w-[115px] sm:h-[37px]">
                  <Image
                    src="/images/logo_name.png"
                    alt=""
                    width={800}
                    height={800}
                  />
                </div>
              </Link>
              <div className="relative hidden md:flex" data-headlessui-state="">
                <button
                  onClick={() => setShowModal(true)}
                  className="btn flex items-center justify-center gap-2 cursor-pointer transition-all hover:bg-white hover:dark:bg-slate-600/20 active:dark:bg-slate-600/30 text-gray-700 hover:text-gray-800 active:text-gray-900 dark:text-slate-200 hover:dark:text-slate-100 active:dark:text-slate-50 px-4 h-[38px] rounded-xl text-base font-semibold"
                  type="button"
                >
                  Transactions
                </button>
              </div>
              <div
                className="hidden md:flex justify-center gap-2 relative h-[38px]"
                ref={componentRef}
              >
                <button
                  aria-expanded="true"
                  aria-haspopup="true"
                  type="button"
                  onClick={() => openModel(!isModelopen)}
                >
                  <span className="btn flex items-center justify-center gap-2 cursor-pointer transition-all hover:bg-white hover:dark:bg-slate-600/20 active:dark:bg-slate-600/30 text-gray-700 hover:text-gray-800 active:text-gray-900 dark:text-slate-200 hover:dark:text-slate-100 active:dark:text-slate-50 px-4 h-[38px] rounded-xl text-base font-semibold">
                    Buy 4TOKEN
                  </span>
                </button>

                {isModelopen && (
                  <div
                    className="absolute top-10 right-0 z-10 mt-2 w-56 dark:text-white origin-top-right rounded-md bg-white dark:bg-[#0f172a] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    tabIndex={-1}
                  >
                    <div className="py-1" role="none">
                      <a
                        href="https://pancakeswap.finance/swap"
                        className="text-gray-700 block px-4 py-2 text-sm dark:text-white hover:bg-[#bec9d2]"
                        role="menuitem"
                        tabIndex={-1}
                        id="menu-item-0"
                        target="_blank"
                      >
                        Buy on PancakeSwap
                      </a>
                      <a
                        href="https://exchange.archerswap.finance/swap"
                        className="text-gray-700 block px-4 py-2 text-sm dark:text-white hover:bg-[#bec9d2]"
                        role="menuitem"
                        tabIndex={-1}
                        id="menu-item-1"
                        target="_blank"
                      >
                        Buy on ArcherSwap
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center justify-end gap-2">
              <div className="flex gap-2 transform scale-100 opacity-100">
                <div
                  data-headlessui-state=""
                  ref={componentRef}
                  className="w-[62px] sm:w-auto md:w-auto"
                >
                  <button
                    className="btn  flex items-center justify-center gap-2 cursor-pointer transition-all bg-white dark:text-white dark:bg-slate-600/10 hover:dark:bg-slate-600/20 active:dark:bg-slate-600/30 px-4 h-[38px] rounded-xl text-base font-semibold !"
                    aria-expanded="false"
                    data-headlessui-state=""
                    type="button"
                    id="headlessui-popover-button-:r1m:"
                    onClick={() => openNetworkList(!isNetworkListOpen)}
                  >
                    <Image
                      src={`/images/${currentNetworkImage}.png`}
                      alt=""
                      className="max-w-auto"
                      width={30}
                      height={30}
                    />

                    <div className="hidden xl:block">{currentNetwork}</div>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                      width="24"
                      height="24"
                      className="transition-all rotate-0 hidden sm:block"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                  {isNetworkListOpen ? <MainNetwork /> : ""}
                </div>
                <div data-headlessui-state="">
                  <Web3Button />
                  {/* <button
                    onClick={() => connect()}
                    className="btn  flex items-center justify-center gap-2 cursor-pointer transition-all dark:text-white bg-white dark:bg-slate-600/10 hover:dark:bg-slate-600/20 active:dark:bg-slate-600/30 px-4 h-[38px] rounded-xl text-base font-semibold !"
                    aria-expanded="false"
                    data-headlessui-state=""
                    type="button"
                    id="headlessui-popover-button-:r1i:"
                  >
                    <span className="hidden md:block">Connect Wallet</span>
                    <span className="block md:hidden">Connect</span>
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        {showModal ? (
          <Transactions showModal={showModal} setShowModal={setShowModal} />
        ) : null}
      </header>

      {isNetworkListOpen ? <MobileNetworks /> : ""}
    </>
  );
};

export default Header;
