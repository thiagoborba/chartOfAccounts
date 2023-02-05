import { Dispatch } from "react";
import { Account } from "../Types";

export interface ContextProps<T, P> {
  state: T;
  dispatch: Dispatch<P>;
}

export enum ActionTypes {
  DELETE_ACCOUNT = "DELETE_ACCOUNT",
  ADD_ACCOUNT = "ADD_ACCOUNT",
}

export type GlobalAction =
  | {
      type: ActionTypes.DELETE_ACCOUNT;
      payload: Account["id"];
    }
  | { type: ActionTypes.ADD_ACCOUNT; payload: Account };

export interface GlobalState {
  accounts: Account[];
}

export interface GlobalContextProps
  extends ContextProps<GlobalState, GlobalAction> {}
