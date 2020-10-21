import React from "react";
import "./topquestions.css";
import { Container, Col, Row, ListGroup } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css'



class TopQuestions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      likes: [],
      answers: [],
    };
  }

  componentDidMount() {
    fetch("/topquestions")
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        this.setState({
          questions: result[0],
          answers: result[1],
          likes: result[2],
             
        });
      });
  }

  render() {
    return (
      <Container className="container">
        <Row>
          <Col className="body">
            <h3>LIST OF QUESTIONS</h3>
            <ul>
              <ListGroup>
            {this.state.questions.map((item) => (
              <li>
                <ListGroup.Item className="shadow p-3 mb-5  rounded" variant="primary" style={{borderRadius:"10px"}}>
                <a className="itemName">{item.firstname}</a> {item.question}</ListGroup.Item>
              </li>
            ))}
            </ListGroup>
            </ul>
          </Col>
          <Col className="body">
            <h3>MOST LIKED ANSWER</h3>
            <ul>
              <ListGroup>
            {this.state.answers.map((item) => (
              <li>
                <ListGroup.Item className="shadow p-3 mb-5 rounded" variant="dark" style={{borderRadius:"10px"}}>
                <a className="itemName">{item.top}</a> {item.question}</ListGroup.Item>
              </li>
            ))}</ListGroup></ul>
          </Col>
          <Col className="body">
            <h3>MOST ACTIVE PEOPLE</h3>
            <ul>
              <ListGroup>
            {this.state.likes.map((item) => (
              <li><ListGroup.Item className="shadow p-3 mb-5  rounded" variant="primary" style={{borderRadius:"10px"}}>
                <a className="itemName">{item.count}</a> {item.firstname}</ListGroup.Item>
              </li>
            ))}</ListGroup></ul>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default TopQuestions;
