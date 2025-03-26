import { Controller, useFieldArray } from "react-hook-form";
import { trim } from "../../../../utils/functions/general";
import { useTranslation } from "react-i18next";
import ButtonStyled from "../../../shared/ButtonStyled";
import { AiOutlineMinusCircle, AiTwotonePlusCircle } from "react-icons/ai";
import noImgAr from "../../../../assets/imgs/no-img-ar.png";
import noImgEn from "../../../../assets/imgs/no-img-en.png";
import { ChangeEvent, useEffect, useState } from "react";

const AddPics = ({
  control,
  errors,
  disabled,
  target,
  defaultValues = [],
}: {
  control: any;
  errors: any;
  disabled?: boolean;
  target: string;
  defaultValues?: string[];
}) => {
  const { t, i18n } = useTranslation(["admin"]);
  const { fields, append, remove } = useFieldArray({
    control,
    name: target,
  });

  const [images, setImages] = useState<(string | File)[]>(defaultValues);

  useEffect(() => {
    if (fields.length <= 0) append("");

    if (defaultValues.length) setImages(defaultValues);
  }, [fields.length, append]);

  const handleImageChange = (
    i: number,
    e: ChangeEvent<HTMLInputElement>,
    onChange: (...event: any[]) => void
  ) => {
    const reader = new FileReader();
    const file = e.target.files?.[0];

    reader.onloadend = () => {
      const newImages = [...images];
      newImages[i] = reader.result as string | File;
      setImages(newImages);
    };

    const imageFilePattern = /\.(jpe?g|png|bmp)$/i;
    const maxFileSize = 1024 * 1024 * 2;

    if (file && imageFilePattern.test(file.name) && file.size <= maxFileSize) {
      onChange(file);
      reader.readAsDataURL(file);
    } else {
      const newImages = [...images];
      newImages[i] = "";
      onChange(newImages[i]);
      setImages(newImages);
    }
  };

  return (
    <ul className="flex flex-1 flex-wrap gap-2 justify-center items-start">
      {fields.map((field, i) => (
        <li
          key={field.id}
          className="flex flex-col items-center max-w-52 w-52 gap-2.5 border-2 border-background-secondary rounded-lg p-2"
        >
          <h3
            className={trim(`
              text-center 
              font-semibold 
              my-auto
              ${errors?.[target]?.[i]?.message}`)}
          >
            {i === 0 ? t("cards.images.main") : t("cards.images.gallery")}
          </h3>
          <div className="relative w-full my-auto bg-[#D9D9D957]">
            <img
              className="w-full max-h-52 object-cover "
              src={
                (images[i] as string) ||
                (i18n.language === "en" ? noImgEn : noImgAr)
              }
              defaultValue={defaultValues[i]}
              alt="uploaded-img"
            />
            <Controller
              name={`${target}.${i}`}
              control={control}
              defaultValue={defaultValues[i] || ""}
              rules={{
                required: {
                  value: true,
                  message: t("cards.images.errors.required"),
                },
              }}
              render={({ field }) => {
                const { onChange, value, ...restAttributes } = field;
                return (
                  <input
                    className="absolute top-0 left-0 opacity-0 w-full h-full cursor-pointer z-[1]"
                    disabled={disabled}
                    type="file"
                    onChange={(e) => handleImageChange(i, e, onChange)}
                    {...restAttributes}
                  />
                );
              }}
            />
          </div>
          <div className="flex items-center mt-auto gap-2">
            {i > 0 && (
              <ButtonStyled
                size="custom"
                SvgIcon={<AiOutlineMinusCircle size={20} />}
                onClick={() => {
                  remove(i);
                  setImages((prev) => prev.filter((_, index) => index !== i));
                }}
              />
            )}
            {i === fields.length - 1 && (
              <ButtonStyled
                size="custom"
                SvgIcon={<AiTwotonePlusCircle size={20} />}
                onClick={() => append("")}
              />
            )}
          </div>

          {errors?.[target]?.[i]?.message && (
            <p
              className={trim(`
                text-rose-500 
                font-semibold
                text-center`)}
            >
              {errors?.[target]?.[i]?.message}
            </p>
          )}
        </li>
      ))}
    </ul>
  );
};

export default AddPics;
