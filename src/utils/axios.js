import axios from "axios";
import swal from "sweetalert";

const instance = axios.create({
  baseURL: "http://localhost:3000",
});

function getToken(type) {
  return localStorage.getItem(`${type}_token`);
}

export function saveTokens(accessToken, refreshToken) {
  localStorage.setItem("access_token", accessToken);
  localStorage.setItem("refresh_token", refreshToken);
}

export function authenticate() {
  const accessToken = getToken("access");
  instance.defaults.headers.common["authorization"] = `Bearer ${accessToken}`;
}

instance.interceptors.response.use(
  function (response) {
    return response.data;
  },
  async function (error) {
    const request = error.response.config;

    if (error.response.status === 403) {
      const refreshToken = getToken("refresh");

      if (!refreshToken) {
        throw new Error(error);
      }

      const data = await instance.post("/auth/refresh", { refreshToken });

      if (data) {
        saveTokens(data.accessToken, data.refreshToken);
        authenticate();

        return instance.request({
          ...request,
          headers: {
            ...request.headers,
            ...instance.defaults.headers.common,
          },
        });
      }
    }

    if (error.response.status === 400) {
      return Promise.reject(error.response.data);
    }

    if (error.response.status == 500) {
      swal({
        icon: "error",
        title: "Ocorreu um erro",
        text: "Nao foi possivel realizar a operacao. Por favor, tente novamente",
      });

      return Promise.reject();
    }
  }
);

authenticate();

export default instance;
