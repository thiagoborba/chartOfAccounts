export type Account = {
  parentAccountId?: string;
  canBeParentAccount: boolean;
  id: string;
  name: string;
  type: string;
  acceptEntry: boolean | undefined;
};

export enum AccountTypes {
  INCOME = "INCOME",
  EXPENSE = "EXPENSE",
}
