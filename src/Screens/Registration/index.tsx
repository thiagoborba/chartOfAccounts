import React from "react";
import { Text, Box } from "native-base";
import { StackParamList } from "../../App";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Screen } from "../../Components/Screen";

type Props = NativeStackScreenProps<StackParamList>;

export function Registration({ navigation }: Props) {
  return (
    <Screen>
      <Text>Registration</Text>
    </Screen>
  );
}
