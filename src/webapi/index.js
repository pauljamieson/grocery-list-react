import axios from "axios";

const BASEURL =
  process.env.NODE_ENV === "development"
    ? "http://192.168.0.121:5000"
    : "http://groceries.hopto.me";

const _http = (method, route, payload) => {
  return new Promise(async (resolve, reject) => {
    const optionalHeaders = _createOptionalHeaders();
    try {
      const url = new URL(route, BASEURL);
      const request = {
        url: url.toString(),
        method: method,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          ...optionalHeaders,
        },
        params: method.toLowerCase() === "get" ? payload : undefined,
        data:
          method.toLowerCase() !== "get" ? JSON.stringify(payload) : undefined,
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
      const resp = await _http("POST", "/api/signUp", payload);
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
      const resp = await _http("POST", "/api/login", payload);
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

export const changeEmail = (email) => {
  return new Promise(async (resolve, reject) => {
    const field = "email";
    const payload = { field, email };
    try {
      const resp = await _http("PUT", "/api/profile", payload);
      resolve(resp);
    } catch (e) {
      reject(e);
    }
  });
};

export const createGroceryList = (name) => {
  return new Promise(async (resolve, reject) => {
    const payload = { name };
    try {
      const resp = await _http("POST", "/api/grocery-list", payload);
      resolve(resp);
    } catch (e) {
      reject(e);
    }
  });
};

export const deleteGroceryList = (id) => {
  return new Promise(async (resolve, reject) => {
    const payload = { id };
    try {
      const resp = await _http("DELETE", "/api/grocery-list", payload);
      resolve(resp);
    } catch (e) {
      reject(e);
    }
  });
};

export const getGroceryLists = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const resp = await _http("GET", "/api/grocery-lists");
      resolve(resp);
    } catch (e) {
      reject(e);
    }
  });
};

export const getGroceryList = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const resp = await _http("GET", `/api/grocery-list/${id}`);
      resolve(resp);
    } catch (e) {
      reject(e);
    }
  });
};

export const addItemToList = (listId, item) => {
  return new Promise(async (resolve, reject) => {
    const payload = { item };
    try {
      const resp = await _http("PUT", `/api/grocery-list/${listId}`, payload);
      resolve(resp);
    } catch (e) {}
  });
};

export const removeItemFromList = (listId, item) => {
  return new Promise(async (resolve, reject) => {
    const payload = { item };
    try {
      const resp = await _http(
        "DELETE",
        `/api/grocery-list/${listId}`,
        payload
      );
      resolve(resp);
    } catch (e) {
      reject(e);
    }
  });
};

export const setItemSelectedStatus = (listId, item, status) => {
  return new Promise(async (resolve, reject) => {
    const payload = { item, status };
    try {
      const resp = await _http("PATCH", `/api/grocery-list/${listId}`, payload);
      resolve(resp);
    } catch (e) {
      reject(e);
    }
  });
};

export const getItems = (filter) => {
  return new Promise(async (resolve, reject) => {
    const params = { filter };
    try {
      const resp = await _http("GET", "/api/grocery-list/", params);
      resolve(resp);
    } catch (e) {
      reject(e);
    }
  });
};
