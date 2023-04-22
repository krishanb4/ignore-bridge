import { BalanceAction, BalanceState } from "./balance";
import { AnyAction, Reducer } from "redux";

const initialState: BalanceState = {
    tokenbalance: 0,
};

const balanceReducer: Reducer<BalanceState, BalanceAction | AnyAction> = (
    state = initialState,
    action: BalanceAction | AnyAction
) => {
    switch (action.type) {
        case "SET_BALANCE":
            return { ...state, tokenbalance: action.payload };
        default:
            return state;
    }
};

export default balanceReducer;
