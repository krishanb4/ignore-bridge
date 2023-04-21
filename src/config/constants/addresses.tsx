//for 4TOKEN
export const bscContractAddress = "0xBC2BBAA02d2a2E1b171F816F0517EF0185d1CE62";
export const coreContractAddress = "0xda5286CdC146135680342D2dff1464829A3ddeBb";

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
    bsc: "0x91155738DdCcaF7573Ef0Ebb3e04c871389C5E63",
    core: "0x98564E70c7fCC6d947fFE6d9EfeD5ba68b306F2E",
  },
};
