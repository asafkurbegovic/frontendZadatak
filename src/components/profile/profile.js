import React from "react";
import { connect } from "react-redux";
import { setData, setLoggedin } from "../../actions";
import { Button, Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css'
import ChangePass from "./ChangePass";
import "./profile.css"


class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: false,
      firstname: "",
      lastname: "",
      email: "",
      showComponent:false
    };
    this.onButtonPressed = this.onButtonPressed.bind(this)
  }


  onButtonPressed() {
    this.setState({showComponent:true})
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
          this.props.setData(data);
          this.setState({
            status: true,
            firstname: data.result[0].firstname,
            lastname: data.result[0].secondname,
            email: data.result[0].email,
          });
        } else this.setState({ status: false });
      });
  }

  render() {
    return (
      <Container className="rounded shadow border border-primary" style={{width:"60%", padding:"20px"}}>
        <h1>USERS PROFILE</h1>

        {this.state.status ? (
          <div>
            <lable>First name:</lable>
            <h3>{this.state.firstname}</h3>
            <lable>Last name:</lable>
            <h3>{this.state.lastname}</h3>
            <lable>Email:</lable>
            <h3>{this.state.email}</h3>
            <div className="">
            <lable className="d-block" >Change password</lable>
            <Button  variant="dark" onClick={this.onButtonPressed}>
              Change
            </Button></div>
            {this.state.showComponent ?
           <ChangePass /> :
           null}
          </div>
        ) : (
          <h1>YOU ARE NOT LOGGED IN</h1>
        )}
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

export default connect(mapStateToProps, disptachData())(Profile);

// <lable>First name:</lable>
// <h3>{this.props.state[0].firstname}</h3>
// <lable>Last name:</lable>
// <h3>{this.props.state[0].secondname}</h3>
// <lable>Email:</lable>
// <h3>{this.props.state[0].email}</h3></div>
