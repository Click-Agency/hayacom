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
import toast from "react-hot-toast";
import { appRoutes } from "../../../config";
import { useCookies } from "react-cookie";
import Cookies from "../../../enum/Cookies";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import i18n from "../../../i18n";

const Form = () => {
  const { t } = useTranslation(["auth", "common"]);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [invalidCredentials, setInvalidCredentials] = useState(false);
  const push = useNavigate();
  const [, setCookie] = useCookies([Cookies.SESSION], {
    doNotParse: true,
    doNotUpdate: true,
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Login>();

  const onSubmitHandler: SubmitHandler<Login> = async (data) => {
    try {
      setIsLoading(() => true);

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

      setCookie(
        Cookies.SESSION,
        { ...res.data.user, accessToken },
        {
          expires: data.rememberMe
            ? new Date(Date.now() + 60 * 60 * 24 * 7)
            : undefined,

          maxAge: data.rememberMe ? 60 * 60 * 24 * 7 : undefined,
          secure: import.meta.env.NODE_ENV === "production",
          sameSite: "strict",
        }
      );

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
      className="flex flex-col gap-4 w-full md:w-2/3"
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
        svgIconClassName="cursor-pointer select-none text-gray-500 hover:text-gray-700"
        iconLeft={i18n.dir() === "rtl"}
        svgIcon={
          showPassword ? (
            <FaEye onClick={() => setShowPassword(() => false)} />
          ) : (
            <FaEyeSlash onClick={() => setShowPassword(() => true)} />
          )
        }
        type={showPassword ? "text" : "password"}
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
