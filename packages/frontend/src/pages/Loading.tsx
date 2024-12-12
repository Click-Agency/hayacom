import PageContainer from "../components/shared/containers/PageContainer";
import Loader from "../components/shared/Loader";

export default function Loading() {
  return (
    <PageContainer className="justify-center items-center">
      <Loader />
    </PageContainer>
  );
}
