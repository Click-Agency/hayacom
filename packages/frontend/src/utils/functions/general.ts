const trim = (className: string): string =>
  className.replace(/\s+/g, " ").trim();

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

export { trim, formatDate };
