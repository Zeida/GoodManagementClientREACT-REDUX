import axios from "axios";

const API_URL = "http://localhost:8080/api/";

class AuthService {
  async login(username, password) {
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

  register(username, email, password) {
    let data = JSON.stringify({
      username, 
      email, 
      password 
  })
    return axios.post(API_URL + "register", data, {
      headers: {
          'Content-Type': 'application/json',
      }
  });
  }
}

export default new AuthService();
