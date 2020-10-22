import React from "react";
import "./login.css";
import { BrowserRouter as Router, withRouter } from "react-router-dom";
import { setData, setLoggedin } from "../../actions";
import { connect } from "react-redux";
import { Button, Container, Form } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  onPress = (props) => {
    this.setState({
      [props.target.name]: props.target.value,
    });
  };

  formSubmit = (props) => {
    props.preventDefault();

    const { email, password } = this.state;

    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.error === "wrong password or email")
          this.setState({ errMsg: data.error });
        else {
          this.setState({ data: data, isLogged: true });
          this.props.setData(data);
          this.props.setLoggedin();
          this.props.history.push("/profile");
        }

        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  

  

  render() {
    return (
      <Container className="form container rounded shadow d-flex flex-column">
        <Form className="" onSubmit={this.formSubmit}>
          <Form.Group>
            <Form.Label htmlFor="email">Email:</Form.Label>
            <Form.Control
              type="email"
                className=""
                name="email"
                placeholder="Enter your email"
                onChange={this.onPress}
                required
              />
            <Form.Label htmlFor="password">Password:</Form.Label>
              <Form.Control
                className=""
                placeholder="Enter your password"
                type="password"
                name="password"
                onChange={this.onPress}
                required
                pattern=".{5,}"
              />
            
          
          <div name="errMsg" className="errMsg">
            {this.state.errMsg}
          </div>
         <Button variant="primary" type="submit" >
          Submit
        </Button>
            </Form.Group>
          
        </Form>
      </Container>
    );
  }
}

const disptachData = () => {
  return {
    setData,
    setLoggedin,
  };
};

const mapStateToProps = (state) => {
  return {
    state: state.data,
  };
};

const ShowTheLocationWithRouter = withRouter(Login);

export default connect(
  mapStateToProps,
  disptachData()
)(ShowTheLocationWithRouter);
