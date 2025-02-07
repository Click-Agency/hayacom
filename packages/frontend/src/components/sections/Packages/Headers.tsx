import { Package } from "../../../types/packages";
import { trim } from "../../../utils/functions/general";
import ButtonStyled from "../../shared/ButtonStyled";

const Headers = ({
  packages,
  packgeIndex,
  setPackageIndex,
  langAr,
}: {
  packages: Package[];
  packgeIndex: number;
  setPackageIndex: (index: number) => void;
  langAr: boolean;
}) => {
  return (
    <div
      className={trim(`
        flex
        items-center
        gap-2
        flex-wrap
        rounded-xl
        md:rounded-full
        px-20
        py-2
        bg-[#A39FA0]/30`)}
    >
      {packages.map(({ nameEn, nameAr }, i) => (
        <ButtonStyled
          className={`
            flex-1
            font-semibold
            rounded-full
            ${i === packgeIndex ? "bg-primary text-secondary" : "!text-gray-500"}`}
          hover={i !== packgeIndex}
          size="sm"
          key={i}
          title={langAr ? nameAr : nameEn}
          onClick={() => setPackageIndex(i)}
        />
      ))}
    </div>
  );
};

export default Headers;
