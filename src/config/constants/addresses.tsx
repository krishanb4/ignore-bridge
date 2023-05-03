//for 4TOKEN
export const bscContractAddress = "0x212957B1Cd421E5b75A9F309F0B24Fa73053FFFB";
export const coreContractAddress = "0x2348520cba8e3b918676e94523077c12a1ed4126";

//for USDT
//export const bscContractAddress = "0xf953f9FfA5c1f9F55fD8408C24D23850F1a35213";
//export const coreContractAddress = "0xa591D27d3efA2911102e0862C6C1b85CEFCF8ab4";

type Tokens = {
  USDT: {
    bsc: string;
    core: string;
  };
  IGNORE: {
    bsc: string;
    core: string;
  };
};

export const tokens: Tokens = {
  USDT: {
    bsc: "0x55d398326f99059fF775485246999027B3197955",
    core: "0x148a24e5c355455268B4d04823770280dD023267",
  },
  IGNORE: {
    bsc: "0xfbfA6c3CF32B426B0d37CA9129b9919977f81b7F",
    core: "0x98564E70c7fCC6d947fFE6d9EfeD5ba68b306F2E",
  },
};
