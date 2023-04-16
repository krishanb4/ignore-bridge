import Image from "next/image";
function NetworkSelect() {
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
                  <svg
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
                  </svg>
                </button>
              </div>
            </h1>
            <span className="font-medium text-sm text-gray-700 dark:text-slate-400">
              Swap tokens from one network to another.
            </span>
          </div>
          {/* <div className="flex justify-end flex-grow">
            <button
              className="bg-blue items-center relative inline-flex flex-shrink-0 rounded-full cursor-pointer ease-in-out duration-200 h-[30px] w-[48px]"
              id="headlessui-switch-:r11:"
              role="switch"
              type="button"
              tabIndex={0}
              aria-checked="true"
              data-headlessui-state="checked"
            >
              <span
                id=""
                className="translate-x-[20px] bg-white transition-transform pointer-events-none p-1 rounded-full ease-in-out duration-200 inline-flex items-center justify-center h-[26px] w-[26px]"
              ></span>
            </button>
          </div> */}
        </div>
        <div className="pt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <button
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
                          src="/images/core.png"
                          alt=""
                          width="20"
                          height="20"
                        />
                        {/* <svg
                          viewBox="0 0 128 128"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          width="32"
                          height="32"
                          className="dark:text-white text-gray-700"
                        >
                          <path
                            d="M63.993 24v29.573l24.99 11.169L63.993 24Z"
                            fill="currentColor"
                            fillOpacity="0.602"
                          ></path>
                          <path
                            d="M63.993 24 39 64.742l24.993-11.17V24Z"
                            fill="currentColor"
                          ></path>
                          <path
                            d="M63.993 83.906V104L89 69.396l-25.007 14.51Z"
                            fill="currentColor"
                            fillOpacity="0.602"
                          ></path>
                          <path
                            d="M63.993 104V83.902L39 69.396 63.993 104Z"
                            fill="currentColor"
                          ></path>
                          <path
                            d="m63.993 79.255 24.99-14.513-24.99-11.162v25.675Z"
                            fill="currentColor"
                            fillOpacity="0.2"
                          ></path>
                          <path
                            d="m39 64.742 24.993 14.513V53.58L39 64.742Z"
                            fill="currentColor"
                            fillOpacity="0.602"
                          ></path>
                        </svg> */}
                        <span className="w-full text-left truncate">
                          Core Chain
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
                    id="headlessui-popover-button-:r14:"
                  >
                    <span className="flex gap-1 items-center font-medium px-1 text-xs text-gray-500 dark:text-slate-400 pt-0.5">
                      To
                    </span>
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center justify-start gap-1 overflow-hidden">
                        <Image
                          src="/images/bsc.png"
                          alt=""
                          width="20"
                          height="20"
                        />
                        {/* <svg
                          viewBox="0 0 128 128"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          width="32"
                          height="32"
                        >
                          <path
                            d="m74.58 60.53 6.657-11.295 17.941 27.944.009 5.362-.059-36.903a2.778 2.778 0 0 0-1.285-2.215L65.54 24.844a2.847 2.847 0 0 0-2.468.012c-.1.05-.196.106-.29.167l-.112.071-31.354 18.17-.122.054a2.77 2.77 0 0 0-1.62 2.36l.049 30.073 16.712-25.902c2.104-3.435 6.688-4.541 10.943-4.481l4.994.129-29.428 47.195 3.469 1.997 29.782-49.145 13.163-.048L49.554 95.88l12.38 7.125 1.48.851a2.846 2.846 0 0 0 1.994.039l32.755-18.982-6.266 3.629L74.58 60.529Zm2.54 36.576L64.618 77.484l7.631-12.95 16.42 25.88-11.549 6.692Z"
                            fill="#2D374B"
                          ></path>
                          <path
                            d="M64.618 77.484 77.12 97.106l11.55-6.693-16.42-25.88-7.632 12.95ZM99.189 82.541l-.009-5.36L81.24 49.235l-6.66 11.293 17.32 28.011 6.265-3.629a2.777 2.777 0 0 0 1.025-2.02v-.35Z"
                            fill="#28A0F0"
                          ></path>
                          <path
                            d="m24.003 87.599 8.844 5.096L62.275 45.5l-4.994-.129c-4.255-.06-8.84 1.046-10.943 4.48L29.626 75.755l-5.62 8.638v3.21l-.003-.003ZM79.26 45.5l-13.163.047-29.781 49.145 10.41 5.994 2.83-4.802L79.26 45.5Z"
                            fill="#fff"
                          ></path>
                          <path
                            d="M104.734 45.432a8.39 8.39 0 0 0-3.936-6.74l-32.725-18.82a8.512 8.512 0 0 0-7.508 0c-.273.138-31.824 18.437-31.824 18.437-.438.21-.857.459-1.253.741A8.32 8.32 0 0 0 24 45.416V84.39l5.62-8.638-.044-30.071a2.792 2.792 0 0 1 1.157-2.09c.149-.107 32.238-18.681 32.34-18.732a2.847 2.847 0 0 1 2.468-.012l32.302 18.58a2.778 2.778 0 0 1 1.285 2.215v37.252a2.712 2.712 0 0 1-.966 2.021l-6.265 3.629-3.23 1.873-11.55 6.693-11.712 6.788a2.835 2.835 0 0 1-1.994-.039l-13.857-7.97-2.83 4.8 12.453 7.17c.412.234.779.442 1.08.611.466.259.784.436.896.491a8.104 8.104 0 0 0 3.306.68 8.326 8.326 0 0 0 3.049-.574l34.019-19.7a8.317 8.317 0 0 0 3.205-6.266l.002-37.67Z"
                            fill="#96BEDC"
                          ></path>
                        </svg> */}
                        <span className="w-full text-left truncate">
                          BSC Chain
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
  );
}

export default NetworkSelect;
