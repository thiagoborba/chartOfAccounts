import React, { useEffect } from "react";
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
  id: Yup.string().required(errorMessage),
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

const initialValues = {} as Values;

export function Registration({ navigation, route }: RegistrationScreenProps) {
  const {
    dispatch,
    getActiveParentsAccounts,
    getAllParentsAccounts,
    getAccount,
  } = GlobalContext();

  const { setFieldValue, errors, values, submitForm, setValues } =
    useFormik<Values>({
      initialValues,
      onSubmit,
      validationSchema,
      validateOnChange: false,
      validateOnBlur: true,
    });

  const isPreviewMode = route?.params?.mode === ScreenMode.PREVIEW;
  const hasSelectedAccount = route?.params?.acc?.id;
  const selectedAccount = route.params.acc!;

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

  function setAccounTypeByParentAccountId() {
    const parentAccount = getAccount(values.parentAccountId!)!;
    if (!isPreviewMode && parentAccount) {
      setFieldValue("type", parentAccount.type);
    }
  }

  useEffect(() => {
    setAccounTypeByParentAccountId();
  }, [values.parentAccountId]);

  function onSubmit(values: Values) {
    dispatch({ type: ActionTypes.ADD_ACCOUNT, payload: values });
    navigation.goBack();
  }

  return (
    <Screen>
      <Select
        isDisabled={isPreviewMode}
        onValueChange={(value) => setFieldValue("parentAccountId", value)}
        data={parentAccountInputData}
        selectedValue={values.parentAccountId}
        placeholder="Selecione uma conta"
        label="Conta pai"
      />
      <Input
        isDisabled={isPreviewMode}
        value={values.id}
        isInvalid={!!errors.id}
        errorMessage={errors.id}
        onChangeText={(value) => setFieldValue("id", value)}
        label="Código"
        placeholder="Digite o código da conta"
      />
      <Input
        isDisabled={isPreviewMode}
        value={values.name}
        isInvalid={!!errors.name}
        errorMessage={errors.name}
        onChangeText={(value) => setFieldValue("name", value)}
        label="Nome"
        placeholder="Digite o nome da conta"
      />
      <Select
        isDisabled={isPreviewMode || !!values.parentAccountId}
        selectedValue={values.type}
        isInvalid={!!errors.type}
        errorMessage={errors.type}
        onValueChange={(value) => setFieldValue("type", value)}
        data={AccountTypeData}
        placeholder="Selecione um tipo para a conta"
        label="Tipo"
      />
      <Select
        isDisabled={isPreviewMode}
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
