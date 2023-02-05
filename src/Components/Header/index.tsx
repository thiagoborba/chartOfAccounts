import React from "react";
import {
  Box,
  Heading,
  IconButton,
  Icon,
  StatusBar,
  HStack,
  VStack,
  Input,
} from "native-base";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { AntDesign, Ionicons, EvilIcons } from "@expo/vector-icons";
import { InterfaceVStackProps } from "native-base/lib/typescript/components/primitives/Stack/VStack";
import { ScreenMode } from "../../Types";

type RegistrationHeaderProps = {
  onClickSubmit: () => any;
  onClickBack: () => any;
  previewMode: boolean;
};

function HeaderContainer({ children, ...props }: InterfaceVStackProps) {
  return (
    <VStack backgroundColor={"UCondo.dark"} padding={4} {...props}>
      <StatusBar barStyle="light-content" />
      <Box safeAreaTop />
      {children}
    </VStack>
  );
}

export const HomeHeader = (props: NativeStackHeaderProps) => {
  return (
    <HeaderContainer paddingRight={2}>
      <VStack>
        <HStack justifyContent="space-between" alignItems="center">
          <Heading size="lg" color="white" children="Plano de Contas" />
          <IconButton
            rounded="full"
            size="lg"
            onPress={() =>
              props.navigation.navigate("Registration", {
                mode: ScreenMode.CREATE,
              })
            }
            icon={<Icon as={AntDesign} color="white" name="plus" />}
          />
        </HStack>
        <Input
          InputLeftElement={
            <Icon as={EvilIcons} name="search" size={6} ml={2} />
          }
          onChangeText={(search) => props.navigation.setParams({ search })}
          variant="rounded"
          size="2xl"
          placeholder="Pesquisar Conta"
          backgroundColor={"white"}
          marginRight={2}
          marginTop={4}
          padding={4}
        />
      </VStack>
    </HeaderContainer>
  );
};

export const RegistrationHeader = ({
  onClickSubmit,
  onClickBack,
  previewMode,
}: RegistrationHeaderProps) => {
  return (
    <HeaderContainer px={0} paddingRight={2}>
      <HStack justifyContent="space-between" alignItems="center">
        <IconButton
          rounded="full"
          size="lg"
          onPress={onClickBack}
          icon={<Icon as={Ionicons} color="white" name="chevron-back" />}
        />
        <Heading
          flex={1}
          backgroundColor="black"
          size="lg"
          color="white"
          children="Inserir Conta"
        />
        {!previewMode && (
          <IconButton
            rounded="full"
            size="lg"
            onPress={onClickSubmit}
            icon={<Icon as={AntDesign} color="white" name="check" />}
          />
        )}
      </HStack>
    </HeaderContainer>
  );
};
