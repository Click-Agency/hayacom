import { useTranslation } from "react-i18next";
import SectionContainer from "../../shared/containers/SectionContainer";
import SectionHeader from "../../shared/SectionHeader";
import { trim } from "../../../utils/functions/general";
import useScrollInToView from "../../../hooks/useScrollInToView";
import { RxCrossCircled, RxCheckCircled } from "react-icons/rx";

const Comparisons = () => {
  const { t } = useTranslation(["home"]);

  const { isInView, targetRef } = useScrollInToView();

  const tableHeaders: string[] = Object.values(
    t("comparisons.table.headers", { returnObjects: true })
  );

  const tableRows: string[][] = Object.values(
    t("comparisons.table.rows", { returnObjects: true })
  );

  return (
    <SectionContainer id="comparisons">
      <SectionHeader title={t("comparisons.title")} />

      <div
        ref={targetRef}
        className={trim(`
          !overflow-x-auto
          w-full
          bg-[#F1E8E7]
          rounded-3xl
          px-10
          py-8
          md:px-28
          md:py-20
          transition-all
          duration-500
          ease-in-out
          ${isInView ? "opacity-100" : "opacity-0"}`)}
      >
        <table
          className={trim(`
            w-full
            text-responsive-2md
            font-medium`)}
        >
          <thead>
            <tr>
              {tableHeaders.map((header, i) => (
                <th
                  key={i}
                  className={trim(`
                    ${i === 0 ? "min-w-96 text-start" : "min-w-40"}
                    pb-6
                    text-primary
                    font-bold`)}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {tableRows.map((row, i) => (
              <tr
                key={i}
                className={trim(`
                  border-gray-400
                  ${i !== tableRows.length - 1 ? "border-b" : ""}`)}
              >
                {row.map((cell, j) => (
                  <td
                    key={j}
                    className={trim(`
                      py-4
                      ${j !== 0 ? "text-center" : ""}`)}
                  >
                    {cell !== "true" && cell !== "false" ? (
                      <span dangerouslySetInnerHTML={{ __html: cell }}></span>
                    ) : cell === "true" ? (
                      <RxCheckCircled
                        className="m-auto text-gray-500"
                        size={30}
                      />
                    ) : (
                      <RxCrossCircled
                        className="m-auto text-primary"
                        size={30}
                      />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionContainer>
  );
};

export default Comparisons;
