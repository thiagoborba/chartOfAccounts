import React from "react";
import { StackParamList } from "../../App";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Screen } from "../../Components/Screen";
import { Select } from "../../Components/Select";
import { Input } from "../../Components/Input";

type Props = NativeStackScreenProps<StackParamList>;

export function Registration({ navigation }: Props) {
  return (
    <Screen>
      <Select
        data={[]}
        errorMessage=""
        placeholder="Selecione uma conta"
        label="Conta pai"
        mb={4}
      />
      <Input label="Código" placeholder="Digite o código da conta" mb={4} />
      <Input label="Nome" placeholder="Digite o nome da conta" mb={4} />
      <Select
        data={[]}
        errorMessage=""
        placeholder="Selecione um tipo para a conta"
        label="Tipo"
        mb={4}
      />
      <Select
        data={[]}
        errorMessage=""
        placeholder="Aceita lançamentos"
        label="Aceita lançamentos"
        mb={4}
      />
    </Screen>
  );
}
