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
        flex-wrap`)}
    >
      {packages.map(({ nameEn, nameAr }, i) => (
        <ButtonStyled
          className={`
            flex-1
            font-semibold
            ${i === packgeIndex ? "!bg-background-primary !text-primary" : ""}`}
          bg
          hover
          key={i}
          title={langAr ? nameAr : nameEn}
          onClick={() => setPackageIndex(i)}
        />
      ))}
    </div>
  );
};

export default Headers;
