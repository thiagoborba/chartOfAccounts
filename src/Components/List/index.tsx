import React from "react";
import { FlatList, HStack, Icon, Text, IconButton } from "native-base";

import { Feather } from "@expo/vector-icons";
import { AccountTypes } from "../../Types";

type ItemProps = {
  id: string;
  label: string;
  action: () => void;
  type: AccountTypes.EXPENSE | AccountTypes.INCOME;
};

type ListProps = {
  data: ItemProps[];
};

export const ItemList: React.FC<ItemProps> = ({ label, action, id, type }) => {
  const color =
    type === AccountTypes.EXPENSE ? "UCondo.danger" : "UCondo.sucess";

  return (
    <HStack
      backgroundColor={"white"}
      borderRadius="2xl"
      justifyContent="space-between"
      alignItems="center"
      paddingLeft={4}
      paddingRight={1}
      py={2}
    >
      <Text fontFamily="UCondo.body" color={color}>
        {id} - {label}
      </Text>
      <IconButton
        rounded="full"
        onPress={action}
        icon={<Icon as={Feather} color="UCondo.grey" name="trash" />}
      />
    </HStack>
  );
};

export const List = ({ data }: ListProps) => {
  return (
    <FlatList
      ItemSeparatorComponent={() => <HStack height={3} />}
      data={data}
      renderItem={({ item }) => <ItemList {...item} />}
      keyExtractor={(item) => item.id}
    />
  );
};
