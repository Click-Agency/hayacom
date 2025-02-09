import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormCard, Card } from "../../../../types/cards";
import { trim } from "../../../../utils/functions/general";
import InputStyled from "../../../shared/InputStyled";
import { useTranslation } from "react-i18next";
import ButtonStyled from "../../../shared/ButtonStyled";
import { ClipLoader } from "react-spinners";
import { RxUpdate } from "react-icons/rx";
import { RiUploadCloud2Line } from "react-icons/ri";
import { createCard, updateCard } from "../../../../api/routes/cards";
import toast from "react-hot-toast";
import useSession from "../../../../hooks/useSession";
import AddPics from "./AddPics";

const UpdateOrUpload = ({ cardData }: { cardData?: Card }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation(["admin", "common"]);

  useSession();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FormCard>({
    defaultValues: {
      customIdEn: cardData?.customIdEn,
      customIdAr: cardData?.customIdAr,
      images: cardData?.images,
    },
  });

  // Reset form when cardData changes
  useEffect(() => {
    reset({
      customIdEn: cardData?.customIdEn,
      customIdAr: cardData?.customIdAr,
      images: cardData?.images,
    });
  }, [cardData, reset]);

  const onSubmitHandler: SubmitHandler<FormCard> = async (data) => {
    try {
      setIsLoading(() => true);
      const formData = new FormData();

      formData.append("customIdEn", data.customIdEn);
      formData.append("customIdAr", data.customIdAr);

      data.images.forEach((img) => {
        if (img instanceof File) {
          formData.append("images", img, img.name);
        }
      });

      if (!cardData) {
        await createCard(formData);
      }

      if (cardData) {
        await updateCard(cardData._id, formData);
      }

      setIsLoading(() => false);
      toast.success(
        cardData ? t("cards.update.success") : t("cards.create.success")
      );
    } catch (err) {
      toast.error(cardData ? t("cards.update.error") : t("cards.create.error"));
      console.log(err);

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
        w-full
        h-full
        max-w-3xl
        mt-4`)}
      onSubmit={handleSubmit(onSubmitHandler)}
    >
      <div
        className={trim(`
          flex
          flex-col-reverse
          md:flex-row
          gap-4
          h-full
          bg-white
          rounded-xl
          shadow-xl
          p-4`)}
      >
        <div className="flex flex-col gap-4 flex-1">
          <div className="flex flex-col gap-4">
            <InputStyled
              className="bg-gray-200"
              label={t("cards.customId.label.en")}
              placeholder={t("cards.customId.placeholder")}
              {...register("customIdEn", {
                required: {
                  value: true,
                  message: t("cards.customId.errors.required"),
                },
                minLength: {
                  value: 3,
                  message: t("cards.customId.errors.min"),
                },
                maxLength: {
                  value: 255,
                  message: t("cards.customId.errors.max"),
                },
              })}
              error={errors.customIdEn?.message}
            />

            <InputStyled
              className="bg-gray-200"
              label={t("cards.customId.label.ar")}
              placeholder={t("cards.customId.placeholder")}
              {...register("customIdAr", {
                required: {
                  value: true,
                  message: t("cards.customId.errors.required"),
                },
                minLength: {
                  value: 3,
                  message: t("cards.customId.errors.min"),
                },
                maxLength: {
                  value: 255,
                  message: t("cards.customId.errors.max"),
                },
              })}
              error={errors.customIdAr?.message}
            />
          </div>
        </div>

        {/* <AddPic
          title={t("cards.image.label")}
          subTitle={t("cards.image.placeholder")}
          error={errors.image?.message as string}
          disabled={isLoading}
          Loader={<Loader />}
          defaultValue={cardData?.image}
          {...register("image", {
            required: {
              value: !cardData?.image,
              message: t("cards.image.errors.required"),
            },
            pattern: {
              value: /\.(jpe?g|png|gif|bmp)$/i,
              message: t("cards.image.errors.invalid"),
            },
          })}
        /> */}

        <AddPics
          control={control}
          errors={errors}
          disabled={isLoading}
          target="images"
          defaultValues={cardData?.images}
        />
      </div>

      <ButtonStyled
        border
        className="rounded-full md:max-w-sm m-auto w-full mt-6 bg-primary"
        bg
        hover
        title={
          isLoading
            ? t("loading", { ns: "common" })
            : cardData
              ? t("cards.update.submit")
              : t("cards.create.submit")
        }
        disabled={isLoading}
        SvgIcon={
          isLoading ? (
            <ClipLoader size={20} color="text-white" />
          ) : cardData ? (
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
