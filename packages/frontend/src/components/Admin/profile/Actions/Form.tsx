import { SubmitHandler, useForm } from "react-hook-form";
import { FormUser, UserDetails } from "../../../../types/user";
import InputStyled from "../../../shared/InputStyled";
import { trim } from "../../../../utils/functions/general";
import ButtonStyled from "../../../shared/ButtonStyled";
import { useTranslation } from "react-i18next";
import { useReducer, useState } from "react";
import { ClipLoader } from "react-spinners";
import { deleteMe, updateMe } from "../../../../api/routes/users";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { showDialog } from "../../../../store/slices/deleteSlice";
import { useCookies } from "react-cookie";
import Cookies from "../../../../enum/Cookies";
import { revokeRefreshToken } from "../../../../api/routes/auth";
import { useNavigate } from "react-router-dom";
import { appRoutes } from "../../../../config";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const initialState = {
  passwordType: "password",
  newPasswordType: "password",
  confirmPasswordType: "password",
};

const reducer = (
  state: {
    passwordType: string;
    newPasswordType: string;
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
    case "newPassword":
      return {
        ...state,
        newPasswordType:
          state.newPasswordType === "password" ? "text" : "password",
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

const Form = ({ user }: { user: UserDetails }) => {
  const { t, i18n } = useTranslation(["admin", "auth", "common"]);
  const [isLoading, setIsLoading] = useState(false);
  const [noData, setNoData] = useState(false);
  const dispatch = useDispatch();
  const [, , removeCookie] = useCookies([Cookies.SESSION]);
  const push = useNavigate();
  const [state, dispatchReducer] = useReducer(reducer, initialState);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormUser>();

  const password = watch("password");
  const newPassword = watch("newPassword");

  const onSubmitHandler: SubmitHandler<FormUser> = async (data) => {
    try {
      setNoData(() => false);
      setIsLoading(() => true);
      Object.keys(data).forEach(
        (key) =>
          !data[key as keyof FormUser] && delete data[key as keyof FormUser]
      );

      // If no data is provided, return early
      if (!Object.keys(data).length) {
        setIsLoading(() => false);
        return setNoData(() => true);
      }

      delete data.confirmPassword;
      await updateMe(data);

      if (data.newPassword) {
        await revokeRefreshToken();
        removeCookie(Cookies.SESSION);
        window.location.reload();
        push(appRoutes.auth.login);
      }

      setIsLoading(() => false);
      reset();
      toast.success(t("profile.actions.edit.success"));
    } catch (err) {
      setIsLoading(() => false);
      toast.error(t("profile.actions.edit.error"));
    }
  };

  const onDeleteHandler = (uniqueId: string, uniqueIdentifier: string) => {
    dispatch(
      showDialog({
        uniqueId,
        uniqueIdentifier,
        type: t("profile.user.title"),
        deleteFunction: deleteMe,
        onSuccess: async () => {
          try {
            removeCookie(Cookies.SESSION);
            await revokeRefreshToken();
            window.location.reload();
            push(appRoutes.auth.login);
          } catch (err) {}
        },
      })
    );
  };

  return (
    <form
      className={trim(`
        flex
        flex-col
        gap-4
        p-4
        animate-appear
        max-w-xl
        w-full`)}
      onSubmit={handleSubmit(onSubmitHandler)}
    >
      <div
        className={trim(`
          flex
          flex-col
          gap-4
          p-6
          bg-white
          rounded-xl
          shadow-2xl
          animate-appear
          w-full`)}
      >
        <InputStyled
          border
          label={t("register.name.label", { ns: "auth" })}
          placeholder={t("register.name.placeholder", { ns: "auth" })}
          className="rounded-sm"
          tagSize="sm"
          {...register("name", {
            minLength: {
              value: 3,
              message: t("register.name.errors.min", { ns: "auth" }),
            },
            maxLength: {
              value: 20,
              message: t("register.name.errors.max", { ns: "auth" }),
            },
          })}
          error={errors.name?.message}
          disabled={isLoading}
        />

        <InputStyled
          border
          label={t("register.password.label", { ns: "auth" })}
          placeholder={t("register.password.placeholder", { ns: "auth" })}
          className="rounded-sm"
          tagSize="sm"
          iconLeft={i18n.dir() === "rtl"}
          svgIconClassName="cursor-pointer select-none text-gray-500 hover:text-gray-700"
          svgIcon={
            state.passwordType === "password" ? (
              <FaEyeSlash
                onClick={() => dispatchReducer({ type: "password" })}
              />
            ) : (
              <FaEye onClick={() => dispatchReducer({ type: "password" })} />
            )
          }
          type={state.passwordType}
          {...register("password", {
            required: newPassword
              ? t("register.password.errors.required", { ns: "auth" })
              : false,
            minLength: {
              value: 6,
              message: t("register.password.errors.min", { ns: "auth" }),
            },
            maxLength: {
              value: 30,
              message: t("register.password.errors.max", { ns: "auth" }),
            },
          })}
          error={errors.password?.message}
          disabled={isLoading}
        />

        <InputStyled
          border
          label={t("profile.actions.edit.newPassword.label")}
          placeholder={t("profile.actions.edit.newPassword.placeholder")}
          className="rounded-sm"
          tagSize="sm"
          svgIconClassName="cursor-pointer select-none text-gray-500 hover:text-gray-700"
          iconLeft={i18n.dir() === "rtl"}
          svgIcon={
            state.newPasswordType === "password" ? (
              <FaEyeSlash
                onClick={() => dispatchReducer({ type: "newPassword" })}
              />
            ) : (
              <FaEye onClick={() => dispatchReducer({ type: "newPassword" })} />
            )
          }
          type={state.newPasswordType}
          {...register("newPassword", {
            required: password
              ? t("register.password.errors.required", { ns: "auth" })
              : false,
            minLength: {
              value: 6,
              message: t("profile.actions.edit.newPassword.errors.min"),
            },
            maxLength: {
              value: 30,
              message: t("profile.actions.edit.newPassword.errors.max"),
            },
          })}
          error={errors.newPassword?.message}
          disabled={isLoading}
        />

        <InputStyled
          border
          label={t("register.confirmPassword.label", { ns: "auth" })}
          placeholder={t("register.confirmPassword.placeholder", {
            ns: "auth",
          })}
          className="rounded-sm"
          tagSize="sm"
          svgIconClassName="cursor-pointer select-none text-gray-500 hover:text-gray-700"
          iconLeft={i18n.dir() === "rtl"}
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
              newPassword
                ? value === newPassword ||
                  t("register.confirmPassword.errors.match", { ns: "auth" })
                : true,
            minLength: {
              value: 6,
              message: t("register.confirmPassword.errors.min", { ns: "auth" }),
            },
            maxLength: {
              value: 30,
              message: t("register.confirmPassword.errors.max", { ns: "auth" }),
            },
          })}
          error={errors.confirmPassword?.message}
          disabled={isLoading}
        />

        {noData && (
          <p className="text-red-500 text-responsive-2md text-center font-semibold">
            {t("profile.actions.edit.noData")}
          </p>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-4 justify-center mt-6">
        <ButtonStyled
          warning
          type="submit"
          title={
            isLoading
              ? t("loading", { ns: "common" })
              : t("profile.actions.edit.submit")
          }
          SvgIcon={isLoading && <ClipLoader size={20} color="white" />}
          disabled={isLoading}
          hover
          border
          className="rounded-lg"
        />

        <ButtonStyled
          danger
          onClick={() => onDeleteHandler(user._id.toString(), user.email)}
          title={
            isLoading
              ? t("loading", { ns: "common" })
              : t("profile.actions.delete.submit")
          }
          SvgIcon={isLoading && <ClipLoader size={20} color="white" />}
          disabled={isLoading}
          hover
          border
          className="rounded-lg"
        />
      </div>
    </form>
  );
};

export default Form;
