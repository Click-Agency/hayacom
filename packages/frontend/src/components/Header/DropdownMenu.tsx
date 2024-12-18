import { useTranslation } from "react-i18next";
import { trim } from "../../utils/functions/general";
import ButtonStyled from "../shared/ButtonStyled";

const DropdownMenu = ({
  sections,
  className = "",
}: {
  sections: { id: string; name: string }[];
  className?: string;
}) => {
  const { i18n } = useTranslation();

  const handleSectionClick = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <ul
      className={trim(`
        absolute
        bg-background-secondary 
        border 
        border-gray-200 
        rounded-lg
        shadow-lg 
        z-[1]
        top-5
        w-40
        ${i18n.dir() === "ltr" ? "left-0" : "right-0"}
        ${className}`)}
    >
      {sections.map(({ name, id }, index) => (
        <li key={index}>
          <ButtonStyled
            hover
            className="w-full !justify-start"
            ripple
            onClick={() => handleSectionClick(id)}
            title={name}
          />
        </li>
      ))}
    </ul>
  );
};

export default DropdownMenu;
