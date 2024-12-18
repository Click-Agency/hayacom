import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormPackage, Package } from "../../../../types/packages";
import { trim } from "../../../../utils/functions/general";
import InputStyled from "../../../shared/InputStyled";
import { useTranslation } from "react-i18next";
import AddItems from "./AddItems";
import ButtonStyled from "../../../shared/ButtonStyled";
import { ClipLoader } from "react-spinners";
import { RxUpdate } from "react-icons/rx";
import { RiUploadCloud2Line } from "react-icons/ri";
import { createPackage, updatePackage } from "../../../../api/routes/packages";
import toast from "react-hot-toast";
import useSession from "../../../../hooks/useSession";

const UpdateOrUpload = ({ packageData }: { packageData?: Package }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation(["admin", "common"]);

  useSession();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FormPackage>();

  // Reset form when packageData changes
  useEffect(() => {
    reset({
      nameEn: packageData?.nameEn,
      nameAr: packageData?.nameAr,
      titleEn: packageData?.titleEn,
      titleAr: packageData?.titleAr,
      itemsEn: packageData?.itemsEn,
      itemsAr: packageData?.itemsAr,
    });
  }, [packageData, reset]);

  const onSubmitHandler: SubmitHandler<FormPackage> = async (data) => {
    try {
      setIsLoading(() => true);

      if (packageData) {
        await updatePackage(packageData._id, data);
      }

      if (!packageData) {
        await createPackage(data);
      }

      setIsLoading(() => false);
      toast.success(
        packageData
          ? t("packages.update.success")
          : t("packages.create.success")
      );
    } catch (err) {
      toast.error(
        packageData ? t("packages.update.error") : t("packages.create.error")
      );

      setIsLoading(() => false);
    }
  };

  return (
    <form
      className={trim(`
        flex
        flex-col
        gap-4
        p-4
        bg-background-primary
        rounded-lg
        shadow-lg
        animate-appear
        max-w-4xl
        w-full
        mt-4`)}
      onSubmit={handleSubmit(onSubmitHandler)}
    >
      <div className="flex flex-col md:flex-row gap-4">
        <InputStyled
          label={t("packages.name.label.en")}
          placeholder={t("packages.name.placeholder")}
          {...register("nameEn", {
            required: {
              value: true,
              message: t("packages.name.errors.required"),
            },
            minLength: {
              value: 3,
              message: t("packages.name.errors.min"),
            },
            maxLength: {
              value: 255,
              message: t("packages.name.errors.max"),
            },
          })}
          error={errors.nameEn?.message}
        />

        <InputStyled
          label={t("packages.name.label.ar")}
          placeholder={t("packages.name.placeholder")}
          {...register("nameAr", {
            required: {
              value: true,
              message: t("packages.name.errors.required"),
            },
            minLength: {
              value: 3,
              message: t("packages.name.errors.min"),
            },
            maxLength: {
              value: 255,
              message: t("packages.name.errors.max"),
            },
          })}
          error={errors.nameAr?.message}
        />
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <InputStyled
          label={t("packages.title.label.en")}
          placeholder={t("packages.title.placeholder")}
          {...register("titleEn", {
            required: {
              value: true,
              message: t("packages.title.errors.required"),
            },
            minLength: {
              value: 3,
              message: t("packages.title.errors.min"),
            },
            maxLength: {
              value: 255,
              message: t("packages.title.errors.max"),
            },
          })}
          error={errors.titleEn?.message}
        />

        <InputStyled
          label={t("packages.title.label.ar")}
          placeholder={t("packages.title.placeholder")}
          {...register("titleAr", {
            required: {
              value: true,
              message: t("packages.title.errors.required"),
            },
            minLength: {
              value: 3,
              message: t("packages.title.errors.min"),
            },
            maxLength: {
              value: 255,
              message: t("packages.title.errors.max"),
            },
          })}
          error={errors.titleAr?.message}
        />
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <AddItems
          tagSize="xs"
          elemType="textarea"
          target="itemsEn"
          title={t("packages.items.label.en")}
          control={control}
          errors={errors}
          disabled={isLoading}
        />

        <AddItems
          tagSize="xs"
          elemType="textarea"
          target="itemsAr"
          title={t("packages.items.label.ar")}
          control={control}
          errors={errors}
          disabled={isLoading}
        />
      </div>

      <ButtonStyled
        success={!packageData}
        border
        warning={packageData && true}
        className="rounded-lg md:max-w-sm m-auto w-full mt-2"
        bg
        hover
        title={
          isLoading
            ? t("loading", { ns: "common" })
            : packageData
              ? t("packages.update.submit")
              : t("packages.create.submit")
        }
        disabled={isLoading}
        SvgIcon={
          isLoading ? (
            <ClipLoader size={20} color="text-white" />
          ) : packageData ? (
            <RxUpdate size={20} />
          ) : (
            <RiUploadCloud2Line size={20} />
          )
        }
        ripple
        type="submit"
      />
    </form>
  );
};

export default UpdateOrUpload;
