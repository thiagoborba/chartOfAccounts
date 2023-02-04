import React from "react";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParamList } from "../../App";
import { Screen } from "../../Components/Screen";
import { List } from "../../Components/List";

type Props = NativeStackScreenProps<StackParamList>;

export function Home({ navigation }: Props) {
  return (
    <Screen>
      <List></List>
    </Screen>
  );
}
