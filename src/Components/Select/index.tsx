import React from "react";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  FormControl,
  Select as NativeSelect,
  WarningOutlineIcon,
} from "native-base";
import { ISelectProps } from "native-base/lib/typescript/components/primitives/Select";
import { IFormControlProps } from "native-base/lib/typescript/components/composites/FormControl/types";

type Props = ISelectProps &
  Partial<IFormControlProps> & {
    label: string;
    data: { label: string; value: any }[];
    errorMessage?: string;
  };

export const Select: React.FC<Props> = ({
  label,
  placeholder,
  data,
  errorMessage,
  isInvalid,
  isRequired,
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
