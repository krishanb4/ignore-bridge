export interface BalanceState {
  tokenbalance: number;
}

export interface BalanceAction {
  type: "SET_BALANCE";
  payload: number;
}
