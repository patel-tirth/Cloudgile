import React from 'react';
// import NewIssue from './CreateNewIssue';
import { Modal,Form } from 'react-bootstrap';
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Dropdown } from 'semantic-ui-react'
export default class Backlog extends React.Component {
    constructor() {
      super();
      this.state = {
        issue: '',
        items: []
      }
    };
  
    handleFormSubmit = (e) => {
      e.preventDefault();
  
      let items = [...this.state.items];
  
      items.push({
              issue: this.state.issue
            });
  
      this.setState({
        items,
        issue: ''
      });
    };
  
    handleInputChange = (e) => {
      let input = e.target;
      let name = e.target.name;
      let value = input.value;
  
      this.setState({
        [name]: value
      })
    };
  
    render() {
      return (
        <div className="App">
          <Forms handleFormSubmit={ this.handleFormSubmit } handleInputChange={ this.handleInputChange } newIssue={ this.state.issue } />
          <Tables items={ this.state.items }/>
        </div>
      );
    }
  }
  
  class Tables extends React.Component {
    constructor() {
        super();
        // let bgcolor;
        this.state = {
          backgroundColor:''
        }
      };
   
      handleInputChange = (event) => {
       let value = event    .target.value;
        if(value == "high")
        {
           this.setState({
            backgroundColor: 'red'
           })
        }
        else if (value == "medium")
        {
            this.setState({
                backgroundColor: 'yellow'
               })
        }
        else if (value=="low"){
            this.setState({
                backgroundColor: 'green'
               })
        }
      }
    render() {
        
      const items = this.props.items;
     
      return (

        <TableContainer component={Paper}>
        <Table stickyHeader aria-label="sticky table">
        <TableHead> 
            <TableRow> 
            {/* <TableCell /> */}
              <TableCell>Issues</TableCell> 
              {/* <TableCell> Priority</TableCell> */}
           </TableRow>
          </TableHead>
          
         <TableBody>
                <TableRow>
                  {items.map((item,i) => {
                    const value = item.issue;
                    return (
                      <TableRow key={item.id} >
                          {console.log(item.id)}   
                          <TableCell    style={{backgroundColor: this.state.backgroundColor}}>
                       { value}  &nbsp;   &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;   &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                        <select onChange={ this.handleInputChange } style={{alignItems: 'flex-end'}}>
                               <option value="" disabled selected hidden>Priority</option>
                             <option  value="high">High</option> 
                             <option value="medium">Medium</option>
                              <option value="low">Low</option> 
                        </select>
                        
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
  }
  
  class Forms extends React.Component {
    constructor() {
        super();
            this.state = {
            show: false,
            handleShow: true,
            handleClose:false,
            }
            this.handleClose = this.handleClose.bind(this);
            this.handleShow = this.handleShow.bind(this);

    };
    handleShow(){
        this.setState({
            show: true
        })
  }
    handleClose(){
        this.setState({
            show: false
        })
    }
    
    render() {
      return (
          <>

        <Button  onClick={this.handleShow}>
         Create New Issue
         </Button>
         <Modal centered show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
             <Modal.Title >New Issue</Modal.Title>
           </Modal.Header>
           <Modal.Body>
             <Form onSubmit={this.props.handleFormSubmit}>
           <Form.Group controlId="formProjectName">
        <Form.Label>What needs to be done?</Form.Label>
           <Form.Control type="text" value={this.props.issue} name="issue" onChange={this.props.handleInputChange} placeholder="Add issue" />
            </Form.Group>

             <Button variant="primary" value="Submit" type="submit" onClick={this.handleClose}>
                  Add
              </Button>
             </Form>
         </Modal.Body>
           <Modal.Footer>
           </Modal.Footer>
        </Modal>
        </>
      );
    }
  }

