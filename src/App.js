import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./components/forms/login";
import Registration from "./components/forms/registration";
import Profile from "./components/profile/profile";
import TopQuestions from "./components/topquestions";
import MyQuestions from "./components/myQuestions";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      isLogged: false,
      cookie:document.cookie.match(/^(.*;)?\s*MyCookie\s*=\s*[^;]+(.*)?$/)
    };
  }

  componentDidMount() {
    fetch("/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (data.message == "positive") {
          this.setState({
            isLogged: true,
            firstname: data.result[0].firstname,
            lastname: data.result[0].secondname,
            email: data.result[0].email,
          });
        } else this.setState({ status: false });
      });
  }

  render() {
    return (
      <Router>
        <Nav
          activeKey="/home"
          className="shadow p-3 mb-5 justify-content-center navbar-dark bg-dark"
          style={{ minHeight: "50px" }}
        >
          <Nav.Item>
            <Nav.Link as={Link} to="/home">
              Home
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            {this.state.isLogged ? (
              <Nav.Link as={Link} to="/profile">
                Profile
              </Nav.Link>
            ) : null}
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/myquestions">
            My Questions
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/login">
              Log in
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/register">
              Register
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <Switch>
          <Route path="/login">
            <Login  />
          </Route>
          <Route path="/register">
            <Registration />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/myquestions">
            <MyQuestions/>
          </Route>
          <Route path="/">
            <div className="App">
              <TopQuestions />
            </div>
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
