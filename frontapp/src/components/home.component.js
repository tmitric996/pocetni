import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import AuthService from "../services/auth.service";
import ContactService from "../services/contact.service";
import StarIcon from '@material-ui/icons/Star';
import ContactsOutlined from '@material-ui/icons/ContactsOutlined';

import StarBorderIcon from '@material-ui/icons/StarBorder';
import { Switch, Route, Link } from "react-router-dom";
import { MDBDataTable } from 'mdbreact';

import { RvHookupOutlined, ThreeSixty } from "@material-ui/icons";
import { isThisExpression } from "@babel/types";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: undefined,
      myContacts: [],
      admin: false,
      user: false,
      name: "",
      lastName: "",
      nickName: "",
      number: "",
      favorte: false,
      usersForEnable: [],
      file: [],
      open: false,
      contact: {},
      id: "",
      fileURL: [],
      image: "",
      data: "",
      visible: false,
      edit: false,
      upload: false
    }; 
    this.deleteContact=this.deleteContact.bind(this);
    this.eableUser=this.eableUser.bind(this);
    this.deleteUser=this.deleteUser.bind(this);
    this.editContact=this.editContact.bind(this);
    
  
  }
 
  editContact(e){
    e.preventDefault();
    localStorage.setItem("id", e.target.value);
    window.location.href="http://localhost:3000/addContact";

  }

  componentDidMount(){
    //da li treba visible da se stavi na false?
    localStorage.removeItem("id");
    this.setState({admin : false, user : false, visible : false, upload: false});
    AuthService.getCurrentUser().then((res) => {
      this.setState({currentUser : res.data});
      console.log(res.data.authorities[0].role);
      localStorage.setItem("role", res.data.authorities[0].role);
      if (localStorage.getItem("role")=== "ROLE_USER"){
        this.setState({user : true});
        ContactService.getMyCotntacts().then((response)=>{
          this.setState({myContacts : response.data});
          console.log( this.state.myContacts);
          const data = {
            columns: [
              {
                label: '',
                field: 'favorite',
                sort: 'true'
              },
              {
                label: '',
                field: 'picture',
                sort: 'asc'
              },
              {
                label: 'Name',
                field: 'name',
                sort: 'asc'
              },
              {
                label: 'Surname',
                field: 'lastName',
                sort: 'asc'
              },
              {
                label: 'Nickname',
                field: 'nickName',
                sort: 'asc'
              },
              {
                label: 'Number',
                field: 'number',
                sort: 'asc'
              },
              {
                label: '',
                field: 'edit',
                sort: 'asc'
              },
              {
                label: '',
                field: 'delete',
                sort: 'asc'
              },
            ],
            rows: [
              ],}
              if (this.state.myContacts.length>=1){
                this.state.myContacts.forEach(element => {
                  var row = {
                    favorite: false,
                    picture: null,
                    name: "",
                    lastName: "",
                    nickName: "",
                    number: "",
                    edit: "",
                    delete: ""
                  }
                  if (element.favorite){
                  row.favorite=<StarIcon></StarIcon>} else {
                    row.favorite=<StarBorderIcon></StarBorderIcon>
                  }
                  row.picture=<img width={50}
                  height={50}
                  src={`data:image/jpeg;base64,${element.picture}`} />
                  row.name=element.name;
                row.lastName=element.lastName;
                row.nickName=element.nickName;
                row.number=element.number[0].number;
                row.edit=<button value={element.id} ><Link to={`/addContact/${element.id}`}>Edit</Link></button>;
                row.delete=<button value={element.id} onClick={this.deleteContact}> Delete</button>;
                
                data.rows.push(row)
              }); {
                console.log(data.rows)
                
               // console.log( this.state.myContacts[i].name)
                
              }}
              this.setState({data:data})
        });
      } else if (localStorage.getItem("role")==="ROLE_ADMIN"){
        this.setState({admin: true});
        AuthService.getUsersForEnableList().then((res)=>{
          console.log(res);
          this.setState({usersForEnable: res.data})
        });
      }
      console.log(res);
    });
  
  }

  eableUser(e){
    e.preventDefault();
    console.log(e.target.value);
    AuthService.enableUser(e.target.value).then((res)=>{
      console.log(res);
      window.location.reload();
    });
  }
  deleteUser(e){
    e.preventDefault();
    console.log(e.target.value);
    AuthService.deleteUser(e.target.value).then((res)=>{
      window.location.reload();
    });
  }
 
  deleteContact(e){
    e.preventDefault();
    ContactService.deleteContact(e.target.value).then((res)=>{
      console.log(res);
      window.location.reload();
    });
  }
  
  render() {
    return (
    <div className="container-fluid">
      <br />
      <h1>Home page</h1>
      {this.state.user===true && (
      <div className="grid-container1">
        <button ><Link to={`/addContact/${null}`}>Add new contact</Link></button>
      
        <h3><ContactsOutlined></ContactsOutlined>My contacts:</h3>
         <MDBDataTable
            striped
            bordered
            hover
            data={this.state.data} 
            /><hr />
         
            
        </div> )}
        {this.state.admin===true && (
          <div>
            <h3>Admin page</h3>
            <hr />
            {this.state.usersForEnable.map((i) => {
            console.log(i);
            const id = i.id;
            var divs = (
              <div key={i.id} className="thumbnail">
                <div className="center_card">
                 <h3>{i.email} {i.firstName} {i.lastName}
                    <button value={i.id} onClick={this.eableUser}>Enable</button>
                    <button value={i.id} onClick={this.deleteUser}>Delete user</button></h3>
                  
                </div>
              </div>
            );
            return divs;
          })}
          </div>
        )}
    </div>);
  }
}
export default Home;
