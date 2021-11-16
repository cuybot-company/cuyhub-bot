const axios = require("axios");

export const getValue = async (name) => {
  const { data } = await axios.get(
    `http://localhost:3001/setting/get/name/${name}`
  );

  return data.value;
};
