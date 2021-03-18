import axios from "axios";

const API_URL = "http://localhost:8080/api/";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "authenticate", { username, password })
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, password) {
    let data = JSON.stringify({
      password,
      username
  })
    return axios.post(API_URL + "register", data, {
      headers: {
          'Content-Type': 'application/json',
      }
  });
  }
}

export default new AuthService();
