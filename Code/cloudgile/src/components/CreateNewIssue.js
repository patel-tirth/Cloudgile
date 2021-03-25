// import React from 'react';
// import { Modal,Form } from 'react-bootstrap';
// import { Button } from "react-bootstrap";
// import { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";

// export default function  NewIssue() {
//     const [show, setShow] = useState(false);

//     const handleClose = () => setShow(false);
//     const handleShow = () => setShow(true);
  
//     return (
     
//       <>
       
//         <Button  onClick={handleShow}>
//           Create New Issue
//         </Button>
  
//         <Modal centered show={show} onHide={handleClose}>
//           <Modal.Header closeButton>
//             <Modal.Title >New Issue</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <Form>
//             <Form.Group controlId="formProjectName">
//             <Form.Label>What needs to be done?</Form.Label>
//             <Form.Control type="text" placeholder="Add issue" />
//             </Form.Group>

//             <Button variant="primary" type="submit">
//                 Add
//             </Button>
//             </Form>
//         </Modal.Body>
//           <Modal.Footer>
//           </Modal.Footer>
//         </Modal>
//       </>
//     );
//   }