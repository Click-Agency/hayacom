import { Package } from "../../../types/packages";
import { trim } from "../../../utils/functions/general";

const Body = ({
  packages,
  langAr,
  packgeIndex,
}: {
  packages: Package[];
  langAr: boolean;
  packgeIndex: number;
}) => {
  return (
    <div
      className={trim(`
        flex
        flex-col
        gap-4
        px-4`)}
    >
      <h2
        className={trim(`
          text-center 
          text-responsive-lg
          font-semibold
          text-primary`)}
      >
        {langAr ? packages[packgeIndex].titleAr : packages[packgeIndex].titleEn}
      </h2>

      <ol
        className={trim(`
          flex
          flex-col
          gap-2
          p-4
          text-responsive-xs
          font-semibold
          list-disc
          list-inside`)}
      >
        {langAr
          ? packages[packgeIndex].itemsAr.map((item, i) => (
              <li key={i}>{item}</li>
            ))
          : packages[packgeIndex].itemsEn.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
      </ol>
    </div>
  );
};

export default Body;
