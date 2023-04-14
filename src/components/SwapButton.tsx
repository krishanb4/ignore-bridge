function SwapButton() {
  return (
    <div className="pt-4">
      <div className="relative w-full" data-headlessui-state="">
        <button
          className="btn w-full flex items-center justify-center gap-2 cursor-pointer transition-all bg-[#02ad02] hover:bg-[#187c18] active:bg-[#082908] text-white px-6 h-[52px] rounded-xl text-base font-semibold"
          aria-expanded="false"
          data-headlessui-state=""
          type="button"
          id="headlessui-popover-button-:r1e:"
        >
          <span className="hidden md:block">Connect Wallet</span>
          <span className="block md:hidden">Connect Wallet</span>
        </button>
      </div>
    </div>
  );
}

export default SwapButton;
