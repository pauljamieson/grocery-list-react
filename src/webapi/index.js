import axios from "axios";

const BASEURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "http://192.168.0.150:8004";

const _http = (method, route, payload) => {
  return new Promise(async (resolve, reject) => {
    try {
      const request = {
        url: new URL(route, BASEURL),
        method: method,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        data: JSON.stringify(payload),
      };
      const resp = await axios.request(request);
      return resolve(resp.data);
    } catch (e) {
      return reject(e);
    }
  });
};

export const signUp = (username, email, password) => {
  return new Promise(async (resolve, reject) => {
    const payload = {
      username: username.toLowerCase(),
      email: email.toLowerCase(),
      password,
    };
    try {
      const resp = await _http("POST", "/signUp", payload);
      resolve(resp);
    } catch (e) {
      reject(e);
    }
  });
};
