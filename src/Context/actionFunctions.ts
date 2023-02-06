import { Account } from "../Types";
import { sortAccounts } from "../Utils";
import { GlobalState } from "./models";

export function deleteAccount(state: GlobalState, id: string) {
  const accounts = state.accounts.map((account) => {
    if (account.id === id) {
      account.active = false;
      account.name = account.name + " (apagada)";
    }
    return account;
  });

  return { accounts };
}

export function addAccount(state: GlobalState, account: Account) {
  const { accounts } = state;
  account.active = true;
  accounts.push(account);
  const sortedAccounts = sortAccounts(accounts);
  return { accounts: sortedAccounts };
}
