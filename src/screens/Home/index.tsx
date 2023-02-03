import React from "react";
import { Text, Box, Heading, IconButton, Icon, AddIcon } from "native-base";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AntDesign } from "@expo/vector-icons";
import { StackParamList } from "../../App";

type Props = NativeStackScreenProps<StackParamList>;

export function Home({ navigation }: Props) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Heading size="lg" color="white" children="Plano de Contas" />
      ),
      headerRight: () => (
        <IconButton
          onPress={() => navigation.navigate("Registration")}
          borderRadius="full"
          icon={<Icon as={AntDesign} color="white" name="plus" />}
        />
      ),
    });
  }, [navigation]);

  return (
    <Box>
      <Text>Home</Text>
    </Box>
  );
}
