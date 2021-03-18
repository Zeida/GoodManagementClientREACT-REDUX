import http from "../http-common";

class ItemDataService {
  getAll() {
    return http.get("/items");
  }

  get(itemcode) {
    return http.get(`/item/${itemcode}`);
  }

  create(data) {
    return http.post("/item/create", data);
  }

  update(id, data) {
    return http.put(`/item/${itemcode}/update`, data);
  }

  delete(id) {
    return http.delete(`/item/${itemcode}/delete`);
  }
  //es igual que get
  findByItemcode(itemcode) {
    return http.get(`/item/${itemcode}`);
  }
}

export default new ItemDataService();