import { t } from "i18next";
import * as yup from "yup";

export const LOGIN_FORM_INITIAL_VALUES = {
  email: "",
  password: "",
};

export const SIGNUP_FORM_INITIAL_VALUES = {
  email: "",
  firstName: "",
  lastName: "",
  password: "",
  passwordConfirmation: "",
};

export const LOGIN_FORM_VALIDATION_SCHEMA = yup.object().shape({
  email: yup.string().email(t("invalidEmail")).required(t("required")),
  password: yup.string().required(t("required")),
});

export const SIGNUP_FORM_VALIDATION_SCHEMA = yup.object().shape({
  email: yup.string().email(t("invalidEmail")).required(t("required")),
  firstName: yup.string().required(t("required")),
  lastName: yup.string().required(t("required")),
  password: yup.string().required(t("required")),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password")], t("passwordMustMatch"))
    .required(t("required")),
});
