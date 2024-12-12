import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import "../i18n";

const I18nProvider = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    window.document.documentElement.lang = i18n.language;
    window.document.dir = i18n.dir();
  }, [i18n.dir, i18n.language, i18n]);

  return i18n;
};

export default I18nProvider;
