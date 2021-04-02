import React from 'react';
import { Modal,Form } from 'react-bootstrap';
import { Button } from "react-bootstrap";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import uuid from 'react-uuid';
import { getCurrentUser } from '../auth';
import { createIssue } from '../data/Scrum/createIssue';
import { useParams } from 'react-router';
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { Tooltip } from '@material-ui/core';

export default function  NewIssue(props) {
  const today = new Date(Date.now())
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [priority, setPriority] = useState('low')
  const { projectID } = useParams();
  const handleShow = () => setShow(true);
  const [validated, setValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  
  const handleClose = () => {
    setTitle('')
    setDescription('')
    setDate('')
    setShow(false)
    setValidated(false)
  }

  const handleSubmit = async (e) => {
    const form = e.currentTarget
    setIsLoading(true)
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      setValidated(true)
      setIsLoading(false)
    } else {
      e.preventDefault()
      const id = uuid()
      const user = getCurrentUser().id
      createIssue(projectID, { id, title, description, priority, open: true, createdBy: user, assignedTo: user, completeBy: date, createdOn: today.toLocaleDateString(), updatedOn: today.toLocaleDateString() }, id).then(() => {
        setValidated(true)
        setTimeout(() => {
          handleClose()
          props.refresh()
          setIsLoading(false)
        }, 1500);
      })
    }
  }

  return (
    <>
      <Tooltip arrow title="Create Issue" placement="left">
        <Fab color="primary" style={{ position: 'absolute', bottom: 20, right: 20 }} onClick={handleShow}>
          <AddIcon />
        </Fab>
      </Tooltip>

      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title >New Issue</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit} onClose={handleClose}>
            <Form.Group controlId="IssueTitle">
              <Form.Label required>What needs to be done?</Form.Label>
              <Form.Control required type="text" value={title} onInput={e => setTitle(e.target.value)} placeholder="Enter Issue Title" />
              <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">Check Input!</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="IssueDescription">
              <Form.Label required>Description</Form.Label>
              <Form.Control required as="textarea" value={description} onInput={e => setDescription(e.target.value)} placeholder="Enter Issue Description" />
              <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">Check Input!</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="Priority">
              <Form.Label required>Priority</Form.Label>
              <Form.Control required as="select" value={priority} onInput={e => setPriority(e.target.value)}>
                <option value="low">Low</option>
                <option value={"medium"}>Medium</option>
                <option value={"high"}>High</option>
                <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">Check Input!</Form.Control.Feedback>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="IssueCompleteDate">
              <Form.Label required>Complete By (yyyy-mm-dd)</Form.Label>
              <Form.Control required type="date" value={date} onInput={e => setDate(e.target.value)} />
              <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">Check Input!</Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit" disabled={isLoading}>
                {isLoading ? 'Creating...' : 'Create Issue'}
            </Button>
          </Form>
        </Modal.Body>
          <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
}
