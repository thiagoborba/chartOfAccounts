import { Account } from "../Types";

export function sortAccounts(accounts: Account[]) {
  return accounts.sort((a, b) =>
    a.id.localeCompare(b.id, undefined, { numeric: true })
  );
}
