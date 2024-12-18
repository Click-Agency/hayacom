import { useTranslation } from "react-i18next";
import SectionContainer from "../../shared/containers/SectionContainer";
import SectionHeader from "../../shared/SectionHeader";
import { trim } from "../../../utils/functions/general";
import useScrollInToView from "../../../hooks/useScrollInToView";

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

      <div className="!overflow-x-auto w-full">
        <table
          ref={targetRef}
          dir="ltr"
          className={trim(`
            w-full
            text-center
            text-responsive-2md
            border-collapse
            border
            border-primary
            rounded-xl
            text-primary
            font-medium
            transition-all
            duration-500
            ease-in-out
            ${isInView ? "opacity-100" : "opacity-0"}`)}
        >
          <thead>
            <tr>
              {tableHeaders.map((header, i) => (
                <th
                  key={i}
                  className={trim(`
                    ${i === 0 ? "min-w-96                   bg-primary text-background-primary" : "min-w-40"}
                    p-4
                    border-b
                    border-r
                    border-primary`)}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {tableRows.map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => (
                  <td
                    key={j}
                    className={trim(`
                      p-2
                      border-b
                      border-r
                      border-primary
                      ${j !== 0 ? "bg-white" : ""}`)}
                  >
                    {cell}
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
