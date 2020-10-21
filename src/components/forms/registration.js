import React from "react";
import "./registration.css";
import { Form, Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      lastname: "",
      email: "",
      validateEmail:"",
      validatePass:"",
      password: "",
    };
  }

  onPress = (props) => {
    this.setState({
      [props.target.name]: props.target.value,
    });
  };

  formSubmit = ( props) => {
    props.preventDefault();

    

    const { name, lastname, email, password } = this.state;
     fetch("/registration", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        lastname: lastname,
        email: email,
        password: password,
      }),
    })
      .then( (res) => {
        return res.json();
      })
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <Form className="container bg-secondary" style={{padding:"20px",width:"50%",color:"white"}} onSubmit={this.formSubmit}>
        <h3 style={{textAlign:"center", borderBottom:"solid 2px white"}}>REGISTRATION FORM</h3>
        <Form.Group>
          <Form.Label htmlFor="name">First name: </Form.Label>
            <Form.Control
              className=""
              name="name"
              placeholder="Enter your first name"
              onChange={this.onPress}
            />
         
        
        
          <Form.Label htmlFor="lastname">Last name:</Form.Label>
            
            <Form.Control
              className=""
              name="lastname"
              placeholder="Enter your last name"
              onChange={this.onPress}
            />
          
        
       
          <Form.Label htmlFor="email">Email:</Form.Label>
            
            <Form.Control
              className=""
              name="email"
              placeholder="Enter your email"
              onChange={this.onPress}
              required
            />
          
        
        
          <Form.Label htmlFor="email">
            Validate email:</Form.Label>
            <Form.Control
              className=""
              name="email"
              placeholder="Validate email"
              required
            />
          
        
          <Form.Label>
            Password:</Form.Label>
            <Form.Control
              className=""
              placeholder="Enter your password"
              type="password"
              name="password"
              onChange={this.onPress}
              required
            />
        
          <Form.Label>
            Validate password:</Form.Label>
            <Form.Control
              className=""
              placeholder="Validate password"
              type="password"
              name="password"
              required
            />
          
        </Form.Group>
        <Button variant="primary" type="submit" >
          Submit
        </Button>
      </Form>
    );
  }
}

export default Registration;