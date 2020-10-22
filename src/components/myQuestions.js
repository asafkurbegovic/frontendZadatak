import React from "react";
import {
  Form,
  FormLabel,
  ListGroup,
  Container,
  FormControl,
  FormGroup,
  Button,
  InputGroup,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

class MyQuestions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: "",
      status: false,
    };
   
  }

  componentDidMount() {
    fetch("/myquestions")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        
        if (data.message === "positive") {
          console.log(data.result);
          this.setState({ status: true, data: data.result });
        } else this.setState({ status: false });
      });
  }

  submitQuestion = (props) => {
    this.setState({
      [props.target.name]: props.target.value,
    });
  };

  askQuestion=(props) => {
    props.preventDefault();
    console.log("button is clicke")

    const { question } = this.state;

    fetch("/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify( {
        question: question,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {console.log(result)});
  }

  deleteQuestio =(props)=>{
    props.preventDefault()

    // rado al sam zaboravio dodati u bazu ON DELETE CASCADE... 
    // nemam vremena da ispravljam

  }

  render() {
    return (
      <Container>
        <h2>YOUR QUESTIONS</h2>
        {this.state.status === true && this.state.data < 1 ? (
          <a>We cant find any questions here</a>
        ) : (
          ""
        )}
        <ListGroup>
          {this.state.status === true ? (
            this.state.data.map((item) => (
              <InputGroup>
              <ListGroup.Item>{item.question} </ListGroup.Item>
              <InputGroup.Append><Button variant="danger">Delete</Button></InputGroup.Append>
              </InputGroup>
            ))
          ) : (
            <h3>YOU ARE NOT LOGGED IN</h3>
          )}
          
        </ListGroup>
         {this.state.status === true ?
        <Form onSubmit={this.askQuestion}>
          <FormGroup>
            <FormLabel>Have a question? Write it below </FormLabel>
            <InputGroup>
            <FormControl
              name="question"
              placeholder="Write your question here"
              onChange={this.submitQuestion}
            ></FormControl>
            <InputGroup.Append>
            <Button onClick={this.askQuestion} >Ask</Button>
            </InputGroup.Append>
            </InputGroup>
          </FormGroup>
        </Form>:""}
        
      </Container>
    );
  }
}

export default MyQuestions;
