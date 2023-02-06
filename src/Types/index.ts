import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParamList } from "../App";

export type Account = {
  parentAccountId?: string;
  id: string;
  name: string;
  type: string;
  acceptEntry: boolean | undefined;
  active: boolean;
};

export enum AccountTypes {
  INCOME = "INCOME",
  EXPENSE = "EXPENSE",
}

export enum ScreenMode {
  PREVIEW = "PREVIEW",
  CREATE = "CREATE",
}

export enum Screens {
  HOME = "Home",
  REGISTRATION = "Registration",
}

export type RegistrationScreenProps = NativeStackScreenProps<
  StackParamList,
  Screens.REGISTRATION
>;

export type HomeScreenProps = NativeStackScreenProps<
  StackParamList,
  Screens.HOME
>;
