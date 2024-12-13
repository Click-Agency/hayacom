import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Login } from "../../../types/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputStyled from "../../shared/InputStyled";
import ButtonStyled from "../../shared/ButtonStyled";
import { ClipLoader } from "react-spinners";
import { trim } from "../../../utils/functions/general";
import { getHeaderAuthorization } from "../../../api/utils";
import { login } from "../../../api/routes/auth";
import useStorage from "../../../hooks/useStorage";
import toast from "react-hot-toast";
import { appRoutes } from "../../../config";

const Form = () => {
  const { t } = useTranslation(["auth", "common"]);

  const [isLoading, setIsLoading] = useState(false);
  const [invalidCredentials, setInvalidCredentials] = useState(false);
  const push = useNavigate();
  const { setValue } = useStorage("_hayakomSession");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Login>();

  const onSubmitHandler: SubmitHandler<Login> = async (data) => {
    try {
      setIsLoading(() => false);

      const res = await login(data);

      if (!res.data) {
        setIsLoading(() => false);
        setInvalidCredentials(() => true);
        return;
      }

      const accessToken = getHeaderAuthorization(res);

      if (!accessToken) {
        setInvalidCredentials(() => true);
        return;
      }

      if (data.rememberMe) {
        setValue({ ...res.data.user, accessToken }, "localStorage");
      } else {
        setValue({ ...res.data.user, accessToken }, "sessionStorage");
      }

      setIsLoading(() => false);
      reset();
      window.location.reload();
      push(appRoutes.admin);
      toast.success(t("login.success"));
    } catch (err) {
      setIsLoading(() => false);
      setInvalidCredentials(() => true);
      toast.error(t("login.error"));
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
      className="flex flex-col gap-4"
    >
      <InputStyled
        border
        label={t("login.email.label")}
        placeholder={t("login.email.placeholder")}
        className="rounded-sm"
        tagSize="sm"
        {...register("email", {
          required: {
            value: true,
            message: t("login.email.errors.required"),
          },
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: t("login.email.errors.invalid"),
          },
        })}
        error={errors.email?.message}
        disabled={isLoading}
      />

      <InputStyled
        border
        label={t("login.password.label")}
        placeholder={t("login.password.placeholder")}
        className="rounded-sm"
        tagSize="sm"
        type="password"
        {...register("password", {
          required: {
            value: true,
            message: t("login.password.errors.required"),
          },
          minLength: {
            value: 6,
            message: t("login.password.errors.min"),
          },
          maxLength: {
            value: 30,
            message: t("login.password.errors.max"),
          },
        })}
        error={errors.password?.message}
        disabled={isLoading}
      />

      <InputStyled
        contianerClassName="!flex !gap-2 !flex-row-reverse !items-center"
        labelClassName="!p-0 !pb-1 !m-0 !text-responsive-2xs !font-normal"
        inputContainerClassName="!w-fit"
        type="checkbox"
        disabled={isLoading}
        label={t("login.rememberMe")}
        {...register("rememberMe")}
      />

      <ButtonStyled
        type="submit"
        title={isLoading ? t("loading", { ns: "common" }) : t("login.submit")}
        SvgIcon={isLoading && <ClipLoader size={20} color="white" />}
        disabled={isLoading}
        className="text-white bg-primary hover:bg-green-900"
      />

      {!isLoading && invalidCredentials && (
        <p
          className={trim(`
            text-responsive-2sm
            text-center
            text-red-500
            font-semibold
            bg-red-100
            p-2`)}
        >
          {t("login.error")}
        </p>
      )}
    </form>
  );
};

export default Form;
