import React, { createContext, useReducer, useContext } from "react";
import {
  ActionTypes,
  GlobalState,
  GlobalAction,
  GlobalContextProps,
} from "./models";

import { addAccount, deleteAccount } from "./actionFunctions";

import accounts from "../Mock/entries.json";

export const initialState = {
  accounts,
} as GlobalState;

const Context = createContext({} as GlobalContextProps);

const reducer = (state = initialState, action: GlobalAction): GlobalState => {
  switch (action.type) {
    case ActionTypes.DELETE_ACCOUNT: {
      return deleteAccount(state, action.payload);
    }
    case ActionTypes.ADD_ACCOUNT: {
      return addAccount(state, action.payload);
    }
    default: {
      throw new Error(`Unsupported action type: ${action}`);
    }
  }
};

interface InitialState extends React.HTMLAttributes<HTMLDivElement> {
  globalState?: GlobalState;
}

export const GlobalContextProvider: React.FunctionComponent<InitialState> = ({
  children,
  globalState = initialState,
}) => {
  const [state, dispatch] = useReducer(reducer, globalState);
  const value = { state, dispatch } as GlobalContextProps;
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export function GlobalContext() {
  const { state, dispatch } = useContext(Context);

  function getActiveAccounts() {
    return state.accounts.filter((acc) => acc.active === true);
  }

  function getAllAccounts() {
    return state.accounts;
  }

  function isValidAccountId(id: string) {
    return !state.accounts.some((acc) => acc.id === id);
  }

  function getAllParentsAccounts() {
    return state.accounts.filter((acc) => !acc.acceptEntry);
  }

  function getActiveParentsAccounts() {
    return getActiveAccounts().filter((acc) => !acc.acceptEntry);
  }

  function getAccount(id: string) {
    return state.accounts.find((acc) => acc.id === id);
  }

  return {
    dispatch,
    ActionTypes,
    getActiveAccounts,
    isValidAccountId,
    getAllParentsAccounts,
    getActiveParentsAccounts,
    getAllAccounts,
    getAccount,
    state,
  };
}
