import { useEffect } from "react";
import { Controller, useFieldArray } from "react-hook-form";
import { trim } from "../../../../utils/functions/general";
import InputStyled from "../../../shared/InputStyled";
import ButtonStyled from "../../../shared/ButtonStyled";
import { useTranslation } from "react-i18next";
import { AiOutlineMinusCircle, AiTwotonePlusCircle } from "react-icons/ai";

const AddItems = ({
  title,
  control,
  errors,
  disabled,
  target,
  elemType,
  tagSize,
}: {
  title?: string;
  control: any;
  errors: any;
  disabled?: boolean;
  target: string;
  defaultValues?: string[];
  elemType?: "input" | "textarea";
  tagSize?: "sm" | "xs" | "md" | "lg";
}) => {
  const { t } = useTranslation(["admin", "common"]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: target,
  });

  useEffect(() => {
    if (fields.length <= 0) append("");
  }, [fields.length, append]);

  return (
    <div className="flex flex-col flex-1 gap-3">
      <h2
        className={trim(`
          mb-2.5
          text-lg
          font-semibold`)}
      >
        {title}
      </h2>
      {fields.map((field, index) => (
        <div key={field.id} className="flex flex-col gap-2.5">
          <div
            className={trim(`
              flex
              items-center
              gap-4
              bg-gray-200
              rounded-lg
              p-2`)}
          >
            <h3 className="text-responsive-2sm text-nowrap font-semibold">
              {index + 1} -{" "}
            </h3>
            <Controller
              name={`${target}.${index}`}
              control={control}
              defaultValue=""
              rules={{
                required: {
                  value: true,
                  message: t("packages.items.errors.required"),
                },

                minLength: {
                  value: 3,
                  message: t("packages.items.errors.min"),
                },

                maxLength: {
                  value: 500,
                  message: t("packages.items.errors.max"),
                },
              }}
              render={({ field }) => (
                <InputStyled
                  elemType={elemType}
                  placeholder={t("packages.items.placeholder")}
                  disabled={disabled}
                  tagSize={tagSize}
                  transparent
                  type="text"
                  {...field}
                />
              )}
            />
            <div className="flex items-center gap-2">
              {index > 0 && (
                <ButtonStyled
                  size="custom"
                  SvgIcon={<AiOutlineMinusCircle size={20} />}
                  onClick={() => remove(index)}
                />
              )}
              {index === fields.length - 1 && (
                <ButtonStyled
                  size="custom"
                  SvgIcon={<AiTwotonePlusCircle size={20} />}
                  onClick={() => append("")}
                />
              )}
            </div>
          </div>
          {errors?.[target]?.[index]?.message && (
            <p
              className={trim(`
                text-rose-500 
                font-semibold
                text-center`)}
            >
              {errors?.[target]?.[index]?.message}
            </p>
          )}
        </div>
      ))}
      {errors?.[target]?.message && (
        <p
          className={trim(`
            text-rose-500 
            font-semibold
            text-center
            w-full
            text-md`)}
        >
          {errors?.[target]?.message}
        </p>
      )}
    </div>
  );
};

export default AddItems;
