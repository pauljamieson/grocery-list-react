export const formatString = (name) => {
  if (name === undefined) return "";
  return name
    .split(" ")
    .map((val) => val?.charAt(0).toUpperCase() + val?.slice(1).toLowerCase())
    .join(" ");
};


// Use to reduce api calls from text inputs
export const debounce = (cb, delay = 1000) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      cb(...args);
    }, delay);
  };
};
