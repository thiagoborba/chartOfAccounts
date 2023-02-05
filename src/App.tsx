import { NavigationContainer } from "@react-navigation/native";
import {
  Box,
  Container,
  Heading,
  Icon,
  IconButton,
  NativeBaseProvider,
  View,
} from "native-base";
import React from "react";
import { theme } from "./theme";

import { registerRootComponent } from "expo";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "./Screens/Home";
import { Registration } from "./Screens/Registration";
import { HomeHeader, RegistrationHeader } from "./Components/Header";

import { useFonts, Rubik_400Regular } from "@expo-google-fonts/rubik";
import { GlobalContextProvider } from "./Context";
import { Account } from "./Types";

export type StackParamList = {
  Registration: {
    acc: Account;
  };
  Home: {
    search: string;
  };
};

const Stack = createNativeStackNavigator<StackParamList>();

function App() {
  let [fontsLoaded] = useFonts({
    Rubik_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NativeBaseProvider theme={theme}>
      <GlobalContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              contentStyle: {
                backgroundColor: theme.colors.UCondo.dark,
              },
            }}
            initialRouteName="Home"
          >
            <Stack.Screen
              options={{ header: HomeHeader }}
              name="Home"
              component={Home}
            />
            <Stack.Screen name="Registration" component={Registration} />
          </Stack.Navigator>
        </NavigationContainer>
      </GlobalContextProvider>
    </NativeBaseProvider>
  );
}

export default registerRootComponent(App);
