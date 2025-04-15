import { Package } from "../../../types/packages";
import { trim } from "../../../utils/functions/general";
import ButtonStyled from "../../shared/ButtonStyled";

const Headers = ({
  packages,
  packageIndex,
  setPackageIndex,
  langAr,
}: {
  packages: Package[];
  packageIndex: number;
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
        px-6
        md:px-20
        py-2
        bg-[#A39FA0]/15`)}
    >
      {packages.map(({ nameEn, nameAr }, i) => (
        <ButtonStyled
          className={`
            flex-1
            font-semibold
            rounded-full
            !text-responsive-2md
            ${i === packageIndex ? "bg-primary text-secondary" : "!text-gray-500"}`}
          size="xs"
          key={i}
          title={langAr ? nameAr : nameEn}
          onClick={() => setPackageIndex(i)}
        />
      ))}
    </div>
  );
};

export default Headers;
