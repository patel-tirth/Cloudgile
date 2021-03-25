import React from 'react';
import { Modal,Form } from 'react-bootstrap';
import { Button } from "react-bootstrap";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import uuid from 'react-uuid'
import { getCurrentUser } from '../auth';
import { CreateProject } from '../data/Scrum/CreateProject';
import { addUserToProject } from '../data/Projects';

export default function NewProject(props) {
    const [show, setShow] = useState(false);
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [type, setType] = useState('')
    const [lead, setLead] = useState('')
    const [category, setCategory] = useState('')

    const handleClose = () => {
      setName('')
      setDescription('')
      setType('')
      setLead('')
      setCategory('')
      setShow(false)
    };

    const handleSubmit = async (e) => {
      e.preventDefault()
      const id = uuid()
      const user = getCurrentUser().id
      await CreateProject({id, name, description, type, lead, category, numUsers: 0, createdOn: Date.now(), updatedOn: Date.now()}, id);
      await addUserToProject(id, user)
      handleClose()
      props.loadData()
    }

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
            <Form onSubmit={handleSubmit} onClose={handleClose}>
            <Form.Group controlId="formProjectName">
            <Form.Label required>Project Name</Form.Label>
            <Form.Control required onInput={e => setName(e.target.value)} value={name} type="text" placeholder="Enter project name" />
            </Form.Group>

            <Form.Group controlId="formProjectDescription">
            <Form.Label required>Project Description</Form.Label>
            <Form.Control required onInput={e => setDescription(e.target.value)} value={description} as="textarea" placeholder="Enter project description" />
            </Form.Group>

            <Form.Group controlId="formProjectType">
            <Form.Label required>Project Type</Form.Label>
            <Form.Control required onInput={e => setType(e.target.value)} value={type} type="text" placeholder="Enter project type" />
            </Form.Group>

            <Form.Group controlId="formProjectLead">
            <Form.Label required>Project Lead</Form.Label>
            <Form.Control required onInput={e => setLead(e.target.value)} value={lead} type="text" placeholder="Enter project lead" />
            </Form.Group>

            <Form.Group controlId="formProjectCategory">
            <Form.Label required>Project Category</Form.Label>
            <Form.Control required onInput={e => setCategory(e.target.value)} value={category} type="text" placeholder="Enter project category" />
            </Form.Group>
            
            <Button variant="primary" type="submit">
                Submit
            </Button>
            </Form>
        </Modal.Body>
        </Modal>
      </>
    );
  }