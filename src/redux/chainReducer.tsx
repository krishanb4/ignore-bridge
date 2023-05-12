import { AnyAction, Reducer } from "redux";
import * as types from "./actionConstants";

export interface ChainState {
  firstChain: {
    id: number;
    name: string;
    symbol: string;
  };
  secondChain: {
    id: number;
    name: string;
    symbol: string;
  };
}

const initialState: ChainState = {
  firstChain: {
    id: 1,
    name: "Ethereum",
    symbol: "ETH",
  },
  secondChain: {
    id: 56,
    name: "BInance Smart Chain",
    symbol: "BSC",
  },
};

interface UpdateChainsAction {
  type: typeof types.UPDATE_CHAINS;
  payload: ChainState;
}

export type ChainAction = UpdateChainsAction;

const chainReducer: Reducer<ChainState, ChainAction | AnyAction> = (
  state = initialState,
  action: ChainAction | AnyAction
) => {
  switch (action.type) {
    case types.UPDATE_CHAINS:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default chainReducer;
