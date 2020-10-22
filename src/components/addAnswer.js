import React from "react";
import { Button, Container, Form, FormGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

class AddAnswer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answer: "",
    };
  }

  onChange(props) {
    this.setState({ [props.target.name]: props.target.value });
  }

  submitAnswer(props) {
    props.preventDefault();
    const { answer } = this.state.answer;

    fetch("/answer", "/passupdate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        answer: answer,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => console.log(result));
  }
  render() {
    return (
      <Container>
        <Form onSubmit={""}>
          <FormGroup>
            <Form.Label>write your answer bellow</Form.Label>
            <Form.Control name="answer" onChange={this.onChange} />
            <Button>Answer</Button>
          </FormGroup>
        </Form>
      </Container>
    );
  }
}

export default AddAnswer;
