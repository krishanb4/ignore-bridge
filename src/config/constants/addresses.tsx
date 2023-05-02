//for 4TOKEN
export const bscContractAddress = "0x04cbefb3D208172336F74448d529148b429d4D7F";
export const coreContractAddress = "0x8e4E0d8Db2115b5A6bd1062D32f51A0194088442";

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
    bsc: "0xb1a147afc3Ec72F65340b53F9D3F4BB2d0D46462",
    core: "0x98564E70c7fCC6d947fFE6d9EfeD5ba68b306F2E",
  },
};
