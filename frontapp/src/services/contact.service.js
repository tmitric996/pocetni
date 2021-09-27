import axios from "axios";

const API_URL = "http://localhost:8080/auth/";
const headers = { Authorization: `Bearer ${localStorage.getItem("token")}` };

class ContactService {

    async getMyCotntacts(){
        return await axios.get(API_URL + "contacts", { params :{},headers });
    }

    async createContact(data){
        console.log(data);
        return await axios.post(API_URL + "contact", data)
    }
    async deleteContact(data){
        console.log(data);
        return await axios.delete(API_URL + `contact/${data}`)
    }
    async getContactById(data){
        return await axios.get(API_URL+`contact/${data}`, { params :{},headers });
    }
    async save(data){
        return await axios.put(API_URL+`contact`, data);
    }

}

export default new ContactService();