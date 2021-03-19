import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/";

class ItemDataService {

  getAll() {
    return axios.get(API_URL + "items", { headers: authHeader() });
  }

  get(itemcode) {
    return axios.get(API_URL + "/item/"+{itemcode}, { headers: authHeader() });
  }

  create(data) {
    return axios.post(API_URL + "/item/create",data, { headers: authHeader() });
  }

  update(itemcode, data) {
    return axios.put(API_URL + "/item/"+{itemcode}+"/update", { headers: authHeader() });
  }

  delete(itemcode) {
    return axios.delete(API_URL + "/item/"+{itemcode}+"/delete", { headers: authHeader() });
  }
}




export default new ItemDataService();