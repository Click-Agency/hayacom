import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Register } from "../../../types/auth";
import { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import InputStyled from "../../shared/InputStyled";
import ButtonStyled from "../../shared/ButtonStyled";
import { ClipLoader } from "react-spinners";
//import SelectStyled from "../../shared/SelectStyled";
import { register as registerAPI } from "../../../api/routes/auth";
import toast from "react-hot-toast";
import { appRoutes } from "../../../config";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const initialState = {
  passwordType: "password",
  confirmPasswordType: "password",
};

const reducer = (
  state: {
    passwordType: string;
    confirmPasswordType: string;
  },
  action: { type: string }
) => {
  switch (action.type) {
    case "password":
      return {
        ...state,
        passwordType: state.passwordType === "password" ? "text" : "password",
      };
    case "confirmPassword":
      return {
        ...state,
        confirmPasswordType:
          state.confirmPasswordType === "password" ? "text" : "password",
      };
    default:
      return state;
  }
};

const Form = () => {
  const { t } = useTranslation(["auth", "common"]);
  const [state, dispatchReducer] = useReducer(reducer, initialState);
  const [isLoading, setIsLoading] = useState(false);
  const push = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Register>();

  const password = watch("password");

  const onSubmitHandler: SubmitHandler<Register> = async (data) => {
    try {
      setIsLoading(() => true);
      data.role = "user";
      delete data.confirmPassword;
      await registerAPI(data);
      setIsLoading(() => false);
      reset();
      toast.success(t("register.success"));
      push(appRoutes.home);
    } catch (err) {
      setIsLoading(() => false);
      toast.error(t("register.error"));
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
      className="flex flex-col gap-4"
    >
      <InputStyled
        border
        label={t("register.name.label")}
        placeholder={t("register.name.placeholder")}
        className="rounded-sm"
        tagSize="sm"
        {...register("name", {
          required: {
            value: true,
            message: t("register.name.errors.required"),
          },
          minLength: {
            value: 3,
            message: t("register.name.errors.min"),
          },
          maxLength: {
            value: 20,
            message: t("register.name.errors.max"),
          },
        })}
        error={errors.name?.message}
        disabled={isLoading}
      />

      <InputStyled
        border
        label={t("register.email.label")}
        placeholder={t("register.email.placeholder")}
        className="rounded-sm"
        tagSize="sm"
        {...register("email", {
          required: {
            value: true,
            message: t("register.email.errors.required"),
          },
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: t("register.email.errors.invalid"),
          },
        })}
        error={errors.email?.message}
        disabled={isLoading}
      />

      <InputStyled
        border
        label={t("register.password.label")}
        placeholder={t("register.password.placeholder")}
        className="rounded-sm"
        tagSize="sm"
        svgIconClassName="cursor-pointer select-none text-gray-500 hover:text-gray-700"
        svgIcon={
          state.passwordType === "password" ? (
            <FaEyeSlash onClick={() => dispatchReducer({ type: "password" })} />
          ) : (
            <FaEye onClick={() => dispatchReducer({ type: "password" })} />
          )
        }
        type={state.passwordType}
        {...register("password", {
          required: {
            value: true,
            message: t("register.password.errors.required"),
          },
          minLength: {
            value: 6,
            message: t("register.password.errors.min"),
          },
          maxLength: {
            value: 30,
            message: t("register.password.errors.max"),
          },
        })}
        error={errors.password?.message}
        disabled={isLoading}
      />

      <InputStyled
        border
        label={t("register.confirmPassword.label")}
        placeholder={t("register.confirmPassword.placeholder")}
        className="rounded-sm"
        tagSize="sm"
        svgIconClassName="cursor-pointer select-none text-gray-500 hover:text-gray-700"
        svgIcon={
          state.confirmPasswordType === "password" ? (
            <FaEyeSlash
              onClick={() => dispatchReducer({ type: "confirmPassword" })}
            />
          ) : (
            <FaEye
              onClick={() => dispatchReducer({ type: "confirmPassword" })}
            />
          )
        }
        type={state.confirmPasswordType}
        {...register("confirmPassword", {
          validate: (value) =>
            password
              ? value === password || t("register.confirmPassword.errors.match")
              : true,
          minLength: {
            value: 6,
            message: t("register.confirmPassword.errors.min"),
          },
          maxLength: {
            value: 30,
            message: t("register.confirmPassword.errors.max"),
          },
        })}
        error={errors.confirmPassword?.message}
        disabled={isLoading}
      />

      {/* <SelectStyled
        label={t("register.role.label")}
        defaultText={t("register.role.placeholder")}
        options={[
          {
            label: "Admin",
            value: "admin",
          },
          {
            label: "User",
            value: "user",
          },
        ]}
        error={errors.role?.message}
        disabled={isLoading}
        {...register("role", {
          required: {
            value: true,
            message: t("register.role.errors.required"),
          },
          pattern: {
            value: /^(admin|user)$/,
            message: t("register.role.errors.invalid"),
          },
        })}
      /> */}

      <ButtonStyled
        type="submit"
        title={
          isLoading ? t("loading", { ns: "common" }) : t("register.submit")
        }
        SvgIcon={isLoading && <ClipLoader size={20} color="white" />}
        disabled={isLoading}
        className="text-white bg-primary hover:bg-green-900"
      />
    </form>
  );
};

export default Form;
