function FromData() {
  return (
    <div className="flex flex-row items-center justify-between h-[36px]">
      <p className="font-medium text-lg flex items-baseline select-none text-gray-500 dark:text-slate-400">
        $ 0.<span className="text-sm font-semibold">00</span>
      </p>
      <button
        data-testid="undefined-balance-button"
        type="button"
        className="font-medium flex gap-1.5 items-center py-1 text-blue hover:text-blue-600 active:text-blue-700 dark:text-slate-400 hover:dark:text-slate-300 px-2 rounded-md"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 18 18"
          width="18"
          height="18"
        >
          <path
            fill="currentColor"
            d="M15.6 4.6H1.85v-.55l12.1-.968v.968h1.65V2.4c0-1.21-.98-2.059-2.177-1.888L2.378 2.089C1.18 2.26.2 3.39.2 4.6v11a2.2 2.2 0 002.2 2.2h13.2a2.2 2.2 0 002.2-2.2V6.8a2.2 2.2 0 00-2.2-2.2zm-1.65 7.707a1.65 1.65 0 01-.63-3.176 1.65 1.65 0 11.63 3.176z"
          ></path>
        </svg>
        <span className="text-lg">
          0.<span className="text-sm font-semibold">00</span>
        </span>
      </button>
    </div>
  );
}

export default FromData;
