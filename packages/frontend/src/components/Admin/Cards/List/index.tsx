import { useTranslation } from "react-i18next";
import SectionContainer from "../../../shared/containers/SectionContainer";
import SectionHeader from "../../../shared/SectionHeader";
import Table from "./Table";
import { useEffect, useState } from "react";
import { Card } from "../../../../types/cards";
import { getCards } from "../../../../api/routes/cards";
import { PaginateMeta } from "../../../../types/response";
import Loader from "../../../shared/Loader";
import toast from "react-hot-toast";
import Pagination from "../../../shared/Pagination";

const List = () => {
  const { t } = useTranslation(["admin"]);
  const [responseData, setResponseData] = useState<{
    data: Card[];
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

        const res = await getCards(qurery);

        if (!res.data.data) {
          setIsLoading(() => false);
          return;
        }

        setResponseData(() => res.data);
        setIsLoading(() => false);
      } catch (err) {
        setIsLoading(() => false);
        toast.error(t("cards.list.error"));
      }
    };

    getPackgesPagenate();
  }, [qurery]);

  return (
    <SectionContainer className="mt-7">
      <SectionHeader title={t("cards.list.title")} />

      {isLoading ? <Loader /> : <Table cards={responseData?.data} />}

      {!isLoading && responseData?.data && (
        <Pagination meta={responseData?.meta} setQuery={setQuery} />
      )}
    </SectionContainer>
  );
};

export default List;
