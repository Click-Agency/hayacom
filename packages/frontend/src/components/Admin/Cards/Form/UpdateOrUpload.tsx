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
import AddPic from "./AddPic";
import Loader from "../../../shared/Loader";

const UpdateOrUpload = ({ cardData }: { cardData?: Card }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation(["admin", "common"]);

  useSession();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormCard>({
    defaultValues: {
      customIdEn: cardData?.customIdEn,
      customIdAr: cardData?.customIdAr,
      titleEn: cardData?.titleEn,
      titleAr: cardData?.titleAr,
      image: cardData?.image,
    },
  });

  // Reset form when cardData changes
  useEffect(() => {
    reset({
      customIdEn: cardData?.customIdEn,
      customIdAr: cardData?.customIdAr,
      titleEn: cardData?.titleEn,
      titleAr: cardData?.titleAr,
      image: cardData?.image,
    });
  }, [cardData, reset]);

  const onSubmitHandler: SubmitHandler<FormCard> = async (data) => {
    try {
      setIsLoading(() => true);
      const formData = new FormData();

      formData.append("customIdEn", data.customIdEn);
      formData.append("customIdAr", data.customIdAr);
      formData.append("titleEn", data.titleEn);
      formData.append("titleAr", data.titleAr);
      if (data.image instanceof FileList) {
        formData.append("image", data.image[0], data.image[0].name);
      }

      if (cardData) {
        await updateCard(cardData._id, formData);
      }

      if (!cardData) {
        await createCard(formData);
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
        bg-background-primary
        rounded-lg
        shadow-lg
        animate-appear
        w-full
        h-full
        mt-4`)}
      onSubmit={handleSubmit(onSubmitHandler)}
    >
      <div className="flex md:flex-row flex-col-reverse gap-4 h-full">
        <div className="flex flex-col gap-4 flex-1">
          <div className="flex flex-col md:flex-row gap-4">
            <InputStyled
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

          <div className="flex flex-col md:flex-row gap-4 h-full">
            <InputStyled
              contianerClassName="md:h-full flex-1"
              inputContainerClassName="md:h-full"
              className="md:!h-full"
              elemType="textarea"
              label={t("cards.title.label.en")}
              placeholder={t("cards.title.placeholder")}
              {...register("titleEn", {
                required: {
                  value: true,
                  message: t("cards.title.errors.required"),
                },
                minLength: {
                  value: 3,
                  message: t("cards.title.errors.min"),
                },
                maxLength: {
                  value: 255,
                  message: t("cards.title.errors.max"),
                },
              })}
              error={errors.titleEn?.message}
            />

            <InputStyled
              contianerClassName="md:h-full flex-1"
              inputContainerClassName="md:h-full"
              className="md:!h-full"
              elemType="textarea"
              label={t("cards.title.label.ar")}
              placeholder={t("cards.title.placeholder")}
              {...register("titleAr", {
                required: {
                  value: true,
                  message: t("cards.title.errors.required"),
                },
                minLength: {
                  value: 3,
                  message: t("cards.title.errors.min"),
                },
                maxLength: {
                  value: 255,
                  message: t("cards.title.errors.max"),
                },
              })}
              error={errors.titleAr?.message}
            />
          </div>
        </div>

        <AddPic
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
        />
      </div>

      <ButtonStyled
        success={!cardData}
        border
        warning={cardData && true}
        className="rounded-lg md:max-w-sm m-auto w-full mt-2"
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
