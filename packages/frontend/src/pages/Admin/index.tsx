import ListPackages from "../../components/Admin/Packages/List";
import PageContainer from "../../components/shared/containers/PageContainer";

export default function Admin() {
  return (
    <PageContainer paddingTop>
      <ListPackages />
    </PageContainer>
  );
}
