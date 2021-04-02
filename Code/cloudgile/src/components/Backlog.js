import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button, IconButton, makeStyles, Tooltip } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle'; 
import EditIcon from '@material-ui/icons/Edit';
import {closeIssue} from '../data/Scrum/closeIssue'
import { Modal } from 'react-bootstrap';
import { EditIssue } from './EditIssue';
import { getCurrentUser } from '../auth';
import { ViewIssue } from './ViewIssue';
 
const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
    "&:hover": {
      backgroundColor: 'rgb(202, 202, 202, 0.42)',
      cursor: 'pointer'
    }
  }
});

export default function Backlog ({project, users, refresh}) {
  const getColor = (level) => {
    switch (level) {
      case 'low':
        return '#00c4ffa1'
      case 'medium':
        return '#f9ff9dc4'
      case 'high':
        return '#ff0000a1'
      default:
        break;
    }
  }

  const classes = useRowStyles();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [editShow, setEditShow] = useState(false)
  const [viewIssue, setViewIssue] = useState(false)
  const [currentIssue, setCurrentIssue] = useState(null)

  const current = getCurrentUser().id

  const handleEdit = (e, issue) => {
    e.preventDefault()
    setCurrentIssue(issue)
    setEditShow(true)
  }

  const closeThisIssue = (issue, key) => {
    closeIssue(project.id, issue, key)
    refresh()
    handleClose()
  }
  const handleCellClick = (e, issue) => {
    setCurrentIssue(issue)
    setViewIssue(true)
  }

  return (
    <>
    <TableContainer component={Paper}>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell align="center">Priority</TableCell>
            <TableCell align="right">Assigned To</TableCell>
            <TableCell align="right">Complete By</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {project.backlog && project.backlog.map((issue, key) => {
              return (
                <>
                <TableRow key={key} className={classes.root}>
                  <TableCell onClick={(e) => handleCellClick(e, issue)} style={{}} component="th" scope="row">
                    {project.issues[issue].title}
                  </TableCell>
                  <TableCell onClick={(e) => handleCellClick(e, issue)} style={{ backgroundColor: getColor(project.issues[issue].priority), padding: 1, textTransform: 'uppercase' }} align="center">
                    {project.issues[issue].priority}
                  </TableCell>
                  <TableCell onClick={(e) => handleCellClick(e, issue)} align="right" style={{}}>
                    {users[project.issues[issue].assignedTo].name}
                  </TableCell>
                  <TableCell onClick={(e) => handleCellClick(e, issue)} align="right" style={{}}>
                    {project.issues[issue].completeBy}
                  </TableCell>

                  <TableCell align="right">
                      {(current === (project.issues[issue].assignedTo) || (current === project.leadId)) &&
                      <>
                      <IconButton aria-label="expand row" size="small" onClick={(e) => handleEdit(e, issue)}>
                      <Tooltip title="Edit Issue">
                        <EditIcon color="primary"/>
                      </Tooltip>
                      </IconButton>

                      <IconButton aria-label="expand row" size="small" style={{ marginLeft: 10 }} onClick={() => handleShow()}>
                      <Tooltip title="Close Issue">
                        <CheckCircleIcon style={{color: 'green'}}/>
                      </Tooltip>
                      </IconButton>
                      </>
                    }
                  </TableCell>
                </TableRow>

                <Modal
                  key={'modal'.concat(key.toString())}
                  show={show}
                  onHide={handleClose}
                  backdrop="static"
                  keyboard={false}
                  centered
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Close Issue</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    Are you sure?
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="contained" onClick={handleClose}>
                      No
                    </Button>
                    <Button variant="contained" onClick={() => closeThisIssue(issue, key)}>Yes</Button>
                  </Modal.Footer>
                </Modal>

                </>
              );
            })}
        </TableBody>
      </Table>
    </TableContainer>
    {editShow && <EditIssue show={editShow} issue={project.issues[currentIssue]} close={() => setEditShow(false)} project={project} users={users} refresh={refresh} />}
    {viewIssue && <ViewIssue show={viewIssue} issue={project.issues[currentIssue]} close={() => setViewIssue(false)} project={project} users={users} refresh={refresh} />}
    </>
  )
}
