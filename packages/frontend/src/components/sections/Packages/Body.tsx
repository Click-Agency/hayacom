import { useEffect, useRef, useState } from "react";
import { Package } from "../../../types/packages";
import { trim } from "../../../utils/functions/general";
import SectionHeader from "../../shared/SectionHeader";
import BodyCard from "./BodyCard";
import Prices from "./Prices";
import { ClipLoader } from "react-spinners";

const Body = ({
  packages,
  langAr,
  packageIndex,
}: {
  packages: Package[];
  langAr: boolean;
  packageIndex: number;
}) => {
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const previousPackageIndex = useRef<number | null>(null);

  useEffect(() => {
    if (
      previousPackageIndex.current !== null &&
      packageIndex !== previousPackageIndex.current
    )
      setIsVideoLoading(true);

    previousPackageIndex.current = packageIndex;
  }, [packageIndex]);

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
          langAr
            ? packages[packageIndex].titleAr
            : packages[packageIndex].titleEn
        }
        className="!font-bold pb-0 mt-10"
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
            ? packages[packageIndex].itemsAr.map((item, i) => (
                <BodyCard key={i} text={item} />
              ))
            : packages[packageIndex].itemsEn.map((item, i) => (
                <BodyCard key={i} text={item} />
              ))}
        </ol>

        <div
          className={trim(`
            w-full
            h-full
            max-w-[400px]
            max-h-[400px]
            rounded-lg
            relative`)}
        >
          {isVideoLoading && (
            <ClipLoader
              size={100}
              color="#751813"
              className={trim(`
                absolute
                top-1/2
                left-1/2
                translate-x-[-50%]
                translate-y-[-50%]
                z-[1]
                w-full
                h-full
                max-w-[400px]
                max-h-[400px]`)}
            />
          )}
          <video
            autoPlay
            loop
            muted
            className="w-full h-full"
            src={packages[packageIndex].video}
            onLoadedData={() => setIsVideoLoading(false)}
          />
        </div>
      </div>
      <Prices prices={packages[packageIndex].prices} />
    </div>
  );
};

export default Body;
