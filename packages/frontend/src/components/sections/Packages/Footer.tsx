import { trim } from "../../../utils/functions/general";

const Footer = ({
  title,
  footerList,
}: {
  title: string;
  footerList: string[];
}) => (
  <div
    className={trim(`
      bg-background-secondary
      p-4
      md:px-28
      rounded-b-lg
      shadow-2xl`)}
  >
    <h3
      className={trim(`
        text-primary
        underline
        underline-offset-2
        font-semibold
        mb-2`)}
    >
      {title}
    </h3>
    <ul
      className={trim(`
        flex
        flex-col
        list-decimal
        list-inside
        text-primary
        gap-1`)}
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
  </div>
);

export default Footer;
