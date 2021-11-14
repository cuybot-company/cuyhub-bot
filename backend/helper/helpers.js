export const toString = (output) => {
  return typeof output != "string" ? JSON.stringify(output) : output;
};
