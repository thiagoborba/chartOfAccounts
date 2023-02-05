import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import React from "react";
import { theme } from "./theme";

import { registerRootComponent } from "expo";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "./Screens/Home";
import { Registration } from "./Screens/Registration";
import { HomeHeader } from "./Components/Header";

import { useFonts, Rubik_400Regular } from "@expo-google-fonts/rubik";
import { GlobalContextProvider } from "./Context";
import { Account, ScreenMode, Screens } from "./Types";

export type StackParamList = {
  Registration: {
    mode: ScreenMode.PREVIEW | ScreenMode.CREATE;
    acc?: Account;
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
            initialRouteName={Screens.HOME}
          >
            <Stack.Screen
              options={{ header: HomeHeader }}
              name={Screens.HOME}
              component={Home}
            />
            <Stack.Screen
              name={Screens.REGISTRATION}
              component={Registration}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </GlobalContextProvider>
    </NativeBaseProvider>
  );
}

export default registerRootComponent(App);
