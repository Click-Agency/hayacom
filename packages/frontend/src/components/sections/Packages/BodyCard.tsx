const BodyCard = ({
  text,
  className,
}: {
  text: string;
  className?: string;
}) => {
  return (
    <li
      className={`
        md:max-w-[300px]
        p-2
        border-2
        rounded-lg
        text-black
        ${className}`}
        
    >
      {text}
    </li>
  );
};

export default BodyCard;
