import { Account } from "../Types";
import { GlobalState } from "./models";

export function deleteAccount(state: GlobalState, id: string) {
  const accounts = state.accounts.filter((account) => account.id !== id);
  return { ...state, accounts };
}

export function addAccount(state: GlobalState, account: Account) {
  const newState = { ...state };
  newState.accounts.push(account);
  return newState;
}
