import { ChainState } from "./chainReducer";
import * as types from "./actionConstants";

interface UpdateChainsAction {
  type: typeof types.UPDATE_CHAINS;
  payload: {
    chains: ChainState;
  };
}

export type ChainAction = UpdateChainsAction;

export const updateChains = (chains: ChainState): UpdateChainsAction => ({
  type: types.UPDATE_CHAINS,
  payload: {
    chains,
  },
});
