import React, { useEffect } from "react";
import { StackParamList } from "../../App";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Screen } from "../../Components/Screen";
import { Select } from "../../Components/Select";
import { Input } from "../../Components/Input";
import { useFormik } from "formik";
import * as Yup from "yup";
import { RegistrationHeader } from "../../Components/Header";
import { ACCOUNT_TYPE, errorMessage } from "../../constants";
import { ActionTypes, GlobalContext } from "../../Context";
import { AccountTypes } from "../../Types";

type Props = NativeStackScreenProps<StackParamList>;

type Values = {
  parentAccountId: string;
  id: string;
  name: string;
  type: string;
  acceptEntry: boolean | undefined;
};

const validationSchema = Yup.object().shape({
  id: Yup.string().required(errorMessage),
  name: Yup.string().required(errorMessage),
  type: Yup.string().required(errorMessage),
  acceptEntry: Yup.boolean().required(errorMessage),
});

const AccountTypeData = [
  { label: ACCOUNT_TYPE.INCOME, value: AccountTypes.INCOME },
  { label: ACCOUNT_TYPE.EXPENSE, value: AccountTypes.EXPENSE },
];

const entriesData = [
  { label: "Sim", value: true },
  { label: "Não", value: false },
];

export function Registration({ navigation }: Props) {
  const { setFieldValue, errors, values, submitForm } = useFormik<Values>({
    initialValues: {
      parentAccountId: "",
      id: "",
      name: "",
      type: "",
      acceptEntry: undefined,
    },
    onSubmit,
    validationSchema,
    validateOnChange: false,
    validateOnBlur: true,
  });

  const {
    state: { accounts },
    dispatch,
  } = GlobalContext();
  const parentAccounts = accounts?.filter(
    (account) => account.canBeParentAccount
  );

  const hasParentID = !!values.parentAccountId;
  const parentType = parentAccounts?.find(
    (account) => account.id === values.parentAccountId
  )?.type;
  const typeValue = hasParentID ? parentType : values.type;

  React.useEffect(() => {
    navigation.setOptions({
      header: (props) => (
        <RegistrationHeader {...props} submitAction={submitForm} />
      ),
    });
  }, []);

  useEffect(() => {
    if (hasParentID) {
      setFieldValue("type", parentType);
    }
  }, [values.parentAccountId]);

  function onSubmit(values: Values) {
    const account = { ...values, canBeParentAccount: !values.acceptEntry };

    dispatch({ type: ActionTypes.ADD_ACCOUNT, payload: account });
    navigation.goBack();
  }

  return (
    <Screen>
      <Select
        onValueChange={(value) => setFieldValue("parentAccountId", value)}
        data={parentAccounts?.map((account) => ({
          label: `${account.id} - ${account.name}`,
          value: account.id,
        }))}
        selectedValue={values.parentAccountId}
        placeholder="Selecione uma conta"
        label="Conta pai"
      />
      <Input
        value={values.id}
        isInvalid={!!errors.id}
        errorMessage={errors.id}
        onChangeText={(value) => setFieldValue("id", value)}
        label="Código"
        placeholder="Digite o código da conta"
      />
      <Input
        value={values.name}
        isInvalid={!!errors.name}
        errorMessage={errors.name}
        onChangeText={(value) => setFieldValue("name", value)}
        label="Nome"
        placeholder="Digite o nome da conta"
      />
      <Select
        isDisabled={hasParentID}
        selectedValue={typeValue}
        isInvalid={!!errors.type}
        errorMessage={errors.type}
        onValueChange={(value) => setFieldValue("type", value)}
        data={AccountTypeData}
        placeholder="Selecione um tipo para a conta"
        label="Tipo"
      />
      <Select
        selectedValue={values.acceptEntry}
        isInvalid={!!errors.acceptEntry}
        errorMessage={errors.acceptEntry}
        onValueChange={(value) => setFieldValue("acceptEntry", value)}
        data={entriesData}
        placeholder="Aceita lançamentos"
        label="Aceita lançamentos"
      />
    </Screen>
  );
}
