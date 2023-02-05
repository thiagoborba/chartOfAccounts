import React, { useState } from "react";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParamList } from "../../App";
import { Screen } from "../../Components/Screen";
import { List } from "../../Components/List";
import { Account, AccountTypes } from "../../Types";
import { ActionTypes, GlobalContext } from "../../Context";
import { UModal } from "../../Components/Modal";

type Props = NativeStackScreenProps<StackParamList>;

const modalInitialState = { isOpen: false, account: {} as Account };

export function Home({ navigation }: Props) {
  const {
    state: { accounts },
    dispatch,
  } = GlobalContext();

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
