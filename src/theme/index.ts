import { extendTheme } from "native-base";

const colors = {
  UCondo: {
    light: "#F0EDF5",
    dark: "#622490",
    grey: "#C4C4D1",
    sucess: "#1BA803",
    danger: "#E28856",
    pink: "#FF6680",
  },
};

const fonts = {
  UCondo: {
    body: "Rubik_400Regular",
  },
};

export const theme = extendTheme({ colors, fonts });
