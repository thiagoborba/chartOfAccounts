import React from "react";
import {
  FormControl,
  Select as NativeSelect,
  WarningOutlineIcon,
} from "native-base";
import { ISelectProps } from "native-base/lib/typescript/components/primitives/Select";
import { IFormControlProps } from "native-base/lib/typescript/components/composites/FormControl/types";
import { Omit } from "react-native";

type Props = Omit<ISelectProps, "selectedValue"> & {
  label: string;
  data: { label: string; value: any }[];
  errorMessage?: string | number | undefined;
  selectedValue: any;
} & Partial<IFormControlProps> & {};

export const Select: React.FC<Props> = ({
  label,
  placeholder,
  data,
  errorMessage,
  isInvalid,
  isRequired,
  selectedValue,
  ...props
}) => {
  return (
    <FormControl marginBottom={3} isInvalid={isInvalid} isRequired={isRequired}>
      <FormControl.Label>{label}</FormControl.Label>
      <NativeSelect
        backgroundColor="white"
        borderWidth={0}
        height={12}
        borderRadius="xl"
        accessibilityLabel={placeholder}
        placeholder={placeholder}
        selectedValue={selectedValue}
        {...props}
      >
        {data?.map((item) => (
          <NativeSelect.Item
            key={item.value}
            label={item.label}
            value={item.value}
          />
        ))}
      </NativeSelect>
      <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
        {errorMessage}
      </FormControl.ErrorMessage>
    </FormControl>
  );
};
