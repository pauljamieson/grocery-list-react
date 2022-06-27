import axios from "axios";

const BASEURL =
  process.env.NODE_ENV === "development"
    ? "http://192.168.0.121:5000"
    : "http://192.168.0.150:8004";

const _http = (method, route, payload) => {
  return new Promise(async (resolve, reject) => {
    const optionalHeaders = _createOptionalHeaders();
    try {
      const request = {
        url: new URL(route, BASEURL),
        method: method,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          ...optionalHeaders,
        },
        data: JSON.stringify(payload),
      };
      const resp = await axios.request(request);
      if (resp.headers["token"] !== undefined)
        localStorage.setItem("token", resp.headers["token"]);
      return resolve(resp.data);
    } catch (e) {
      return reject(e);
    }
  });
};

const _createOptionalHeaders = () => {
  const options = {
    ...(localStorage.getItem("token") !== undefined && {
      token: localStorage.getItem("token"),
    }),
    ...(localStorage.getItem("username") !== undefined && {
      username: localStorage.getItem("username"),
    }),
  };
  return options;
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

export const login = (username, password) => {
  return new Promise(async (resolve, reject) => {
    const payload = {
      username: username.toLowerCase(),
      password,
    };
    try {
      const resp = await _http("POST", "/login", payload);
      if (resp.status === "success") localStorage.setItem("username", username);
      resolve(resp);
    } catch (e) {
      reject(e);
    }
  });
};

export const logout = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const resp = await _http("POST", "/api/auth/logout");
      resolve(resp);
    } catch (e) {
      reject(e);
    }
  });
};

export const getProfile = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const resp = await _http("GET", "/api/profile");
      resolve(resp);
    } catch (e) {
      reject(e);
    }
  });
};

export const changePassword = (oldPassword, newPassword) => {
  return new Promise(async (resolve, reject) => {
    const field = "password";
    const payload = { field, oldPassword, newPassword };
    try {
      const resp = await _http("PUT", "/api/profile", payload);
      resolve(resp);
    } catch (e) {
      reject(e);
    }
  });
};
