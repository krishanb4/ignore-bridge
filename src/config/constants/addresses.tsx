//for 4TOKEN
export const bscContractAddress = "0xcB2b1388fb085a4dA13941f8f8102eE63Cc9aA69";
export const coreContractAddress = "0xC30f55e8D083260Df710A29E89AC7BbB21f42CCD";

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
    bsc: "0xDA29B33B7AF3B17e88037b237c548C2c07C0C57D",
    core: "0x98564E70c7fCC6d947fFE6d9EfeD5ba68b306F2E",
  },
};
