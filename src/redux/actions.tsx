export const SET_BALANCE = "SET_BALANCE";

interface SetBalanceAction {
  type: typeof SET_BALANCE;
  payload: number;
}

export type BalanceAction = SetBalanceAction;

export const setBalance = (balance: number): SetBalanceAction => ({
  type: SET_BALANCE,
  payload: balance,
});
