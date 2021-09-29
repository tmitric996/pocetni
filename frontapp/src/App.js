import "./App.css";
import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import Register from "./components/register.compoonent";
import Login from "./components/login.component";
import Home from "./components/home.component";
import AuthService from "./services/auth.service";
import AccountCircleOutlined from '@material-ui/icons/AccountCircleOutlined';

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
        {email ? (<nav class="sb-topnav navbar navbar-expand navbar-dark bg-dark">
           
           <a class="navbar-brand ps-3" href="/" onClick={this.logOut}>Logout</a>
           
       </nav>):(
         <nav class="sb-topnav navbar navbar-expand navbar-dark bg-dark">
           
         <a class="navbar-brand ps-3" ><Link to={"/register"}>
                  Sign up
                </Link></a>
         <a class="navbar-brand ps-3" ><Link to={"/login"}>
                  Sign in
                </Link></a>
               
     </nav>
       )}
        
        <div id="layoutSidenav_content">
                <main>
                    <div class="container-fluid px-4">
                        <h1 class="mt-4">Phonebook</h1>
                        
                        
                        <Switch>
                          <Route exact path="/register" component={Register} />
                          <Route exact path="/login" component={Login} />
                          <Route exact path="/home" component={Home} />
                        </Switch>
                            
                        
                    </div>
                </main>
                <footer class="py-4 bg-light mt-auto">
                    <div class="container-fluid px-4">
                        <div class="d-flex align-items-center justify-content-between small">
                            <div class="text-muted">Copyright &copy; Phonebook 2021</div>
                            
                        </div>
                    </div>
                </footer>
            </div>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.bundle.min.js" crossOrigin="anonymous"></script>
        <script src="js/scripts.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.min.js" crossOrigin="anonymous"></script>
        <script src="assets/demo/chart-area-demo.js"></script>
        <script src="assets/demo/chart-bar-demo.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/simple-datatables@latest" crossOrigin="anonymous"></script>
        <script src="js/datatables-simple-demo.js"></script>
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
