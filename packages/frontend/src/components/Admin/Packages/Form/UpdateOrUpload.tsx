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
import AddVideo from "./AddVideo";
import AddPrices from "./AddPrices";

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
      prices: packageData?.prices,
      video: packageData?.video,
    });
  }, [packageData, reset]);

  const onSubmitHandler: SubmitHandler<FormPackage> = async (data) => {
    try {
      setIsLoading(() => true);

      const formData = new FormData();

      formData.append("nameEn", data.nameEn);
      formData.append("nameAr", data.nameAr);
      formData.append("titleEn", data.titleEn);
      formData.append("titleAr", data.titleAr);
      formData.append("itemsEn", data.itemsEn.join("$/"));
      formData.append("itemsAr", data.itemsAr.join("$/"));
      formData.append(
        "prices",
        data.prices.map((price) => JSON.stringify(price)).join("$/")
      );

      if (data.video instanceof FileList) {
        formData.append("video", data.video[0]);
      }

      if (packageData) {
        await updatePackage(packageData._id, formData);
      }

      if (!packageData) {
        await createPackage(formData);
      }

      setIsLoading(() => false);
      toast.success(
        packageData
          ? t("packages.update.success")
          : t("packages.create.success")
      );
      if (!packageData) reset();
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
        animate-appear
        max-w-4xl
        w-full
        mt-4`)}
      onSubmit={handleSubmit(onSubmitHandler)}
    >
      <div
        className={trim(`
        flex
        flex-col
        gap-4
        p-4
        bg-white
        rounded-xl
        shadow-xl
        w-full`)}
      >
        <AddVideo
          defaultValue={packageData?.video}
          error={errors.video?.message}
          {...register("video", {
            required: {
              value: !packageData?.video,
              message: t("packages.video.errors.required"),
            },
            validate: {
              fileType: (value) => {
                const file = value[0];
                const videoFilePattern = /\.(mp4|webm|ogg)$/i;
                if (file instanceof File) {
                  return (
                    (file && videoFilePattern.test(file.name)) ||
                    t("packages.video.errors.invalid")
                  );
                }
                return true;
              },
            },
          })}
        />

        <div className="flex flex-col md:flex-row gap-4">
          <InputStyled
            className="bg-[#D9D9D957]"
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
            className="bg-[#D9D9D957]"
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
            className="bg-[#D9D9D957]"
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
            className="bg-[#D9D9D957]"
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
            placeholder={t("packages.items.placeholder")}
            control={control}
            errors={errors}
            disabled={isLoading}
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
          />

          <AddItems
            tagSize="xs"
            elemType="textarea"
            target="itemsAr"
            title={t("packages.items.label.ar")}
            placeholder={t("packages.items.placeholder")}
            control={control}
            errors={errors}
            disabled={isLoading}
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
          />
        </div>

        <AddPrices
          tagSize="xs"
          target="prices"
          title={t("packages.prices.label")}
          control={control}
          errors={errors}
          disabled={isLoading}
          rules={{
            required: {
              value: true,
              message: t("packages.prices.errors.required"),
            },

            min: {
              value: 0,
              message: t("packages.prices.errors.min"),
            },
          }}
        />
      </div>

      <ButtonStyled
        border
        warning={packageData && true}
        className="rounded-full md:max-w-sm m-auto w-full mt-6 bg-primary"
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
