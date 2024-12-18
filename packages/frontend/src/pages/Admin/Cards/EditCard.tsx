import { useParams } from "react-router-dom";
import Form from "../../../components/Admin/Cards/Form";
import PageContainer from "../../../components/shared/containers/PageContainer";
import { useEffect, useState } from "react";
import { getCardById } from "../../../api/routes/cards";
import NotFound from "../../NotFound";
import { Card } from "../../../types/cards";
import toast from "react-hot-toast";

const EditCard = () => {
  const { _id } = useParams<{ _id: string }>();
  const [cardData, setCardData] = useState<Card | undefined>(undefined);

  if (!_id) return <NotFound />;

  useEffect(() => {
    const getCard = async () => {
      try {
        const res = await getCardById(_id);

        if (!res.data) return;
        setCardData(res.data);
      } catch (e) {
        toast.error("Error fetching card");
      }
    };
    getCard();
  }, []);

  return (
    <PageContainer paddingTop>
      <Form cardData={cardData} />
    </PageContainer>
  );
};

export default EditCard;
