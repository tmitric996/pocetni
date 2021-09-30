import React, { Component } from "react";
import { Link } from "react-router-dom";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import AuthService from "../services/auth.service";
import ContactService from "../services/contact.service";

class AddContact extends Component {
    constructor(props) {
      super(props);
      
      const {id} = props.match.params
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
        edit: false,
        upload: false
       
      };
      this.handlerNewContact = this.handlerNewContact.bind(this);
      this.onChangeNumber = this.onChangeNumber.bind(this);
      this.onChangeNickName =this.onChangeNickName.bind(this);
      this.onChangeLastName =this.onChangeLastName.bind(this);
      this.onChangeName = this.onChangeName.bind(this);
      this.onChangeFavorite=this.onChangeFavorite.bind(this);
      this.uploadPic=this.uploadPic.bind(this);
      this.handleCancel=this.handleCancel.bind(this);
    }
    handleCancel(){
        window.location.href = "http://localhost:3000/home";
        
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
     
    
      componentDidMount(){
        //da li treba visible da se stavi na false?
        this.setState({admin : false, user : false, visible : false, upload: false, edit: false});
        AuthService.getCurrentUser().then((res) => {
          this.setState({currentUser : res.data});
          console.log(res.data.authorities[0].role);
          localStorage.setItem("role", res.data.authorities[0].role);
          
            this.setState({user : true});
            ContactService.getMyCotntacts().then((response)=>{
              this.setState({myContacts : response.data});
              console.log( this.state.myContacts);
            });
          
          console.log(res);
        });
        console.log(this.props.match.params.id);
        if (this.props.match.params.id!="null"){
          ContactService.getContactById(this.props.match.params.id).then((res)=>{
            console.log(res);
            this.setState({contact : res.data,
            name: res.data.name,
            lastName: res.data.lastName,
            nickName: res.data.nickName,
            number: res.data.number[0].number,
            favorte: res.data.favorite,
            id: res.data.id,
            file: res.data.picture,
              edit: true
          });
            document.getElementById('name').value=res.data.name;
            document.getElementById('lastName').value=res.data.lastName;
            document.getElementById('nickName').value=res.data.nickName;
            document.getElementById('number').value=res.data.number[0].number;
            document.getElementById('favorite').checked=this.state.favorte;
            document.getElementById('slika').src=`data:image/jpeg;base64,${res.data.picture}`;
        });
      } 
        
      
      }
      handlerNewContact(e){
        e.preventDefault();
        console.log(this.state.file)
          if (this.props.match.params.id!="null"){
            console.log("usao u if")
      let data = new FormData();
      data.append("name",this.state.name );
      data.append("lastName",this.state.lastName );
      data.append("nickName",this.state.nickName );
      data.append("number",this.state.number );
      data.append("favorite",this.state.favorte );
      data.append("id",this.props.match.params.id);
      if (this.state.upload){
      this.state.file.forEach((i) => {
        
        data.append("picture", i);
      });} 
     
      data.append("email",localStorage.getItem("email") );

      ContactService.save(data).then((res)=>{
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
          if (this.state.file!=[]){
          this.state.file.forEach((i) => {
            
            data.append("picture", i);
          });}
          data.append("email",localStorage.getItem("email") );
        ContactService.createContact(data).then((res)=>{
          console.log(res);
        });
      }

      localStorage.removeItem("id");
        window.location.href="http://localhost:3000/home";
        
    
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
    
      
    render() {
        return (
            <div className="add_contacts" > 
           <h2>Add new contact:</h2>
         
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
              <button onClick={this.handlerNewContact}  >
              <Link to={"/home"}>Save</Link>
                
              </button> &nbsp;
              <Link to={"/home"}><button>Cancel</button></Link>
            </div>
            </Form>
            
            </div>
        );}
}
export default AddContact;