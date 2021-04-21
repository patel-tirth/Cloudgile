import React, { useEffect } from 'react';
import { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Divider } from '@material-ui/core';
import { Button, Form, Modal } from 'react-bootstrap';
import { addUserToProject, addProjectToUser } from '../data/Projects';
import { EditProject } from './EditProject';
import {getCurrentUser} from '../auth'
import { getUsersArray } from '../auth/getUsersArray';
import { removeUserFromProject } from '../data/Projects';

const useStyles = makeStyles({
  root: {
    // minWidth: 275,
    height: 'auto'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function ProjectDetails(props) {
  const { project, users } = props
  const classes = useStyles();
  const [show, setShow] = useState(false);
  const [userId, setUserId] = useState(0)
  const [validated, setValidated] = useState(false);
  const [editShow, setEditShow] = useState(false)
  const [selectedOption, setSelectedOption] = useState(1);
  const [allUsers, setAllUsers] = useState([])
  const current = getCurrentUser().id

  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);

  const loadUsers = async () => {
    const data = await getUsersArray()
    setAllUsers(data);
  }

  useEffect(() => {
    loadUsers()
  }, [])

  const handleSave = async (e) => {
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation();
      setValidated(true)
    } else {
      e.preventDefault()
      console.log(userId)
      if (selectedOption === 1) {
        addUserToProject(project.id, userId)
        addProjectToUser(project.id ,userId)
      } else if (selectedOption === 2) {
        removeUserFromProject(project.id, userId)
      }
      setShow(false);
      props.refresh()
    }
  } 

  return (
    <>
    {project  ? 
    <Card className={classes.root}>
      <CardContent>
        <Typography  component="h2" gutterBottom style={{textTransform: 'uppercase'}}>
          {project.name}
        </Typography>
        <Divider />
        <Typography color="textSecondary" component="h2">
          <b>Project Description</b>
        </Typography>
        <Typography color="textSecondary" gutterBottom component="h2">
          &nbsp; &nbsp;  {project.description}
        </Typography>
        <Divider/>
        <Typography color="textSecondary" component="h2">
          <b>Project Members</b>
        </Typography>
        <Typography color="textSecondary" component="h2">
          {
            Object.keys(users).map((key, i) => {
              return <span key={key}>
                &nbsp; &nbsp; {users[key].name} {project.leadId === key && "(Lead)"} <br></br>
              </span>
            })
          }
        </Typography>
        <Divider/>
        <Typography color="textSecondary" component="h2">
          Project Category: <b>{project.category}</b>
        </Typography>
        <Typography color="textSecondary" component="h2">
          Issues pending: <b>{project.numBacklog}</b>
        </Typography>
        <Typography color="textSecondary" component="h2">
          Issues Resolved: <b>{project.numTimeline}</b>
        </Typography>
      </CardContent>
      { current === project.leadId && 
      <CardActions>
        <Button onClick={handleShow}>
          MANAGE USERS
        </Button>
        <Button onClick={() => setEditShow(true)}>
          EDIT PROJECT
        </Button>
      </CardActions>}
    </Card>
    : null}
      <Modal
        show={show}
        backdrop="static"
        keyboard={false}
        centered
        onHide={handleClose}
      >
        <Form noValidate validated={validated} onSubmit={handleSave}>
        <Modal.Header closeButton><Modal.Title>Manage Member</Modal.Title></Modal.Header>
        <Modal.Body>
          <fieldset>
            <Form.Group controlId="Option">
              <Form.Label inline required>Action</Form.Label>
              <Form.Check inline checked={selectedOption === 1} onChange={() => setSelectedOption(1)} type="radio" id="addMember" label="Add Member"/>
              <Form.Check inline checked={selectedOption === 2} onChange={() => setSelectedOption(2)} type="radio" id="removeMember" label="Remove Member"/>
            </Form.Group>
          </fieldset>
          <Form.Group controlId="UserID">
            <Form.Label required>User ID</Form.Label>
            <Form.Control required as="select" value={userId} onInput={e => setUserId(e.target.value)} placeholder="Search User">
              <option value={0}>Select User ID...</option>
              {selectedOption === 1 && Object.keys(allUsers).map((key, i) => {
                return (!project.users.includes(key) && <option value={key} key={i}>{allUsers[key].name + " (" + allUsers[key].email + ")"}</option>)
              })}
              {selectedOption === 2 && Object.keys(props.users).map((key, i) => {
                return ( project.leadId !== key && <option value={key} key={i}>{props.users[key].name + " (" + props.users[key].email + ")"}</option>)
              })}
            </Form.Control>
            <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">Check Input!</Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="contained" onClick={handleClose}>CANCEL</Button>
            <Button variant="contained" type="submit">{selectedOption === 1 && 'ADD'}{selectedOption === 2 && 'REMOVE'}</Button>
        </Modal.Footer>
        </Form>
      </Modal>

      <EditProject show={editShow} close={() => setEditShow(false)} {...props}/>
    </>
  );
}
