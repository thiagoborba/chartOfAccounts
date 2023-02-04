import React from "react";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParamList } from "../../App";
import { Screen } from "../../Components/Screen";
import { List } from "../../Components/List";
import entries from "../../Mock/entries.json";
import { AccountTypes } from "../../Types";

type Props = NativeStackScreenProps<StackParamList>;

export function Home({ navigation }: Props) {
  const listData = entries.map((entry) => ({
    id: entry.id,
    label: entry.name,
    action: () => {},
    type: entry.type as AccountTypes.EXPENSE | AccountTypes.INCOME,
  }));

  return (
    <Screen>
      <List data={listData} />
    </Screen>
  );
}
