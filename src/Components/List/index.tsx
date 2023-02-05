import React from "react";
import {
  FlatList,
  HStack,
  Icon,
  Text,
  IconButton,
  Heading,
  Box,
  Pressable,
} from "native-base";

import { Feather } from "@expo/vector-icons";
import { AccountTypes } from "../../Types";
import { IFlatListProps } from "native-base/lib/typescript/components/basic/FlatList";

type ItemProps = {
  id: string;
  label: string;
  onClickDelete: () => void;
  onClickItem: () => void;
  type: AccountTypes.EXPENSE | AccountTypes.INCOME;
};

type ListProps = Partial<IFlatListProps<ItemProps>>;

export const ItemList: React.FC<ItemProps> = ({
  label,
  onClickDelete,
  onClickItem,
  id,
  type,
}) => {
  const color =
    type === AccountTypes.EXPENSE ? "UCondo.danger" : "UCondo.sucess";

  return (
    <Pressable onPress={onClickItem}>
      {({ isPressed, isHovered, isFocused }) => (
        <HStack
          bg={isPressed ? "coolGray.200" : "white"}
          key={id}
          // backgroundColor={"white"}
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
            onPress={onClickDelete}
            icon={<Icon as={Feather} color="UCondo.grey" name="trash" />}
          />
        </HStack>
      )}
    </Pressable>
  );
};

export const List = (props: ListProps) => {
  function ListHeader() {
    return (
      <HStack
        backgroundColor="UCondo.light"
        paddingBottom={4}
        justifyContent="space-between"
        alignItems="center"
      >
        <Heading color="UCondo.grey3">Listagem</Heading>
        <Text color={"UCondo.grey2"}>{props.data?.length || 0} Registros</Text>
      </HStack>
    );
  }

  return (
    <FlatList
      ListHeaderComponent={<ListHeader />}
      stickyHeaderIndices={[0]}
      ItemSeparatorComponent={() => <HStack key={null} height={3} />}
      data={props.data}
      renderItem={({ item }) => <ItemList {...item} />}
      keyExtractor={(item) => item.id}
      {...props}
    />
  );
};
