import { useTranslation } from "react-i18next";
import SectionContainer from "../../../shared/containers/SectionContainer";
import SectionHeader from "../../../shared/SectionHeader";
import Table from "./Table";
import { useEffect, useState } from "react";
import { Package } from "../../../../types/packages";
import { getPackages } from "../../../../api/routes/packages";
import { PaginateMeta } from "../../../../types/response";
import Loader from "../../../shared/Loader";
import toast from "react-hot-toast";
import Pagination from "../../../shared/Pagination";

const List = () => {
  const { t, i18n } = useTranslation(["admin"]);
  const [responseData, setResponseData] = useState<{
    data: Package[];
    meta: PaginateMeta;
  }>();

  const [qurery, setQuery] = useState({
    page: 1,
    limit: 4,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const getPackgesPagenate = async () => {
      try {
        setIsLoading(() => true);

        const res = await getPackages(qurery);

        if (!res.data.data) {
          setIsLoading(() => false);
          return;
        }

        setResponseData(() => res.data);
        setIsLoading(() => false);
      } catch (err) {
        setIsLoading(() => false);
        toast.error(t("packages.list.error"));
      }
    };

    getPackgesPagenate();
  }, [qurery]);

  return (
    <SectionContainer className="mt-7">
      <SectionHeader title={t("packages.list.title")} />

      {isLoading ? <Loader /> : <Table packages={responseData?.data} />}

      {!isLoading && responseData?.data && (
        <Pagination
          meta={responseData?.meta}
          setQuery={setQuery}
          changeDir={i18n.dir() === "rtl"}
        />
      )}
    </SectionContainer>
  );
};

export default List;
