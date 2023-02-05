import React from "react";
import { StackParamList } from "../../App";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Screen } from "../../Components/Screen";
import { Select } from "../../Components/Select";
import { Input } from "../../Components/Input";
import { useFormik } from "formik";
import * as Yup from "yup";
import { RegistrationHeader } from "../../Components/Header";
import { errorMessage } from "../../constants";

type Props = NativeStackScreenProps<StackParamList>;

type Values = {
  account: string;
  cod: string;
  name: string;
  type: string;
  entries: string;
};

const validationSchema = Yup.object().shape({
  account: Yup.string().required(errorMessage),
  cod: Yup.string().required(errorMessage),
  name: Yup.string().required(errorMessage),
  type: Yup.string().required(errorMessage),
  entries: Yup.string().required(errorMessage),
});

export function Registration({ navigation }: Props) {
  const { setFieldValue, errors, values, submitForm } = useFormik<Values>({
    initialValues: {
      account: "",
      cod: "",
      name: "",
      type: "",
      entries: "",
    },
    onSubmit,
    validationSchema,
  });

  React.useEffect(() => {
    navigation.setOptions({
      header: (props) => (
        <RegistrationHeader {...props} submitAction={submitForm} />
      ),
    });
  }, []);

  function onSubmit(values: Values) {
    console.log(values);
  }

  return (
    <Screen>
      <Select
        onValueChange={(value) => setFieldValue("account", value)}
        data={[{ label: "Sim", value: "Sim" }]}
        isInvalid={!!errors.account}
        errorMessage={errors.account}
        selectedValue={values.account}
        placeholder="Selecione uma conta"
        label="Conta pai"
      />
      <Input
        value={values.cod}
        isInvalid={!!errors.cod}
        errorMessage={errors.cod}
        onChangeText={(value) => setFieldValue("cod", value)}
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
        selectedValue={values.type}
        isInvalid={!!errors.type}
        errorMessage={errors.type}
        onValueChange={(value) => setFieldValue("type", value)}
        data={[
          { label: "Ativo", value: "ativo" },
          { label: "Passivo", value: "passivo" },
        ]}
        placeholder="Selecione um tipo para a conta"
        label="Tipo"
      />
      <Select
        selectedValue={values.entries}
        isInvalid={!!errors.entries}
        errorMessage={errors.entries}
        onValueChange={(value) => setFieldValue("entries", value)}
        data={[
          { label: "Sim", value: "Sim" },
          { label: "Não", value: "Não" },
        ]}
        placeholder="Aceita lançamentos"
        label="Aceita lançamentos"
      />
    </Screen>
  );
}
