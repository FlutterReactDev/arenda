export const formatDate = (payload: Date | number | string) => {
  const date = _convertToDate(payload);
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
};
export const _convertToDate = (date: Date | number | string) => {
  return date instanceof Date
    ? date
    : typeof date === "string"
    ? new Date(date.toString().replace("+03:00", ""))
    : new Date(date);
};
