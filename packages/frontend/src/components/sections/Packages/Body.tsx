import { Package } from "../../../types/packages";
import { trim } from "../../../utils/functions/general";
import SectionHeader from "../../shared/SectionHeader";
import BodyCard from "./BodyCard";
import Prices from "./Prices";

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
        px-4
        rounded-lg
      `)}
    >
      <SectionHeader
        tag="h2"
        title={
          langAr ? packages[packgeIndex].titleAr : packages[packgeIndex].titleEn
        }
        className="!font-bold pb-0"
      />

      <div
        className={trim(`
          flex
          justify-evenly
          gap-4
          items-center
          flex-col-reverse
          md:flex-row
          pb-4`)}
      >
        <ol
          className={trim(`
            grid
            grid-cols-1
            sm:grid-cols-2
            gap-4
            p-4
            text-responsive-xs
            list-disc
            list-inside
            marker:text-primary`)}
        >
          {langAr
            ? packages[packgeIndex].itemsAr.map((item, i) => (
                <BodyCard key={i} text={item} />
              ))
            : packages[packgeIndex].itemsEn.map((item, i) => (
                <BodyCard key={i} text={item} />
              ))}
        </ol>

        <video
          autoPlay
          loop
          muted
          className={trim(`
            w-full
            h-full 
            max-w-[400px] 
            max-h-[400px]
            md:self-start
            rounded-lg`)}
          src={packages[packgeIndex].video}
        />
      </div>
      <Prices prices={packages[packgeIndex].prices} />
    </div>
  );
};

export default Body;
