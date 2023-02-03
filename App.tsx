import { NavigationContainer } from "@react-navigation/native";
import { Box, NativeBaseProvider, Text } from "native-base";
import React from "react";
import { theme } from "./src/theme";

export default function App() {
  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>
        <Box
          flex={1}
          bg="violet.900"
          alignItems="center"
          justifyContent="center"
        >
          <Text>Open up App.jsasdasd to start working on your app!</Text>
        </Box>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
