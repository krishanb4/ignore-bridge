import { AnyAction, Reducer } from "redux";
import * as types from "./actionConstants";

export interface BalanceState {
  corebalance: number;
  bscbalance: number;
  ethbalance: number;
  enterAmount: string;
}

const initialState: BalanceState = {
  corebalance: 0,
  bscbalance: 0,
  ethbalance: 0,
  enterAmount: "",
};

interface BalanceSet {
  type: typeof types.SET_BALANCE;
  payload: BalanceState;
}

export type BalanceAction = BalanceSet;

const balanceReducer: Reducer<BalanceState, BalanceAction | AnyAction> = (
  state = initialState,
  action: BalanceAction | AnyAction
) => {
  switch (action.type) {
    case types.SET_BALANCE:
      return {
        ...state,
        corebalance: action.payload.corebalance,
        bscbalance: action.payload.bscbalance,
        ethbalance: action.payload.ethbalance,
        enterAmount: action.payload.enterAmount,
      };
    default:
      return state;
  }
};

export default balanceReducer;
