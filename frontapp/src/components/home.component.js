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
    this.handlerNewContact = this.handlerNewContact.bind(this);
    this.onChangeNumber = this.onChangeNumber.bind(this);
    this.onChangeNickName =this.onChangeNickName.bind(this);
    this.onChangeLastName =this.onChangeLastName.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.deleteContact=this.deleteContact.bind(this);
    this.onChangeFavorite=this.onChangeFavorite.bind(this);
    this.eableUser=this.eableUser.bind(this);
    this.deleteUser=this.deleteUser.bind(this);
    this.uploadPic=this.uploadPic.bind(this);
    this.editContact=this.editContact.bind(this);
    this.showAddContact=this.showAddContact.bind(this);
    this.handleCancel=this.handleCancel.bind(this);
    this.showImage=this.showImage.bind(this);
  }
  handleCancel(){
    window.location.reload();
    
  }
  showAddContact(){
    this.setState({edit: false});
      document.getElementById('name').value="";
      document.getElementById('lastName').value="";
      document.getElementById('nickName').value="";
      document.getElementById('number').value="";
      document.getElementById('favorite').checked=false;
      document.getElementById('slika').src=``;
      this.setState({visible : true, id: "", contact: {}, name: "",
      lastName: "",
      nickName: "",
      number: "",file: [],
      favorte: false});
  }
  editContact(e){
    e.preventDefault();
    this.setState({edit: true});
    ContactService.getContactById(e.target.value).then((res)=>{
      console.log(res);
      this.setState({contact : res.data,
      name: res.data.name,
      lastName: res.data.lastName,
      nickName: res.data.nickName,
      number: res.data.number[0].number,
      favorte: res.data.favorite,
      id: res.data.id,
      file: res.data.picture

    });
      document.getElementById('name').value=res.data.name;
      document.getElementById('lastName').value=res.data.lastName;
      document.getElementById('nickName').value=res.data.nickName;
      document.getElementById('number').value=res.data.number[0].number;
      document.getElementById('favorite').checked=this.state.favorte;
      document.getElementById('slika').src=`data:image/jpeg;base64,${res.data.picture}`;
      this.setState({visible: true})
    });
    
  }
  uploadPic(e){
    e.preventDefault();
    console.log(e.target.files[0])
    let file = [];
    file.push(e.target.files[0])
    this.setState({file: file, upload: true,
      fileURL : URL.createObjectURL(e.target.files[0])});
    console.log(URL.createObjectURL(e.target.files[0]));
    console.log(this.state.file);
  }
  showImage= () => {
    this.setState({
      
      image: this.state.fileURL
    });
  };

  componentDidMount(){
    //da li treba visible da se stavi na false?
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
                row.edit=<button value={element.id} onClick={this.editContact}> Edit</button>;
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
  handlerNewContact(e){
    e.preventDefault();
    console.log(this.state.file)
    if (this.state.id===""){
      let data = new FormData();
      data.append("name",this.state.name );
      data.append("lastName",this.state.lastName );
      data.append("nickName",this.state.nickName );
      data.append("number",this.state.number );
      data.append("favorite",this.state.favorte );
      if (this.state.file!=[]){
      this.state.file.forEach((i) => {
        
        data.append("picture", i);
      });}
     // data.append("picture",this.state.file);
      data.append("email",localStorage.getItem("email") );
      console.log(data.picture);
      console.log(this.state.file[0]);


    
    ContactService.createContact(data).then((res)=>{
      console.log(res);
    });}
    else {
      console.log("usao u else")
      let data = new FormData();
      data.append("name",this.state.name );
      data.append("lastName",this.state.lastName );
      data.append("nickName",this.state.nickName );
      data.append("number",this.state.number );
      data.append("favorite",this.state.favorte );
      data.append("id",this.state.id);
      if (this.state.edit && this.state.upload){
      this.state.file.forEach((i) => {
        
        data.append("picture", i);
      });} 
     
      data.append("email",localStorage.getItem("email") );
      ContactService.save(data).then((res)=>{
        console.log(res);
      });}
    // window.location.reload();
    console.log(this.state.file);

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
  onChangeName(e){
    this.setState({name: e.target.value});
  }
  onChangeLastName(e){
    this.setState({lastName: e.target.value});
  }
  onChangeNickName(e){
    this.setState({nickName: e.target.value});
  }
  onChangeNumber(e){
    this.setState({number: e.target.value});
  }
 
   onChangeFavorite(e){
    
    this.setState({favorte: !this.state.favorte});
    
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
    <div className="col-md-12">
      <br />
      <h1>Home page</h1>
      {this.state.user===true && (
      <div className="grid-container1">
        <button onClick={this.showAddContact}>Add new contact</button>
        <hr/>
        <h3><ContactsOutlined></ContactsOutlined>My contacts:</h3>
         <MDBDataTable
            striped
            bordered
            hover
            data={this.state.data} 
            /><hr />
            <div className="add_contacts" hidden={!this.state.visible}>
           <h2>Add new contact:</h2>
           <hr />
           
           <Form >
            <div>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <Input id="name"
                    type="text"
                    className="form-control"
                    name="name"
                    value={this.state.name}
                    onChange={this.onChangeName}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last name</label>
                  <Input id="lastName"
                    type="text"
                    className="form-control"
                    name="lastName"
                    value={this.state.lastName}
                    onChange={this.onChangeLastName}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="nickName">Nickname</label>
                  <Input id="nickName"
                    type="text"
                    className="form-control"
                    name="nickName"
                    value={this.state.nickName}
                    onChange={this.onChangeNickName}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="number">Number</label>
                  <Input id="number"
                    type="text"
                    className="form-control"
                    name="number"
                    value={this.state.number}
                    onChange={this.onChangeNumber}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="favorite">Favorite</label>
                  <Input id="favorite"
                     type="checkbox"
                    className="form-control"
                    name="favorite"
                    value={this.state.favorte}
                    checked={this.state.favorte}
                    onChange={this.onChangeFavorite}
                  />
                </div>
                <div className="field">
                          <label className="form_label">
                            Add photo:
                          </label>
                          <input
                            accept="image/*"
                            type="file"
                            id="file"
                            onChange={this.uploadPic}
                          />
                        </div>
                        <div>
                          <img id="slika" hidden={!this.state.upload && !this.state.edit}
                          width={250}
                          height={140}
                          src={this.state.fileURL}
                          ></img>
                        </div>
                
              </div>
              <div className="form-group">
              <button onClick={this.handlerNewContact} className="btn btn-primary btn-block" >
                  <span className="spinner-border spinner-border-sm"></span>
                <span>Save</span>
              </button>
              <button onClick={this.handleCancel}>Cancel</button>
            </div>
            </Form>
            
            </div>
            <hr />
            {/* <table >
              <thead>
                <tr>
                  <th></th>
                  <th></th>

                <th>Name</th>
                <th>Surname</th>
                <th>Nickname</th>
                <th>Number</th></tr>
              </thead>
          {this.state.myContacts.map((i) => {
            console.log(i);
           
            const id = i.id;
            var divs = (
              
              
              <tbody key={i.id} className="thumbnail">
                  { i.favorite ?
                   (<tr>
                     <td><StarIcon></StarIcon></td>
                     <td> <img
                    width={50}
                    height={50}
                    src={`data:image/jpeg;base64,${i.picture}`}
                    ></img></td>
                    <td>{i.name}</td>
                    <td> {i.lastName} </td>
                    <td>{i.nickName} </td>
                    <td>{i.number[0].number}</td>
                    
                    <td><button value={i.id} onClick={this.deleteContact}> Delete</button></td>
                    <td><button value={i.id} onClick={this.editContact}> Edit</button></td></tr>)
                    :(<tr>
                      <td><StarBorderIcon></StarBorderIcon></td>
                      <td> <img
                     width={50}
                     height={50}
                     src={`data:image/jpeg;base64,${i.picture}`}
                     ></img></td>
                     <td>{i.name}</td>
                     <td> {i.lastName} </td>
                     <td>{i.nickName} </td>
                     <td>{i.number[0].number}</td>
                     
                     <td><button value={i.id} onClick={this.deleteContact}> Delete</button></td>
                     <td><button value={i.id} onClick={this.editContact}> Edit</button></td></tr>)}
                  
                
              </tbody>
              
            );
            return divs;
          })}
          {this.divs}
          </table> */}
          <hr />
         
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
