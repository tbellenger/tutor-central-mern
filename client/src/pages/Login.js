import React, { useState } from "react";
import { Form, Button, Modal, Card, Row, Container } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../utils/mutations";
import Auth from "../utils/auth";
import background from '../assets/background.jpg'

function Login() {
  const [showModal, setShowModal] = useState(false);
  const [validated, setValidated] = useState(false);
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [login] = useMutation(LOGIN);

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleShowModal = (error) => {
    setErrorMessage(error);
    setShowModal(true);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      setErrorMessage("Check all fields are complete and try again");
      setShowModal(true);
    } else {
      setValidated(true);
      try {
        const mutationResponse = await login({
          variables: { email: formState.email, password: formState.password },
        });
        const token = mutationResponse.data.login.token;
        Auth.login(token);
      } catch (e) {
        console.log(e);
        handleShowModal(e.message);
      }
    }
  };

  const handleChange = (event) => {
    const input = event.currentTarget;
    const { name, value } = input;
    setFormState({ ...formState, [name]: value });
    input.checkValidity();
  };

  return (
    <>
     
    <Container className="p-4" style={{ backgroundImage: `url(${background})`, height:'70vh', backgroundSize: 'cover', marginTop: '5%'}}>
      <Row className="justify-content-md-center" style={{marginTop: '10%'}}>
    <Card className="col-lg-8 mt-4 p-3">
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        <Form.Group className='mb-3' controlId='formBasicEmail'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            name='email'
            onChange={handleChange}
            type='email'
            placeholder='Enter email'
            required
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            name='password'
            onChange={handleChange}
            type='password'
            placeholder='Password'
            required
          />
        </Form.Group>
        <Button variant='primary' type='submit' onClick={handleFormSubmit}>
          Submit
        </Button>
      </Form>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>{errorMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant='danger' onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      </Card>
      </Row>
      </Container>
      
    </>
  
  );
}

export default Login;
