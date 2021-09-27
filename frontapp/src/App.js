import "./App.css";
import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import Register from "./components/register.compoonent";
import Login from "./components/login.component";
import Home from "./components/home.component";
import AuthService from "./services/auth.service";
import Item from "antd/lib/list/Item";

const API_URL = "http://localhost:8080/auth/";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentToken: undefined,
      email: undefined,
    };
  }
  componentDidMount() {
    const token = AuthService.getCurrentToken();
    console.log(token);
    if (token) {
      AuthService.getCurrentUser().then((respond) => {
        console.log(respond.data.email);
        this.setState({ email: respond.data.email });
      });

      eventBus.on("logout", () => {
        this.logOut();
      });
    }
  }
  componentWillUnmount() {
    eventBus.remove("logout");
  }

  logOut() {
    AuthService.logout();
    this.setState({
      currentToken: undefined,
      email: undefined,
    });
  }
  render() {
    const email = this.state.email;
    return (
      <div className="App">
        <header className="header">
         
        
          {email ? (
            <div className="navItem">
              {this.state.email} <br />
              <a href="/" onClick={this.logOut}>
                Log out
              </a>
              <hr />
            </div>
          ) : (
            <div className="navItem">
                <Link to={"/register"}>
                  Sign up
                </Link>
              <br />
                <Link to={"/login"}>
                  Sign in
                </Link>
                <hr />
            </div>
          )}
           <h1 className="title">Phonebook</h1>
        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/home" component={Home} />
        </Switch>
        
        </header>
      </div>
    );
  }
}
const eventBus = {
  on(event, callback) {
    document.addEventListener(event, (e) => callback(e.detail));
  },
  dispatch(event, data) {
    document.dispatchEvent(new CustomEvent(event, { detail: data }));
  },
  remove(event, callback) {
    document.removeEventListener(event, callback);
  },
};
export default App;
