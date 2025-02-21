import { useEffect } from "react";
import {
  Control,
  Controller,
  FieldValues,
  RegisterOptions,
  useFieldArray,
} from "react-hook-form";
import { useTranslation } from "react-i18next";
import { trim } from "../../../../utils/functions/general";
import ButtonStyled from "../../../shared/ButtonStyled";
import { AiOutlineMinusCircle, AiTwotonePlusCircle } from "react-icons/ai";
import InputStyled from "../../../shared/InputStyled";
import { FormPackage } from "../../../../types/packages";

const AddPrices = ({
  title,
  control,
  errors,
  disabled,
  target,
  tagSize,
  rules,
}: {
  title?: string;
  control: Control<FormPackage, any>;
  errors: any;
  disabled?: boolean;
  target: "prices";
  defaultValues?: string[];
  rules:
    | Omit<
        RegisterOptions<FieldValues, `${string}.${number}`>,
        "disabled" | "setValueAs" | "valueAsNumber" | "valueAsDate"
      >
    | undefined;
  tagSize?: "sm" | "xs" | "md" | "lg";
}) => {
  const { t } = useTranslation(["admin", "common"]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "prices",
  });

  useEffect(() => {
    if (fields.length <= 0) append({ guests: 0, price: 0 });
  }, [fields.length, append]);

  return (
    <div className="flex flex-col flex-1 gap-3 items-center">
      <h2
        className={trim(`
          mb-2.5
          text-lg
          font-semibold
          text-center`)}
      >
        {title}
      </h2>
      <div className="flex flex-col gap-10 justify-evenly">
        {fields.map((item, i) => (
          <div className="flex flex-col items-center gap-3" key={i}>
            <div
              className={trim(`
                flex
                items-center
                gap-4
                bg-[#D9D9D957]
                rounded-lg
                p-2`)}
            >
              <h3 className="text-responsive-2sm text-nowrap font-semibold">
                {i + 1} -{" "}
              </h3>

              <Controller
                name={`${target}.${i}.guests` as any}
                control={control as any}
                defaultValue={item.guests}
                rules={rules}
                render={({ field }) => (
                  <InputStyled
                    className={`${errors?.[target]?.[i]?.price?.message ? "border-rose-500 border" : ""}`}
                    elemType={"input"}
                    label={t("packages.prices.options.guests")}
                    placeholder={t("packages.prices.placeholder.guests")}
                    disabled={disabled}
                    tagSize={tagSize}
                    type={"number"}
                    transparent
                    {...field}
                  />
                )}
              />

              <Controller
                name={`${target}.${i}.price` as any}
                control={control as any}
                defaultValue={item.price}
                rules={rules}
                render={({ field }) => (
                  <InputStyled
                    className={`${errors?.[target]?.[i]?.price?.message ? "border-rose-500 border" : ""}`}
                    elemType={"input"}
                    label={t("packages.prices.options.price")}
                    placeholder={t("packages.prices.placeholder.price")}
                    disabled={disabled}
                    tagSize={tagSize}
                    type={"number"}
                    transparent
                    {...field}
                  />
                )}
              />

              <div className="flex items-center gap-2">
                {i > 0 && (
                  <ButtonStyled
                    size="custom"
                    SvgIcon={<AiOutlineMinusCircle size={20} />}
                    onClick={() => remove(i)}
                  />
                )}
                {i === fields.length - 1 && (
                  <ButtonStyled
                    size="custom"
                    SvgIcon={<AiTwotonePlusCircle size={20} />}
                    onClick={() => append({ guests: 0, price: 0 })}
                  />
                )}
              </div>
            </div>
            {errors?.[target]?.[i]?.price?.message && (
              <p
                className={trim(`
                      text-rose-500 
                      font-semibold
                      text-center
                      w-full
                      text-md`)}
              >
                {errors?.[target]?.[i]?.price?.message}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddPrices;
