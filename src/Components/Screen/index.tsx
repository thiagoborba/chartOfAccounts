import React, { ReactNode } from "react";
import { Box } from "native-base";
import { InterfaceBoxProps } from "native-base/lib/typescript/components/primitives/Box";

export const Screen = ({ children, ...props }: InterfaceBoxProps) => {
  return (
    <Box
      backgroundColor="UCondo.light"
      borderTopRadius="3xl"
      padding={5}
      flex={1}
      {...props}
    >
      {children}
    </Box>
  );
};
