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
import { repoenIssue } from '../data/Scrum/repoenIssue'
import { Modal } from 'react-bootstrap';
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

export default function Timeline({ project, users, refresh }) {
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
    const [viewIssue, setViewIssue] = useState(false)
    const [currentIssue, setCurrentIssue] = useState(null)

    const current = getCurrentUser().id;

    const reOpenThisIssue = (issue, key) => {
        repoenIssue(project.id, issue, key).then(() => {
                refresh()
                handleClose()
        })
    }
    const handleCellClick = (issue) => {
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
                        <TableCell align="right">Closed By</TableCell>
                        <TableCell align="right">Closed On</TableCell>
                        <TableCell align="right">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users && project.timeline && project.timeline.map((issue, key) => {
                        // console.log(project.issues[issue])
                        // console.log(users[project.issues[issue].closedBy].name)
                        return (
                            <>
                            <TableRow key={key} className={classes.root}>
                                <TableCell onClick={() => handleCellClick(issue)} component="th" scope="row">
                                    {project.issues[issue].title}
                                </TableCell>
                                <TableCell onClick={() => handleCellClick(issue)} align="center" style={{ backgroundColor: getColor(project.issues[issue].priority), padding: 1, textTransform: 'uppercase' }}>
                                    {project.issues[issue].priority}
                                </TableCell>
                                <TableCell onClick={() => handleCellClick(issue)} align="right" style={{}}>
                                    {users[project.issues[issue].closedBy] ? users[project.issues[issue].closedBy].name : <i>User Removed</i>}
                                </TableCell>
                                <TableCell onClick={() => handleCellClick(issue)} align="right" style={{}}>
                                    {project.issues[issue].closedOn}
                                </TableCell>
                                <TableCell align="right">
                                    { project.leadId === current && <IconButton aria-label="expand row" size="small" onClick={() => handleShow()}>
                                        <Tooltip title="Re-open Issue">
                                            <CheckCircleIcon style={{ color: 'red' }}/>
                                        </Tooltip>
                                    </IconButton>}
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
                                        <Modal.Title>Re-open Issue</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        Are you sure?
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleClose}>
                                            No
                                        </Button>
                                        <Button onClick={() => reOpenThisIssue(issue, key)}>Yes</Button>
                                    </Modal.Footer>
                                </Modal>

                            </>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
        {viewIssue && <ViewIssue show={viewIssue} issue={project.issues[currentIssue]} close={() => setViewIssue(false)} project={project} users={users} refresh={refresh} />}
        </>
    )
}
