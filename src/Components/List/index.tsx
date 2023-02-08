import React from "react";
import {
  FlatList,
  HStack,
  Icon,
  Heading,
  Text as NativeText,
} from "native-base";

import { Feather } from "@expo/vector-icons";
import { AccountTypes } from "../../Types";
import { IFlatListProps } from "native-base/lib/typescript/components/basic/FlatList";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { theme } from "../../theme";

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
    type === AccountTypes.EXPENSE
      ? theme.colors.UCondo.danger
      : theme.colors.UCondo.sucess;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.white,
      borderRadius: theme.radii["2xl"],
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: theme.space[5],
    },
    title: {
      fontFamily: theme.fonts.UCondo.body,
      color: color,
    },
  });

  return (
    <TouchableOpacity style={styles.container} onPress={onClickItem}>
      <Text style={styles.title}>
        {id} - {label}
      </Text>
      <TouchableOpacity onPress={onClickDelete}>
        <Icon as={Feather} color="UCondo.grey" name="trash" />
      </TouchableOpacity>
    </TouchableOpacity>
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
        <NativeText color={"UCondo.grey2"}>
          {props.data?.length || 0} Registros
        </NativeText>
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
      removeClippedSubviews={true}
      maxToRenderPerBatch={20}
      initialNumToRender={20}
      {...props}
    />
  );
};
