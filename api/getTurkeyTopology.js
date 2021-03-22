export const getTurkeyTopology = async (url) => {
    return await fetch(url).then((res) => res.json());
  };
  