import * as routes from "./addresses";

export default function AddressRoute(
  From_To: string
): `0x${string}` | undefined {
  let param1: `0x${string}` | undefined;
  switch (From_To) {
    case "BSC_CORE":
      param1 = routes.BSC_CORE;
      break;
    case "CORE_BSC":
      param1 = routes.CORE_BSC;
      break;
    case "ETH_BSC":
      param1 = routes.ETH_BSC;
      break;
    case "ETH_CORE":
      param1 = routes.ETH_CORE;
      break;
    case "CORE_ETH":
      param1 = routes.CORE_ETH;
      break;
    case "BSC_ETH":
      param1 = routes.BSC_ETH;
      break;
    default:
      // Handle default case if needed
      break;
  }
  return param1;
}

export function TokenAddressRoute(From: string): `0x${string}` | undefined {
  let param1: `0x${string}` | undefined;
  switch (From) {
    case "ETH":
      param1 = routes.ETH;
      break;
    case "BSC":
      param1 = routes.BSC;
      break;
    case "CORE":
      param1 = routes.CORE;
      break;
    default:
      // Handle default case if needed
      break;
  }
  return param1;
}
