import React, { Component } from "react";
import AuthService from "../services/auth.service";

class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
    };
  }
  onChangeFirstName(e) {
    this.setState({
      firstName: e.target.value,
    });
  }
  onChangeLastName(e) {
    this.setState({
      lastName: e.target.value,
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  handleRegister(e) {
    e.preventDefault();

    if (true) {
      AuthService.register(
        this.state.email,
        this.state.password,
        this.state.firstName,
        this.state.lastName
      ).then(
        (response) => {
          console.log(response);
          window.location.href = "http://localhost:3000/";
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
    }
  }

  render() {
    return (
      <div id="layoutAuthentication">
      <div id="layoutAuthentication_content">
          <main>
              <div class="container">
                  <div class="row justify-content-center">
                      <div class="col-lg-7">
                          <div class="card shadow-lg border-0 rounded-lg mt-5">
                              <div class="card-header"><h3 class="text-center font-weight-light my-4">Create Account</h3></div>
                              <div class="card-body">
                                  <form>
                                      <div class="row mb-3">
                                          <div class="col-md-6">
                                              <div class="form-floating mb-3 mb-md-0">
                                                  <input class="form-control" id="inputFirstName" type="text" 
                                                  name="firstName"
                                                  value={this.state.firstName}
                                                  onChange={this.onChangeFirstName}
                                                  placeholder="Enter your first name" />
                                                  <label for="inputFirstName">First name</label>
                                              </div>
                                          </div>
                                          <div class="col-md-6">
                                              <div class="form-floating">
                                                  <input class="form-control" id="inputLastName" type="text" 
                                                   name="lastName"
                                                   value={this.state.lastName}
                                                   onChange={this.onChangeLastName}
                                                  placeholder="Enter your last name" />
                                                  <label for="inputLastName">Last name</label>
                                              </div>
                                          </div>
                                      </div>
                                      <div class="form-floating mb-3">
                                          <input class="form-control" id="inputEmail" type="email" 
                                           name="email"
                                           value={this.state.email}
                                           onChange={this.onChangeEmail}
                                          placeholder="name@example.com" />
                                          <label for="inputEmail">Email address</label>
                                      </div>
                                      <div class="row mb-3">
                                          <div class="col-md-6">
                                              <div class="form-floating mb-3 mb-md-0">
                                                  <input class="form-control" id="inputPassword" type="password"
                                                  name="password"
                                                  value={this.state.password}
                                                  onChange={this.onChangePassword}
                                                  placeholder="Create a password" />
                                                  <label for="inputPassword">Password</label>
                                              </div>
                                          </div>
                                      </div>
                                      <div class="mt-4 mb-0">
                                          <div class="d-grid"> <button onClick={this.handleRegister}
                                             ref={(c) => {
                                               this.form = c;
                                                    }}  >Create account</button></div>
                                      </div>
                                  </form>
                              </div>
                              <div class="card-footer text-center py-3">
                                  <div class="small"><a href="/login">Have an account? Go to login</a></div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </main>
      </div>
       
      </div>
    );
  }
}
export default Register;
