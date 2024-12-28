import { useTranslation } from "react-i18next";
import { UserDetails } from "../../../types/user";
import SectionContainer from "../../shared/containers/SectionContainer";
import SectionHeader from "../../shared/SectionHeader";

const Info = ({ user }: { user: UserDetails }) => {
  const { t } = useTranslation(["admin"]);

  return (
    <SectionContainer className="mt-5" wraperClassName="text-center">
      <SectionHeader title={user.name} />
      <p className="text-responsive-2md font-semibold text-primary">
        {t("profile.user.id")}:{" "}
        <span className="font-normal text-black">{user._id}</span>
      </p>

      <p className="text-responsive-2md font-semibold text-primary">
        {t("profile.user.email")}:{" "}
        <span className="font-normal text-black">{user.email}</span>
      </p>

      {/* <p className="text-responsive-2md font-semibold text-primary">
        {t("profile.user.role")}:{" "}
        <span className="font-normal text-black">{user.role}</span>
      </p> */}

      <p className="text-responsive-2md font-semibold text-primary">
        {t("profile.user.createdAt")}:{" "}
        <span className="font-normal text-black">
          {new Date(user.createdAt).toLocaleString()}
        </span>
      </p>
    </SectionContainer>
  );
};

export default Info;
