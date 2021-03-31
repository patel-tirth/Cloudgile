
import React , {useState,useEffect} from 'react';
import {Button, Dropdown } from '@themesberg/react-bootstrap';
import firebase from 'firebase/app';
import 'firebase/database';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Modal,Form } from 'react-bootstrap';

export const Manage = () => {
  const [members, setMembers] = useState(null);
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false)
  };
  const handleShow = () => setShow(true);
  
  function getUsers() {
    
  }
  useEffect(() => {
      getUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault()
    handleClose()    
  }

  return (
    <TableContainer >
      <Table stickyHeader aria-label="sticky table">
        <TableHead> 
          <TableRow> 
            <TableCell>
              All users
              <Button  onClick={handleShow} style= {{float:'right'}}>
                  Add New Member 
              </Button>
              <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title >Add Member</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={handleSubmit} onClose={handleClose}>
                  <Form.Group controlId="formProjectName">
                  <Form.Label required>Member Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter member name" />
                  </Form.Group>
                  <Button variant="primary" type="submit">
                      Submit
                  </Button>
                </Form>
              </Modal.Body>
              </Modal>
            </TableCell> 
          </TableRow>
        </TableHead>
        
      <TableBody>
        <TableRow>
          {members && members.map((person) => {
            const value = person.email;
            return (
              <TableRow key={person.id} >
                <TableCell>
                { value}  
                </TableCell>
              </TableRow>
            );
          })}
        </TableRow>
      </TableBody>
    </Table>
  </TableContainer>
  );
}