import React from "react";
import {
  FormControl,
  Input as NativeInput,
  WarningOutlineIcon,
} from "native-base";
import { IInputProps } from "native-base/lib/typescript/components/primitives/Input/types";

type Props = IInputProps & {
  label: string;
  errorMessage?: string | number | undefined;
};

export const Input: React.FC<Props> = ({
  label,
  placeholder,
  errorMessage,
  isInvalid,
  isRequired,
  ...props
}) => {
  return (
    <FormControl marginBottom={3} isInvalid={isInvalid} isRequired={isRequired}>
      <FormControl.Label>{label}</FormControl.Label>
      <NativeInput
        backgroundColor="white"
        borderWidth={0}
        height={12}
        borderRadius="xl"
        accessibilityLabel={placeholder}
        placeholder={placeholder}
        {...props}
      />
      <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
        {errorMessage}
      </FormControl.ErrorMessage>
    </FormControl>
  );
};
