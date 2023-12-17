import React from "react";

import { Form, Formik } from "formik";
import { Button } from "neetoui";
import { Input } from "neetoui/formik";
import { useTranslation } from "react-i18next";

import { useSignup } from "hooks/reactQuery/useAuthenticationApi";
import routes from "routes";

import {
  SIGNUP_FORM_INITIAL_VALUES,
  SIGNUP_FORM_VALIDATION_SCHEMA,
} from "./constants";

const Signup = ({ history }) => {
  const { t } = useTranslation();

  const { mutate: signup } = useSignup();

  const handleSubmit = formData => {
    signup(formData, {
      onSuccess: () => history.push(routes.login),
    });
  };

  return (
    <div className="neeto-ui-bg-gray-100 flex h-screen w-screen flex-row items-center justify-center overflow-y-auto overflow-x-hidden p-6">
      <div className="mx-auto flex h-full w-full flex-col items-center justify-center sm:max-w-md">
        <h2 className="neeto-ui-text-gray-800 mb-5 text-center text-3xl font-extrabold">
          {t("signup")}
        </h2>
        <Formik
          initialValues={SIGNUP_FORM_INITIAL_VALUES}
          validationSchema={SIGNUP_FORM_VALIDATION_SCHEMA}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="neeto-ui-rounded-md neeto-ui-bg-white neeto-ui-shadow-s w-full space-y-6 border p-8">
              <Input
                required
                label={t("email")}
                name="email"
                placeholder="oliver@example.com"
                type="email"
              />
              <Input
                required
                label={t("firstName")}
                name="firstName"
                placeholder="Oliver"
                type="text"
              />
              <Input
                required
                label={t("lastName")}
                name="lastName"
                placeholder="Smith"
                type="text"
              />
              <Input
                required
                label={t("password")}
                name="password"
                placeholder="******"
                type="password"
              />
              <Input
                required
                label={t("confirmPassword")}
                name="passwordConfirmation"
                placeholder="******"
                type="password"
              />
              <Button
                fullWidth
                className="h-8"
                disabled={isSubmitting}
                label={t("signup")}
                loading={isSubmitting}
                size="small"
                type="submit"
              />
            </Form>
          )}
        </Formik>
        <div className="mt-4 flex flex-row items-center justify-start space-x-1">
          <p className="neeto-ui-text-gray-600 font-normal">
            {t("alreadyHaveAccount")}
          </p>
          <Button
            label={t("login")}
            size="small"
            style="link"
            to={routes.login}
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
