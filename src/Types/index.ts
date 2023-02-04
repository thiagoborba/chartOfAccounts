export type Account = {
  parentAccount: string;
  id: string;
  name: string;
  type: AccountTypes;
  acceptEntry: boolean;
};

export enum AccountTypes {
  INCOME = "INCOME",
  EXPENSE = "EXPENSE",
}
