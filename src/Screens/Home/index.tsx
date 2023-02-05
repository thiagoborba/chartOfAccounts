import React, { useEffect, useState } from "react";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParamList } from "../../App";
import { Screen } from "../../Components/Screen";
import { List } from "../../Components/List";
import { Account, AccountTypes } from "../../Types";
import { ActionTypes, GlobalContext } from "../../Context";
import { UModal } from "../../Components/Modal";

type Props = NativeStackScreenProps<StackParamList, "Home">;

const modalInitialState = { isOpen: false, account: {} as Account };

export function Home({ navigation, route }: Props) {
  const {
    state: { accounts: contextAccounts },
    dispatch,
  } = GlobalContext();

  const [accounts, setAccounts] = useState(contextAccounts);

  function filterAccounts() {
    if (route.params?.search) {
      setAccounts(
        contextAccounts?.filter((acc) => {
          const name = `${acc.id} - ${acc.name}`.toLowerCase();
          const search = route.params.search.toLowerCase();
          return name.includes(search);
        })
      );
    } else {
      setAccounts(contextAccounts);
    }
  }

  useEffect(() => {
    filterAccounts();
  }, [route.params?.search]);

  const [modal, setModal] = useState(modalInitialState);

  const listData = accounts?.map((acc) => ({
    id: acc.id,
    label: acc.name,
    onClickDelete: () => setModal({ isOpen: true, account: acc }),
    onClickItem: () => {
      navigation.navigate("Registration", {
        acc,
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
