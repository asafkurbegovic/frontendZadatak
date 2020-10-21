import React from "react";
import { connect } from "react-redux";
import { setData, setLoggedin } from "../../actions";
import { Button, Form } from "react-bootstrap";

class ChangePass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newPass: "",
    };
  }

  onPress = (props) => {
    this.setState({
      [props.target.name]: props.target.value,
    });
  };

  formSubmit = (props) => {
    props.preventDefault();

    const { newPass } = this.state;
    const { email } = this.props.state.result[0];

    fetch("/passupdate", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        newPass: newPass,
        email: email,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => console.log(result));
  };

  render() {
    return (
      <Form onSubmit={this.formSubmit}>
        <Form.Group>
          <Form.Label>Write your new password bellow</Form.Label>
          <Form.Control
            onChange={this.onPress}
            type="password"
            placeholder="Password must contain at least 5 charactes"
            name="newPass"
            required
            pattern=".{5,}"
            style={{width:"50%"}}
          />
          <Button variant="primary" type="submit" >
          Submit
        </Button>
        </Form.Group>
        
      </Form>
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

export default connect(mapStateToProps, disptachData())(ChangePass);
