import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { editProjectDetails } from '../Data/Scrum/editProjectDetails';

export const EditProject = (props) => {
    const { project } = props
    const [validated, setValidated] = useState(false);
    const [projectId, setProjectId] = useState(project.id)
    const [name, setName] = useState(project.name)
    const [category, setCategory] = useState(project.category)
    const [type, setType] = useState(project.type)
    const [createdOn, setCreatedOn] = useState(project.createdOn)
    const [description, setDescription] = useState(project.description)
    const [lead, setLead] = useState(project.leadId)

    const [changed, setChanged] = useState(false)

    const handleSave = async (e) => {
        const form = e.currentTarget
        if (form.checkValidity() === false) {
            e.preventDefault()
            e.stopPropagation();
            setValidated(true)
        } else {
            e.preventDefault()
            editProjectDetails(project.id, { id: project.id, name, category, type, createdOn, description, leadId: lead, leadName: props.users[lead].name })
                props.close()
                props.refresh()
        }
    }

    return (
        <Modal
            show={props.show}
            onHide={props.close}
            backdrop="static"
            keyboard={false}
            centered
        >
            <Form noValidate validated={validated} onSubmit={handleSave}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Project</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="ProjectID">
                        <Form.Label required>Project ID</Form.Label>
                        <Form.Control disabled required type="text" value={projectId} />
                    </Form.Group>

                    <Form.Group controlId="ProjectName">
                        <Form.Label required>Project Name</Form.Label>
                        <Form.Control required type="text" value={name} onInput={e => { setChanged(true); setName(e.target.value)}} placeholder="Project Name" />
                        <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">Check Input!</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="ProjectDescription">
                        <Form.Label required>Project Description</Form.Label>
                        <Form.Control required as="textarea" value={description} onInput={e => { setChanged(true); setDescription(e.target.value)}} placeholder="Project Description" />
                        <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">Check Input!</Form.Control.Feedback>
                    </Form.Group>
                    
                    <Form.Group controlId="ProjectCategory">
                        <Form.Label required>Project Category</Form.Label>
                        <Form.Control required type="text" value={category} onInput={e => { setChanged(true); setCategory(e.target.value)}} placeholder="Project Category" />
                        <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">Check Input!</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="ProjectType">
                        <Form.Label required>Project Type</Form.Label>
                        <Form.Control required type="text" value={type} onInput={e => { setChanged(true); setType(e.target.value)}} placeholder="Project Type" />
                        <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">Check Input!</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="AddMember">
                        <Form.Label required>Created On</Form.Label>
                        <Form.Control disabled required type="text" value={createdOn} onInput={e => { setChanged(true); setCreatedOn(e.target.value)}} />
                        <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">Check Input!</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="ProjectLead">
                        <Form.Label required>Project Lead</Form.Label>
                        <Form.Control required as="select" value={lead} onInput={e => {setChanged(true); setLead(e.target.value)}} >
                            {
                                Object.keys(props.users).map((key, i) => {
                                    return (<option value={key} key={i}>{props.users[key].name + " (" + props.users[key].email + ")"}</option>)
                                })
                            }
                        </Form.Control>
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
