import { useTranslation } from "react-i18next";
import SectionContainer from "../../shared/containers/SectionContainer";
import SectionHeader from "../../shared/SectionHeader";
import { Package } from "../../../types/packages";
import { useEffect, useState } from "react";
import { getPackages } from "../../../api/routes/packages";
import { trim } from "../../../utils/functions/general";
import Loader from "../../shared/Loader";
import Headers from "./Headers";
import Footer from "./Footer";
import Body from "./Body";
import useScrollInToView from "../../../hooks/useScrollInToView";

const Packages = () => {
  const { t, i18n } = useTranslation(["home"]);
  const [packages, setPackages] = useState<Package[]>([]);
  const [noPackages, setNoPackages] = useState(false);
  const [packgeIndex, setPackageIndex] = useState(0);
  const { isInView, targetRef } = useScrollInToView();

  useEffect(() => {
    const getPackagesPagnate = async () => {
      try {
        setNoPackages(() => false);
        const res = await getPackages();

        if (!res.data.data.length) {
          setNoPackages(() => true);
          return;
        }

        setPackages(res.data.data);
      } catch (error) {
        setNoPackages(() => true);
      }
    };

    getPackagesPagnate();
  }, []);

  const footerList = Object.values(
    t("packages.footer", { returnObjects: true })
  );

  const langAr = i18n.language === "ar";

  return (
    <SectionContainer ref={targetRef} id="packages">
      <SectionHeader title={t("packages.title")} />

      {!packages.length && !noPackages ? (
        <Loader />
      ) : noPackages ? (
        <div>
          <h2
            className={trim(`
              text-center 
              text-responsive-md 
              font-semibold
              text-primary mt-2`)}
          >
            {t("packages.noPackages")}
          </h2>
        </div>
      ) : (
        <div
          className={trim(`
            flex
            flex-col
            p-6
            rounded-lg
            bg-white
            shadow-lg
            mt-1
            transition-all
            duration-500
            ease-in-out
            ${isInView && packages.length ? "opacity-100" : "opacity-0"}`)}
        >
          <div
            className={trim(`
              flex
              flex-col
              gap-4
              border-x-2
              border-t-2
              border-t-transparent
              border-x-primary
              rounded-lg
              rounded-b-none`)}
          >
            <Headers
              setPackageIndex={setPackageIndex}
              packgeIndex={packgeIndex}
              langAr={langAr}
              packages={packages}
            />

            <Body
              packages={packages}
              langAr={langAr}
              packgeIndex={packgeIndex}
            />
          </div>

          <Footer footerList={footerList} />
        </div>
      )}
    </SectionContainer>
  );
};

export default Packages;
