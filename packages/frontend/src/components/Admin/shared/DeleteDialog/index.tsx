"use client";

import {
  DialogHTMLAttributes,
  FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import ButtonStyled from "../../../shared/ButtonStyled";
import InputStyled from "../../../shared/InputStyled";
import useRemoveScroll from "../../../../hooks/useRemoveScroll";
import { pascalCase, trim } from "../../../../utils/functions/general";
import { RootState } from "../../../../types/redux";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { closeDialog } from "../../../../store/slices/deleteSlice";
import { ClipLoader } from "react-spinners";
import { appRoutes } from "../../../../config";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const DeleteDialog = ({
  ...attributes
}: DialogHTMLAttributes<HTMLDialogElement>) => {
  const { t } = useTranslation("admin");

  const title = t("dialog.delete.title");
  const description1 = t("dialog.delete.description1");
  const description2 = t("dialog.delete.description2");
  const wrtitle = t("dialog.delete.warning.title");
  const wrtext = t("dialog.delete.warning.text");
  const typeText = t("dialog.delete.form.confirmInput.label.typeText");
  const identifierText = t(
    "dialog.delete.form.confirmInput.label.identifierText"
  );
  const idText = t("dialog.delete.form.confirmInput.label.idText");
  const continueText = t("dialog.delete.form.confirmInput.label.continueText");
  const placeholder = t("dialog.delete.form.confirmInput.placeholder");
  const cancel = t("dialog.delete.form.btn.cancel");
  const deleteText = t("dialog.delete.form.btn.deleteText");
  const deleting = t("dialog.delete.form.btn.deleting");

  const errorId = t("dialog.delete.form.errors.input.mustBeId");
  const errorName = t("dialog.delete.form.errors.input.mustBeName");

  const failed = t("dialog.delete.form.errors.failed");

  const success = t("dialog.delete.form.success");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    text: "",
    touched: false,
  });

  const dialogRef = useRef<HTMLDialogElement>(null);
  const childRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const push = useNavigate();

  const dispatch = useDispatch();
  const show = useSelector((state: RootState) => state.delete.show);
  const target = useSelector((state: RootState) => state.delete.target);
  const deleteFunction = useSelector(
    (state: RootState) => state.delete.target.deleteFunction
  );
  const onSuccess = useSelector(
    (state: RootState) => state.delete.target.onSuccess
  );
  const { uniqueId, uniqueIdentifier, type } = target;

  useRemoveScroll(show);

  useEffect(() => {
    if (show) dialogRef.current?.showModal();
  }, [show]);

  const close = useCallback(() => {
    dialogRef.current?.close();
    setTimeout(() => {
      dispatch(closeDialog());
      setError(() => ({ text: "", touched: false }));
    }, 300);
  }, [dispatch]);

  const onChangeHandler = useCallback(() => {
    const value = inputRef.current?.value?.trim();

    if (value !== uniqueIdentifier && value !== uniqueId)
      return setError((prev) => ({
        ...prev,
        text: `${errorId} ${uniqueId} ${errorName} ${uniqueIdentifier}.`,
      }));

    setError((prev) => ({ ...prev, text: "" }));
  }, [uniqueId, uniqueIdentifier]);

  const goBackHandler = useCallback(() => {
    if (window.history.length > 2) return window.history.back();

    push(appRoutes.admin);
  }, [push, type]);

  const onSubmitHandler = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setError((prev) => ({ ...prev, touched: true }));

      const value = inputRef.current?.value?.trim();

      if (
        !inputRef.current ||
        (value !== target.uniqueIdentifier && value !== target.uniqueId)
      )
        return onChangeHandler();

      try {
        setLoading(() => true);
        if (!deleteFunction) throw new Error("Delete function is not defined");

        // throw error non serilaible
        await deleteFunction(target.uniqueId);

        if (onSuccess) await onSuccess();

        close();
        inputRef.current.value = "";
        setLoading(() => false);
        setError(() => ({ text: "", touched: false }));
        window.location.reload();

        toast.success(`${target.type} ${success}`);
      } catch (err) {
        setLoading(() => false);
        toast.error(`${failed} ${target.type}`);
      }
    },
    [target, onChangeHandler, deleteFunction, close, goBackHandler]
  );

  const onClickHanlder = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (!childRef.current) return;
    const dialogDimensions = childRef.current.getBoundingClientRect();
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      close();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className={trim(`
        rounded-xl
        max-w-2xl`)}
      {...attributes}
      onMouseDown={onClickHanlder}
    >
      <div
        ref={childRef}
        className={trim(`
          bg-white
          text-body-primary
          !rounded-xl
          border-2
          border-[#A39FA06B]`)}
      >
        <div className="px-7 py-4 flex flex-col gap-5">
          <h1 className="text-responsive-md font-bold">
            {title} {pascalCase(type)}
          </h1>

          <h2 className="text-responsive-xs font-semibold">
            {description1} {type}, {description2}
          </h2>

          <h3
            className={trim(`
              bg-red-950 
              p-2 
              rounded-md 
              text-red-300 
              text-responsive-2xs`)}
          >
            <strong>{wrtitle}:</strong> {wrtext}
          </h3>
        </div>

        <form
          onSubmit={onSubmitHandler}
          className={trim(`
            px-7 
            py-4 
            bg-box-light 
            flex 
            flex-col
            gap-5
            rounded-b-lg`)}
        >
          <InputStyled
            border
            ref={inputRef}
            tagSize="sm"
            placeholder={placeholder}
            label={`${typeText} ${type} ${identifierText} "${uniqueIdentifier}", ${idText} "${uniqueId}" ${continueText}`}
            error={error.text.length && error.touched ? error.text : undefined}
            onChange={onChangeHandler}
            disabled={loading}
          />

          <div
            className={trim(`
            flex
            justify-center
            gap-5
            flex-col-reverse
            md:flex-row`)}
          >
            <ButtonStyled
              className="rounded-full !px-14"
              border
              hover
              title={cancel}
              size="sm"
              type="reset"
              onClick={close}
              disabled={loading}
            />
            <ButtonStyled
              className="rounded-full !px-14"
              border
              hover
              danger
              title={loading ? deleting : deleteText}
              size="sm"
              type="submit"
              disabled={loading}
              SvgIcon={
                loading && (
                  <ClipLoader
                    size={15}
                    className={trim(`
                      !border-t-body-lightest
                      !border-r-body-lightest
                      !border-l-body-lightest
                      !border-b-transparent
                      group-hover:!border-t-primary
                      group-hover:!border-r-primary
                      group-hover:!border-l-primary
                      group-hover:!border-b-transparent`)}
                  />
                )
              }
            />
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default DeleteDialog;
