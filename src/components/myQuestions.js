import React from "react";
import { FormLabel, ListGroup, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

class MyQuestions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    fetch("/myquestions")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        this.setState({ data:data.result }); ;
      });
  }

  render() {
    return (
      <Container>
        <h3>YOUR QUESTIONS</h3>
        {this.state.message ? <a>We cant find any questions here</a> : ""}
        <ListGroup>
          { this.state.data.map((item) => (
            <ListGroup.Item>{item.question}</ListGroup.Item>
          ))}
        </ListGroup>
      </Container>
    );
  }
}

export default MyQuestions;
