import React from "react";

import { Form, Formik } from "formik";
import { Button } from "neetoui";
import { Input } from "neetoui/formik";
import { useTranslation } from "react-i18next";

import { useAuthDispatch } from "contexts/auth";
import { useUserDispatch } from "contexts/user";
import { useLogin } from "hooks/reactQuery/useAuthenticationApi";
import routes from "routes";

import {
  LOGIN_FORM_INITIAL_VALUES,
  LOGIN_FORM_VALIDATION_SCHEMA,
} from "./constants";

const Login = ({ history }) => {
  const { t } = useTranslation();

  const authDispatch = useAuthDispatch();
  const userDispatch = useUserDispatch();

  const { mutate: login } = useLogin();

  const handleSubmit = ({ email, password }) => {
    login(
      { email, password },
      {
        onSuccess: ({ auth_token, user, is_admin }) => {
          authDispatch({
            type: "LOGIN",
            payload: { auth_token, email, is_admin },
          });
          userDispatch({ type: "SET_USER", payload: { user } });
          history.push(routes.root);
        },
      }
    );
  };

  return (
    <div className="neeto-ui-bg-gray-100 flex h-screen w-screen flex-row items-center justify-center overflow-y-auto overflow-x-hidden p-6">
      <div className="mx-auto flex h-full w-full flex-col items-center justify-center sm:max-w-md">
        <h2 className="neeto-ui-text-gray-800 mb-5 text-center text-3xl font-extrabold">
          {t("signIn")}
        </h2>
        <Formik
          initialValues={LOGIN_FORM_INITIAL_VALUES}
          validationSchema={LOGIN_FORM_VALIDATION_SCHEMA}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="neeto-ui-rounded-md neeto-ui-bg-white neeto-ui-shadow-s w-full space-y-6 border p-8">
              <Input
                required
                data-cy="login-email-text-field"
                label={t("email")}
                name="email"
                placeholder="oliver@example.com"
                type="email"
              />
              <Input
                required
                data-cy="login-password-text-field"
                label={t("password")}
                name="password"
                placeholder="******"
                type="password"
              />
              <Button
                fullWidth
                className="h-8"
                data-cy="login-submit-button"
                disabled={isSubmitting}
                label={t("login")}
                loading={isSubmitting}
                size="small"
                type="submit"
              />
            </Form>
          )}
        </Formik>
        <div className="mt-4 flex flex-col items-center justify-center space-y-2">
          <div className="flex flex-row items-center justify-start space-x-1">
            <p className="neeto-ui-text-gray-600 font-normal">
              {t("dontHaveAccount")}
            </p>
            <Button
              data-cy="sign-up-link"
              label={t("signup")}
              size="small"
              style="link"
              to={routes.signup}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
