import React, { useEffect, useState } from "react";
import NetworkSelect from "@/components/NetworkSelect";
import From from "./From";
import To from "./To";
import SwitchArrow from "./SwitchArrow";
// import SwapButton from "./SwapButton";
import dynamic from "next/dynamic";
import Image from "next/image";
import LayerZero from "@/components/LayerZero";
import Instructions from "@/components/Instructions";
const SwapButton = dynamic(() => import("./SwapButton"), {
  ssr: false,
});
import { MyContext } from "./context";
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

    if (localStorage.getItem("theme") === "dark") {
      setIsDarkMode(true);
    }
    if (localStorage.getItem("theme") === "light") {
      setIsDarkMode(false);
    }
    // Clean up event listener on unmount
    return () => {
      darkModeMediaQuery.removeEventListener("change", handleDarkModeChange);
    };
  }, [isDarkMode]);
  const [data, setData] = useState("");
  interface MyContextValue {
    data: string;
    setData: (data: string) => void;
  }
  const contextValue: MyContextValue = {
    data,
    setData,
  };
  return (
    <MyContext.Provider value={contextValue}>
      <div className="p-4 mx-auto mt-16 mb-[86px] text-black dark:text-white flex flex-col gap-4 w-full max-w-[520px]">
        <div className="flex flex-col gap-4">
          <div>
            <NetworkSelect />
            <From />
            <SwitchArrow />
            <To />
            <SwapButton />
            <Instructions />
            <div className="text-center flex items-center justify-center m-8">
              <p className="dark:text-white mr-[15px]">Powered By</p>
              <a href="https://layerzero.network/" target="_blank">
                <LayerZero />
              </a>
            </div>
          </div>
        </div>
      </div>
    </MyContext.Provider>
  );
}

export default Swap;
