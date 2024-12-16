import { trim } from "../../../utils/functions/general";

const Footer = ({ footerList }: { footerList: string[] }) => {
  return (
    <ul
      className={trim(`
        flex
        flex-col
        bg-background-primary
        p-4
        rounded-b-lg`)}
    >
      {footerList.map((item, i) => (
        <li
          key={i}
          className={trim(`
            text-responsive-2xs`)}
        >
          {item}
        </li>
      ))}
    </ul>
  );
};

export default Footer;
