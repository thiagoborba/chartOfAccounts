import React, { useEffect, useState } from "react";
import { Screen } from "../../Components/Screen";
import { Select } from "../../Components/Select";
import { Input } from "../../Components/Input";
import { useFormik } from "formik";
import * as Yup from "yup";
import { RegistrationHeader } from "../../Components/Header";
import { ActionTypes, GlobalContext } from "../../Context";
import {
  AccountTypes,
  Account,
  ScreenMode,
  RegistrationScreenProps,
} from "../../Types";

export const errorMessage = "Preencha esse campo para continuar";

const validationSchema = Yup.object().shape({
  name: Yup.string().required(errorMessage),
  type: Yup.string().required(errorMessage),
  acceptEntry: Yup.boolean().required(errorMessage),
});

const AccountTypeData = [
  { label: "Receita", value: AccountTypes.INCOME },
  { label: "Despesa", value: AccountTypes.EXPENSE },
];

const entriesData = [
  { label: "Sim", value: true },
  { label: "Não", value: false },
];

type Values = Account;

function Validate(values: Values, validateFunction: (id: string) => boolean) {
  let errors = {} as Values;
  const { id } = values;
  const isValid = validateFunction(id);

  if (!isValid) {
    errors.id = "Id já cadastrado";
  }

  return errors;
}

const initialValues = {} as Values;

export function Registration({ navigation, route }: RegistrationScreenProps) {
  const [updateParentValues, setUpdateParentValues] = useState(true);

  const {
    dispatch,
    getActiveParentsAccounts,
    getAllParentsAccounts,
    getAccount,
    isValidAccountId,
    getIds,
  } = GlobalContext();

  const { setFieldValue, errors, values, submitForm, setValues, submitCount } =
    useFormik<Values>({
      initialValues,
      onSubmit,
      validationSchema,
      validate: (values) => Validate(values, isValidAccountId),
    });

  const hasSelectedAccount = route?.params?.acc?.id;
  const selectedAccount = route?.params?.acc!;
  const isPreviewMode = route?.params?.mode === ScreenMode.PREVIEW;

  const allParentAccounts = getAllParentsAccounts();
  const activeParentAccounts = getActiveParentsAccounts();

  const parentAccounts = isPreviewMode
    ? allParentAccounts
    : activeParentAccounts;

  const parentAccountInputData = parentAccounts.map((account) => ({
    label: `${account.id} - ${account.name}`,
    value: account.id,
  }));

  function setPreviewModeInitialValues() {
    if (isPreviewMode && hasSelectedAccount) {
      setValues(selectedAccount);
    }
  }

  function setHeader() {
    navigation.setOptions({
      header: (props) => (
        <RegistrationHeader
          onClickBack={() => navigation.goBack()}
          onClickSubmit={submitForm}
          previewMode={isPreviewMode}
        />
      ),
    });
  }

  useEffect(() => {
    setPreviewModeInitialValues();
    setHeader();
  }, []);

  function setValuesFromParentAccount() {
    const { id, parentAccountId } = getIds(values.parentAccountId!);
    const parentType = getAccount(values.parentAccountId!)?.type;
    setFieldValue("id", id);
    setFieldValue("parentAccountId", parentAccountId);
    setFieldValue("type", parentType);
    setUpdateParentValues(false);
  }

  useEffect(() => {
    if (updateParentValues && !isPreviewMode) setValuesFromParentAccount();
  }, [updateParentValues]);

  function onSubmit(values: Values) {
    dispatch({ type: ActionTypes.ADD_ACCOUNT, payload: values });
    navigation.goBack();
  }

  return (
    <Screen>
      <Select
        isDisabled={isPreviewMode}
        onValueChange={(value) => {
          setFieldValue("parentAccountId", value);
          setUpdateParentValues(true);
        }}
        data={parentAccountInputData}
        selectedValue={values.parentAccountId}
        placeholder="Selecione uma conta"
        label="Conta pai"
      />
      <Input
        isDisabled={isPreviewMode}
        value={values.id}
        isInvalid={!!errors.id}
        errorMessage={submitCount && errors.id}
        onChangeText={(value) => setFieldValue("id", value)}
        label="Código"
        placeholder="Digite o código da conta"
      />
      <Input
        isDisabled={isPreviewMode}
        value={values.name}
        isInvalid={!!errors.name}
        errorMessage={submitCount && errors.name}
        onChangeText={(value) => setFieldValue("name", value)}
        label="Nome"
        placeholder="Digite o nome da conta"
      />
      <Select
        isDisabled={isPreviewMode || !!values.parentAccountId}
        selectedValue={values.type}
        isInvalid={!!errors.type}
        errorMessage={submitCount && errors.type}
        onValueChange={(value) => setFieldValue("type", value)}
        data={AccountTypeData}
        placeholder="Selecione um tipo para a conta"
        label="Tipo"
      />
      <Select
        isDisabled={isPreviewMode}
        selectedValue={values.acceptEntry}
        isInvalid={!!errors.acceptEntry}
        errorMessage={submitCount && errors.acceptEntry}
        onValueChange={(value) => setFieldValue("acceptEntry", value)}
        data={entriesData}
        placeholder="Aceita lançamentos"
        label="Aceita lançamentos"
      />
    </Screen>
  );
}
