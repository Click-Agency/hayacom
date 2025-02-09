import { Fragment, useEffect, useState } from "react";
import PageContainer from "../../components/shared/containers/PageContainer";
import { UserDetails } from "../../types/user";
import Info from "../../components/Admin/profile/Info";
import Actions from "../../components/Admin/profile/Actions";
import { getMe } from "../../api/routes/users";
import Loader from "../../components/shared/Loader";
import SectionHeader from "../../components/shared/SectionHeader";
import { useTranslation } from "react-i18next";
import DeleteDialog from "../../components/Admin/shared/DeleteDialog";

const Profile = () => {
  const [user, setUser] = useState<UserDetails>();
  const [noUser, setNoUser] = useState(false);
  const { t } = useTranslation(["admin"]);

  useEffect(() => {
    const getUser = async () => {
      try {
        setNoUser(() => false);
        const res = await getMe();

        if (!res.data) return setNoUser(() => true);

        setUser(res.data);
      } catch (err) {
        setNoUser(() => true);
      }
    };

    getUser();
  }, []);

  return (
    <PageContainer paddingTop className="background-bubbles">
      {noUser ? (
        <SectionHeader title={t("profile.noProfile")} />
      ) : !user ? (
        <Loader />
      ) : (
        <Fragment>
          <Info user={user} />
          <Actions user={user} />
        </Fragment>
      )}
      <DeleteDialog />
    </PageContainer>
  );
};

export default Profile;
