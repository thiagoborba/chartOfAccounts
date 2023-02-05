import React from "react";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  FormControl,
  Select as NativeSelect,
  WarningOutlineIcon,
} from "native-base";
import { ISelectProps } from "native-base/lib/typescript/components/primitives/Select";

type Props = ISelectProps & {
  label: string;
  data: { label: string; value: string }[];
  errorMessage?: string;
};

export const Select: React.FC<Props> = ({
  label,
  placeholder,
  data,
  errorMessage,
  ...props
}) => {
  return (
    <FormControl>
      <FormControl.Label>{label}</FormControl.Label>
      <NativeSelect
        backgroundColor="white"
        borderWidth={0}
        height={12}
        borderRadius="xl"
        accessibilityLabel={placeholder}
        placeholder={placeholder}
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
