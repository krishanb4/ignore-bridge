//for 4TOKEN
export const bscContractAddress = "0x8C0479c5173DdD98A22d283233f86189CCb7C027";
export const coreContractAddress = "0x795c4a5e03cC6F4Ed349cAf076Da6cB7F60D6921";
export const ethContractAddress = "0x2348520cba8e3b918676e94523077c12a1ed4126";

export const BSC_CORE = "0x8C0479c5173DdD98A22d283233f86189CCb7C027";
export const CORE_BSC = "0x795c4a5e03cC6F4Ed349cAf076Da6cB7F60D6921";
export const ETH_BSC = "0x8C0479c5173DdD98A22d283233f86189CCb7C027";
export const ETH_CORE = "0x8C0479c5173DdD98A22d283233f86189CCb7C027";
export const CORE_ETH = "0xe22F35405d260715E03f7C99693130489f100A08";
export const BSC_ETH = "0x8Ae6f48338688636F57e22086c87809436b516AE";

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

export const ETH = "0x8dB4beACcd1698892821a9a0Dc367792c0cB9940";
export const BSC = "0x61B83eDF87Ea662C695439A807c386455c9E797C";
export const CORE = "0x98564E70c7fCC6d947fFE6d9EfeD5ba68b306F2E";
