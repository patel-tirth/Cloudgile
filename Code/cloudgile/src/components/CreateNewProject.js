import React from 'react';
import { Modal,Form } from 'react-bootstrap';
import { Button } from "react-bootstrap";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import uuid from 'react-uuid'
import { getCurrentUser } from '../auth';
import { CreateProject } from '../Data/Scrum';
import { addUserToProject, addProjectToUser } from '../Data/Projects';
import { Fab } from '@material-ui/core';
import AddIcon  from '@material-ui/icons/Add';

export default function NewProject(props) {
    const today = new Date(Date.now())
    const [show, setShow] = useState(false);
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [type, setType] = useState('')
    // const [lead, setLead] = useState('')
    const [category, setCategory] = useState('')

    const handleClose = () => {
      setName('')
      setDescription('')
      setType('')
      // setLead('')
      setCategory('')
      setShow(false)
    };

    const handleSubmit = async (e) => {
      e.preventDefault()
      const id = uuid()
      const user = getCurrentUser()
      await CreateProject({ id, name, description, type, leadId: user.id, leadName: user.name, category, numUsers: 0, users: [], numIssues: 0, numBacklog:0, numTimeline: 0, createdOn: today.toLocaleDateString(), updatedOn: today.toLocaleDateString()}, id);
      await addUserToProject(id, user.id)
      await addProjectToUser(id, user.id)
      handleClose()
      props.loadData()
    }

    const handleShow = () => setShow(true);
  
    return (
      <>
        <Fab color="primary" style={{position: 'absolute', bottom: 20, right: 20}} onClick={handleShow}>
          <AddIcon/>
        </Fab>
  
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