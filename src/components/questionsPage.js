import React from "react";
import { Form, FormGroup, Button, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

class QuestionPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: false,
      questions: [],
      answers: [],
      showComponent: false,
      answer: "",
    };
    this.addAnswer = this.addAnswer.bind(this);
  }

  onChange = (props) => {
    this.setState({
      [props.target.name]: props.target.value,
    });
  };
  componentDidMount() {
    fetch("/all")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log("here are question data " + data.bigData);
        if(data.bigData=="succes") this.setState({status:true})
        if (data.message === "succes")
          this.setState({

            questions: data.result[0],
            answers: data.result[1],
          });
          
        else this.setState({ status: false });
      });

    fetch("/islogged")
      .then((res) => {
        res.json();
      })
      .then((data) => {console.log(data)});
  }

  addAnswer(props) {
    fetch("/answer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        questionid: props,
        answer: this.state.answer,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => console.log("answer" + data));
  }

  render() {
    return (
      <Container>
        <Container onClick={() => this.addAnswer}>
          {this.state.questions.map((item) => (
            <Container  className="border rounded" key={item.id}>
              {item.question}
              {this.state.answers.map((ans) => (
                <Container >
                  {item.id === ans.questionid ? (
                    <span>{ans.answer}</span>
                  ) : null}
                </Container>
              ))}
              {this.state.status ?
              <Form>
                <FormGroup>
                  <small className="form-text text-muted">
                    write your answer bellow (refresh page after answering to
                    see your answer)
                  </small>
                  <Form.Control name="answer" onChange={this.onChange} />
                  <Button onClick={() => this.addAnswer(item.id)} type="button">
                    Answer
                  </Button>
                </FormGroup>
              </Form>:<small >LOG IN OR REGISTER IF YOU WANT TO ANSWER THIS QUESTION</small>}
            </Container>
          ))}
        </Container>
      </Container>
    );
  }
}

export default QuestionPage;
