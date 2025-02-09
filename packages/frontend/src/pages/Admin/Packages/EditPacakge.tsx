import { useParams } from "react-router-dom";
import Form from "../../../components/Admin/Packages/Form";
import PageContainer from "../../../components/shared/containers/PageContainer";
import { useEffect, useState } from "react";
import { getPackageById } from "../../../api/routes/packages";
import NotFound from "../../NotFound";
import { Package } from "../../../types/packages";
import toast from "react-hot-toast";

const EditPacakge = () => {
  const { _id } = useParams<{ _id: string }>();
  const [packageData, setPackageData] = useState<Package | undefined>(
    undefined
  );

  if (!_id) return <NotFound />;

  useEffect(() => {
    const getPackage = async () => {
      try {
        const res = await getPackageById(_id);

        if (!res.data) return;
        setPackageData(res.data);
      } catch (e) {
        toast.error("Error fetching package");
      }
    };
    getPackage();
  }, []);

  return (
    <PageContainer paddingTop className="background-bubbles">
      <Form packageData={packageData} />
    </PageContainer>
  );
};

export default EditPacakge;
