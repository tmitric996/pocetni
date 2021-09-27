import { Apartment } from "@material-ui/icons";
import axios from "axios";

const API_URL = "http://localhost:8080/auth/";
const params = { token: JSON.parse(localStorage.getItem("token")) };
const headers = { Authorization: `Bearer ${localStorage.getItem("token")}` };
const config = {
  headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` }
};
class AuthService {
  login(email, password) {
    return axios.post(API_URL + "login", {
      email,
      password,
    });
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("email");

    window.location.href = "http://localhost:3000/";
  }

  register(email, password, firstName, lastName) {
    console.log(email);
    return axios.post(API_URL + "signup", {
      email,
      password,
      firstName,
      lastName,
    });
  }
  getCurrentToken() {
    return JSON.parse(localStorage.getItem("token"));
  }

  // async getCurrentUserByToken() {
  //   return await axios.get(API_URL + "token", { params, headers });
  // }
  async getCurrentUser(){
    return await axios.get(API_URL + "current", { params :{},headers });
  }
  async getUsersForEnableList(){
    console.log(config)
    return await axios.get(API_URL + "users/toenable", config);
  }
  async enableUser(data){
    console.log(data)
    return await axios.post(API_URL + "user/enable", data, config);
  }
  async deleteUser(data){
    console.log(data)
    return await axios.delete(API_URL + `user/${data}`, config);
  }
  
}
export default new AuthService();
