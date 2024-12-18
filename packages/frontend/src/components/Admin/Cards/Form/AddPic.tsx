import {
  ChangeEvent,
  CSSProperties,
  ForwardedRef,
  forwardRef,
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  addAttributesToReactNode,
  trim,
} from "../../../../utils/functions/general";
import { RiGalleryUploadLine } from "react-icons/ri";
import noImg from "../../../../assets/imgs/no-image.png";
import { useTranslation } from "react-i18next";

const AddPic = forwardRef(
  (
    {
      title,
      subTitle,
      error,
      Loader,
      defaultValue,
      theme,
      imgStyles,
      imgClassName,
      ...attributes
    }: {
      error?: string;
      title?: string;
      subTitle?: string;
      defaultValue?: string;
      theme?: string;
      Loader?: JSX.Element;
      imgStyles?: CSSProperties;
      imgClassName?: string;
    } & InputHTMLAttributes<HTMLElement>,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const [imagePreviewUrl, setImagePreviewUrl] = useState(defaultValue);
    const [imgError, setImgError] = useState("");
    const [element, setElement] = useState<HTMLInputElement>();
    const { t } = useTranslation(["admin"]);
    const [imgLoaded, setImgLoaded] = useState(false);

    const imgContianerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const inputFileElement =
        document.querySelector<HTMLInputElement>("#fileInput");
      if (inputFileElement) setElement(inputFileElement);
    }, []);

    const handleFileButtonClick = () => {
      element?.click();
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      setImagePreviewUrl(() => "");
      setImgError(() => "");

      let reader = new FileReader();
      let file = e.target.files?.[0];

      reader.onloadend = () => {
        if (typeof reader.result !== "string" || reader.result === null) return;

        if (!reader.result.includes("image"))
          return setImgError(() => t("cards.image.errors.invalid"));

        setImagePreviewUrl(reader.result);
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    };

    const { onChange, ...restAttributes } = attributes;

    return (
      <div className="group flex-1 h-full" ref={imgContianerRef}>
        <input
          ref={ref}
          id="fileInput"
          className={trim(`
            absolute
            appearance-none 
            w-full 
            opacity-0 
            cursor-pointer`)}
          type="file"
          onChange={(e) => {
            if (onChange) onChange(e);
            handleImageChange(e);
          }}
          {...restAttributes}
        />
        <h1
          className={trim(`
        text-lg 
        font-semibold
        text-center 
        text-body-lightest 
        mb-3.5`)}
        >
          {title}
        </h1>
        <div className="relative">
          {!imagePreviewUrl && (
            <div
              className={trim(`
                absolute
                inset-0
                m-auto
                w-fit
                h-10
                text-center
                text-xl
                font-bold
                text-black
                bg-background-primary
                p-2
                rounded-full
                flex
                items-center
                justify-center
                gap-2
                group-hover:hidden`)}
            >
              <h3>{subTitle}</h3>
              <RiGalleryUploadLine size={30} />
            </div>
          )}

          {Loader &&
            addAttributesToReactNode(Loader, {
              className: `${imgLoaded ? "hidden" : ""}`,
            })}

          <img
            onClick={(e) => {
              e.preventDefault();
              handleFileButtonClick();
            }}
            src={imagePreviewUrl || noImg}
            alt="Preview"
            className={trim(`
                block
                w-full
                h-full
                max-h-96
                object-contain
                rounded-lg
                border
                border-gray-200
                cursor-pointer
                 ${!imgLoaded ? "invisible" : ""}
                ${imgClassName}`)}
            onLoad={() => setImgLoaded(true)}
            style={imgStyles}
          />
        </div>
        {(imgError || error) && (
          <p
            className={trim(`
                text-rose-500 
                font-semibold
                mt-2
                text-center`)}
          >
            {imgError || (error as string)}
          </p>
        )}
      </div>
    );
  }
);

AddPic.displayName = "AddPic";
export default AddPic;
