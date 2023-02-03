import { extendTheme } from "native-base";

const newColorTheme = {
  violet: {
    50: "#F0EDF5",
    900: "#622490",
  },
};

export const theme = extendTheme({ colors: newColorTheme });
