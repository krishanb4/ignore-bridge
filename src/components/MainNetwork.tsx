import Image from "next/image";

function MainNetwork() {
  return (
    <div className="transform translate-y-0 hidden md:flex">
      <div className="right-0 absolute pt-2 -top-[-1] sm:w-[320px]">
        <div className="p-2 flex flex-col w-full fixed bottom-0 left-0 right-0 sm:absolute sm:bottom-[unset] sm:left-[unset] rounded-2xl rounded-b-none sm:rounded-b-xl shadow-md bg-white dark:bg-slate-800">
          <div
            tabIndex={-1}
            data-headlessui-state="open"
            id="headlessui-popover-panel-:r1g:"
          >
            {/* <div className=" dark:!bg-slate-700 !focus-within:bg-gray-200 relative pr-10 rounded-xl flex gap-2.5 flex-grow items-center bg-gray-200  px-3 py-2.5 h-[44px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                aria-hidden="true"
                width="24"
                height="24"
                className="text-gray-500 dark:text-slate-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                ></path>
              </svg>
              <input
                id="-address-input"
                testdata-id="-address-input"
                placeholder="Search"
                className="truncate font-semibold w-full bg-transparent !p-0 placeholder:font-medium placeholder:text-gray-400 placeholder:dark:text-slate-500 text-gray-900 dark:text-slate-200 border-none focus:outline-none focus:ring-0"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
                autoComplete="off"
                value=""
              />
            </div> */}
            {/* <div className="h-px w-full bg-gray-100 dark:bg-slate-200/5 mt-2"></div> */}
            <div className="pt-2 max-h-[300px] scroll">
              <button className="w-full group hover:bg-gray-100 hover:dark:bg-slate-700 px-2.5 flex rounded-lg justify-between gap-2 items-center cursor-pointer transform-all h-[40px]">
                <div className="flex items-center gap-2.5">
                  <Image
                    src="/images/core.png"
                    alt="core logo"
                    width="20"
                    height="30"
                  />
                  <p className="font-semibold text-gray-900 text-sm group-hover:text-gray-900 dark:text-slate-300 dark:group-hover:text-slate-50">
                    Core Chain
                  </p>
                </div>
                <div className="w-2 h-2 mr-1 rounded-full bg-green"></div>
              </button>
              <button className="w-full group hover:bg-gray-100 hover:dark:bg-slate-700 px-2.5 flex rounded-lg justify-between gap-2 items-center cursor-pointer transform-all h-[40px]">
                <div className="flex items-center gap-2.5">
                  <Image
                    src="/images/bsc.png"
                    alt="core logo"
                    width="20"
                    height="30"
                  />
                  <p className="font-medium text-gray-500 text-sm group-hover:text-gray-900 dark:text-slate-300 dark:group-hover:text-slate-50">
                    BSC Chain
                  </p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainNetwork;
