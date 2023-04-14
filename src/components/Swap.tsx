import React, { useEffect, useState } from "react";
import NetworkSelect from "@/components/NetworkSelect";
import From from "./From";
import To from "./To";
import SwitchArrow from "./SwitchArrow";
import SwapButton from "./SwapButton";
import Image from "next/image";
function Swap() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Use matchMedia to detect dark mode preference
    const darkModeMediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );
    setIsDarkMode(darkModeMediaQuery.matches);

    // Listen for changes in dark mode preference
    const handleDarkModeChange = (event: MediaQueryListEvent) => {
      setIsDarkMode(event.matches);
    };
    darkModeMediaQuery.addListener(handleDarkModeChange);

    // Clean up event listener on unmount
    return () => {
      darkModeMediaQuery.removeListener(handleDarkModeChange);
    };
  }, []);
  return (
    <div className="p-4 mx-auto mt-16 mb-[86px] flex flex-col gap-4 w-full max-w-[520px]">
      <div className="flex flex-col gap-4">
        <div>
          <NetworkSelect />
          <From />
          <SwitchArrow />
          <To />
          <SwapButton />
          <div className="text-center flex items-center justify-center m-8">
            <p>Powered By</p>
            <a href="https://layerzero.network/" target="_blank">
              {isDarkMode ? (
                <Image
                  src="/images/layerZero.svg"
                  className="ml-3 svgImage"
                  alt="layerzero_logo"
                  width="100"
                  height="300"
                />
              ) : (
                <Image
                  src="/images/layerZero.svg"
                  className="ml-3 svgImage"
                  alt="layerzero_logo"
                  width="100"
                  height="300"
                />
              )}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Swap;
