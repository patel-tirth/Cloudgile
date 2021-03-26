
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

export const Manage = ()=> {
  const [people, setDesigners] = useState([]);
  const [member, setMemberName] = useState('');
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setMemberName('')
    setShow(false)
  };
  const handleShow = () => setShow(true);
let array = [];
  function getUsers() {
      var users = firebase.database().ref('/users/');
      users.on('value', (snapshot) => {
          snapshot.forEach((snap) => {
              const userObject = snap.val();
             
                  const allUsers = [...people, userObject];
                  array.push(userObject);
                  setDesigners(allUsers);
                
          });
      });
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
  
             <Modal  show={show} onHide={handleClose}>
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
              {console.log(people)}
                {people.map((person) => {
                 
                  const value = person.email;
                  return (
                    <TableRow key={person.id} >
                        {/* {console.log(perosn.id)}    */}
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