export const getCaseRatio = async (url) => {
  return await fetch(url).then((res) => res.json());
};
