import ButtonStyled from "../shared/ButtonStyled";
import { trim } from "../../utils/functions/general";

const Switcher = ({
  title,
  btn,
  className = "",
}: {
  title: string;
  btn: { title: string; link: string };
  className?: string;
}) => {
  return (
    <div
      className={trim(`
        flex 
        items-center 
        justify-center 
        gap-1 
        text-responsive-2xs 
        py-5 
        border-y
        ${className}`)}
    >
      <span>{title}</span>
      <ButtonStyled
        size="custom"
        className="text-blue-700 hover:text-black"
        title={btn.title}
        href={btn.link}
      />
    </div>
  );
};

export default Switcher;
