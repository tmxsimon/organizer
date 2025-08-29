import { useTranslation } from "react-i18next";

const Profile = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className="text-4xl">{t("common.profile")}</div>
    </>
  );
};

export default Profile;
