import React from 'react';
import { Modal,Form } from 'react-bootstrap';
import { Button } from "react-bootstrap";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function  NewProject() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
     
      <>
       
        <Button  onClick={handleShow}>
          Create New Project
        </Button>
  
        <Modal centered show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title >New Project</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
            <Form.Group controlId="formProjectName">
            <Form.Label>Project Name</Form.Label>
            <Form.Control type="text" placeholder="Enter project name" />
            </Form.Group>

            <Form.Group controlId="formProjectDescription">
            <Form.Label>Project Description</Form.Label>
            <Form.Control as="textarea" placeholder="Enter project description" />
            </Form.Group>

            <Form.Group controlId="formProjectType">
            <Form.Label>Project Type</Form.Label>
            <Form.Control type="text" placeholder="Enter project type" />
            </Form.Group>

            <Form.Group controlId="formProjectLead">
            <Form.Label>Project Lead</Form.Label>
            <Form.Control type="text" placeholder="Enter project lead" />
            </Form.Group>

            <Form.Group controlId="formProjectCategory">
            <Form.Label>Project Category</Form.Label>
            <Form.Control type="text" placeholder="Enter project category" />
            </Form.Group>
            
            
            <Button variant="primary" type="submit">
                Submit
            </Button>
            </Form>
        </Modal.Body>
          <Modal.Footer>
            
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }