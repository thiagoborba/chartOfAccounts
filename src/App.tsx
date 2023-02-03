import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import React from "react";
import { colors, theme } from "./theme";

import { registerRootComponent } from "expo";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "./screens/Home";
import { Registration } from "./screens/Registration";

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
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: theme.colors.violet[900],
            },
            headerTintColor: theme.colors.white,
            headerTitle: "",
          }}
        >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Registration" component={Registration} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

export default registerRootComponent(App);
