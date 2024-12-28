import { useTranslation } from "react-i18next";
import SectionContainer from "../../../shared/containers/SectionContainer";
import SectionHeader from "../../../shared/SectionHeader";
import Form from "./Form";
import { UserDetails } from "../../../../types/user";

const Actions = ({ user }: { user: UserDetails }) => {
  const { t } = useTranslation(["admin"]);

  return (
    <SectionContainer wraperClassName="items-center">
      <SectionHeader title={t("profile.actions.title")} />
      <Form user={user} />
    </SectionContainer>
  );
};

export default Actions;
