import React from "react";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParamList } from "../../App";
import { Screen } from "../../Components/Screen";
import { List } from "../../Components/List";
import { AccountTypes } from "../../Types";
import { ActionTypes, GlobalContext } from "../../Context";

type Props = NativeStackScreenProps<StackParamList>;

export function Home({ navigation }: Props) {
  const {
    state: { accounts },
    dispatch,
  } = GlobalContext();

  const listData = accounts?.map((entry) => ({
    id: entry.id,
    label: entry.name,
    action: () =>
      dispatch({ type: ActionTypes.DELETE_ACCOUNT, payload: entry.id }),
    type: entry.type as AccountTypes.EXPENSE | AccountTypes.INCOME,
  }));

  return (
    <Screen px={0}>
      <List px={5} data={listData} />
    </Screen>
  );
}
