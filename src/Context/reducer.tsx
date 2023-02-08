import React, { createContext, useReducer, useContext } from "react";
import {
  ActionTypes,
  GlobalState,
  GlobalAction,
  GlobalContextProps,
} from "./models";

import { addAccount, deleteAccount } from "./actionFunctions";

import accounts from "../Mock/entries.json";
import { sortAccounts } from "../Utils";

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

  const maxId = 999;

  function getHighParentAccounts() {
    return sortAccounts(state.accounts.filter((acc) => acc.id.length === 1));
  }

  function getNextHighestId() {
    const lastAccountId = Number(getHighParentAccounts().pop()?.id);
    const nextId = lastAccountId + 1;
    return String(nextId);
  }

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

  function getChildrensByParentId(parentId: string) {
    return state.accounts.filter((acc) => acc.parentAccountId === parentId);
  }

  function getNewParentId(parentId: string) {
    const arrayId = parentId.split(".");
    const reverseArrayId = arrayId.reverse();

    let newParentId = "";

    for (let i = 0; i < reverseArrayId.length; i++) {
      const numberId = Number(reverseArrayId[i]);
      if (numberId < maxId) {
        newParentId = reverseArrayId
          .slice(i + 1)
          .reverse()
          .join(".");
        break;
      }
    }

    return newParentId;
  }

  function getIds(parentId: string): {
    id: string;
    parentAccountId: string;
  } {
    if (!parentId)
      return {
        parentAccountId: "",
        id: getNextHighestId(),
      };

    const childrens = getChildrensByParentId(parentId);

    if (childrens.length) {
      let lastId = childrens[childrens.length - 1].id.split(".");

      const lastIdNumber = Number(lastId.pop());

      if (lastIdNumber < maxId) {
        return {
          parentAccountId: parentId,
          id: `${parentId}.${lastIdNumber + 1}`,
        };
      }

      const newParentId = getNewParentId(lastId.join("."));

      return getIds(newParentId);
    } else {
      return {
        parentAccountId: parentId,
        id: `${parentId}.1`,
      };
    }
  }

  return {
    dispatch,
    ActionTypes,
    getActiveAccounts,
    isValidAccountId,
    getAllParentsAccounts,
    getActiveParentsAccounts,
    getAllAccounts,
    getChildrensByParentId,
    getAccount,
    state,
    getIds,
  };
}
