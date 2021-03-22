export const formatNumbers = (number) => {
  return new Intl.NumberFormat().format(number);
};
