import React, { useCallback } from "react";
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
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ListRenderItem,
} from "react-native";
import { theme } from "../../theme";

type ItemProps = {
  id: string;
  label: string;
  onClickDelete: () => void;
  onClickItem: () => void;
  type: AccountTypes.EXPENSE | AccountTypes.INCOME;
};

type ListProps = Partial<IFlatListProps<ItemProps>>;

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

  const ItemList: ListRenderItem<ItemProps> = ({
    item: { id, type, label, onClickDelete, onClickItem },
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
        paddingLeft: theme.space[4],
      },
      title: {
        fontFamily: theme.fonts.UCondo.body,
        color: color,
      },
      button: {
        margin: 0,
        justifyContent: "center",
        alignItems: "center",
        height: theme.sizes["16"],
        width: theme.sizes["16"],
        borderRadius: theme.radii["full"],
      },
    });

    return (
      <TouchableOpacity key={id} style={styles.container} onPress={onClickItem}>
        <Text style={styles.title}>
          {id} - {label}
        </Text>
        <TouchableOpacity style={styles.button} onPress={onClickDelete}>
          <Icon as={Feather} color="UCondo.grey" name="trash" />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      ListHeaderComponent={<ListHeader />}
      stickyHeaderIndices={[0]}
      ItemSeparatorComponent={() => <HStack key={null} height={3} />}
      data={props.data}
      renderItem={ItemList}
      keyExtractor={(item) => item.id}
      // removeClippedSubviews={true}
      // maxToRenderPerBatch={20}
      // initialNumToRender={20}
      {...props}
    />
  );
};
