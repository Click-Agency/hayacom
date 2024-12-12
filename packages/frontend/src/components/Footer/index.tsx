import { useTranslation } from "react-i18next";
import { trim } from "../../utils/functions/general";
import Logo from "../shared/Logo";
import ButtonStyled from "../shared/ButtonStyled";
import { appRoutes } from "../../config";
import { FaFacebookF, FaWhatsapp, FaInstagram } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import useScrollInToView from "../../hooks/useScrollInToView";

const Footer = () => {
  const { t } = useTranslation(["footer", "header", "common"]);
  const push = useNavigate();
  const { pathname } = useLocation();

  const { targetRef, isInView } = useScrollInToView();

  const columns = [
    {
      title: t("columns.titleOne"),
      links: [{ name: t("nav.home", { ns: "header" }), link: appRoutes.home }],
    },
    {
      title: t("columns.titleTwo"),
      links: [
        { icon: <FaFacebookF size={30} />, link: "/" },
        { icon: <FaWhatsapp size={30} />, link: "/" },
        { icon: <FaInstagram size={30} />, link: "/" },
      ],
    },
  ];

  // const onClickHandler = (link: string) => {
  //   if (pathname !== link) push(link);
  //   window.scrollTo({ top: 0, behavior: "smooth" });
  // };

  return (
    <footer className="flex flex-col justify-center items-center pb-2 bg-background-primary gap-4 py-7">
      <Logo className="w-60 md:w-72" />
      <ul
        className={trim(`
          flex
          items-center
          justify-center`)}
      >
        <ButtonStyled className="!text-primary">Icon</ButtonStyled>
        <ButtonStyled className="!text-primary">Icon</ButtonStyled>
        <ButtonStyled className="!text-primary">Icon</ButtonStyled>
        <ButtonStyled className="!text-primary">Icon</ButtonStyled>
        <ButtonStyled className="!text-primary">Icon</ButtonStyled>
      </ul>

      <p className="font-semibold text-primary text-responsive-2md">
        {t("visit", { ns: "footer" })}
      </p>

      <small
        className={trim(`
          text-primary 
          text-center 
          text-responsive-xs 
          font-medium`)}
      >
        &copy; {new Date().getFullYear()} {t("copyRights")}{" "}
        {t("coName", { ns: "common" })}
      </small>
    </footer>
  );
};

export default Footer;
