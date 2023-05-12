import Image from "next/image";
import { useEffect, useState } from "react";
import { useNetwork, useSwitchNetwork } from "wagmi";
import { Modal, Button } from "flowbite-react";
import { EthLogo, BscLogo, CoreLogo } from "./NetworkLogo";
import { useDispatch } from "react-redux";
import * as types from "@/redux/actionConstants";

function NetworkSelect() {
  const dispatch = useDispatch();
  const { switchNetwork } = useSwitchNetwork();
  const { chain } = useNetwork();
  const [modalOpen, setModalOpen] = useState(false);
  const [secondModalOpen, setSecondModalOpen] = useState(false);
  const NetworkList = [
    {
      id: 1,
      symbol: "eth",
      name: "Ethereum",
      logo: <EthLogo />,
    },
    {
      id: 56,
      symbol: "bsc",
      name: "Binance Smart Chain",
      logo: <BscLogo />,
    },
    {
      id: 1116,
      symbol: "core",
      name: "Core Chain",
      logo: <CoreLogo />,
    },
  ];
  const SecondNetworkList = [
    {
      id: 1,
      symbol: "eth",
      name: "Ethereum",
      logo: <EthLogo />,
    },
    {
      id: 56,
      symbol: "bsc",
      name: "Binance Smart Chain",
      logo: <BscLogo />,
    },
    {
      id: 1116,
      symbol: "core",
      name: "Core Chain",
      logo: <CoreLogo />,
    },
  ];
  const [currentChain, setCurrentChain] = useState({
    id: 1,
    symbol: "eth",
    name: "Ethereum",
    logo: <EthLogo />,
  });
  const [secondChain, setSecondChain] = useState({
    id: 56,
    symbol: "bsc",
    name: "Binance Smart Chain",
    logo: <BscLogo />,
  });
  const [currentNetwork, setCurrentNetwork] = useState(0);
  const [secondtNetwork, setSecondtNetwork] = useState(0);
  useEffect(() => {
    dispatch({
      type: types.UPDATE_CHAINS,
      payload: {
        firstChain: {
          id: currentChain.id,
          name: currentChain.name,
          symbol: currentChain.symbol.toUpperCase(),
        },
        secondChain: {
          id: secondChain.id,
          name: secondChain.name,
          symbol: secondChain.symbol.toUpperCase(),
        },
      },
    });
  }, [secondChain, currentChain, dispatch]);
  useEffect(() => {
    if (chain?.id !== currentChain.id) {
      switchNetwork?.(currentChain.id);
    }
  }, [chain?.id, currentChain.id, switchNetwork]);
  function setChain(id: number, symbol: string, name: string, logo: any) {
    if (secondChain.id === id) {
      return;
    } else {
      setModalOpen(false);
      setCurrentNetwork(id);
      setCurrentChain({
        id: id,
        symbol: symbol,
        name: name,
        logo: logo,
      });
      if (chain?.id == id) {
        return;
      } else {
        switchNetwork?.(id);
      }
    }
  }
  function setSecondChainF(
    id: number,
    symbol: string,
    name: string,
    logo: any
  ) {
    if (currentChain.id === id) {
      return;
    } else {
      setSecondtNetwork(id);
      setSecondModalOpen(false);
      setSecondChain({
        id: id,
        symbol: symbol,
        name: name,
        logo: logo,
      });
    }
  }
  useEffect(() => {
    console.log(currentChain);
  }, [currentChain]);

  function SwitchChains() {
    setSecondtNetwork(currentNetwork);
    setSecondtNetwork(secondtNetwork);
    setSecondChain(currentChain);
    setCurrentChain(secondChain);
  }

  return (
    <>
      <Modal
        dismissible={true}
        show={modalOpen}
        size="md"
        onClose={() => setModalOpen(false)}
      >
        <Modal.Header>Network List</Modal.Header>
        <Modal.Body className="p-6 ">
          <ul className="my-4 space-y-3">
            {NetworkList.map((network, index) => (
              <li
                key={index}
                onClick={() =>
                  setChain(
                    network.id,
                    network.symbol,
                    network.name,
                    network.logo
                  )
                }
              >
                <a
                  href="#"
                  className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
                >
                  {network.logo}
                  <span className="flex-1 ml-3 whitespace-nowrap">
                    {network.name}
                  </span>
                  <span className="inline-flex items-center justify-center px-2 py-0.5 ml-3 text-xs font-medium  dark:bg-gray-700 dark:text-gray-400">
                    {currentNetwork == network.id ||
                    currentChain.id == network.id
                      ? "✅"
                      : ""}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Modal.Body>
      </Modal>
      <Modal
        dismissible={true}
        show={secondModalOpen}
        size="md"
        onClose={() => setSecondModalOpen(false)}
      >
        <Modal.Header>Network List</Modal.Header>
        <Modal.Body className="p-6 ">
          <ul className="my-4 space-y-3">
            {SecondNetworkList.map((network, index) => (
              <li
                key={index}
                onClick={() =>
                  setSecondChainF(
                    network.id,
                    network.symbol,
                    network.name,
                    network.logo
                  )
                }
              >
                <a
                  href="#"
                  className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
                >
                  {network.logo}
                  <span className="flex-1 ml-3 whitespace-nowrap">
                    {network.name}
                  </span>
                  <span className="inline-flex items-center justify-center px-2 py-0.5 ml-3 text-xs font-medium  dark:bg-gray-700 dark:text-gray-400">
                    {secondtNetwork == network.id ||
                    secondChain.id == network.id
                      ? "✅"
                      : ""}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Modal.Body>
      </Modal>
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
                Bridge tokens from {currentChain.name} Network to{" "}
                {secondChain.name} Network
              </span>
            </div>
          </div>
          <div className="pt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={() => SwitchChains()}
                  type="button"
                  className="z-10 group hover:bg-white/30 hover:dark:bg-white/[0.16] p-2 border-white transition-all rounded-full cursor-pointer"
                >
                  <div className="transition-transform rotate-90">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-10 h-10"
                    >
                      <path d="M14 3L14 20L19 14.8629" stroke="currentColor" />
                      <path d="M10 21L10 4L5 9.13712" stroke="currentColor" />
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
                      onClick={() => setModalOpen(true)}
                    >
                      <span className="flex gap-1 items-center font-medium px-1 text-xs text-gray-500 dark:text-slate-400 pt-0.5">
                        From
                      </span>
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-1 overflow-hidden">
                          <Image
                            src={`/images/${currentChain.symbol}.png`}
                            alt=""
                            width="20"
                            height="20"
                          />

                          <span className="w-full text-left truncate">
                            {currentChain.name}
                          </span>
                        </div>
                        <div className="min-w-4 min-h-4">
                          <svg
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
                          </svg>
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
                      onClick={() => setSecondModalOpen(true)}
                    >
                      <span className="flex gap-1 items-center font-medium px-1 text-xs text-gray-500 dark:text-slate-400 pt-0.5">
                        To
                      </span>
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center justify-start gap-1 overflow-hidden">
                          <Image
                            src={`/images/${secondChain.symbol}.png`}
                            alt=""
                            width="20"
                            height="20"
                          />

                          <span className="w-full text-left truncate">
                            {secondChain.name}
                          </span>
                        </div>
                        <div className="min-w-4 min-h-4">
                          <svg
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
                          </svg>
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
    </>
  );
}

export default NetworkSelect;
