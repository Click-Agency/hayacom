import ListCards from "../../components/Admin/Cards/List";
import ListPackages from "../../components/Admin/Packages/List";
import DeleteDialog from "../../components/Admin/shared/DeleteDialog";
import PageContainer from "../../components/shared/containers/PageContainer";

export default function Admin() {
  return (
    <PageContainer paddingTop className="background-bubbles">
      <ListPackages />
      <ListCards />
      <DeleteDialog />
    </PageContainer>
  );
}
