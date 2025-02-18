import {
  ChangeEvent,
  ForwardedRef,
  forwardRef,
  HTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { trim } from "../../../../utils/functions/general";

const AddVideo = forwardRef(
  (
    {
      defaultValue,
      error,
      ...attributes
    }: {
      defaultValue?: string;
      error?: string;
    } & HTMLAttributes<HTMLInputElement>,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const { t } = useTranslation(["admin"]);
    const [video, setVideo] = useState(defaultValue);

    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
      if (defaultValue) setVideo(defaultValue);
    }, [defaultValue]);

    const handleVideoChange = (e: ChangeEvent<HTMLInputElement>) => {
      setVideo(undefined);
      const reader = new FileReader();
      const file = e.target.files?.[0];
      const videoFilePattern = /\.(mp4|webm|ogg)$/i;

      reader.onloadend = () => {
        setVideo(reader.result as string);
      };

      if (file && videoFilePattern.test(file.name)) {
        reader.readAsDataURL(file);
      }
    };

    const { onChange, ...restAttributes } = attributes;

    return (
      <div
        className={trim(`
          flex 
          flex-col 
          items-center
          w-full
          gap-4`)}
      >
        <h3
          className={trim(`
            text-responsive-md 
            font-semibold`)}
        >
          {t("packages.video.label")}
        </h3>
        <div
          className={trim(`
            flex 
            flex-col
            justify-center 
            relative 
            w-fit 
            my-auto`)}
        >
          <video
            ref={videoRef}
            className={trim(`
              border-2
              border-primary
              rounded-lg
              w-full
              max-w-[300px]
              max-h-[300px]`)}
            controls
            autoPlay
            loop
            muted
            src={video}
          />
          <label
            className={trim(`
              border-2
              border-primary
              rounded-lg
              bg-primary
              text-secondary
              font-semibold
              cursor-pointer
              hover:bg-secondary
              hover:text-primary
              transition-all
              duration-300
              ease-in-out
              py-2
              px-4
              w-fit
              my-2
              mx-auto`)}
          >
            <input
              ref={ref}
              type="file"
              className={trim(`hidden`)}
              onChange={(e) => {
                if (onChange) onChange(e);
                handleVideoChange(e);
              }}
              {...restAttributes}
            />
            {t("packages.video.btn")}
          </label>
        </div>
        {error && (
          <p
            className={trim(`
              text-rose-500 
              font-semibold
              text-center`)}
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

AddVideo.displayName = "AddVideo";
export default AddVideo;
