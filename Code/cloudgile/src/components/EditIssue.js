import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { editIssueDetails } from '../data/Scrum/editIssueDetails';

export const EditIssue = (props) => {
    const { issue } = props
    const [validated, setValidated] = useState(false);
    const [issueId, setIssueId] = useState(issue.id)
    const [name, setName] = useState(issue.title)
    const [assignedTo, setAssignedTo] = useState(issue.assignedTo)
    const [completeBy, setCompleteBy] = useState(issue.completeBy)
    const [description, setDescription] = useState(issue.description)
    const [priority, setPriority] = useState(issue.priority)

    const [changed, setChanged] = useState(false)

    const handleSave = async (e) => {
        const form = e.currentTarget
        if (form.checkValidity() === false) {
            e.preventDefault()
            e.stopPropagation();
            setValidated(true)
        } else {
            e.preventDefault()
            editIssueDetails(props.project.id, { id: issueId, title: name, assignedTo, completeBy, description, priority })
            props.close()
            props.refresh()}
    }

    return (
        <Modal
            show={props.show}
            onHide={props.close}
            backdrop="static"
            keyboard={false}
            centered
        >
            <Form noValidate  validated={validated} onSubmit={handleSave}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Issue</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="IssueID">
                        <Form.Label required>Issue ID</Form.Label>
                        <Form.Control disabled required type="text" value={issueId} />
                    </Form.Group>

                    <Form.Group controlId="IssueName">
                        <Form.Label required>Issue Name</Form.Label>
                        <Form.Control required type="text" value={name} onInput={e => { setChanged(true); setName(e.target.value)}} placeholder="Project Name" />
                        <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">Check Input!</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="IssueDescription">
                        <Form.Label required>Issue Description</Form.Label>
                        <Form.Control required as="textarea" value={description} onInput={e => { setChanged(true); setDescription(e.target.value)}} placeholder="Project Description" />
                        <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">Check Input!</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="Priority">
                        <Form.Label required>Priority</Form.Label>
                        <Form.Control required as="select" value={priority} onInput={e => {setChanged(true); setPriority(e.target.value)}}>
                            <option value="low">Low</option>
                            <option value={"medium"}>Medium</option>
                            <option value={"high"}>High</option>
                            <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">Check Input!</Form.Control.Feedback>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="IssueLead">
                        <Form.Label required>Assigned To</Form.Label>
                        <Form.Control required as="select" value={assignedTo} onInput={e => { setChanged(true); setAssignedTo(e.target.value)}}>
                            {
                                Object.keys(props.users).map((key, i) => {
                                    return (<option value={key} key={i}>{props.users[key].name + " (" + props.users[key].email + ")"}</option>)
                                })
                            }
                            <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">Check Input!</Form.Control.Feedback>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="AddMember">
                        <Form.Label required>Complete By</Form.Label>
                        <Form.Control required type="date" value={completeBy} onInput={e => { setChanged(true); setCompleteBy(e.target.value) }} />
                        <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">Check Input!</Form.Control.Feedback>
                    </Form.Group>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="warning" onClick={props.close}>
                        CANCEL
                    </Button>
                    <Button variant={!changed ? "outline-success" : "success"} disabled={!changed} onClick={handleSave}>SAVE</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}
