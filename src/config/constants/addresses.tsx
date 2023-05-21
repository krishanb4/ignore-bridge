//for 4TOKEN
export const bscContractAddress = "0xcB2b1388fb085a4dA13941f8f8102eE63Cc9aA69";
export const coreContractAddress = "0xC30f55e8D083260Df710A29E89AC7BbB21f42CCD";
export const ethContractAddress = "0x2348520cba8e3b918676e94523077c12a1ed4126";

export const BSC_CORE = "0xcB2b1388fb085a4dA13941f8f8102eE63Cc9aA69";
export const CORE_BSC = "0xC30f55e8D083260Df710A29E89AC7BbB21f42CCD";
export const ETH_BSC = "0x8C0479c5173DdD98A22d283233f86189CCb7C027";
export const ETH_CORE = "0x2348520cba8e3b918676e94523077c12a1ed4128";
export const CORE_ETH = "0x2348520cba8e3b918676e94523077c12a1ed4129";
export const BSC_ETH = "0x8Ae6f48338688636F57e22086c87809436b516AE";

//for USDT
//export const bscContractAddress = "0xf953f9FfA5c1f9F55fD8408C24D23850F1a35213";
//export const coreContractAddress = "0xa591D27d3efA2911102e0862C6C1b85CEFCF8ab4";

type Tokens = {
  USDT: {
    bsc: string;
    core: string;
  };
  IGNORE: {
    eth: string;
    bsc: string;
    core: string;
  };
};

export const tokens: Tokens = {
  USDT: {
    bsc: "0x61B83eDF87Ea662C695439A807c386455c9E797C",
    core: "0x148a24e5c355455268B4d04823770280dD023267",
  },
  IGNORE: {
    eth: "0x8dB4beACcd1698892821a9a0Dc367792c0cB9940",
    bsc: "0x61B83eDF87Ea662C695439A807c386455c9E797C",
    core: "0x98564E70c7fCC6d947fFE6d9EfeD5ba68b306F2E",
  },
};

export const ETH = "0x8dB4beACcd1698892821a9a0Dc367792c0cB9940"; // temp
export const BSC = "0x61B83eDF87Ea662C695439A807c386455c9E797C";
export const CORE = "0x98564E70c7fCC6d947fFE6d9EfeD5ba68b306F2E";
