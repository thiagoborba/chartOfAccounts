import React, { useEffect, useState } from "react";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParamList } from "../../App";
import { Screen } from "../../Components/Screen";
import { List } from "../../Components/List";
import {
  Account,
  AccountTypes,
  HomeScreenProps,
  ScreenMode,
  Screens,
} from "../../Types";
import { ActionTypes, GlobalContext } from "../../Context";
import { UModal } from "../../Components/Modal";

const modalInitialState = { isOpen: false, account: {} as Account };

export function Home({ navigation, route }: HomeScreenProps) {
  const [accounts, setAccounts] = useState([] as Account[]);

  const { getActiveAccounts, dispatch } = GlobalContext();

  const activeAccounts = getActiveAccounts();

  useEffect(() => {
    setAccounts(activeAccounts);
  }, [activeAccounts.length]);

  useEffect(() => {
    filterAccounts();
  }, [route.params?.search]);

  function filterAccounts() {
    if (route.params?.search) {
      setAccounts(
        activeAccounts?.filter((acc) => {
          const name = `${acc.id} - ${acc.name}`.toLowerCase();
          const search = route.params.search.toLowerCase();
          return name.includes(search);
        })
      );
    } else {
      setAccounts(activeAccounts);
    }
  }

  const [modal, setModal] = useState(modalInitialState);

  const listData = accounts?.map((acc) => ({
    id: acc.id,
    label: acc.name,
    onClickDelete: () => setModal({ isOpen: true, account: acc }),
    onClickItem: () => {
      navigation.navigate(Screens.REGISTRATION, {
        acc,
        mode: ScreenMode.PREVIEW,
      });
    },
    type: acc.type as AccountTypes.EXPENSE | AccountTypes.INCOME,
  }));

  function deleteAccount() {
    dispatch({ type: ActionTypes.DELETE_ACCOUNT, payload: modal.account.id });
    setModal(modalInitialState);
  }

  return (
    <Screen px={0}>
      <UModal
        action={deleteAccount}
        isOpen={modal.isOpen}
        account={modal.account}
        closeModal={() => setModal(modalInitialState)}
      />
      <List px={5} data={listData} />
    </Screen>
  );
}
