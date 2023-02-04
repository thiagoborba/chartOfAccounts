import { NavigationContainer } from "@react-navigation/native";
import { Heading, Icon, IconButton, NativeBaseProvider } from "native-base";
import React from "react";
import { theme } from "./theme";

import { registerRootComponent } from "expo";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "./Screens/Home";
import { Registration } from "./Screens/Registration";
import { HomeHeader, RegistrationHeader } from "./Components/Header";

export type StackParamList = {
  Registration: undefined;
  Home: undefined;
};

const Stack = createNativeStackNavigator<StackParamList>();

function App() {
  return (
    <NativeBaseProvider theme={theme}>
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
          <Stack.Screen
            options={{ header: RegistrationHeader }}
            name="Registration"
            component={Registration}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

export default registerRootComponent(App);
