import { Account } from "../Types";
import { sortAccounts } from "../Utils";
import { GlobalState } from "./models";
import { GlobalContext } from "./reducer";

export function deleteAccount(state: GlobalState, id: string) {
  const { accounts } = state;
  const IsParentAccount = !accounts.find((account) => account.id === id)
    ?.acceptEntry;
  const hasChildren = accounts.filter(
    (account) => account.parentAccountId === id
  ).length;

  if (IsParentAccount && hasChildren) {
    return {
      accounts: state.accounts.map((account) => {
        if (account.id === id) {
          account.active = false;
          account.name = account.name + " (apagada)";
        }
        return account;
      }),
    };
  }

  return {
    accounts: state.accounts.filter((account) => account.id !== id),
  };
}

export function addAccount(state: GlobalState, account: Account) {
  const { accounts } = state;
  account.active = true;
  accounts.push(account);
  const sortedAccounts = sortAccounts(accounts);
  return { accounts: sortedAccounts };
}
