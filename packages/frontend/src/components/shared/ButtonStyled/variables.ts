const varablesTwClasses = {
  font: "",
  text: "text-white",
  hover: "md:hover:scale-110 hover:shadow-2xl",
  bg: "bg-primary text-body-secondary",
  underlineColor: "text-secondary",
  border: "border border-secondary",
  rippleBg: "bg-primary",
  rippleDuration: undefined,
};

const formatClasses = (className?: string): string =>
  className ? className.replace(/\s+/g, " ").trim() : "";

export { formatClasses };
export default varablesTwClasses;

// file to customize the button component

// the obj should look like this

// const varablesTwClasses = {
//   font: "font-monospace",
//   text: "text-body-lightest",
//   hover: "hover:text-primary hover:bg-box group-hover:bg-box",
//   bg: "bg-paper",
//   border: "border border-primary",
//   rippleBg: "bg-primary",
//   rippleDuration: undefined,
// };
