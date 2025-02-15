import { trim } from "../../../utils/functions/general";

const ButtonImg = ({
  src,
  alt,
  link,
}: {
  src: string;
  alt: string;
  link: string;
}) => (
  <a href={link} target="_blank" rel="noreferrer">
    <img
      src={src}
      alt={alt}
      className={trim(`
        flex-1
        w-full
        max-w-[200px]
        md:max-w-[250px]
        drop-shadow-2xl
        shadow-primary
        hover:shadow-2xl
        transition-all
        duration-300
        ease-in-out
        hover:scale-105
        cursor-pointer
        active:scale-95
        rounded-lg`)}
    />
  </a>
);

export default ButtonImg;
